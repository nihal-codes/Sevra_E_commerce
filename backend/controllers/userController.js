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

const fetchLocation = async (req, res) => {
  const { id } = req.user;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        message: "User Locations not found"
      })
    }
    res.status(200).json({
      locations: existingUser.location,
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
  getUsers, deleteUser, fetchLocation
}
