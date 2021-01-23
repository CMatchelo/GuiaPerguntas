const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

// Database
connection.authenticate()
    .then(() => {
        console.log("Conexao feita");
    }).catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine', 'ejs'); // Setando EJS como view engine do APP
app.use(express.static('public'));

//Bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/",(req, res) => {
    res.render("index.ejs");
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        res.redirect("/");
    });
    //console.log("teste " + titulo + descricao)
    //res.send("Formulario recebido! Titulo " + titulo + " - Descrição " + descricao)
});

app.listen(8080,() => {
    console.log("App rodando");
});