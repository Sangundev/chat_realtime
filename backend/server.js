import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routers/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();

app.use(express.json()); // from req.body

const PORT =process.env.PORT || 5000;
app.use("/api/auth",authRoutes)

// app.get("/",(req, res) => {
//     //root router http://localhost:5000/
//     res.send("Hello World!!");
// });



app.listen(PORT,() => {
    connectToMongoDB()
    console.log('sever Runing on port $ {PORT}');
});