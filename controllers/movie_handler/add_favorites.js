import user from "../../models/user_schema.js";
import Movie from "../../models/movie_schema.js";

const addFavorites = async (req, res) => {
  const { tmdbId } = req.body;
  const userId = req.user.id;

  try {
    // check if movie is saved locally
    const movie = await Movie.findById(tmdbId);
    if (!movie) {
      // fetch movie data from  tmdb
      const url = "";
      const response = await fetch(url);
      const data = await response.json();
      const {
        tmdbId,
        title,
        releaseDate,
        posterPath,
        overview,
        videoKey,
        genres,
        voteAverage,
      } = data;

      // Create a new movie entry
      const newMovie = new Movie({
        tmdbId,
        title,
        releaseDate,
        posterPath,
        overview,
        videoKey,
        genres,
        voteAverage,
      });

      // Save the movie to the database
      await newMovie.save();
    }
    // Add the movie to the user's favorites
    const updateResult = await user.updateOne(
      { _id: userId },
      { $addToSet: { favorites: movie._id } }
    );
    // Check if the movie is already in the user's favorites
    if (updateResult.nModified > 0) {
      return res
        .status(200)
        .json({ message: "Movie added to favorites successfully" });
    } else {
      // If nModified is 0, it means the movie was already in favorites
      return res.status(400).json({ message: "Movie already in favorites" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error adding movie to favorites",
      error: error.message,
    });
  }
};

export default addFavorites; 