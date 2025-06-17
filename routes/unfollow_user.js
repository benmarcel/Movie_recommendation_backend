import express from 'express';
const router = express.Router();

import unfollowUser from '../controllers/unfollow_user.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
// Define the POST route for unfollowing a user
router.post('/user/unfollow/:id', isAuthenticated, unfollowUser);
// This route allows authenticated users to unfollow another user
// The `isAuthenticated` middleware checks if the user is logged in before allowing access to this route.
export default router;
// This code defines a route for unfollowing a user in an Express.js application.