import User from '../models/user_schema.js';

const followUser = async (req, res) => {
    const userId = req.user.id; // User performing the action
    const { id } = req.params; // User being followed

    // Prevent self-follow
    if (userId === id) {
        return res.status(400).json({ message: "You cannot follow yourself." });
    }

    try {
        // Check if the target user exists
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found" });
        }
        const isFollowing = targetUser.followers.includes(userId);
        // Check if the user is already following the target user
        // We check targetUser.followers because that's where `userId` would be if they are following
        if (isFollowing) {
            return res.status(400).json({ message: "You are already following this user", success: false });
        }

        // Add the target user to the follower's (userId's) following list
        await User.findByIdAndUpdate(userId, { $addToSet: { following: id } });

        // Add the user (userId) to the target user's (targetUserId's) followers list
        await User.findByIdAndUpdate(id, { $addToSet: { followers: userId } });

        res.status(200).json({ message: "Successfully followed the user", success: true });
    } catch (error) {
      
        console.error("Error in followUser:", error);
        return res.status(500).json({ message: "Error following user", error: error.message, success: false });
    }
}



export default followUser;