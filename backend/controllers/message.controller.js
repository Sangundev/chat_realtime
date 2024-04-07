import mongoose from "mongoose";
import ConversationModel from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Tìm cuộc trò chuyện giữa sender và receiver
        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Nếu cuộc trò chuyện không tồn tại, tạo mới
        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, receiverId],
                messages: [], // Khởi tạo mảng messages
            });
        }

        // Tạo tin nhắn mới
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        // Thêm tin nhắn vào cuộc trò chuyện
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }


        // await conversation.save(); // Lưu lại cuộc trò chuyện
        // await newMessage.save();
        await Promise.all([conversation.save(),newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        // Trả về tin nhắn mới đã tạo
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Không thể gửi tin nhắn trong controller này:", error.message);
        res.status(500).json({ error: "Lỗi server" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatID } = req.params;
        const senderId = req.user._id;

        // Tìm cuộc trò chuyện giữa sender và userToChatID
        const conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, userToChatID] },
        }).populate("messages");



        // Nếu không tìm thấy cuộc trò chuyện, trả về một mảng rỗng
        if (!conversation) {
            return res.status(200).json([]);
        }
        
        const messages = conversation.messages;
        // Trả về dữ liệu tin nhắn trong cuộc trò chuyện
        res.status(200).json(messages);
    } catch (error) {
        console.log("Không thể lấy tin nhắn trong controller này:", error.message);
        res.status(500).json({ error: "Lỗi server" });
    }
};