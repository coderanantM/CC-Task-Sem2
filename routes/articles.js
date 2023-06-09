const express =  require('express')
const Article = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', {article: Article()})
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
  })
  
  router.post('/edit/:id', async (req, res) => {
    const updatedBlog = await Article.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title,
            description: req.body.description, 
            author: req.body.author},
        { new: true }
      );
      if (!updatedBlog) {
        res.status(404);
      } else {
        res.redirect(`/articles/${req.params.id}`)
      }
  })

  router.post('/delete/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
  })

router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
    res.render('articles/show', { article: article })
})

router.post('/', async (req, res) => {
    let article = await Article.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }   catch (e) {
        console.log(e);
        res.render('articles/new', { article: article })
    }
    
})

module.exports = router