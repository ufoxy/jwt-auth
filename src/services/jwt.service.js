require("dotenv").config;
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

async function createToken(params) {
  const secret = process.env.SECRET;
  const token = jwt.sign(params, secret, { expiresIn: '20s' });
  return token;
}

async function createRefreshToken(params) {
  const secret = process.env.REFRESH_SECRET;
  const refreshToken = jwt.sign(params, secret, { expiresIn: '180s' });
  return refreshToken;
}

async function verifyPermission(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decode = jwt_decode(token);
  console.log(decode)

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

async function verifyRefreshToken(req, res, next) {
  const refreshToken = await req.body.refreshToken;
  console.log(refreshToken)
  if (!refreshToken) return res.status(401).json({ msg: "Refresh Token invalido!" });

  try {
    const secret = process.env.REFRESH_SECRET;
    jwt.verify(refreshToken, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Refresh Token é inválido!" });
  }
}

module.exports = {
  createToken,
  createRefreshToken,
  verifyPermission,
  verifyToken,
  verifyRefreshToken,
};
