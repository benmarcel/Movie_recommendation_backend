import User from "../../models/user_schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required", success: false });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format", success: false });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password", success: false });
    }

    // --- Authentication successful ---

    // Option 1: If primarily using JWTs for stateless auth (recommended if you're sending token to frontend)
    // You wouldn't typically use req.session here for auth state, only for things like CSRF token or temporary data.
    // If you want JWT for auth, you should send it back to the client (e.g., in localStorage, secure HTTP-only cookie).
    // The current code sends it in req.session.user.token, which is a bit unusual.
    // If you plan to send the JWT to the client for authentication on future requests (e.g., in Authorization: Bearer header)
    // then you might not even need req.session for authorization, but only for cookie-based session management.

    // Let's assume for now you *do* want to use express-session for server-side session management.

    // Store user session data in req.session
    req.session.user = { // You can put whatever data you need here
      id: user._id,
      username: user.username,
      email: user.email,
      // You can store the JWT here too if you want, but it's redundant if you also send it to the client.
      // If client is purely session-cookie based, don't send JWT back to client in JSON.
      // If client is JWT-based, you might not need sessions for auth.
      // For now, let's keep it consistent with your original intent for req.session
      token: jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      ),
    };

   
    // This ensures express-session writes the session to MongoStore
    // and attaches the Set-Cookie header to the response.
    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
        // Respond with a server error if session saving fails
        return res.status(500).json({ message: "Login failed due to session saving error", success: false });
      }

      // ONLY SEND THE RESPONSE AFTER THE SESSION IS CONFIRMED SAVED
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user?.username, // Use optional chaining for safety
          email: user.email,
          createdAt: user.createdAt,
          age: user.age || "",
          followers: user.followers.length,
          following: user.following.length,
          favorites: user.favorites.length,
          
        },
        success: true, // Consistent success flag
      });
    });

  } catch (error) {
    console.error('Error logging in:', error); // Log the actual error
    // Ensure consistent error response structure
    return res.status(500).json({ message: "An unexpected error occurred during login", error: error.message, success: false });
  }
};

export default login;
