const info = document.querySelector('.info')
const protocol = window.location.protocol
const host = window.location.host

function show() {
  axios.get('/api').then(response => {
    console.log(response.data)
    let url = response.data
    info.innerHTML = `
      <h2> Link shortening successful! Visit your website at <span>${protocol}//${host}/${url}</span>
      </h2>
      `
  })
}

show()
