import Review from '../models/review_schema.js';

const getMovieReview = async (req, res) => {
    const { movieId } = req.params;

    // Validate input
    if (!movieId) {
        return res.status(400).json({ message: "Movie ID is required" });
    }

    try {
        // Find the review for the movie
        const reviewData = await Review.findOne({ movieId });

        if (!reviewData) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Return the review data
        res.status(200).json({
            message: "Review retrieved successfully",
            review: reviewData,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving review",
            error: error.message,
        });
    }
}
export default getMovieReview;
// Export the function to be used in routes
// export default getMovieReview;