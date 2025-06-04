import express from "express";
const router = express.Router();

import addFavorites from "../controllers/movie_handler/add_favorites.js";

// middleware to check if user is authenticated
import isAuthenticated from "../auth/isAuthenticated.js"

router.post("/addfavorites", isAuthenticated, addFavorites);
// Route to add a movie to the user's favorites
// This route allows authenticated users to add a movie to their favorites list
// It expects a POST request with the movie's TMDB ID in the request body.
// The isAuthenticated middleware checks if the user is logged in before allowing access to this route.


// Export the router to be used in the main app
export default router;