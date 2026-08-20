const express = require("express");
const authorizeRole = require("../middleware/authorizeRole")
const verifytoken = require("../middleware/VerifyToken")
const router = express.Router();

const { 
  getUsers, deleteUser, fetchLocation
} = require("../controllers/userController")

router.use(verifytoken);

router.get("/", authorizeRole("admin"), getUsers);
router.get("/me", fetchLocation);
router.delete("/:id",authorizeRole("admin"), deleteUser);

module.exports = router