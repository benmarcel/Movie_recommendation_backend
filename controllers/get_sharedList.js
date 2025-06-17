import Watchlist from '../models/watchlist_schema.js';

const getSharedWatchlists = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all watchlists shared with the user
    const watchlists = await Watchlist.find({ sharedWith: userId }).populate('movies');

    if (watchlists.length === 0) {
      return res.status(404).json({ message: "No shared watchlists found" });
    }

    // Return the watchlists data
    res.status(200).json({
      message: "Shared watchlists retrieved successfully",
      watchlists,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving shared watchlists",
      error: error.message,
    });
  }
}

export default getSharedWatchlists;
// This function handles fetching the shared watchlists of a user.