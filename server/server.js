"use strict";

//import libraries
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//import MYSQL DB connection
const connection = require("./db/connection");

//import routes
const index = require("./router/index");
const appointments = require("./router/appointments");
const users = require("./router/users");
const search = require("./router/search");
const crud = require("./router/crud");
const patients = require("./router/patients");
const Services = require("./router/services");
const Medicines = require("./router/medicine");
const twilio = require("./router/twilio");

// import User Model
const Users = require("./model/user");
const UserCredentialPromise = require("./AsyncAwait/Users/UserLogin");

// TESTING MYSQL Connection
connection.connect((err) => {
  if (err) return console.log("Connection failed ", err);
  console.log("MYSQL DB is Connected");
});

// allow credentials to send in the front end
const corsConfig = {
  origin: true,
  credentials: true,
};

// use routes
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(index);
app.use(appointments);
app.use(users);
app.use(search);
app.use(crud);
app.use(patients);
app.use(Medicines);
app.use(twilio);
app.use(Services);

// this is function is for sending realtime data to client without refreshing the browser
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("users is connected", socket.id);

  socket.on("submit", (data) => {
    socket.broadcast.emit("received", data);
  });

  socket.on("email", async (data) => {
    try {
      const user = await UserCredentialPromise(data);
      users.length > 0 &&
        user[0].Email === data &&
        socket.emit("error", { message: "*Email already exist!", email: data });
    } catch (error) {
      socket.emit("error", { message: "" });
    }
  });

  socket.on("login", async (data) => {
    try {
      const user = await UserCredentialPromise(data.Email);
      const dbPassword = user[0].Password;
      const match = await bcrypt.compare(data.Password, dbPassword);
      !match &&
        socket.emit("error", {
          message: "Email or Password is incorrect",
          error: true,
        });
    } catch (error) {
      socket.emit("error", { message: "User not found", error: true });
    }
  });
});

// entry point of the app
server.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server is running");
});
