const clientPromise = require("../services/db.service");
const getCollection = require("../services/collection.service");
const {
  hashPassword,
  verifyPasswordWithHash,
} = require("../services/password.service");
const { createToken, verifyToken } = require("../services/jwt.service");
const User = require("../models/user.model");

async function login(req, res) {
  const { user, password } = req.body;

  const collection = await getCollection(clientPromise, "auth", "users");

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (!password) {
    return res.status(404).json({ msg: "Password is required." });
  }

  const userExist = await collection.findOne({ user: user });

  if (!userExist) {
    return res.status(404).json({ message: "Non-existent user." });
  }

  const dbUser = await collection.findOne({ user: user });

  const checkPassword = await verifyPasswordWithHash(password, dbUser.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Invalid password." });
  }

  try {
    const token = await createToken({
      user: dbUser.user,
    });
    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

async function register(req, res) {
  const { user, password } = req.body;

  const collection = await getCollection(clientPromise, "auth", "users");

  if (!user) {
    return res.status(422).json({ message: "User is required." });
  }

  if (!password) {
    return res.status(422).json({ message: "Password is requires." });
  }

  const userExist = await collection.findOne({ user: user });

  if (userExist) {
    return res.status(422).json({ message: "The user already exists." });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    user: user,
    password: hashedPassword,
  });
  console.log(hashedPassword);

  try {
    await collection.insertOne(newUser);
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
}

module.exports = {
  login,
  register,
};
