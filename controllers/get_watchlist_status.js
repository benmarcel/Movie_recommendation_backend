import Movie from "../models/movie_schema.js";
import Watchlist from "../models/watchlist_schema.js";
const getWatchlistStatus = async (req, res) => {
  const { tmdbId } = req.params;
  const userId = req.user.id;

  if (!tmdbId) {
    return res.status(400).json({ message: "TMDB ID is required." });
  }

  try {
    const movie = await Movie.findOne({ tmdbId: tmdbId });
    if (!movie) {
      // If movie isn't even in our local DB, it certainly isn't in user's lists
      return res.status(200).json({ watchlistIds: [] });
    }

    // Find all watchlists for the user that contain this movie
    const watchlistsContainingMovie = await Watchlist.find({
      userId: userId,
      movies: movie._id // Check if the movie's _id is in the 'movies' array
    }).select('_id name'); // Only select ID and name for efficiency

    // Return an array of objects: [{ _id: '...', name: '...' }]
    return res.status(200).json({ watchlistIds: watchlistsContainingMovie });
  } catch (error) {
    console.error("Error checking watchlist status:", error);
    return res.status(500).json({ message: "Error checking watchlist status", error: error.message });
  }
};
export default getWatchlistStatus;
// This function checks if a movie is in the user's watchlists and returns the IDs of those watchlists.
// It expects the TMDB ID of the movie in the URL and uses the authenticated user's ID from req.user.id.