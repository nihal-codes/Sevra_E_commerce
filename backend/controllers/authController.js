const bcrypt = require("../utils/bcrypt");
const crypto = require("crypto");
const generateToken = require("../utils/GenerateToken")
const SendMail = require("../utils/SendEmail");
const User = require("../models/Users");

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
      verified: false,
      verificationToken: vToken,
      verificationExpires: new Date(Date.now() + 1000*60*30) // expires in 30 minutes, 1000 used for milliseconds 
    })
    await newUser.save();

    const verificationLink = `http://localhost:5173/verify-email/${vToken}`

    await SendMail(
      email,
      "Verify your email",
      `
        <h2>Welcome to our store!</h2>

        <p>Hello ${fullName},</p>

        <p>
          Thank you for creating an account.
          Please click the button below to verify your email address.
        </p>

        <a
          href="${verificationLink}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#000;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Verify Email
        </a>

        <p>
          This link will expire in 30 minutes.
        </p>
      `
    )

    res.status(201).json({
      message: "Account Created. Verify your email"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const verifyEmail = async(req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({verificationToken: token})
    
    if (!user) {
      return res.status(400).json({message: "Invalid verification link"})
    }
    if (user.verificationExpires < new Date()) {
      return res.status(400).json({message: "Verification link has expired"})
    }
    user.verified = true;
    user.verificationExpires = null;
    user.verificationToken = null;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully"
    });
  } catch (err) {
    res.status(500).json({message: err.message})
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
    if (!existingUser.verified) {
      return res.status(403).json({message: "Please verify your email before logging in"})
    }
    const token = generateToken(
      existingUser._id,
      existingUser.role
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15*60*1000
    })
    return res.status(200).json({
      message: "Login Successful",
      role: existingUser.role
    })
  }
  catch (err) {
    res.status(500).json({
      messaage: err.message
    })
  }
}

const getCurrentUser = async(req, res) => {
  return res.status(200).json({
    role: req.user.role,
  });
};

module.exports = {
  register, login, verifyEmail, getCurrentUser
}
