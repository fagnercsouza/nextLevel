const express = require('express');
const server = express();

// configurar pasta pública
server.use(express.static("public"))

//configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {
    console.log("Server: No index")
    return res.render("index.html")
})
server.get('/cadastroPonto', (req, res) => {
    console.log("Serve: No cadastro")
    return res.render("cadastro.html")
})
server.get('/pontoColeta', (req, res) => {
    console.log("Server: Na lista de pontos")
    return res.render("listaPonto.html")
})
server.listen(3000);