const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const generator = require('./generator')
const db = mongoose.connection
const Url = require('./models/url')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/url', {
  useNewUrlParser: true,
  useCreateIndex: true
})

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalUrl = req.body.url
  const date = new Date()
  async function createUrl() {
    const shortenUrl = await generator()
    Url.create({
      originalUrl: originalUrl,
      shortenUrl: shortenUrl,
      date: date
    })
    return res.redirect('/done')
  }
  createUrl()
})

app.get('/done', (req, res) => {
  res.render('done')
})

app.get('/api/last', (req, res) => {
  Url.findOne()
    .sort({ date: -1 })
    .limit(1)
    .exec()
    .then(data => {
      const shortenUrl = data.shortenUrl
      res.send(shortenUrl)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/:url', (req, res) => {
  const newUrl = req.params.url
  Url.find()
    .then(data => {
      const page = data.filter(x => x.shortenUrl === newUrl)
      return page
    })
    .then(page => {
      const originalUrl = page[0].originalUrl
      res.redirect(`${originalUrl}`)
    })
    .catch(error => {
      console.log(error)
    })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('running!')
})
