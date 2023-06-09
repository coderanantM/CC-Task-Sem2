const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://127.0.0.1/blog', {
    //useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))



app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
    createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
}) 

app.use('/articles/index', articleRouter)
app.use('/articles/new', articleRouter)

app.use('/articles',articleRouter)

app.listen(4000)

