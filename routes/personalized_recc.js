import express from "express";
import personalizedRecc from "../controllers/personalized_recc.js";
import isAuthenticated from "../middleware/isAuthenticated.js"; // Import your authentication middleware
const router = express.Router();
// Define the route for personalized movie recommendations
router.get("/recommendations", isAuthenticated, personalizedRecc); // Ensure the user is authenticated before accessing this route
export default router; // Export the router to be used in your main app file
// This code defines a route for personalized movie recommendations in an Express application.