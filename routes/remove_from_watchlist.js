import express from 'express';
const router = express.Router();
import removeFromWatchlist from '../controllers/remove_from_watchlist.js';
// middleware to check if user is authenticated
import isAuthenticated from '../middleware/isAuthenticated.js';
// Route to remove a movie from the user's watchlist
router.delete('/removefromwatchlist/:tmdbId', isAuthenticated, removeFromWatchlist);
// This route allows authenticated users to remove a movie from their watchlist
// It expects a DELETE request with the movie's TMDB ID in the URL parameters.
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;
// This code defines a route for removing a movie from a user's watchlist in an Express.js application.
// It imports necessary modules, sets up the route, and applies authentication middleware.