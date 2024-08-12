let sentence = "embrace the journey, for it is the path that shapes us."
// In the dance of life, find joy in every step. Amidst the cosmic symphony, where stars sing their ancient ballads and galaxies waltz in celestial choreography, we find ourselves—a fleeting note in the grand composition."

const radioButtons = document.querySelectorAll('input[name="mode"]');

const container = document.querySelector('.main-container');
const menuContainer = document.querySelector('.menu-container');
const keyboardContainer = document.querySelector('.keyboard-container');
const keys = document.querySelectorAll('.key')
const typeContainer = document.querySelector('.type-container');
const fakeContainer = document.querySelector('.fake-container');

const pauseContainer = document.querySelector('.pause-container');
const textArea = document.querySelector('#textArea');
const wpmArea = document.querySelector('#wpm');
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
    } else {
        return 'menu'
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
    (!keyboardTest.pause)? keyboardTest.pause = false : false;

    if (key === 'Escape') {
        keyboardTest.pause = isPause();
        pauseContainer.style.display = keyboardTest.pause ? "flex" : "none";
        pauseContainer.addEventListener('keypress', )
    }

    if (!keyboardTest.pause) {
        // CODE HERE
        console.log(key)
    }

    // console.log(activeKey.innerHTML)
    // checkKey(key, activeKey)
    // console.log("KeyboardTest is still ON")
}

function typingTest(event){
    const key = event.key;
    (!typingTest.pause)? typingTest.pause = false : false ;
    let isDone = false;
    let wpm = 0;

    if (key === 'Escape') {
        typingTest.pause = isPause();
        pauseContainer.style.display = typingTest.pause ? "flex" : "none";
    } else {
        if (!typingTest.pause && key !== 'Shift' && key !== 'Control' && key !== 'Alt'
            && key !== 'PageUp' && key !== 'PageDown'
            && key !== 'ArrowUp' && key !== 'ArrowDown'
            && key !== 'ArrowRight' && key !== 'ArrowLeft'
            && key !== 'Home' && key !== 'Enter')
        {
            // (wpm != undefined)? console.log(wpm) : undefined
            isDone = keypressChecker(key, wordDivs);
            wpm = wordsPerMinute(wordDivs.length, isDone);
            if (isDone) {
                textArea.style.display = 'none';
                wpmArea.style.display = 'flex';
                wpmArea.innerHTML = `${Math.floor(wpm)} Words Per Minute`;
                (key == 'Space')? console.log("SPACE"): undefined
            }
        }
    }
    // console.log(typingTest.pause)
    // console.log("TEST")
}

function changeMenuLabels(label, counter) {
    if (counter == 10) {
        label.classList.add('fade-out')
        setTimeout(() => {
            label.innerHTML = "IT IS COMMON TO <span>PRESS ENTER</span> AFTER A SELECTION (•̀⤙•́)"
            label.classList.remove('fade-out')
        }, 1500);
    }

    (counter == 25)? label.children[0].style = 'color: #ebdbb2' : counter = 0;
}

const isPause = outerToggle();
function outerToggle() {
    let state = false;

    function innerToggle() {
        state = !state;
        return state;
    }
    return innerToggle;
}

function pauseMenu(key) {
    //TODO
    if (key == 'j') {
        console.log("kjabsas")
    }
}

////////////////////////////////////

function setup(){
    radioButtons[0].focus();

    // listen to menu
    let radioSelect = 0;
    let pressCounter = 0;
    const keyJ = document.querySelector('#nav-j');
    const keyK = document.querySelector('#nav-k');
    let label = document.querySelector('.menu-label');
    menuContainer.addEventListener('keypress', (e) => {
        pressCounter++;

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
        });
        radioButtons[radioSelect].checked = true;
        changeMenuLabels(label, pressCounter);

        // if mode selected change display and add event listener
        let s=selectMode(e.key, radioButtons);
        console.log('Select mode is: ' + s)
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
                document.addEventListener('keydown', keyboardTest);
            }
            else if (selectMode.mode == 'pause');
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
    console.log(keyPressed)
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
