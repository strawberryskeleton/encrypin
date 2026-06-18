
const SECRET_PIN = String(Math.floor((Math.random() + 1) * 1000))
console.log('secret pin' + SECRET_PIN)
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

        // if (guess == SECRET_PIN) {
        //     // console.log('cracked')
        //     printToScreen('cracked')
        //     userInput.disabled = true
        //     initaliseGame()
        // } else {
        //     // console.log('try again')
        //     printToScreen('try again')
        // }

        if (guess.toLowerCase() == 'clear') {
            outputLog.innerHTML = ''
            return
        }

        if (guess.toLowerCase() == 'help') {
            printToScreen("explanation of the terms")
            return
        }

        if (guess.toLowerCase() == 'hint') {
            printToScreen('fine whatever')
            giveHint()
            return
        }

        if (guess.length != 4 || isNaN(guess)) {
            // console.log('error')
            printToScreen('error')
            return
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
    userInput.disabled = false
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
        userInput.disabled = true
        initaliseGame()
    } else if (attemptsLeft <= 0) {
        printToScreen('no more attempts left')
    } else {
        printToScreen('try again')
        printToScreen(`${correctPos} locked | ${wrongPos} vulnerable`)
        // console.log(correctPos, wrongPos)
    }
}

function giveHint () {
    if (attemptsLeft <= 3) {
        printToScreen('hint denied. diy you fool')
        return
    }

    attemptsLeft -= 2

    let randomIndex = Math.floor(Math.random() * 4)
    let revealedDigit = SECRET_PIN[randomIndex]

    printToScreen('finr but it will cost you 2 attempts')
    printToScreen(`${revealedDigit} is at position ${randomIndex + 1}`)
    printToScreen(`remaining attempts: ${attemptsLeft}`)
}