
const SECRET_PIN = String(Math.floor((Math.random() + 1) * 1000))
console.log('secret pin ' + SECRET_PIN)
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

        printToScreen('> [your input] ' + guess)


        if (guess.toLowerCase() == 'clear') {
            outputLog.innerHTML = ''
            return
        }

        if (guess.toLowerCase() == 'help') {
            printToScreen("explanation of the terms + rules")
            printToScreen(' ')
            return
        }

        if (guess.toLowerCase() == 'hint') {
            // printToScreen('fine whatever')
            giveHint()
            return
        }

        if (guess.length != 4 || isNaN(guess)) {
            // console.log('error')
            printToScreen('error')
            printToScreen(' ')
            return
        }

        evaluateGuess(guess)
        printToScreen('')
    }
})

function printToScreen (text) {
    outputLog.innerHTML += `<div>${text}</div>`
    outputLog.scrollTop = outputLog.scrollHeight
}

function initaliseGame () {
    // printToScreen('Welcome to game')
    // printToScreen('Crack the code access the contents')
    // printToScreen('Input a 4 digit pin to start guessing, you have 10 attempts before the alarm starts ringing')
    printToScreen('Crack The 4-digit Code to Find A Secret!')
    printToScreen(`
       ______________________________________________________________
     .'  __________________________________________________________  '.
     : .'                                                          '. :
     | |      ________________________________________________      | |
     | |    .:________________________________________________:.    | |
     | |    |                                                  |    | |
     | |    |                                                  |    | |
     | |    |                Enter the PIN:                    |    | |
     | |    |                                                  |    | |
     | |    |                                                  |    | |
     | |    |                [-] [-] [-] [-]                   |    | |
     | |    |                                                  |    | |
     | |    |                                                  |    | |
     | |    |            __________________________            |    | |
     | |    |           |  |  |  |  |  |  |  |  |  |           |    | |
     | |    '.__________|__|__|__|__|__|__|__|__|__|__________.'    | |
     | |                                                            | |
     : '.__________________________________________________________.' :
      ".____________________________________________________________."

        `)
    printToScreen('Available Commands:')
    printToScreen(' help : show game rules and explanation')
    printToScreen(' clear : clear the output console')
    printToScreen(' hint : get a hint. but beware, the digit is randomly revealed and depends on your luck. it also costs you 2 attempts.')
    printToScreen('----------------------------------------------------------------------------------------------------------------------')
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
        printToScreen('You Cracked the Code Successfully!!')
        printToScreen('The GRAND SECRET IS....')
        printToScreen('uh oh! file corrupted! the great grand secret cannot be revealed!')
        printToScreen('----------------------------------------------------------------------------------------------------------------------')
        printToScreen('----------------------------------------------------------------------------------------------------------------------')

        userInput.disabled = true

        printToScreen('Reloading Game....')
        printToScreen(' ')
        initaliseGame()

    } else if (attemptsLeft <= 0) {
        printToScreen('No More Attempts Left!')
        printToScreen('You could not crack the code. Now you will never know the grand secret.')
        printToScreen(' ')
        printToScreen('----------------------------------------------------------------------------------------------------------------------')
        printToScreen('----------------------------------------------------------------------------------------------------------------------')

        printToScreen('Reloading Game....')
        printToScreen(' ')
        initaliseGame()

    } else {
        printToScreen('Incorrect PIN! Can not access the secret!')
        printToScreen(`${correctPos} digits locked | ${wrongPos} digits vulnerable`)
        printToScreen(' ')
        // console.log(correctPos, wrongPos)
    }
}

function giveHint () {
    if (attemptsLeft <= 3) {
        printToScreen('Error!! You Do Not Have Enough Attempts To Take A Hint!')
        printToScreen('You are on your own now. Crack the code or let it remain a mystery forever!')
        printToScreen(' ')
        return
    }

    attemptsLeft -= 2

    let randomIndex = Math.floor(Math.random() * 4)
    let revealedDigit = SECRET_PIN[randomIndex]

    // printToScreen('finr but it will cost you 2 attempts')
    printToScreen(`${revealedDigit} is at position ${randomIndex + 1}`)
    printToScreen(`Remaining Attempts: ${attemptsLeft}`)
    printToScreen(' ')
}