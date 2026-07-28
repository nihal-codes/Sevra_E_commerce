const User = require("../models/Users")
const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required"
    })
  }

  const extractedToken = authHeader.split(" ")[1]
  
  try {
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: err.message
    })
  }
}


module.exports = verifyToken;