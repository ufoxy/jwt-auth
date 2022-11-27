const express = require("express");

const app = express();

app.get("/login", (req, res) => {
    res.header("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({
        user: "ufoxy",
        password: "senha123"
    }))
})

const port = 8080

app.listen(port, () => {
    console.log(`Rodando com Express na porta ${port}!`)
})