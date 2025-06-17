import express from 'express';
const router = express.Router();
import getWatchlistStatus from '../controllers/get_watchlist_status.js';
// middleware to check if user is authenticated
import isAuthenticated from '../middleware/isAuthenticated.js';
// Route to get the watchlist status of a movie
router.get('/watchlist/status/:tmdbId', isAuthenticated, getWatchlistStatus);
// This route allows authenticated users to check if a movie is in their watchlist
// It expects a GET request with the movie's TMDB ID in the URL parameters.
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;  