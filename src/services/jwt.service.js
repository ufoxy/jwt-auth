require("dotenv").config;
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

async function createToken(params) {
  const secret = process.env.SECRET;
  const token = jwt.sign(params, secret);
  return token;
}

async function verifyPermission(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decode = jwt_decode(token);

  const user = await req.params.user;

  if (decode.user != user) {
    return res
      .status(404)
      .json({ msg: "Você não tem permissão para acessar este documento." });
  }

  next();
}

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

module.exports = {
  createToken,
  verifyPermission,
  verifyToken,
};
