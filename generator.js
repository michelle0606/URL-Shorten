const Url = require('./models/url')
const word = 'abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
let box = []
box = box.concat(word.split(''))

function sample(array) {
  const index = Math.floor(Math.random() * 63)
  return array[index]
}

const generator = () =>
  Url.find()
    .then(data => {
      return data.map(x => {
        return x.shortenUrl
      })
    })
    .then(shortenUrl => {
      let url = ''
      for (let i = 0; i < 5; i++) {
        url += sample(box)
      }
      const existUrl = shortenUrl
      if (existUrl.includes(url)) return generator()
      else return url
    })
    .catch(error => {
      console.log(error)
    })

// async function exist(url) {
//   const allUrl = await Url.find()
//   const existUrl = await allUrl.map(x => {
//     return x.shortenUrl
//   })
//   if (existUrl.includes(url)) return generator()
//   else {
//     console.log(existUrl)
//     return url
//   }
// }

// async function generator() {
//   let url = ''
//   for (let i = 0; i < 5; i++) {
//     url += sample(box)
//   }
//   const result = await exist(url)
//   return result
// }
module.exports = generator
