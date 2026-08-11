const User = require("../models/Users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({role: "user"});

    res.status(200).json({
      message: users.length ? "Users Fetched" : "No user found",
      users: users
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const deleteUser = async(req, res) => {

}

module.exports = {
  getUsers, deleteUser
}
