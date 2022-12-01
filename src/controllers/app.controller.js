const clientPromise = require("../services/db.service");
const getCollection = require("../services/collection.service");

async function userBooks(req, res) {
  const user = await req.params.user;

  // console.log("token params:", decode)

  // console.log(req.params.user);

  if (!user) {
    return res.status(404).json({ msg: "Usuário não inserido!" });
  }

  const collection = await getCollection(clientPromise, "app", "books");

  // check if user exists
  // collection = await getCollection(clientPromise, "auth", "users");
  // const DbUser = await collection.findById(user, "-password");

  // get books in the db
  // const book = new Book ({
  //   user: user,
  // })

  const books = await collection.find({ user: user }).toArray();
  console.log(books);

  if (!books) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.status(200).json({ books });
}

module.exports = {
  userBooks,
};
