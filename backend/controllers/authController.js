const bcrypt = require("bcrypt");
const crypto = require("crypto");
const generateToken = require("../utils/GenerateToken")
const SendMail = require("../utils/SendEmail");


const User = require("../models/Users");
const KEY = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({
      email: email
    })
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const vToken = crypto.randomBytes(32).toString("hex"); // generates a random 32 bit token.
    const newUser = new User({
      fullName: fullName, email: email,
      password: hashedPassword,
      role: "user",
      verificationToken: vToken,
      verificationExpires: Date.now() + 1000*60*30 // expires in 30 minutes, 1000 used for milliseconds 
    })
    await newUser.save();
    res.status(201).json({
      message: "Created successfully"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try { 
    const existingUser = await User.findOne({
      email: email
    })
    if (!existingUser) {
      return res.status(404).json({
        message: "Cant login in! No user with the given email found"
      })
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }
    return res.status(200).json({
      token: generateToken(existingUser._id),
      role: existingUser.role,
      message: "Login Successful"
    })
  }
  catch (err) {
    res.status(500).json({
      messaage: err.message
    })
  }
}

module.exports = {
  register, login
}
