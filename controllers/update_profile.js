import User from "../models/user_schema.js";
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, age } = req.body;
    

    // Find the user and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...(username && { username }), ...(age && { age }) },
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
      age: updatedUser.age || '',
      followers: updatedUser.followers.length,
      following: updatedUser.following.length,
      favorites: updatedUser.favorites.length,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating profile", error: error.message });
  }
}

export default updateProfile;