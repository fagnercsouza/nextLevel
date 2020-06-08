// importa sqlite
const sqlite = require('sqlite3').verbose();
// iniciar um objeto que irá fazer as operações do BD
const db = new sqlite.Database("./src/database/database.db");

 // utilzando o objeto de bd para as operaçoes

 db.serialize( () => {
     // criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS locais (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            nome TEXT,
            endereco TEXT,
            numero TEXT,
            estado TEXT,
            cidade TEXT,
            itens TEXT
        );
    `);

     // Inserir dados na tabela
    const query = `
       INSERT INTO locais (
        nome, endereco, numero, estado, cidade, itens
    ) VALUES (?, ?, ?, ?, ?, ?);`
    const values = [
        "Colectoria",
        "Sq 12, quadra 2, Centro",
        "Casa 44",
        "Goias",
        "Cidade Ocidental"
    ]
    function inserirDados(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
    }
    /**inseir dados na tabela */
    // db.run(query, values, inserirDados);

    // consultar dados da tabela
    db.all(` SELECT * FROM locais`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("locais cadastrados")
        console.log(rows)
    });

    // alterar dados da tabela

    // deletar dados da tabela
    // db.run(`DELETE FROM locais WHERE id = ?`, [1], function(err, rows) {
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso")
    // } )

 })
 module.exports = db;