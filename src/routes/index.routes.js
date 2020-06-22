const express = require('express');
const apiNews = require('../controllers/apiNews.controler');
const apiNewsPesquisas = require('../controllers/apiNewsPesquisa.controler');
const news_save = require('../controllers/news_save.controler')

const router = express.Router();

router.get('/home',  apiNews.topheadlines)
router.get('/savednews', news_save.listsave)


router.post('/search', apiNewsPesquisas.search)
router.post('/savednews', news_save.save)










module.exports = router;