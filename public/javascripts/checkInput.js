const input = document.getElementById('url')
const button = document.getElementById('form-button')
const feedback = document.querySelector('.feedback')

button.addEventListener('click', () => {
  if (input.value === '') {
    input.classList.add('red')
    feedback.innerHTML = 'Please enter a URL'
    feedback.classList.add('red-word')
  }
})
