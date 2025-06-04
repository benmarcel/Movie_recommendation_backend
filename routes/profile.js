import express from 'express';

const router = express.Router();
import profileController from '../controllers/user_access/profile.js'; // Import the profile controller
// Ensure the path is correct based on your project structure
// Define the profile route
// This route handles user profile requests
// It expects a GET request to fetch the user's profile data
const { getProfile, updateProfile, deleteProfile } = profileController;

// Import the authentication middleware to protect the profile routes
import isAuthenticated from '../auth/isAuthenticated.js';
// This middleware checks if the user is authenticated before allowing access to the profile routes
// The isAuthenticated middleware will verify the user's session and JWT token
// If the user is authenticated, it will allow access to the profile routes
// If not, it will respond with a 401 Unauthorized status
// This ensures that only authenticated users can access their profile information
// This is important for protecting user data and ensuring that only logged-in users can view or modify their profiles

// Define the GET route for fetching user profile
const getUserProfile = router.get('/user/profile',isAuthenticated, getProfile);
// Define the PUT route for updating user profile
const updateUserProfile = router.put('/user/profile/update', isAuthenticated, updateProfile);
// Define the DELETE route for deleting user profile
const deleteUser = router.delete('/user/profile/delete', isAuthenticated, deleteProfile);
// Export the router to be used in the main application file
export default {
  getUserProfile,
  updateUserProfile,
  deleteUser
};
// This allows the profile route to be mounted in the main app
// and handle requests to the /user/profile endpoint
// The profileController will process the requests for getting, updating, and deleting the user profile
// and return the appropriate responses
// The getProfile method retrieves the user's profile data
// The updateProfile method updates the user's profile information
// The deleteProfile method deletes the user's profile and clears the session
// This structure allows for clear separation of concerns and easy maintenance of the codebase