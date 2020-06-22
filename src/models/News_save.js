const mongoose = require('mongoose')

const saved_news = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("News_save", saved_news)