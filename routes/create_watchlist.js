import express from 'express';
const router = express.Router();
import createWatchlist from '../controllers/create_watchlist.js';
// middleware to check if user is authenticated
import isAuthenticated from '../middleware/isAuthenticated.js';
// Route to create a new watchlist
router.post('/watchlist/create', isAuthenticated, createWatchlist);
// This route allows authenticated users to create a new watchlist
// It expects a POST request with the watchlist name in the request body.   
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;  
