import express from 'express';
const router = express.Router();

// import isAuthenticated from '../auth/isAuthenticated.js'; // Import your authentication middleware
import checkSession from '../controllers/user_auth.js';

// Define the route for checking session status
router.get('/me', checkSession); // Ensure the user is authenticated before accessing this route
export default router; // Export the router to be used in your main app file