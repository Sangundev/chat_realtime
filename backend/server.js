import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routers/auth.routes.js";
import messageRoutes from "./routers/message.routers.js";
import userRoutes from "./routers/user.routers.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();

app.use(express.json()); // from req.body
app.use(cookieParser());

const PORT =process.env.PORT || 5000;
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

// app.get("/",(req, res) => {
//     //root router http://localhost:5000/
//     res.send("Hello World!!");
// });



app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
