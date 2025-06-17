
import Watchlist from "../models/watchlist_schema.js";
import getOrCreateMovieLocally from "../services/get_or_save_movie.js";

// --- WATCHLIST Logic ---
const addToWatchlist = async (req, res) => {
  const { tmdbId, watchlistId } = req.body;
  const userId = req.user.id;

  if (!tmdbId || !watchlistId) {
    return res.status(400).json({ message: "Movie TMDB ID and Watchlist ID are required." });
  }

  try {
    const movie = await getOrCreateMovieLocally(tmdbId);
    if (!movie) {
      return res.status(500).json({ message: "Could not retrieve or create movie locally." });
    }

    // Ensure the watchlist belongs to the authenticated user for security
    const watchlistItem = await Watchlist.findOne({ _id: watchlistId, userId: userId });
    if (!watchlistItem) {
      return res.status(404).json({ message: "Watchlist not found or does not belong to user." });
    }

    const updateResult = await Watchlist.updateOne(
      { _id: watchlistId },
      { $addToSet: { movies: movie._id } } // Add movieId to the 'movies' array only if not present
    );

    if (updateResult.modifiedCount > 0) {
      return res.status(200).json({ success: true, message: `Movie added to "${watchlistItem.name}" successfully!` });
    } else {
      return res.status(409).json({ success: false, message: `Movie already in "${watchlistItem.name}".` });
    }
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    return res.status(500).json({ message: "Error adding movie to watchlist", error: error.message });
  }
};
export default addToWatchlist;
// Export the addToWatchlist function to be used in routes
// This function handles adding a movie to a user's watchlist.
// It checks if the movie exists, fetches it if not, and then adds it to the specified watchlist.
// It returns appropriate success or error messages based on the operation's outcome.