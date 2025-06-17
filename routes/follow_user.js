import express from 'express';
const router = express.Router();

// Import the followUser controller function
import followUser from '../controllers/follow_user.js';
// followUser controller function  handles the logic for following a user

// Middleware to check if user is authenticated
import isAuthenticated from '../middleware/isAuthenticated.js';
// This middleware checks if the user is logged in before allowing access to the route
// isAuthenticated middleware protects the route

// Route to follow a user
router.post('/user/follow/:id', isAuthenticated, followUser);
// This route allows authenticated users to follow another user

// Export the router to be used in the main app
export default router;
// This code defines a route for following a user in an Express application.
// It imports necessary modules, sets up the route, and applies authentication middleware.