import User from "../models/user_schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  // form validation
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

   const token =  jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
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
          token: token, // Include the JWT token in the response
          
        },
        success: true, // Consistent success flag
      });
  

  } catch (error) {
    console.error('Error logging in:', error); // Log the actual error
    // Ensure consistent error response structure
    return res.status(500).json({ message: "An unexpected error occurred during login", error: error.message, success: false });
  }
};

export default login;
