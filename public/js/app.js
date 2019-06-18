console.log("Client side js loaded");



const addressForm = document.querySelector('form')
const addressImput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = addressImput.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                console.log(data);
                messageOne.textContent = data.forcast
                messageTwo.textContent = data.location
            }
        })
    })
})