import Movie from "../../models/movie_schema.js";
import watchlist from "../../models/watchlist_schema.js";

const addToWatchlist = async (req, res) => {
  const { tmbId, watchlistId } = req.body;
  try {
    // Check if the movie exists
    const movie = await Movie.findById(tmbId);
    if (!movie) {
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
    // Check if the watchlist exists
    const watchlistItem = await watchlist.findById(watchlistId);
    if (!watchlistItem) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    // Add the movie to the watchlist
    const updateResult = await watchlist.updateOne(
      { _id: watchlistId },
      { $addToSet: { movies: movie._id } } // Add movieId to the 'movies' array only if not present
    );

    // Check if the movie is already in the watchlist
    if (updateResult.nModified === 0) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }
    res.status(200).json({
      message: "Movie added to watchlist successfully",
      watchlist: watchlistItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding movie to watchlist",
      error: error.message,
    });
  }
};

export default addToWatchlist;
// Export the addToWatchlist function to be used in routes
// This function handles adding a movie to a user's watchlist.
// It checks if the movie exists, fetches it if not, and then adds it to the specified watchlist.
// It returns appropriate success or error messages based on the operation's outcome.