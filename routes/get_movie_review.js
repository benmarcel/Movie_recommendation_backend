import express from 'express';
const router = express.Router();
import getMovieReview from '../controllers/get_movie_review.js';
// middleware to check if user is authenticated
import isAuthenticated from '../middleware/isAuthenticated.js';
// Route to get a movie review
router.get('/movie/:id/review', isAuthenticated, getMovieReview);
// This route allows authenticated users to retrieve a movie review
// It expects a GET request with the movie's TMDB ID as a query parameter.  

// export the router to be used in the main app
export default router;
// This code defines a route for getting a movie review in an Express.js application.
// It imports necessary modules, sets up the route, and applies authentication middleware.
// The route expects a GET request with the movie's TMDB ID as a query parameter.
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.
// The getMovieReview controller handles the logic for retrieving the review from the database or an external API.