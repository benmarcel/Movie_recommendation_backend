import express from "express";
const router = express.Router();
import getMovieDetails from "../controllers/get_movie_details.js";
// middleware to check if user is authenticated
import isAuthenticated from "../middleware/isAuthenticated.js";
// Route to get the details of a movie
router.get("/movies/:tmdbId", isAuthenticated, getMovieDetails);
// This route allows authenticated users to get the details of a movie
// It expects a GET request with the movie's TMDB ID in the URL parameters.
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;
// This code defines a route for getting movie details in an Express.js application.