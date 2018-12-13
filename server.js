// Modules
const express = require('express')
const exphbs = require('express-handlebars')
const PATH = require('path')
const bodyParser = require('body-parser')
const db = require('./config/database')

db.authenticate()
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err))

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(PATH.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'landing'
    })
})

// Gig Routes
app.use('/gigs', require('./routes/gigRoutes'))

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})