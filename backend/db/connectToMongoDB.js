import mongoose from "mongoose";
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("thanh cong roi");
    } catch (error) {
        console.log("loi ket noi",error.message);
    }
};

export default connectToMongoDB;