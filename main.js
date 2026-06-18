
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
            console.log('error')
            return
        }

        if (guess == SECRET_PIN) {
            console.log('cracked')
        } else {
            console.log('try again')
        }
    }
})