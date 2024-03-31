import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // Chỉnh sửa thành mongoose.Schema.Types.ObjectId
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, // Thêm kiểu dữ liệu và thuộc tính ref nếu cần thiết
        ref: "User",
        required: true,
    },
    message: {
        type: String, // Thêm kiểu dữ liệu cho message, trong trường hợp này là String
        required: true,
    },
    // them 
    
}, { timestamps: true }); // Dùng dấu ngoặc đúng cách cho schema

const Message = mongoose.model("Message", messageSchema);

export default Message;
