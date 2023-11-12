console.log('client side JS file loaded')

const locationInput = document.querySelector('input')
const paragraphOne = document.querySelector('#p-response-1')
const paragraphTwo = document.querySelector('#p-response-2')
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
            paragraphOne.textContent =  `Forecast for ${data.placeName} at coordinates ${data.mapCoords}`
            paragraphTwo.textContent = data.forecast
        })
    })
})