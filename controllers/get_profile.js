import User from "../models/user_schema.js";

const getProfile = async (req, res) => {
  try {
    // Get user ID from session
    const userId = req.user.id;

    // Find the user by ID and populate followers and following
    const user = await User.findById(userId)
      .populate('favorites', 'title poster_path')
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
      age: user.age || null, // Handle age being optional
      followers: user.followers,
      following: user.following,
      favorites: user.favorites,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
}



export default getProfile;// This function handles fetching the user's profile data.