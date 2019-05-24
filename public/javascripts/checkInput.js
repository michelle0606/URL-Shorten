const input = document.getElementById('url')
const form = document.forms[0]
const feedback = document.querySelector('.feedback')
const info = document.querySelector('.info')

// 表單空值送出時的提醒
form.addEventListener('submit', () => {
  event.preventDefault()
  if (input.value === '') {
    input.classList.add('red')
    feedback.innerHTML = 'Please enter a URL'
    feedback.classList.add('red-word')
  } else if (!input.value.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/gi)) {
    input.classList.add('red')
    feedback.innerHTML = 'The URL was detected to be an invalid URL.'
    feedback.classList.add('red-word')
  } else {
    form.submit()
    window.location('/done')
  }
})

form.addEventListener('input', e => {
  if (e.target.classList.contains('red')) {
    feedback.innerHTML = ''
    e.target.classList.remove('red')
  }
})
