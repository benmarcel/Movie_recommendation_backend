import express from 'express';
const router = express.Router();
import addToWatchlist from '../controllers/add_to_watchlist.js';
// middleware to check if user is authenticated
import isAuthenticated from '../middleware/isAuthenticated.js';
// Route to add a movie to the user's watchlist
router.post('/watchlist/add', isAuthenticated, addToWatchlist);
// This route allows authenticated users to add a movie to their watchlist
// It expects a POST request with the movie's TMDB ID and watchlist ID in the request body.
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;
// This code defines a route for adding a movie to a user's watchlist in an Express.js application.
// It imports necessary modules, sets up the route, and applies authentication middleware.
// The route expects a POST request with the movie's TMDB ID and watchlist ID in the request body.