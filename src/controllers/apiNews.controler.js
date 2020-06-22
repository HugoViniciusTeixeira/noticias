const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('226becc737e94299b2c9b7c63347daaa');

const news = {}

news.topheadlines = async (req, res) => {
  let api = await newsapi.v2.topHeadlines({
    country: 'br'
  })
  let articles = api.articles;
 
  res.render('list',{articles})
  
}



module.exports = news;