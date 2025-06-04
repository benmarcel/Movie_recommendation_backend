import Watchlist from "../../models/watchlist.js";

const displayAllWatchlists = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all watchlists for the user
    const watchlists = await Watchlist.find({ userId });

    if (watchlists.length === 0) {
      return res.status(404).json({ message: "No watchlists found" });
    }

    // Return the watchlists data
    res.status(200).json({
      message: "Watchlists retrieved successfully",
      watchlists,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving watchlists",
      error: error.message,
    });
  }
};

const getWatchlistMovies = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.params; // Assuming the watchlist name is passed as a URL parameter
  if (!name) {
    return res.status(400).json({ message: "Watchlist name is required" });
  }

  try {
    // Find the watchlist by user ID and name
    const watchlist = await Watchlist.findOne({ userId, name });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }
    const movies = watchlist.movies;
    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found in this watchlist" });
    }
    // Populate the movies with their details
    const watchlistMovies = await watchlist.populate(movies, {
      path: "movies",
      model: "Movie",
    });
    // Return the watchlist data
    res.status(200).json({
      message: "Watchlist retrieved successfully",
      watchlist: watchlistMovies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving watchlist",
      error: error.message,
    });
  }
};

export default {
  displayAllWatchlists,
  getWatchlistMovies,
};  
// Export the functions to be used in routes
