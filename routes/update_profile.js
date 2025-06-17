import express from 'express';
const router = express.Router();

import updateProfile from '../controllers/update_profile.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

// Define the PUT route for updating user profile
router.put('/user/profile/update', isAuthenticated, updateProfile);

export default router;