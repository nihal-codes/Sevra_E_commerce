const express = require("express");
const authorizeRole = require("../middleware/authorizeRole")
const verifytoken = require("../middleware/VerifyToken")
const router = express.Router();

const { 
  getUsers, deleteUser, fetchLocation
} = require("../controllers/userController")

router.use(verifytoken, authorizeRole("admin"));

router.get("/", getUsers);
router.get("/:id", fetchLocation);
router.delete("/:id", deleteUser);

module.exports = router