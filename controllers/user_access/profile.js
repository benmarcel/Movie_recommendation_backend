import User from "../../models/user_schema.js";

const profile = async (req, res) => {
  try {
    // Get user ID from session
    const userId = req.user.id;

    // Find the user by ID and populate followers and following
    const user = await User.findById(userId)
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture')
      .select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile data
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture || '',
      followers: user.followers,
      following: user.following,
      favorites: user.favorites.length,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
}
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, profilePicture } = req.body;
    if (!username || !profilePicture) {
      return res.status(400).json({ message: "Username and profile picture are required" });
    }

    // Find the user and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, profilePicture },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from the response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return updated user profile data
    res.status(200).json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture || '',
      followers: updatedUser.followers.length,
      following: updatedUser.following.length,
      favorites: updatedUser.favorites.length,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating profile", error: error.message });
  }
}
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user and delete their profile
    const deletedUser = await User.findById(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne();

    // Clear the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out", error: err.message });
      }
      res.clearCookie('connect.sid'); // Clear session cookie
      res.status(200).json({ message: "Profile deleted successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting profile", error: error.message });
  }
}
const profileController = {
  getProfile: profile,
  updateProfile: updateProfile,
  deleteProfile: deleteProfile
};
// Export the profile controller
export default profileController;