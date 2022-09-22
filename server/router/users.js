const express = require("express");
const router = express.Router();
const Users = require("../model/user");
const paginatedResults = require("../middleware/paginatedResults");
const getById = require("../middleware/getById");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

// import for AsyncAwait Functions
const { createTokens, validateToken } = require("../middleware/JWT");
const GetAllUsersPromise = require("../AsyncAwait/Users/Users");
const GetUsersPromiseByID = require("../AsyncAwait/Users/UserById");
const DeleteUsersPromiseByID = require("../AsyncAwait/Users/DeleteUserById");
const CreateUserPromise = require("../AsyncAwait/Users/CreateUser");
const UpdateUserPromiseByID = require("../AsyncAwait/Users/UpdateUserById");
const UserCredentialPromise = require("../AsyncAwait/Users/UserLogin");

router.use(cookieParser());
require("dotenv").config();

// Get All Users
router.get("/users", async (req, res) => {
  try {
    const resultElements = await GetAllUsersPromise();
    res.status(200).json({ Users: resultElements }); //
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get User by ID
router.get("/user/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const resultElements = await GetUsersPromiseByID(ID);
    res.status(200).json({ result: resultElements });
  } catch (error) {
    res.status(400).json({ message: "Invalid Id" });
  }
});

// Remove user from the list
router.delete("/user/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const user = await GetAllUsersPromise();
    const id = await user.filter((id) => id.StaffID == ID);
    await DeleteUsersPromiseByID({ id: id[0].StaffID });
    res
      .status(200)
      .json({ message: `User ID: ${req.params.id} has been deleted` });
  } catch (error) {
    res.status(400).json({ message: "Invalid Id or Id is not exist" });
  }
});

// Update User By ID
router.patch("/user/update/:id", async (req, res) => {
  const { Role, Verified } = req.body;
  const ID = req.params.id;
  try {
    await UpdateUserPromiseByID(ID, Role, Verified);
    res.status(200).json({ message: "Data has been updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "field is required" });
  }
});

// create new User
router.post("/register", async (req, res) => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const { LastName, FirstName, Email, Password } = req.body;
  const EmailExist = await UserCredentialPromise(Email);

  EmailExist.length > 0 &&
    EmailExist[0].Email === Email &&
    res.status(400).json({ message: "Email is already exist" });

  EmailExist.length <= 0 &&
    bcrypt.hash(Password, 10).then(async (hash) => {
      try {
        const newUser = await CreateUserPromise({
          LastName,
          FirstName,
          Email,
          Password: hash,
          Role: "BHW",
          Verified: false,
          CreatedDate: date,
        });
        const accessToken = createTokens(newUser);
        res.cookie("access_token", accessToken, {
          withCredentials: true,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 30 * 1000,
          secure: true,
          sameSite: "none",
        });
        res.status(200).json({ message: "User added successfully" });
      } catch (err) {
        res.status(400).json({ message: "Invalid data entry" });
      }
    });
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await UserCredentialPromise(Email);
    const dbPassword = await user[0].Password;
    const match = await bcrypt.compare(Password, dbPassword);

    !user ||
      (!match &&
        res.status(400).json({ message: "Email or Password is incorrect" }));

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
  } catch (error) {
    res.status(400).json({ message: "Email or Password is incorrect" });
  }
});

router.get("/logout", validateToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

module.exports = router;
