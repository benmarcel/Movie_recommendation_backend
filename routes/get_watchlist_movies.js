import express from 'express';
const router = express.Router();

import getWatchlistMovies from '../controllers/get_watchlist_movie.js';
// middleware to check if user is authenticated
import isAuthenticated from '../middleware/isAuthenticated.js';
// Route to get a user's watchlist
router.get('/watchlistMovies/:name', isAuthenticated, getWatchlistMovies);     
// This route allows authenticated users to retrieve their watchlist
// It expects a GET request with the watchlist name as a query parameter.
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;