import User from '../models/user_schema.js';

const unfollowUser = async (req, res) => {
    const userId = req.user.id; // User performing the action
    const { id } = req.params; // User being unfollowed

    // Prevent self-unfollow
    if (userId === id) {
        return res.status(400).json({ message: "You cannot unfollow yourself." });
    }

    try {
        // Check if the target user exists
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found" });
        }

        // Check if the user is not following the target user
        // We check targetUser.followers because that's where `userId` would be if they are following
        if (!targetUser.followers.includes(userId)) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        // Remove the target user from the follower's (userId's) following list
        await User.findByIdAndUpdate(userId, { $pull: { following: id } });

        // Remove the user (userId) from the target user's (targetUserId's) followers list
        await User.findByIdAndUpdate(id, { $pull: { followers: userId } });

        res.status(200).json({ message: "Successfully unfollowed the user" });
    } catch (error) {
        console.error("Error in unfollowUser:", error);
        return res.status(500).json({ message: "Error unfollowing user", error: error.message });
    }
}

export default unfollowUser;
// This function handles unfollowing a user by removing the target user from the follower's following list