const typeContainer = document.querySelector('.type-container');
const textArea = document.querySelector('#textArea');
const wpmArea = document.querySelector('.wpm-area');
const wpmText = document.querySelector('#wpm');
const wordDivs = textArea.getElementsByClassName('word');

//=======================================================================================
const pauseContainer = document.querySelector('.pause-container');
const pauseRadioButtons = document.querySelectorAll('input[name="pauseModes"]');

const isPause = outerToggle();
let radioSelect = 0;

function outerToggle() {
    let state = false;

    function innerToggle() {
        state = !state;
        return state;
    }
    return innerToggle;
}

function pauseMenu(event) {
    pauseRadioButtons[0].focus();

    if (event.key === 'j') {
        radioSelect = (radioSelect + 1) % pauseRadioButtons.length;
    } else if (event.key === 'k') {
        radioSelect = (radioSelect - 1 + pauseRadioButtons.length) % pauseRadioButtons.length;
    }
    pauseRadioButtons[radioSelect].checked = true;
}

//=======================================================================================
function typingTest(event){
    const key = event.key;
    (!typingTest.pause)? typingTest.pause = false : false;
    let isDone = false;
    let wpm = 0;

    if (key === 'Escape') {
        typingTest.pause = isPause();
        pauseContainer.style.display = typingTest.pause ? "flex" : "none";
        typeContainer.classList.toggle('blur', typingTest.pause);
        pauseRadioButtons[0].focus();
        pauseRadioButtons[radioSelect].checked = true;
    } else if (typingTest.pause){
        pauseContainer.addEventListener('keypress', pauseMenu(event))
    } else {
        if (!typingTest.pause && key !== 'Shift' && key !== 'Control' && key !== 'Alt'
            && key !== 'PageUp' && key !== 'PageDown'
            && key !== 'ArrowUp' && key !== 'ArrowDown'
            && key !== 'ArrowRight' && key !== 'ArrowLeft'
            && key !== 'Home' && key !== 'Enter') {
                // (wpm != undefined)? console.log(wpm) : undefined
                isDone = keypressChecker(key, wordDivs);
                wpm = wordsPerMinute(wordDivs.length, isDone);
                if (isDone) {
                    textArea.style.display = 'none';
                    wpmArea.style.display = 'flex';
                    wpmText.innerHTML = `${Math.floor(wpm)} Words Per Minute`;
                    console.log('kasuhkja')
                }
                // (isDone)? console.log("key is :" + key ): console.log("retry can be here")
                // console.log('aks;cma;')
        }
    }
}

//=======================================================================================
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
    if (!keypressChecker.wordCounter && !keypressChecker.charCounter && !keypressChecker.prevCharCounter && !keypressChecker.isDone) {
        keypressChecker.wordCounter = 0;
        keypressChecker.charCounter = 0;
        keypressChecker.prevCharCounter = -1;
        keypressChecker.wordLength = wordDivs[keypressChecker.wordCounter].children.length - 1;
        keypressChecker.isDone = false;
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
        keypressChecker.isDone = true;
        return keypressChecker.isDone;
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

document.addEventListener('keydown', typingTest);
window.addEventListener('blur', (e) => {
    setTimeout(() => {
        pauseMenu(e);
        typingTest.pause = isPause();
        pauseContainer.style.display = 'flex';
        typeContainer.classList.add('blur');
    }, 30000);
});

fetch('/sentences')
.then(response => response.json())
.then(data => {
    let index = Math.floor(Math.random() * data.length);
    const sentence = data[index].sentence;
    charDisplay(sentenceSplitter(sentence));
})
.catch(error => console.error('Error fetching data:', error));
