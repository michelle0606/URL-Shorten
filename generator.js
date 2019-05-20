const existUrl = [] //防止重複
const word = 'abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
let box = []
box = box.concat(word.split(''))

function sample(array) {
  const index = Math.floor(Math.random() * 63)
  return array[index]
}

const generator = () => {
  let url = ''
  for (let i = 0; i < 5; i++) {
    url += sample(box)
  }
  return check(url)
}

const check = url => {
  if (existUrl.includes(url)) {
    return generator()
  } else {
    existUrl.push(url)
    return url
  }
}

module.exports = generator
