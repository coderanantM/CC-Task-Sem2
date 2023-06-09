const express = require('express')
const app = express()
const path = require('path')

const viewpath = path.join(__dirname, './views')

app.set('view engine', 'hbs')
app.set('views', viewpath)

app.use(express.static(viewpath))
app.get('/', (req, res) => {
    res.render('trial')
})
console.log('Server is running on port 3000.')
app.listen(2000)

