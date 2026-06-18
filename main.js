
const SECRET_PIN = '1234'
const outputLog = document.getElementById('output-log')
const userInput = document.getElementById('user-input')


userInput.addEventListener("keydown", (ev) => {
    // console.log(ev.key)

    if (ev.key == 'Enter') {
        // console.log('received')
        // console.log(userInput.value)
        let guess = userInput.value
        userInput.value = ''

        if (guess.length != 4) {
            // console.log('error')
            printToScreen('error')
            return
        }

        if (guess == SECRET_PIN) {
            // console.log('cracked')
            printToScreen('cracked')
            userInput.disabled = true
        } else {
            // console.log('try again')
            printToScreen('try again')
        }
    }
})

function printToScreen (text) {
    outputLog.innerHTML += `<div>${text}</div>`
    outputLog.scrollTop = outputLog.scrollHeight
}

function initaliseGame () {
    printToScreen('Welcome to game')
    printToScreen('Crack the code access the contents')
    printToScreen('Input a 4 digit pin to start guessing, you have 10 attempts before the alarm starts ringing')
    printToScreen('-------------------------------------------------------------------------------------------')
}

initaliseGame()