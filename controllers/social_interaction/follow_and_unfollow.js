import User from '../../models/user_schema.js';

const followUser = async (req, res) => {  
    const userId = req.user.id;
    const {targetUserId} = req.params;
    try {
        // Check if the target user exists
        const targetUser = await User.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found" });
        }

        // Check if the user is already following the target user
        if (targetUser.followers.includes(userId)) {
            return res.status(400).json({ message: "You are already following this user" });
        }

        // Add the target user to the user's following list
        await User.findByIdAndUpdate(userId, { $addToSet: { following: targetUserId } });

        // Add the user to the target user's followers list
        await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: userId } });

        res.status(200).json({ message: "Successfully followed the user" });
    } catch (error) {
        return res.status(500).json({ message: "Error following user", error: error.message });
    }
  }

  const unfollowUser = async (req, res) => {
    const userId = req.user.id;
    const {targetUserId} = req.params;
    try {
        // Check if the target user exists
        const targetUser = await User.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found" });
        }

        // Check if the user is not following the target user
        if (!targetUser.followers.includes(userId)) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        // Remove the target user from the user's following list
        await User.findByIdAndUpdate(userId, { $pull: { following: targetUserId } });

        // Remove the user from the target user's followers list
        await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } });

        res.status(200).json({ message: "Successfully unfollowed the user" });
    } catch (error) {
        return res.status(500).json({ message: "Error unfollowing user", error: error.message });
    }
  }
export { followUser, unfollowUser };
// Export the functions to be used in routes
// export default { followUser, unfollowUser };
