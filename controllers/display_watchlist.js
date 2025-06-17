import Watchlist from "../models/watchlist_schema.js";

const displayAllWatchlists = async (req, res) => {
  const userId = req.user.id; // From auth middleware

  if (!userId) {
    return res.status(401).json({ message: "Authentication required to get watchlists." });
  }

  try {
    const watchlists = await Watchlist.find({ userId: userId }).select('_id name movies'); // Select _id, name, and movie IDs
    return res.status(200).json({ watchlists });
  } catch (error) {
    console.error("Error getting user watchlists:", error);
    return res.status(500).json({ message: "Error retrieving user watchlists", error: error.message });
  }
};
// This function retrieves all watchlists for the authenticated user.
export default displayAllWatchlists;
// Export the function to be used in routes