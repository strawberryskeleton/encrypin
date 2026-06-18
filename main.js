
const SECRET_PIN = String(Math.floor((Math.random() + 1) * 1000))
console.log('secret pin ' + SECRET_PIN)
let attemptsLeft = 10

const outputLog = document.getElementById('output-log')
const userInput = document.getElementById('user-input')


userInput.addEventListener("keydown", (ev) => {
    // console.log(ev.key)
    playBeep(800, 0.1)

    if (ev.key == 'Enter') {
        // console.log('received')
        // console.log(userInput.value)
        let guess = userInput.value
        userInput.value = ''

        playBeep(800, 0.1)
        printToScreen('> [your input] ' + guess)


        if (guess.toLowerCase() == 'clear') {
            outputLog.innerHTML = ''
            return
        }

        if (guess.toLowerCase() == 'help') {
            // printToScreen("explanation of the terms + rules")
            printToScreen('Objective of the game: Crack a secret 4-digit pin to get access to a grand secret')
            printToScreen('How To Play: ')
            printToScreen('   - Type your guess in the Input Field')
            printToScreen('   - LOCKED Digits --> digits which are correct and are correctly placed')
            printToScreen('   - VUlNERABLE Digits --> digits which are correct but are incorrectly placed')
            printToScreen('   - You have 10 ATTEMPTS to guess the PIN')
            printToScreen('Available Commands: ')
            printToScreen(' help : show game rules and explanantion')
            printToScreen(' clear : clear the output console')
            printToScreen(' hint : get a hint. but beware, the digit is randomly revealed and depends on your luck. it also costs you 2 attempts.')
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
            playBeep(150, 0.3)
            printToScreen('Invalid Guess or Command!')
            printToScreen('Check for any typo in the command! The PIN is 4 digits long. Enter the guessed 4 digits only without any spaces.')
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
        playBeep(1200, 0.15)
        playBeep(1500, 0.3)
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
        playBeep(150, 0.3)
        printToScreen('No More Attempts Left!')
        printToScreen('You could not crack the code. Now you will never know the grand secret.')
        printToScreen(' ')
        printToScreen('----------------------------------------------------------------------------------------------------------------------')
        printToScreen('----------------------------------------------------------------------------------------------------------------------')

        printToScreen('Reloading Game....')
        printToScreen(' ')
        initaliseGame()

    } else {
        playBeep(150, 0.3)
        printToScreen('Incorrect PIN! Can not access the secret!')
        printToScreen(`${correctPos} DIGITS LOCKED | ${wrongPos} DIGITS VULNERABLE`)
        printToScreen(`Attempts Left: ${attemptsLeft}`)
        printToScreen(getAttemptStatus())
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

function getAttemptStatus () {
    const statuses = {
        9: "The game has just begun, and your already behind! Can you crack the code?",
        8: "Oh no! Another incorrect attempt! Your attempts are depleting!",
        7: "Now I'm getting doubtful of your abilities!",
        6: "You are nearing the attempt limit! Think think think!",
        5: "You have exhausted half the attempts! Use your wits, or you'll never know the secret!",
        4: "Last chance to take a HINT! Think before you make the next move!",
        3: "You are running out of attempts! Think again before making a guess!",
        2: "Try your best! Not enough chances are left for you!",
        1: "It's NOW OR NEVER! Last Chance to know the Grand Secret!",
    }

    return statuses[attemptsLeft] || ` `
}

function playBeep (frequency, duration) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    oscillator.type = 'square'
    oscillator.frequency.value = frequency

    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    oscillator.start()

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration)

    oscillator.stop(audioCtx.currentTime + duration)
}