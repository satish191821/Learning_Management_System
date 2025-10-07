import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import gentoken from "../config/token.js";
import sendMail from "../config/sendMail.js"

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
    res.cookie("token", token, {
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
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login error ${error}` });
  }
}
//logout
export const logOut = async (req,res)=>{
  try {
    await res.clearCookie("token")
       return res.status(201).json({message:"Logout Successfully✅"})

  } catch (error) {
    return res.status(500).json({ message: `Logout error ${error}` });
  }
}
// 1.otp sending controller
export const sentOTP = async(req,res)=>{
try {
  const {email}=req.body
  const user= await User.findOne({email})
  if(!user){
     return res.status(404).json({ message: "User not found!😔" });
  }
  // otp generate and sending in email
  const otp=Math.floor(1000+Math.random()*9000).toString()
  user.resetOtp=otp,
  user.otpExpires=Date.now()+5*60*1000,
  user.isOtpVerified=false
  await user.save()
  await sendMail(email,otp)
 
  return res.status(200).json({message:"OTP Send Successfully!✅"})

} catch (error) {
   return res.status(500).json({ message: `send OTP error ${error}` })
}
}
// 2.otp verification controller 
export const verifyOTP= async(req,res)=>{
  try {
    const {email,otp}=req.body
    let user = await User.findOne({ email });
    if (!user || user.resetOtp!= otp || user.otpExpires< Date.now()) {
      return res.status(404).json({ message: "Invalid OTP😔" });
    }
    user.isOtpVerified=true,
    user.resetOtp=undefined,
    user.otpExpires=undefined

    await user.save()
    return res.status(200).json({message:"OTP verified Successfully✅"})

  } catch (error) {
    
    return res.status(500).json({message:`verify otp error${error}`})
  }
}
// 3.reset password controller
export const resetPassword = async (req,res)=>{
  try {
    const {email,password}=req.body
    let user = await User.findOne({ email });
    if (!user ||!user.isOtpVerified) {
      return res.status(404).json({ message: "OTP verification is required" });
    }
    // encripting password using bcript and hashing
    const hashPassword = await bcrypt.hash(password,10)
    user.password= hashPassword,
    user.isOtpVerified= false

    await user.save()
    return res.status(200).json({message:"Reset Password Successfully"})
  } catch (error) {
    return res.status(500).json({message:`reset password error ${error}`})
  }
}