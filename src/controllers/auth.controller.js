const clientPromise = require("../services/db.service");
const User = require("../models/user.model")

async function login(req, res) {

  const { user, password } = req.body;
  const client = await clientPromise;
  const db = client.db("auth");
  const collection = db.collection("users");

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  };

  if (!password) {
    return res.status(404).json({ msg: "Password is required." });
  }

  const userExist = await collection.findOne({ user: user });

  if (!userExist) {
    return res.status(404).json({ message: "Non-existent user." });
  };

  const dbUser = await collection.findOne({ user: user });
  const checkPassword = password === dbUser.password;

  if (!checkPassword) {
    return res.status(422).json({ msg: "Invalid password." });
  };

  try {
    res.status(200).json({ msg: "Successful authentication." });
  } catch (err) {
    res.status(500).json({ msg: err });
  };

};

async function register(req, res) {

  const { user, password } = req.body;
  const client = await clientPromise;
  const db = client.db("auth");
  const collection = db.collection("users");

  if (!user) {
    return res.status(422).json({ message: "User is required." });
  };

  if (!password) {
    return res.status(422).json({ message: "Password is requires." });
  };

  const userExist = await collection.findOne({ user: user });

  if (userExist) {
    return res.status(422).json({ message: "The user already exists." });
  };

  const newUser = new User({
    user,
    password,
  });

  try {
    await collection.insertOne(newUser);
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: err });
  };

};

module.exports = {
  login,
  register,
};
