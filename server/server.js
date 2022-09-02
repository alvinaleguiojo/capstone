const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();
const Users = require("./model/user");
const Todos = require("./model/todo");
const { response } = require("express");

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.once("open", async () => {
  console.log("DB is connected");
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ name: "Welcome", message: "hello world!" });
});

app.get("/users", paginatedResults(Users), (req, res) => {
  res.json(res.paginatedResults);
});

app.post("/user", async (req, res) => {

  try {
    await Users.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
    console.log("user added successfully");
    res.status(200).json({ message: "user added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data entry" });
  }
});

app.get("/todos", paginatedResults(Todos), (req, res) => {
  res.json(res.paginatedResults);
});

app.get("/todos/:id", getById(Todos), (req, res) => {
  res.json(res);
});

app.patch("/update/:id", async (req, res) => {
  try {
    await Todos.findById(req.body.id)
      .then((updatedTodo) => {
        updatedTodo.title = req.body.title;
        updatedTodo.save();
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

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Todos.findByIdAndRemove(id).exec();
  res.send("successfully deleted");
  console.log("successfully deleted");
});

app.get("/users/:id", getById(Users), (req, res) => {
  res.json(res);
});

app.post("/todos", paginatedResults(Todos), async (req, res) => {
  try {
    await Todos.create({ title: req.body.title, selected: req.body.selected });
    console.log("todo added successfully");
    res.status(200).json({ message: "todo added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data entry" });
  }
});

// Middleware for retrieving data from collection by ID by passing model as argument
function getById(model) {
  return async (req, res) => {
    try {
      await model.find({ _id: req.params.id }).then((data) => {
        res.json(data);
      });
    } catch (err) {
      res.status(403).json({ message: "Please use valid id" });
    }
  };
}

// this function is to paginate data from collection by just passing an arguments as model
function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.json(500).json({ message: e.message });
    }
  };
}

// this is function is for sending realtime data to client without refreshing the browser
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// entry point of the app
server.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server is running");
});
