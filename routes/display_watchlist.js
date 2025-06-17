import express from "express";
const router = express.Router();
import displayWatchlist from "../controllers/display_watchlist.js";

import isAuthenticated from "../middleware/isAuthenticated.js";

router.get("/watchlists", isAuthenticated, displayWatchlist);

export default router;