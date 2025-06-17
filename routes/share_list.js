import express from 'express';
const router = express.Router();

import shareList from '../controllers/share_list.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
// Define the POST route for sharing a list
router.post('/watchlist/share', isAuthenticated, shareList);
// This route allows authenticated users to share a list
// The `isAuthenticated` middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;