let sentence = "embrace the journey, for it is the path that shapes us."
// In the dance of life, find joy in every step. Amidst the cosmic symphony, where stars sing their ancient ballads and galaxies waltz in celestial choreography, we find ourselves—a fleeting note in the grand composition."

const radioButtons = document.querySelectorAll('input[name="mode"]');

const container = document.querySelector('.main-container');
const menuContainer = document.querySelector('.menu-container');
const keyboardContainer = document.querySelector('.keyboard-container');
const keys = document.querySelectorAll('.key')
const typeContainer = document.querySelector('.type-container');
const fakeContainer = document.querySelector('.fake-container');

const textArea = document.querySelector('#textArea');
const wordDivs = textArea.getElementsByClassName('word');


//
function selectMode(key, radioButtons) {
    if (!selectMode.mode){
        selectMode.mode;
    }

    if (key === 'Enter'){
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                selectMode.mode = radioButton.value;
                break;
            }
        }
        return selectMode.mode;
    }
}


// setup

charDisplay(sentenceSplitter(sentence));

// let isFocus = false;
// window.addEventListener('focus', (e) => {

//     if (!isFocus){
//         isFocus = true;
//         radioButtons[0].focus()
//         radioButtons[0].checked = true;
//     }
// })


// function main(event) {
//     const key = event.key;
//     const containers = [typeContainer, keyboardContainer, fakeContainer];
//     selectMode(key, radioButtons);

//     if (key == 'Escape') {
//         containers.forEach(container => container.style.display = 'none')
//         menuContainer.style.display = 'flex';
//         radioButtons[0].focus();
//         selectMode.mode = 'menu';
//     }


// }

function keyboardTest(event){
    const key = event.key;
    // console.log(activeKey.innerHTML)
    // checkKey(key, activeKey)
    console.log(key)
}

function typingTest(event){
    const key = event.key;
    if (key !== 'Shift' && key !== 'Control' && key !== 'Alt'
        && key !== 'PageUp' && key !== 'PageDown'
        && key !== 'ArrowUp' && key !== 'ArrowDown'
        && key !== 'ArrowRight' && key !== 'ArrowLeft'
        && key !== 'Home' && key !== 'Escape' && key !== 'Enter')
    {
        let isDone = keypressChecker(key, wordDivs);
        let wpm = wordsPerMinute(wordDivs.length, isDone);
        (wpm != undefined)? console.log(wpm) : undefined
    }
}

////////////////////////////////////

function setup(){
    selectMode.mode = 'menu';
    radioButtons[0].focus();

    // listen to menu
    let radioSelect = 0;
    let pressCounter = 0;
    const keyJ = document.querySelector('#nav-j');
    const keyK = document.querySelector('#nav-k');
    menuContainer.addEventListener('keypress', (e) => {
        if (e.key === 'j') {
            radioSelect = (radioSelect + 1) % radioButtons.length;
            keyJ.classList.add('key-nav');
        } else if (e.key === 'k') {
            radioSelect = (radioSelect - 1 + radioButtons.length) % radioButtons.length;
            keyK.classList.add('key-nav');
        }
        // yep that's the problem
        menuContainer.addEventListener('keyup', () => {
            keyJ.classList.remove('key-nav');
            keyK.classList.remove('key-nav');
            pressCounter+=1;
        });
        if (pressCounter > 10) {
            let label = document.querySelector('.menu-label');
            label.classList.add('fade-out')
            setTimeout(() => {
                label.innerHTML = "IT IS COMMON TO PRESS ENTER AFTERWARDS RIGHT?"
                label.classList.remove('fade-out')
            }, 2000);
        }
        console.log(pressCounter);//todo

        radioButtons[radioSelect].checked = true;

        // if mode selected change display and add event listener
        selectMode(e.key, radioButtons);
        if (selectMode.mode != 'menu') {
            if (selectMode.mode == 'fake') {
                menuContainer.style.display = 'none';
                fakeContainer.style.display = 'flex';
            }
            else if (selectMode.mode == 'type') {
                menuContainer.style.display = 'none';
                typeContainer.style.display = 'flex';
                document.addEventListener('keydown', typingTest);
            }
            else if (selectMode.mode == 'keyboard') {
                menuContainer.style.display = 'none';
                keyboardContainer.style.display = 'flex';
                document.addEventListener('keypress', keyboardTest);
            }
        }
    });
}

window.addEventListener('load', setup);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// splits sentence into char array
function sentenceSplitter(sentence) {
    let charArray = [];
    let array = sentence.split(' ')
    let wordsArray = array.map(word => {return word + ' '});
    wordsArray.forEach(word => {charArray.push(word.split(''))});
    return charArray;
}

// creates char-word into span
function charDisplay(charArray) {
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
            word.appendChild(char);
        }
        textArea.appendChild(word);
    }
}

// checks pressed key
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
    if (RegEx.test(keyPressed) || keyPressed == ' ' || keyPressed == 'Backspace') {

        if (keypressChecker.charCounter != 0 && keyPressed == 'Backspace'){
            if (keypressChecker.charCounter <= keypressChecker.wordLength) {
                wordDiv.childNodes[keypressChecker.charCounter - 1].classList.remove('incorrect')
                wordDiv.childNodes[keypressChecker.charCounter - 1].classList.remove('correct')
                keypressChecker.charCounter--;
            } else {
                wordDiv.childNodes[keypressChecker.charCounter - 1].remove();
                keypressChecker.charCounter--;
            }
        } else if (keyPressed == ' ' && keypressChecker.wordCounter < wordDivs.length - 1) {
            keypressChecker.charCounter = 0;
            keypressChecker.wordCounter++;
            keypressChecker.wordLength = wordDivs[keypressChecker.wordCounter].children.length - 1;
        } else if (RegEx.test(keyPressed) && keyPressed == letter) {
            charSpan.classList.add('correct');
            keypressChecker.charCounter++;
        } else {
            if (keyPressed == 'Backspace' || keyPressed == ' ') {
                return
                // return (keypressChecker.wordCounter == wordDivs.length - 1) ? true : false;
            } else if (keypressChecker.charCounter < keypressChecker.wordLength) {
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
    if (keypressChecker.wordCounter == wordDivs.length - 1 && keypressChecker.charCounter == keypressChecker.wordLength){
        return true;
    }
}

function wordsPerMinute(numOfWords, isDone) {
    let endTime = null;
    if (!wordsPerMinute.startTime) {
        wordsPerMinute.startTime = new Date().getTime();
    }

    if (isDone) {
        endTime = new Date().getTime();

        const minTime = (endTime - wordsPerMinute.startTime) / 60000;
        const wpm = numOfWords / minTime;
        return wpm;
    }
}
