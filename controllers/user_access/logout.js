const logout = async (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out", error: err.message });
      }
      // Clear the session cookie
      res.clearCookie('connect.sid'); // 'connect.sid' is the default cookie name for express-session
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out", error: error.message });
  }
}
export default logout;