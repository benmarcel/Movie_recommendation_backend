import Watchlist from "../models/watchlist_schema.js";
import User from "../models/user_schema.js";


const createWatchlist = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  if (!name || !userId) {
    return res.status(400).json({ message: "Name and User ID are required." });
  }
  // Ensure userId is provided, typically set by authentication middleware
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: "Invalid watchlist name." });
  }

  try {
    const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
    // Check if the watchlist already exists for the user
    const existingWatchlist = await Watchlist.findOne({ userId, name });
    if (existingWatchlist) {
      return res.status(400).json({ message: "Watchlist already exists" });
    }

    // Create a new watchlist
    const newWatchlist = new Watchlist({
      userId,
      name,
      movies: [],
      createdAt: new Date(),
    });

    // Save the watchlist to the database
    await newWatchlist.save();

    res.status(201).json({
      message: "Watchlist created successfully",
      watchlist: newWatchlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating watchlist",
      error: error.message,
    });
  }
};

export default createWatchlist;