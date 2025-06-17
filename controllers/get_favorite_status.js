import Movie from  "../models/movie_schema.js";
import User from "../models/user_schema.js";

// This function checks if a movie is in the user's favorites list.
const getFavoritesStatus = async (req, res) => {
  const { tmdbId } = req.params;
  const userId = req.user.id;

  if (!tmdbId) {
    return res.status(400).json({ message: "TMDB ID is required." });
  }

  try {
    const movie = await Movie.findOne({ tmdbId: tmdbId });
    if (!movie) {
      // If movie isn't even in our local DB, it certainly isn't in user's lists
      return res.status(200).json({ isInFavorites: false });
    }

    const user = await User.findById(userId).select('favorites');
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isInFavorites = user.favorites.some(favMovieId => favMovieId.equals(movie._id));
    return res.status(200).json({ isInFavorites });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return res.status(500).json({ message: "Error checking favorite status", error: error.message });
  }
};

export default getFavoritesStatus;
// This function checks if a movie is in the user's favorites list.