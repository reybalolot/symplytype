let sentence = "embrace the journey, for it is the path that shapes us. In the dance of life, find joy in every step. Amidst the cosmic symphony, where stars sing their ancient ballads and galaxies waltz in celestial choreography, we find ourselves—a fleeting note in the grand composition."

const radioButtons = document.querySelectorAll('input[name="mode"]');

const container = document.querySelector('.main-container');
const menuContainer = document.querySelector('.menu-container');
const keyboardContainer = document.querySelector('.keyboard-container');
const keys = document.querySelectorAll('.key')
const typeContainer = document.querySelector('.type-container');
const fakeContainer = document.querySelector('.fake-container');

const textArea = document.querySelector('#textArea');
const wordDivs = textArea.getElementsByClassName('word');

// splits sentence into char array
function sentenceSplitter(sentence) {
    let charArray = [];
    let array = sentence.split(' ')
    let wordsArray = array.map(word => {return word + ' '});
    wordsArray.forEach(word => {charArray.push(word.split(''))});
    return charArray;
}
// creates char-word into span
function charDisplay(charArray){
    for(let i = 0; i < charArray.length; i++) {
        let word = document.createElement('div');
        word.classList += 'word'

        for(let j = 0; j < charArray[i].length; j++) {
            let char = document.createElement('span');

            if (charArray[i][j] == ' '){
                char.classList += 'empty';
            } else {
                char.classList += 'char'
                char.innerHTML = charArray[i][j];
            }
            word.appendChild(char)
        }
        textArea.appendChild(word);
    }
}


function keypressChecker(keyPressed, wordDivs) {
    //closures
    if (!keypressChecker.wordCounter && !keypressChecker.charCounter && !keypressChecker.prevCharCounter) {
        keypressChecker.wordCounter = 0;
        keypressChecker.charCounter = 0;
        keypressChecker.prevCharCounter = -1;
        keypressChecker.wordLength = wordDivs[keypressChecker.wordCounter].children.length - 1;
    }

    let wordDiv = wordDivs[keypressChecker.wordCounter];
    let charSpan = wordDiv.children[keypressChecker.charCounter];
    let letter = (charSpan.innerHTML == '')? 'space':charSpan.innerHTML;

    let RegEx = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    //check if keypressed is equal to letter
    if (RegEx.test(keyPressed) || keyPressed == ' ' || keyPressed == 'Backspace'){

        if (keypressChecker.charCounter != 0 && keyPressed == 'Backspace'){
            if (keypressChecker.charCounter <= keypressChecker.wordLength) {
                wordDiv.childNodes[keypressChecker.charCounter - 1].classList.remove('incorrect')
                wordDiv.childNodes[keypressChecker.charCounter - 1].classList.remove('correct')
                keypressChecker.charCounter--;
            } else {
                wordDiv.childNodes[keypressChecker.charCounter - 1].remove();
                keypressChecker.charCounter--;
            }
        } else if (keyPressed == ' ') {
            keypressChecker.charCounter = 0;
            keypressChecker.wordCounter++;
            keypressChecker.wordLength = wordDivs[keypressChecker.wordCounter].children.length - 1;
        } else if (RegEx.test(keyPressed) && keyPressed == letter) {
            charSpan.classList.add('correct');
            keypressChecker.charCounter++;
        } else {
            if (keypressChecker.charCounter < keypressChecker.wordLength) {
                charSpan.classList.add('incorrect');
                keypressChecker.charCounter++;
            } else {
                let extraLetter = document.createElement('span');
                extraLetter.innerHTML = keyPressed;
                wordDiv.insertBefore(extraLetter, wordDiv.childNodes[wordDiv.children.length - 1])
                extraLetter.classList.add('extra');
                extraLetter.classList.add('cursor');
                keypressChecker.charCounter++;
            }
        }
    }
}

//

function typeMode(key, radioButtons) {
    if (!typeMode.mode){
        typeMode.mode;
    }

    if (key === 'Enter'){
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                typeMode.mode = radioButton.value;
                break;
            }
        }
        return typeMode.mode;
    }
}


// setup
charDisplay(sentenceSplitter(sentence));

let isFocus = false;
menuContainer.addEventListener('click', (e) => {

    if (!isFocus){
        isFocus = true;
        radioButtons[0].focus()
        radioButtons[0].checked = true;
        // console.log('isFocus is now true');
    } else {
        // console.log('isFocus is already true');
    }
})


document.addEventListener('keydown', (e) => {
    const key = e.key;
    const containers = [typeContainer, keyboardContainer, fakeContainer];
    typeMode(key, radioButtons);

    if (key == 'Escape') {
        containers.forEach(container => container.style.display = 'none')
        menuContainer.style.display = 'flex';
        radioButtons[0].focus();
        typeMode.mode = 'menu';
    }

    if (typeMode.mode) {

        if (typeMode.mode == 'fake') {
            menuContainer.style.display = 'none';
            fakeContainer.style.display = 'flex';
        } else if (typeMode.mode == 'type') {
            menuContainer.style.display = 'none';
            typeContainer.style.display = 'flex';
        } else if (typeMode.mode == 'keyboard') {
            menuContainer.style.display = 'none';
            keyboardContainer.style.display = 'flex';
        } else {
            console.log('this is a test mode')
        }

    }

    // console.log(typeMode.mode)
    // console.log(isFocus);
    if (typeMode.mode == 'keyboard'){
        let activeKey = getKey();
        // console.log(activeKey.innerHTML)
        checkKey(key, activeKey)
    }

    if (typeMode.mode == 'type'){
        if (key !== 'Shift' && key !== 'Control' && key !== 'Alt'
            && key !== 'PageUp' && key !== 'PageDown'
            && key !== 'ArrowUp' && key !== 'ArrowDown'
            && key !== 'ArrowRight' && key !== 'ArrowLeft'
            && key !== 'Home' && key !== 'Escape' && key !== 'Enter')
        {
            keypressChecker(key, wordDivs)
        }
    }

})

// Keyboard Mode Functions
function getKey() {
    let characters = 'abcdefghijklmnopqrstuvwxyz,./;\'[]'
    let randKey = keys[Math.floor(Math.random() * keys.length)];
    randKey.classList.add('key-pressed')

    return randKey;
    // keys.forEach(el => console.log(el))
}

function checkKey(key, activeKey) {
    if (key == activeKey.innerHTML) {
        activeKey.classList.remove('key-pressed');
        console.log("correct");
    } else {
        console.log("wrong")
    }
    // keys.forEach(key => {
    //     key.
    // })
}
