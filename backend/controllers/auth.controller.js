import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const singup = async (req,res) => {
   try {
    const {fullname,username,password,comfirmPassword,gender} = req.body;

    if(password !== comfirmPassword){
    return res.status(400).json({error:"khong khop mk "});
    }

    const user = await User.findOne({username});

    if(user){
        return res.status(400).json({error: ______});
    }


    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpashh = await bcrypt.hash(password,salt);
    // https://avatar.iran.liara.run/public

    const boypic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlpic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
        fullname,
        username,
        password: hashpashh,
        gender,
        profilePic: gender === "male" ? boypic : girlpic
    })

    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
    });

   } catch (error) {
        console.log("lois khi tao tai khoan ", error.message);
        res.status(500).json({error: "server Erroooo"});
   }
};

export const login = (req,res) => {
    console.log("loginUser");
};

export const logout = (req,res) => {
    console.log("loginUser");
};