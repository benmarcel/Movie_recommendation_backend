import express from 'express';
const router = express.Router();
import  rateMovie from '../controllers/rate_movie.js';
// middleware to check if user is authenticated
import isAuthenticated from '../middleware/isAuthenticated.js';

// Route to post a review for a movie
router.post('/movie/:id/rate', isAuthenticated, rateMovie);

// This route allows authenticated users to post a review for a movie
// The `isAuthenticated` middleware checks if the user is logged in before allowing access to the route.
export default router;
// This code defines a route for rating a movies in an Express.js application.
// It imports necessary modules, sets up the route, and applies authentication middleware.