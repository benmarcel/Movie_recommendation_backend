import express from 'express';
const router = express.Router();

import getSharedList from '../controllers/get_sharedList.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
// Define the GET route for retrieving a shared list
router.get('/watchlist/shared', isAuthenticated, getSharedList);
// This route allows authenticated users to retrieve a shared list
// The `isAuthenticated` middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;
// This code defines a route for getting a shared list in an Express.js application.