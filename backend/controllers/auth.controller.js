import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const singup = async (req, res) => {
  try {
    const { fullname, username, password, comfirmPassword, gender } = req.body;

    if (password !== comfirmPassword) {
      return res.status(400).json({ error: "khong khop mk " });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: ______ });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpashh = await bcrypt.hash(password, salt);

    // https://avatar.iran.liara.run/public
    const boypic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlpic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashpashh,
      gender,
      profilePic: gender === "male" ? boypic : girlpic,
    });

    if (newUser) {
      //generate JWT
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "loi khi tao user trong data" });
    }
  } catch (error) {
    console.log("lois khi tao tai khoan ", error.message);
    res.status(500).json({ error: "server Erroooo" });
  }
};

export const login = async (req, res) => {
 try {
    const{username,password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error: "sai ten tai khaon hoac pass"});
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic: user.profilePic,
      });

 } catch (error) {
    console.log("dang nhap that bai ", error.message);
    res.status(500).json({ error: "server Erroooo" });
 }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"thoat thanh cong"});
  } catch (error) {
    console.log("choi tiep di thoat lam gi ", error.message);
    res.status(500).json({ error: "server Erroooo" });
  }
};
