const express = require("express");

const router = express.Router();

const { 
  getUsers, deleteUser, fetchLocation
} = require("../controllers/userController")

router.get("/", getUsers);
router.get("/:id", fetchLocation);
router.delete("/:id", deleteUser);

module.exports = router