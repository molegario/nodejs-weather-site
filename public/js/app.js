console.log('client side JS file loaded')

const locationInput = document.querySelector('input')
const paragraphOne = document.querySelector('#p-response-1')
const paragraphTwo = document.querySelector('#p-response-2')
const paragraphThree = document.querySelector('#p-response-3')
const paragraphFour = document.querySelector('#p-response-4')
const paragraphFive = document.querySelector('#p-response-5')
const paragraphSix = document.querySelector('#p-response-6')
const mainForm = document.querySelector('form')

mainForm.addEventListener('submit', evt => {
    evt.preventDefault()
    paragraphOne.textContent = "Loading forecast..."
    paragraphTwo.textContent = ""

    if(locationInput.value === "") {
        return paragraphOne.textContent = "Please enter in the input box a valid location reference."
    }

    fetch(`/weather?location=${locationInput.value}`).then(response => {
        response.json().then(data => {
            if(data.error) {
                return paragraphOne.textContent = data.error
            }
            paragraphOne.innerHTML =  `Forecast for ${data.placeName} <br>at coordinates ${data.mapCoords}`
            paragraphTwo.textContent = data.forecast
            paragraphThree.textContent = `Atmospheric Pressure: ${data.pressure} milliBars.`
            paragraphFour.textContent = `Windspeed: ${data.wind_speed} mph`
            paragraphFive.textContent = `Humidity: ${data.humidity}%`
            paragraphSix.textContent = `UV index: ${data.uv_index}`
        })
    })
})