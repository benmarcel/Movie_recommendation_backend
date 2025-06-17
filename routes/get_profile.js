import express from 'express';

const router = express.Router();
import getProfile from '../controllers/get_profile.js';

// Import the authentication middleware to protect the profile routes
import isAuthenticated from '../middleware/isAuthenticated.js';
// This middleware checks if the user is authenticated before allowing access to the profile routes
// The isAuthenticated middleware will verify the user's session and JWT token
// If the user is authenticated, it will allow access to the profile routes
// If not, it will respond with a 401 Unauthorized status
// This ensures that only authenticated users can access their profile information
// This is important for protecting user data and ensuring that only logged-in users can view or modify their profiles

// Define the GET route for fetching user profile
router.get('/user/profile',isAuthenticated, getProfile);
// This route allows authenticated users to retrieve their profile information
export default router;
