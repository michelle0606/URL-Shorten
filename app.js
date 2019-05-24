const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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

app.get('/generate', (req, res) => {
  const shortenUrl = getRandomUrl()
  Url.findOne({ shortenUrl }).then(data => {
    if (data) return res.redirect('/generate')
    else {
      const baseUrl = process.env.shortenUrl || 'http:localhost:3000'
      const newUrl = baseUrl + shortenUrl
      Url.create({
        originalUrl: req.query.url,
        shortenUrl: shortenUrl,
        newUrl: newUrl
      }).then(() => {
        return res.render('done', {
          originalUrl: req.query.url,
          shortenUrl,
          baseUrl
        })
      })
    }
  })
})

app.get('/:url', (req, res) => {
  const shortenUrl = req.params.url
  Url.findOne({ shortenUrl })
    .then(data => {
      res.redirect(`${data.originalUrl}`)
    })
    .catch(error => {
      console.log(error)
    })
})

const getRandomUrl = () => {
  const word = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let url = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * word.length)
    url += word[index]
  }
  return url
}

app.listen(process.env.PORT || 3000, () => {
  console.log('running!')
})
