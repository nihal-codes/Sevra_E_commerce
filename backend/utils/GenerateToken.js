const jwt = require("jsonwebtoken")

const generateToken = (_id, role) => {
  const token = jwt.sign(
    {
      id: _id,
      role: role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m"
    }
  )
  return token
}

const generateRefreshToken = (_id) => {
  return jwt.sign(
    {
      id: _id
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d"
    }
  )
}

module.exports = {
  generateToken, generateRefreshToken
};

