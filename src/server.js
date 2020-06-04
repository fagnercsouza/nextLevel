const express = require('express');
const server = express();

// configurar pasta pública
server.use(express.static("public"))


server.get('/', (req, res) => {

    console.log("No server")
    res.sendFile(__dirname + "/views/index.html")
})
server.listen(3000);