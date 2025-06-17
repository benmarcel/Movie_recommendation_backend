import express from 'express';
const router = express.Router();

import loginController from '../controllers/login.js'; // Import the login controller
// Ensure the path is correct based on your project structure
// Define the login route
// This route handles user login requests
// It expects a POST request with user credentials in the request body
// The controller will handle the logic for authenticating the user
router.post('/login', loginController);
// Export the router to be used in the main application file
export default router;
// This allows the login route to be mounted in the main app
// and handle requests to the /login endpoint
// The loginController will process the login request and return the appropriate response