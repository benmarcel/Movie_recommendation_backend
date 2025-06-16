import express from 'express';
const router = express.Router();

import deleteUser from '../controllers/user_access/delete_user.js';
import isAuthenticated from '../auth/isAuthenticated.js';

// Define the DELETE route for deleting a user account
router.delete('/user/delete', isAuthenticated, deleteUser);

// This route allows authenticated users to delete their account
// The `isAuthenticated` middleware checks if the user is logged in before allowing access to this route.
export default router;