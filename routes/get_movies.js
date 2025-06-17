import express from 'express';
const router = express.Router();
import getMovies from '../controllers/get_movies.js';

import isAuthenticated from '../middleware/isAuthenticated.js'; // Import your authentication middleware
// Define the route for getting movies

router.get('/movies', isAuthenticated, getMovies); // Ensure the user is authenticated before accessing this route
router.get('/movies/search', isAuthenticated, getMovies);

export default router; // Export the router to be used in your main app file