import User from "../models/user_schema.js";
import getOrCreateMovieLocally from "../services/get_or_save_movie.js";

// --- FAVORITES Logic ---
export const addFavorites = async (req, res) => {
  const { tmdbId } = req.body;
  const userId = req.user.id; // req.user.id is set by auth middleware

  if (!tmdbId) {
    return res.status(400).json({ message: "TMDB ID is required." });
  }

  try {
    const movie = await getOrCreateMovieLocally(tmdbId);
    if (!movie) {
      return res.status(500).json({ message: "Could not retrieve or create movie locally." });
    }

    const updateResult = await User.updateOne(
      { _id: userId },
      { $addToSet: { favorites: movie._id } }
    );

    if (updateResult.modifiedCount > 0) {
      return res.status(200).json({ success: true, message: "Movie added to favorites successfully" });
    } else {
      return res.status(409).json({ success: false, message: "Movie already in favorites" });
    }
  } catch (error) {
    console.error("Error adding movie to favorites:", error);
    return res.status(500).json({ message: "Error adding movie to favorites", error: error.message });
  }
};
export default addFavorites;