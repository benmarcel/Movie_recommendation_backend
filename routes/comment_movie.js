import express from "express";
const router = express.Router();
import commentMovie from "../controllers/comment_movie.js";
// Middleware to check if user is authenticated
import isAuthenticated from "../middleware/isAuthenticated.js";

// Route to post a comment for a movie
router.post("/movie/:id/comment", isAuthenticated, commentMovie);

// This route allows authenticated users to post a comment for a movie
// The `isAuthenticated` middleware checks if the user is logged in before allowing access to this route.
export default router;
