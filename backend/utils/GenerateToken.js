const jwt = require("jsonwebtoken")

const generateToken = (_id, role) => {
  const token = jwt.sign(
    {
      id: _id,
      role: role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m"
    }
  )
  return token
}

module.exports = generateToken;

