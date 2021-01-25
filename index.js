const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta")

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
    Pergunta.findAll({ raw: true, order: [
        ['id','DESC'] // DESC DECRESCENTE, ASC CRESCENTE
    ] }).then(perguntas => {
        console.log(perguntas);
        res.render("index.ejs", {
            perguntas: perguntas
        });
    }); // SELECT * FROM PERGUNTAS
    
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

app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) {
            res.render("pergunta",{
                pergunta: pergunta
            });
        }else{
            res.redirect("/");
        }
    })
});

app.listen(8080,() => {
    console.log("App rodando");
});