// New endpoint to check session status and return user data
const checkSession = (req, res) => {
  if (req.session && req.session.user) {
    // Session exists and user data is present
    return res.status(200).json({ user: req.session.user });
  } else {
    // No active session or user not logged in
    return res.status(401).json({ message: 'No active session' });
  }
};

export default checkSession;