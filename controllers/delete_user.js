import User from "../models/user_schema.js";

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

export default deleteProfile;