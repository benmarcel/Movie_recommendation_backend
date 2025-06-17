
import User from '../models/user_schema.js';
// New endpoint to check session status and return user data
const userAuth = (req, res) => {
  async (req, res) => {
  // `req.user` is populated by the `authenticateToken` middleware
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error getting profile.' });
  }
};
};

export default userAuth;