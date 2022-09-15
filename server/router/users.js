const express = require("express");
const router = express.Router();
const Users = require("../model/user");
const paginatedResults = require("../middleware/paginatedResults");
const getById = require("../middleware/getById");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../middleware/JWT");

router.use(cookieParser());
require("dotenv").config();

// get all users
router.get("/users", paginatedResults(Users), (req, res) => {
  res.json(res.paginatedResults);
});

// get user by id
router.get("/user/:id", getById(Users), (req, res) => {
  res.json(res);
});

// Remove user from the list
router.delete("/user/delete/:id",  async (req, res) => {
  const id = req.params.id;
  await Users.findByIdAndRemove(id).exec();
  res.send("User has been deleted");
  console.log("User has been deleted");
});

// update user's data
router.patch("/user/update/:id", async (req, res) => {
  try {
    await Users.findById(req.params.id || req.body.id)
      .then((userData) => {
        userData.verified = req.body.verified;
        userData.save();
        console.log("successfully updated");
        res.status(200).json({ message: "data has been updated successfully" });
      })
      .catch(() => {
        res.status(400).json({ message: "field is required" });
      });
  } catch (err) {
    console.log(err);
  }
});

// create new User
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    try {
      const user = await Users.create({
        firstname,
        lastname,
        email,
        password: hash,
        role: "BHW",
        created_date: new Date().toLocaleDateString(),
        verified: false
      });
      const accessToken = createTokens(user);
      res.cookie("access_token", accessToken, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({ message: "user added successfully" });
    } catch (err) {
      res.status(400).json({ message: "Invalid data entry" });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match)
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect" });
    if (match) {
      const accessToken = createTokens(user);
      res.cookie("access_token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
        withCredentials: true,
        secure: true,
        sameSite: "none",
      });
      res.json("Logged In");
    }
  });
});

router.get("/logout", validateToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

module.exports = router;
