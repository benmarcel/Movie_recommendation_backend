import User from "../models/user_schema.js";
import Movie from "../models/movie_schema.js";

// --- REMOVE FROM FAVORITES Logic ---
 const removeFromFavorites = async (req, res) => {
  const { tmdbId } = req.params; // Expect TMDB ID from URL
  const userId = req.user.id;

  if (!tmdbId) {
    return res.status(400).json({ message: "TMDB ID is required for removal." });
  }

  try {
    const movie = await Movie.findOne({ tmdbId: tmdbId });
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found in local database." });
    }

    const updateResult = await User.updateOne(
      { _id: userId },
      { $pull: { favorites: movie._id } }
    );

    if (updateResult.modifiedCount > 0) {
      return res.status(200).json({ success: true, message: "Movie removed from favorites." });
    } else {
      return res.status(404).json({ success: false, message: "Movie not found in favorites." });
    }
  } catch (error) {
    console.error("Error removing movie from favorites:", error);
    return res.status(500).json({ message: "Error removing movie from favorites", error: error.message });
  }
};
export default removeFromFavorites;