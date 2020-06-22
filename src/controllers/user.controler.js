const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Ctrl = {}


Ctrl.abrirformularioCadastro = (req, res) => {
    res.render('cadastrar', { possiveis_erros: false, dados: false })
}

Ctrl.cadastrarUsuario = async (req, res) => {

    //corpo da requisição
    const { name, email, password, password_confirm, email_confirm } = req.body;
    let dados = {}
    dados = req.body;
    let possiveis_erros = [];
    let cont = 0;

    //pesquisa no banco para verificar emails existentes
    const emails_cadastrados = await User.findOne({ email: email })
   


    //tratamento de erros

    if (name.trim().length <= 4 || email.trim().length <= 4 || password.trim().length <= 4) {
        possiveis_erros.unshift('1')
        cont = 1;
        res.render('cadastrar', { possiveis_erros, dados })

    } else if (password != password_confirm && cont === 0) {
        possiveis_erros.unshift('2')
        cont = 1;
        res.render('cadastrar', { possiveis_erros, dados })
    } else if (email_confirm != email && cont === 0) {
        possiveis_erros.unshift('3')
        res.render('cadastrar', {
            possiveis_erros, dados
        })


    }
    else if (emails_cadastrados) {
        possiveis_erros.unshift('4')
        res.render('cadastrar', {
            possiveis_erros, dados
        })
    }



    else {

        try {

            let user = new User({ name, email, email_confirm, password, password_confirm })

            //criptografa a senha
            const salt = await bcrypt.genSalt(10);
            hash = await bcrypt.hash(password, salt);
            user.password = hash;
            user.password_confirm = hash;

            //salvar os dados no banco
            const saveUSer = await user.save();
            res.render('login', { cadastrado_msg: true, possiveis_erros: false, dados: false })



        } catch (err) {
            console.log(err)
            res.send("error")
        }
    }

}

Ctrl.abrirformularioLogin = (req, res) => {

    res.render('login', { cadastrado_msg: false, possiveis_erros: false, dados: false })
}

Ctrl.logar = async (req, res) => {
    const dados = req.body;
    let possiveis_erros = [];

    try {

        if (dados.email.trim().length <= 4 || dados.password.trim().length <= 4) {
            possiveis_erros.unshift('1')
            res.render('login', { possiveis_erros, dados, cadastrado_msg: false })
        }


        //verificando se o email está cadastrado
        const dados_cadastrados = await User.findOne({ email: dados.email })
        
        if (dados_cadastrados) { } else {
            possiveis_erros.unshift('2')
            res.render('login', { possiveis_erros, dados, cadastrado_msg: false })
        }

        //verificando a senha
        let senhas_comparadas = await bcrypt.compare(dados.password, dados_cadastrados.password)
        if (senhas_comparadas) { } else {
            possiveis_erros.unshift('3')
            res.render('login', { possiveis_erros, dados, cadastrado_msg: false })
        }
        res.redirect('/home')
    } catch (error) {
        res.send('erro' + error)
    }

}


module.exports = Ctrl;


