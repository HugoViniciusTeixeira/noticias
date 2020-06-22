const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('226becc737e94299b2c9b7c63347daaa');

const newsPesquisa = {}

newsPesquisa.search= async (req, res) => {
    let  pesquisar= req.body.pesquisa
    
    let api = await newsapi.v2.topHeadlines({
      q: pesquisar,
      country: 'br'
    })
    let articles = api.articles;
   
    res.render('list',{articles})
    
    
  }


  module.exports = newsPesquisa;
  