const input = document.getElementById('url')
const button = document.getElementById('form-button')
const feedback = document.querySelector('.feedback')
const info = document.querySelector('.info')

// 表單空值送出時的提醒
button.addEventListener('click', () => {
  if (input.value === '') {
    input.classList.add('red')
    feedback.innerHTML = 'Please enter a URL'
    feedback.classList.add('red-word')
  }
})
