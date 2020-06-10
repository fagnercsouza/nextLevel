const express = require('express');
const server = express();
const db = require("./database/db")

// configurar pasta pública
server.use(express.static("public"))
server.use(express.urlencoded({ extended: true}))

//configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
/** ROTAS DA APLICAÇÃO */
server.get('/', (req, res) => {
    console.log("Server: No index")
    return res.render("index.html")
})
server.get('/cadastroPonto', (req, res) => {

    console.log("Serve: No cadastro")
    return res.render("cadastro.html")
})

server.post('/pontosalvo', (req, res) => {

    const dados = req.body;
    const query = `
        INSERT INTO locais (
            nome, endereco, numero, estado, cidade, itens
        ) VALUES (?, ?, ?, ?, ?, ?);`
    const values = [
        dados.nome,
        dados.endereco,
        dados.numero,
        dados.estado,
        dados.cidade,
        dados.items
    ]
    function inserirDados(err) {
            if (err) {

                console.log(err)
                // return res.send("Erro no cadastro")
                return res.render("cadastro.html", { error: true})
            }
            console.log("Cadastrado com sucesso");
            console.log(this);
            return res.render("cadastro.html", { saved: true})
        }
    db.run(query, values, inserirDados);
})

server.get('/pontoColeta', (req, res) => {

    const pesquisa = req.query.buscar

    if( pesquisa == "") {
        return res.render("listaPonto.html", { total: 0})

    }


    db.all(` SELECT * FROM locais WHERE cidade LIKE '%${pesquisa}%'`, function(err, rows) {
        if(err) { 
            console.log(err)
            return res.send(``)
        }
        const ideasReverso = [...rows].reverse()
        const total = rows.length;
        console.log("locais cadastrados: "+total)
        // console.log(rows)
        return res.render("listaPonto.html", {locais: ideasReverso, total})
    });
})

server.listen(3000);