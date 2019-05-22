const Url = require('./models/url')
const word = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
let box = []
box = box.concat(word.split(''))

function sample(array) {
  const index = Math.floor(Math.random() * 63)
  return array[index]
}

const getRandomUrl = () => {
  let url = ''
  for (let i = 0; i < 5; i++) {
    url += sample(box)
  }
  return url
}

const generateShortUrl = async () => {
  let isDuplicate = false
  const shortUrl = await getRandomUrl()
  const duplicateUrls = await Url.find({ shortenUrl: shortUrl })
  isDuplicate = duplicateUrls.length > 0

  if (isDuplicate === true) {
    return generateShortUrl()
  } else {
    return shortUrl
  }
}

module.exports = generateShortUrl
