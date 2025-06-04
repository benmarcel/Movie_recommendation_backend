import Sharedlist from "../../models/shared_list.js";


const getSharedList = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all shared lists where the user is either the fromUser or toUser
    const sharedLists = await Sharedlist.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate("fromUser", "username profilePicture")
      .populate("toUser", "username profilePicture")
      .populate("movies", "title posterPath overview releaseDate")
      .sort({ sharedAt: -1 }); // Sort by sharedAt date in descending order

    // Check if any shared lists were found
    // If no shared lists are found, return a 404 status
    if (!sharedLists || sharedLists.length === 0) {
      return res.status(404).json({ message: "No shared lists found" });
    }

    res.status(200).json(sharedLists);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching shared lists",
      error: error.message,
    });
  }
}
export default getSharedList;
// Export the function to be used in routes