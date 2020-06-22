const express = require('express');
const router = express.Router();
const {abrirformularioLogin, cadastrarUsuario, abrirformularioCadastro, logar} = require('../controllers/user.controler')



router.get('/login', abrirformularioLogin)
router.post('/login', logar)



router.get('/cadastrar', abrirformularioCadastro )
router.post('/cadastrar',cadastrarUsuario)



module.exports = router;