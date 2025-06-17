import Movie from "../models/movie_schema.js";
import review from "../models/review_schema.js";

const rateMovie = async (req, res) => {
  const userId = req.user.id;
  const { rating } = req.body;
  const movieId = req.params.id; // Assuming the movie ID is passed as a URL parameter

  // Validate input
  if (!movieId || !rating) {
    return res
      .status(400)
      .json({ message: "Movie ID and rating are required" });
  }

  try {
    // Check if the movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Add or update review
    const updatedReview = await review.findOneAndUpdate(
      { userId, movieId: movie._id },
      {
        rating,
        createdAt: new Date(),
      },
      { upsert: true, new: true }
    );
    res.status(201).json({
      message: "Movie rated successfully",
      updatedReview,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error saving movie", error: error.message });
  }
};

export default rateMovie ;
