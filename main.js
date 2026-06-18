
const SECRET_PIN = '1234'
let attemptsLeft = 10

const outputLog = document.getElementById('output-log')
const userInput = document.getElementById('user-input')


userInput.addEventListener("keydown", (ev) => {
    // console.log(ev.key)

    if (ev.key == 'Enter') {
        // console.log('received')
        // console.log(userInput.value)
        let guess = userInput.value
        userInput.value = ''

        if (guess.length != 4 || isNaN(guess)) {
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

        evaluateGuess(guess)
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

function evaluateGuess (guess) {
    attemptsLeft--
    // console.log(attemptsLeft)

    let actualPinArray = SECRET_PIN.split('')
    let guessPinArray = guess.split('')

    let correctPos = 0
    let wrongPos = 0

    let secretMatched = [false, false, false, false]
    let guessMatched = [false, false, false, false]

    for (let i = 0; i < 4; i++) {
        if (guessPinArray[i] == actualPinArray[i]) {
            correctPos++
            secretMatched[i] = true
            guessMatched[i] = true
        }
    }

    for (let i = 0; i < 4; i++) {
        if (!guessMatched[i]) {
            for (let j = 0; j < 4; j++) {
                if (!secretMatched[j] && guessPinArray[i] === actualPinArray[j]) {
                    wrongPos++
                    secretMatched[j] = true
                    break
                }
            }
        }
    }

    if (correctPos == 4) {
        printToScreen('success')
    } else if (attemptsLeft <= 0) {
        printToScreen('no more attempts left')
    } else {
        printToScreen('try again')
        printToScreen(`${correctPos} locked | ${wrongPos} vulnerable`)
        // console.log(correctPos, wrongPos)
    }
}