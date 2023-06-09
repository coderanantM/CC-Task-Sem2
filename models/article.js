const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;