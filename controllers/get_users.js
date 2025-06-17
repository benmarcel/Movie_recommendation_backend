import User from '../models/user_schema.js';

const getUsers = async (req, res) => {
  try {
    // Fetch all users except the current user
    const users = await User.find({ _id: { $ne: req.user.id } })
      .populate('followers', 'username') // Populate followers with usernames
      .populate('following', 'username') // Populate following with usernames
      .select('username followers following age')
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found', success: false });
    }

    res.status(200).json({ users, success: true });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching users',
      error: error.message,
      success: false
    });
  }
}
export default getUsers;
// Export the function to be used in routes
// This code defines a function to get all users except the current user.