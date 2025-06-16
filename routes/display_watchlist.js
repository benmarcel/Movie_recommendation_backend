import express from "express";
const router = express.Router();
import displayWatchlist from "../controllers/movie_handler/display_watchlist.js";

import isAuthenticated from "../auth/isAuthenticated.js";

router.get("/watchlists", isAuthenticated, displayWatchlist);

export default router;