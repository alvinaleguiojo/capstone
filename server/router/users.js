const express = require("express");
const router = express.Router();
const Users = require("../model/user");
const paginatedResults = require("../middleware/paginatedResults");
const getById = require("../middleware/getById");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../middleware/JWT");
router.use(cookieParser());

// get all users
router.get("/users", paginatedResults(Users), (req, res) => {
  res.json(res.paginatedResults);
});

// get user by id
router.get("/users/:id", getById(Users), (req, res) => {
  res.json(res);
});

// Remove user from the list
router.delete("/user/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Users.findByIdAndRemove(id).exec();
  res.send("User has been deleted");
  console.log("User has been deleted");
});

// update user's data
router.patch("/update/:id", async (req, res) => {
  try {
    await Users.findById(req.body.id)
      .then((userData) => {
        userData.firstname = req.body.firstname;
        userData.save();
        res.send("successfully updated");
        console.log("successfully updated");
        res.status(200).json({ message: "data has been updated successfully" });
      })
      .catch((err) => {
        res.status(400).json({ message: "field is required" });
      });
  } catch (err) {
    console.log(err);
  }
});

// create new User
router.post("/user", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    try {
      await Users.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
        role: "BNS",
        created_date: new Date().toLocaleDateString(),
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
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true
      });
      res.json("Logged In");
    }
  });
});

module.exports = router;
