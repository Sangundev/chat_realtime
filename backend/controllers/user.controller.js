import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// import User from "../models/user.model.js";
// import Message from "../models/message.model.js";

// export const getUsersForSidebar = async (req, res) => {
// 	try {
// 		const loggedInUserId = req.user._id;

// 		// Tìm tất cả các tin nhắn mà người dùng đã gửi hoặc nhận
// 		const userMessages = await Message.find({ $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }] });

// 		// Lấy danh sách id của tất cả các người dùng mà người dùng đã nhắn tin
// 		const userIDs = userMessages.map(message => {
// 			if (message.senderId.equals(loggedInUserId)) {
// 				return message.receiverId;
// 			} else {
// 				return message.senderId;
// 			}
// 		});

// 		// Loại bỏ các id trùng lặp và id của chính người dùng hiện tại
// 		const uniqueUserIDs = Array.from(new Set(userIDs.filter(id => !id.equals(loggedInUserId))));

// 		// Lấy thông tin của các người dùng đã nhắn tin
// 		const filteredUsers = await User.find({ _id: { $in: uniqueUserIDs } }).select("-password");

// 		res.status(200).json(filteredUsers);
// 	} catch (error) {
// 		console.error("Error in getUsersForSidebar: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };
