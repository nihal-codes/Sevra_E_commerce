const jwt = require("jsonwebtoken")

const generateToken = (_id) => {
  const token = jwt.sign(
    {
      id: _id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m"
    }
  )
  return token
}

module.exports = generateToken;

