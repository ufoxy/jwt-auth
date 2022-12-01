require("dotenv").config()
const express = require("express");
const authRoute = require("./src/routes/auth.route")
const appRoute = require("./src/routes/app.route")
const port = process.env.PORT || 3000
require("./src/services/password.service")

const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/books", appRoute)

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to API!" });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Express running on http://localhost:${port}`);
});


















// require("dotenv").config();
// const mongoose = require("mongoose");
// const express = require("express");
// const User = require("./models/User");

// const app = express();
// app.use(express.json());

// // Open Route
// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "Bem vindo a API!" });
// });

// app.post("/auth/login", async (req, res) => {
//   const { user, password } = req.body;

//   if (!user) {
//     return res.status(404).json({ msg: "User not found" });
//   }

//   if (!password) {
//     return res.status(404).json({ msg: "Password is required." });
//   }

//   const userExist = await User.findOne({ user: user });

//   if (!userExist) {
//     return res.status(404).json({ message: "Non-existent user." });
//   }

//   const dbUser = await User.findOne({ user: user });

//   const checkPassword = password === dbUser.password

//   if (!checkPassword) {
//     return res.status(422).json({ msg: "Invalid password." })
//   }

//   try {
//     res.status(200).json({ msg: "Successful authentication." })
//   } catch (err) {
//     res.status(500).json({ msg: err })
//   }
// });

// app.post("/auth/register", async (req, res) => {
//   const { user, password } = req.body;

//   if (!user) {
//     return res.status(422).json({ message: "User is required." });
//   }

//   if (!password) {
//     return res.status(422).json({ message: "Password is requires." });
//   }

//   const userExist = await User.findOne({ user: user });

//   if (userExist) {
//     return res.status(422).json({ message: "The user already exists." });
//   }

//   const newUser = new User({
//     user,
//     password,
//   });

//   try {
//     await newUser.save();
//     res.status(201).json({ msg: "User created successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: error });
//   }
// });

// const DB_USER = process.env.DB_USER;
// const DB_PASS = process.env.DB_PASS;
// const DB_NAME = process.env.DB_NAME;
// const port = 8080;

// mongoose
//   .connect(
//     `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.m2ibrma.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     console.log("Conectou ao Banco!");
//     app.listen(port);
//   })
//   .catch((err) => {
//     console.log("Erro", err);
//   });
