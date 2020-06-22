const express = require('express')
const path = require('path')
const app = express();
const mongoose = require('mongoose')



//conexão com o banco
mongoose.connect('mongodb://localhost/noticias',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

let db = mongoose.connection;

db.on("error", () => { 
    console.log("Houve um erro")
})
db.once("open", () => {
    console.log("Banco carregado")

})





app.use(express.urlencoded({ extended: true}))


//arquivos estáticos
app.use(express.static(__dirname + '/public'));

//templates
app.set('views', path.join(__dirname, 'views'))

//engine
app.set("view engine", "ejs");







//rotas
app.use(require('./routes/index.routes'));
app.use(require('./routes/user.routes'));


const PORT = 3333;
app.listen(PORT, () => {
    console.log('listening sever 3333')
})