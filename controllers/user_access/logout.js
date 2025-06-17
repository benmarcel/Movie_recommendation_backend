const logout = async (req, res) => {
 try {
    // In a purely stateless JWT system, there's no server-side "session" to destroy.
    // The client is responsible for deleting its JWT.
    // This endpoint primarily serves as an acknowledgment.
    // If you implemented refresh tokens (long-lived tokens stored in a DB),
    // this is where you would invalidate them.
    // Example: Invalidate refresh token for req.user.userId
    // await RefreshToken.deleteOne({ userId: req.user.userId, token: req.body.refreshToken });

    res.status(200).json({ message: "Logout successful (client-side JWT removal acknowledged)." });
  } catch (error) {
    console.error("Error during JWT logout process (server-side):", error);
    res.status(500).json({ message: "Server-side logout process failed.", error: error.message });
  }
}
export default logout;