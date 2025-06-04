import User from "../../models/user_schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body; 
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
 
try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    // Store user session
    req.session.user = {
        id: user._id,
        token,
    };
    // Return user data without password
    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user?.username,
            email: user.email,
            createdAt: user.createdAt,
            profilePicture: user.profilePicture || '',
            followers: user.followers.length,
            following: user.following.length,
            favorites: user.favorites.length,
        }, 
    });
} catch (error) {
    if (error) {
        return res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

}

export default login;
// Export the login function to be used in routes
