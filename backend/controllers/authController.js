const bcrypt = require("../utils/bcrypt");
const crypto = require("crypto");
const {
  generateToken, generateRefreshToken
} = require("../utils/GenerateToken")
const SendMail = require("../utils/SendEmail");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({
      email: email
    })
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const vToken = crypto.randomBytes(32).toString("hex"); // generates a random 32 bit token.
    const newUser = new User({
      fullName: fullName, email: email,
      password: hashedPassword,
      role: "user",
      verified: true,
      verificationToken: vToken,
      verificationExpires: new Date(Date.now() + 1000*60*30) // expires in 30 minutes, 1000 used for milliseconds 
    })
    await newUser.save();

    // const verificationLink = `${process.env.FRONTEND_API_URL}/verify-email/${vToken}`
    /*
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
    */
    res.status(201).json({
      message: "Account Created"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}
/*
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

const resendVerification = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email"
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email is already verified"
      });
    }

    const vToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = vToken;
    user.verificationExpires = new Date(
      Date.now() + 1000 * 60 * 30
    );

    await user.save();

    const verificationLink =
      `${process.env.FRONTEND_API_URL}/verify-email/${vToken}`;

    await SendMail(
      email,
      "Verify your email",
      `
        <h2>Verify your email</h2>

        <p>Hello ${user.fullName},</p>

        <p>
          Here is your new email verification link.
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
    );

    return res.status(200).json({
      message: "Verification email sent successfully"
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    const resetLink = `${process.env.FRONTEND_API_URL}/reset-password/${resetToken}`;
    await SendMail(
      email,
      "Reset your password",
      `<h2>Reset your password</h2>
       <p>Hello ${user.fullName},</p>
       <p>Click the button below to choose a new password.</p>
       <a href="${resetLink}" style="display:inline-block;padding:12px 20px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Reset Password</a>
       <p>This link will expire in 30 minutes.</p>`
    );

    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
*/
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired password reset link" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, password } = req.body;

  try {
    const isMatch = await bcrypt.compare(currentPassword, req.user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    req.user.password = await bcrypt.hash(password, 10);
    await req.user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try { 
    const existingUser = await User.findOne({
      email: email
    })
    if (!existingUser) {
      return res.status(404).json({
        message: "Invalid Credentials"
      })
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }
    /*
    if (!existingUser.verified) {
      return res.status(403).json({message: "Please verify your email before logging in"})
    }
    */
    const token = generateToken(
      existingUser._id,
      existingUser.role
    );

    const refreshToken = generateRefreshToken(
      existingUser._id
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15*60*1000
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7*24*60*60*1000
    });

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

const getCurrentUser = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(200).json({
            authenticated: false
        });
    }
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            authenticated: true,
            role: user.role
        });
    } catch (err) {
        return res.status(401).json({
            message: err.message
        });
    }
};

const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({
            message: "Refresh token required"
        });
    }
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        const newAccessToken = generateToken(
            user._id,
            user.role
        );
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });
        return res.status(200).json({
            message: "Access token refreshed"
        });
    } catch (err) {
        return res.status(401).json({
            message: err.message
        });
    }
};

const logout = async(req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none"
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none"
  });

  return res.status(200).json({
    message: "Logout successful"
  })
}

module.exports = {
  register, login, getCurrentUser, refreshToken, logout,
  resetPassword, changePassword
}
