import User from "../models/user_schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signup = async (req, res) => {
  const { username, password, email, age } = req.body;

  if (!username || !password || !email || !age) {
    return res.status(400).json({ message: "Username, password, email, and age are required" });
  }
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists login instead" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    // Save the user to the database
    const user = await newUser.save();
    if (!user) {
      return res.status(500).json({ message: "Error saving user" });
    }
    // jwt token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    

    // Return the created user without the password
    res.status(201).json({
      message: "User created successfully",
       user: {
            id: user._id,
            username: user?.username,
            email: user.email,
            createdAt: user.createdAt,
            age: user.age || "",
            followers: user.followers.length,
            following: user.following.length,
            favorites: user.favorites.length,
            token: token
        },
        success: true,
    });
  } catch (error) {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  }
};

export default signup;
