import Movie from "../models/movie_schema.js";
import Watchlist from "../models/watchlist_schema.js";
// This function removes a movie from the user's watchlist.
/**
 * This function removes a movie from the user's watchlist.
 * It expects the TMDB ID of the movie in the URL and the watchlist ID in the request body.
 * It checks if the movie exists in the local database and if the watchlist belongs to the user.
 * If successful, it removes the movie from the specified watchlist.
 */

const removeFromWatchlist = async (req, res) => {
  const { tmdbId } = req.params;
  const { watchlistId } = req.body; // Expect watchlistId in body for DELETE

  const userId = req.user.id;

  if (!tmdbId || !watchlistId) {
    return res.status(400).json({ success: false, message: "Movie TMDB ID and Watchlist ID are required for removal." });
  }

  try {
    const movie = await Movie.findOne({ tmdbId: tmdbId });
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found in local database." });
    }

    // Ensure the watchlist belongs to the authenticated user for security
    const watchlistItem = await Watchlist.findOne({ _id: watchlistId, userId: userId });
    if (!watchlistItem) {
      return res.status(404).json({ message: "Watchlist not found or does not belong to user." });
    }

    const updateResult = await Watchlist.updateOne(
      { _id: watchlistId },
      { $pull: { movies: movie._id } }
    );

    if (updateResult.modifiedCount > 0) {
      return res.status(200).json({ success: true, message: `Movie removed from "${watchlistItem.name}".` });
    } else {
      return res.status(404).json({ success: false, message: `Movie not found in "${watchlistItem.name}".` });
    }
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    return res.status(500).json({ message: "Error removing movie from watchlist", error: error.message });
  }
};

export default removeFromWatchlist;