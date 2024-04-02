import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const LoggedInUserId = req._id;

        const filteredUsers = await User.find({_id: { $ne: LoggedInUserId }}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar ", error.message);
        res.status(500).json({ error: "server error" });
    }
}
