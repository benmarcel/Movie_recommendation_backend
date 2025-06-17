import express from 'express';
const router = express.Router();

import logoutController from '../controllers/logout.js'; // Import the logout controller
// Ensure the path is correct based on your project structure
// Define the logout route
// This route handles user logout requests
// It expects a delete request to log out the user
router.post('/logout', logoutController);

// Export the router to be used in the main application file
export default router;
// This allows the logout route to be mounted in the main app
// and handle requests to the /logout endpoint
// The logoutController will process the logout request and clear the session
// to log the user out, returning an appropriate response