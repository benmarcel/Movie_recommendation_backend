import Watchlist from '../models/watchlist_schema.js';
import User from '../models/user_schema.js';
const shareWatchlistWithUser = async (req, res) => {
    const userId = req.user.id;
    const { watchlistId, targetEmail} = req.body;
    if (!watchlistId || !targetEmail) {
        return res.status(400).json({ message: "Watchlist ID and target email are required" });
    }
    try {
        const watchlist = await Watchlist.findById(watchlistId);
        if (!watchlist) {
            return res.status(404).json({ message: "Watchlist not found" });
        }
        // Check if the user is the owner of the watchlist
        if (watchlist.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to share this watchlist" });
        }
        // Find the user by email
        const targetUser = await User.findOne({ email: targetEmail });
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found" });
        }
        // Share the watchlist
        watchlist.sharedWith.push(targetUser._id);
        await watchlist.save();
        return res.status(200).json({ message: "Watchlist shared successfully" });
    } catch (error) {
        console.error("Error sharing watchlist:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default shareWatchlistWithUser;
// This function handles sharing a watchlist with another user by their email address.


