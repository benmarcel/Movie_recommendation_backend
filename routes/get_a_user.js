import express from "express";
const router = express.Router();

import getAUser from "../controllers/get_a_user.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
// Route to get a specific user by ID
router.get("/user/:id", isAuthenticated, getAUser);
// This route allows authenticated users to retrieve a specific user's details by their ID
// The `isAuthenticated` middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;
// This code defines a route for getting a specific user in an Express application.