const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const forecast = `/weather?address=${location}`

    fetch(forecast).then(res => {
        res.json().then(data => {
            if (data.error) {
                search.value = ''
                messageOne.textContent = `${data.error}`
            } else {
                search.value = ''
                messageOne.textContent = `${data.location}`
                messageTwo.textContent = `${data.forecastData}`
            }
        })
    })
})