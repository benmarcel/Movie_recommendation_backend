import express from "express";
const router = express.Router();
import getFavoritesStatus from "../controllers/get_favorite_status.js";
// middleware to check if user is authenticated
import isAuthenticated from "../middleware/isAuthenticated.js";
// Route to get the favorite status of a movie
router.get("/favorites/status/:tmdbId", isAuthenticated, getFavoritesStatus);
// This route allows authenticated users to check if a movie is in their favorites list
// It expects a GET request with the movie's TMDB ID in the URL parameters.
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.
// Export the router to be used in the main app
export default router;