import User from '../models/user_schema.js';

const getOneUser = async (req, res) => {
  const userId = req.params.id; // Assuming the user ID is passed as a URL parameter

  try {
    // Find the user by ID and populate followers and following
    const user = await User.findById(userId)
      .populate('followers', 'username')
      .populate('following', 'username')
      .select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile data
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user", error: error.message });
  }
}

export default getOneUser;
