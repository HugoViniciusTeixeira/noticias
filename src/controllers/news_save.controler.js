const News_save = require('../models/News_save')

const news = {}

news.save = async (req, res) => {
    const noticias = Object.keys(req.body)

    const image = noticias[0]
    const description = noticias[1]
    const link = noticias[2]

    const noticias_salvar = new News_save({ image, description, link })

    //verificando se a noticia já está salva no banco
    const existe_news = await News_save.findOne({ description })
    if (existe_news) {
        const noticias_salvas = await News_save.find()
        res.render('save', { noticias_salvas, existe_news:true })
    } else {
        const save_news = await noticias_salvar.save()
        console.log(save_news)

        res.redirect('/savednews')
    }
}



news.listsave = async (req, res) => {

    const noticias_salvas = await News_save.find()


    res.render('save', { noticias_salvas, existe_news:false })
}




module.exports = news;








