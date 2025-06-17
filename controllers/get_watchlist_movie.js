import Watchlist from "../models/watchlist_schema.js";
import Movie from "../models/movie_schema.js";


const getWatchlistMovies = async (req, res) => {
  const userId = req.user.id; // req.user.id is set by an authentication middleware
  const { name } = req.params; //  the watchlist name is passed as a URL parameter

  if (!name) {
    return res.status(400).json({ message: "Watchlist name is required" });
  }

  try {
    // Find the watchlist by user ID and name
    // Use populate directly on the query to fetch movie details upfront
    const watchlist = await Watchlist.findOne({ userId, name }).populate({
      path: "movies", // The field in the Watchlist schema that holds movie ObjectIds
      model: "Movie", // The name of the model to populate from (as registered with Mongoose)
    });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    // After population, watchlist.movies will contain the full movie documents
    const movies = watchlist.movies;

    if (!movies || movies.length === 0) {
      // It's possible the watchlist exists but has no movies
      return res.status(200).json({ 
        message: "No movies found in this watchlist",
        watchlist: { name: watchlist.name, movies: [] } // Send an empty array for clarity
      });
    }

    // If movies are found and populated, send the watchlist document
    // The `watchlist` object itself now contains the populated `movies` array
    res.status(200).json({
      message: `Watchlist '${name}' retrieved successfully`,
      watchlist: {
        _id: watchlist._id,
        name: watchlist.name,
        userId: watchlist.userId,
        movies: watchlist.movies, // This now contains the full movie objects
        createdAt: watchlist.createdAt,
        updatedAt: watchlist.updatedAt,
     
      },
    });
  } catch (error) {
    console.error("Error retrieving watchlist:", error); // Log the error for debugging
    return res.status(500).json({
      message: "Error retrieving watchlist",
      error: error.message,
    });
  }
};

export default getWatchlistMovies;