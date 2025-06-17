import express from "express";
const router = express.Router();
import removeFromFavorites from "../controllers/remove_from_favorites.js";
// middleware to check if user is authenticated
import isAuthenticated from "../middleware/isAuthenticated.js";
// Route to remove a movie from the user's favorites
router.delete("/favorites/delete/:tmdbId", isAuthenticated, removeFromFavorites);

export default router;
// This route allows authenticated users to remove a movie from their favorites list
// It expects a DELETE request with the movie's TMDB ID in the URL parameters.