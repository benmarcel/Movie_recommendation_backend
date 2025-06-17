import express from 'express';
const router = express.Router();
import signupController from '../controllers/signup.js'; // Import the signup controller
// Ensure the path is correct based on your project structure
// Define the signup route
// This route handles user signup requests
// It expects a POST request with user details in the request body
// The controller will handle the logic for creating a new user
// and returning the appropriate response

router.post('/signup', signupController);

export default router;
// Export the router to be used in the main application file
// This allows the signup route to be mounted in the main app
// and handle requests to the /signup endpoint