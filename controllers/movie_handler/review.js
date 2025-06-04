import Movie from "../../models/movie_schema";
import review from "../../models/review_schema";
const reviewMovie = async (req, res) => {
  const userId = req.user.id;
  const { tmdbId, rating, comment } = req.body;

  try {
    // Check if the movie already exists for the user
    let movie = await Movie.findOne({ tmdbId });
    if (!movie) {
      // If the movie does not exist, fetch it from an external API
      const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=YOUR_API_KEY&append_to_response=videos`;
      const response = await fetch(url);
      const data = await response.json();
      const {
        id: tmdbId,
        title,
        release_date: releaseDate,
        poster_path: posterPath,
        overview,
        videos,
        genres,
        vote_average: voteAverage,
      } = data;

      const videoKey = videos?.results?.[0]?.key || null;

      // Create a new movie entry
      movie = new Movie({
        tmdbId,
        title,
        releaseDate,
        posterPath,
        overview,
        videoKey,
        genres: genres.map((genre) => genre.name),
        voteAverage,
      });

      // Save the movie to the database
      await movie.save();
    }
    // Add or update review
    const updatedReview = await review.findOneAndUpdate(
      { userId, movieId: movie._id },
      {
        rating: rating ? rating : 0,
        comment: comment ? comment : null,
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
export default reviewMovie;


