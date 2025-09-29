import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import gentoken from "../config/token.js";

//sign up
export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "user is already exist try log in " });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter strong password" });
    }
    // encription
    let hashPassword = await bcrypt.hash(password, 10);
    //creating user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    //generate token
    let token = await gentoken(user._id);
    req.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `SignUp error ${error}` });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!😔" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect Password😑" })
      
    }
    // again token generation
     let token = await gentoken(user._id);
    req.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login error ${error}` });
  }
};
