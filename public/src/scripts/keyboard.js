const keyboardContainer = document.querySelector('.keyboard-container');
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

// initialize a random key on load
let randKey = randomKey();
let counter = 0;

function keyboardTest(event){
    const key = event.key;
    (!keyboardTest.pause)? keyboardTest.pause = false : false;

    if (key === 'Escape') {
        keyboardTest.pause = isPause();
        pauseContainer.style.display = keyboardTest.pause ? "flex" : "none";
        keyboardContainer.classList.toggle('blur', keyboardTest.pause);
    }

    if (keyboardTest.pause){
        pauseContainer.addEventListener('keypress', pauseMenu(event))
    } else if (!keyboardTest.pause && key !== 'Shift' && key !== 'Control' && key !== 'Alt'
        && key !== 'PageUp' && key !== 'PageDown' && key !== 'ArrowUp' && key !== 'ArrowDown'
        && key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'Enter' && key !== 'Escape') {

        let prevRandKey = randKey;
        let classKey = pressedAnim(key);
        let classKeyText = document.querySelector(`.${classKey}`).innerHTML.toLowerCase();
        randKey = randomKey();
        counter++;

        let isSpace = (classKeyText == "space" && randKey == "SPACE")? true : false;
        if (classKeyText == prevRandKey || isSpace) {
            document.querySelector(`.${classKey}`).classList.add('key-correct');
        } else {
            document.querySelector(`.${classKey}`).classList.add('key-incorrect');
        }
    }
    let label = document.querySelector('.keyboard-label');
    changeMenuLabels(label, counter);
}

function randomKey() {
    let randKey;
    const keyArr = [
        'q','w','e','r','t','y','u','i','o','p','BracketLeft','BracketRight',
        'a','s','d','f','g','h','j','k','l','Semicolon','Quote',
        'z','x','c','v','b','n','m','Comma','Period','Slash','spacekey'
    ]

    let key = keyArr[Math.floor(Math.random() * keyArr.length)];
    document.querySelectorAll('.key').forEach(element => {
        element.classList.remove('key-pressed');
        setTimeout(() => {
            element.classList.remove('key-correct');
            element.classList.remove('key-incorrect');
        }, 300);
    });
    document.querySelector(`.${key}`).classList.add('key-pressed');

    switch (key) {
        case 'BracketLeft':
            randKey = '[';
            break;
        case 'BracketRight':
            randKey = ']';
            break;
        case 'Semicolon':
            randKey = ';';
            break;
        case 'Quote':
            randKey = '\'';
            break;
        case 'Comma':
            randKey = ',';
            break;
        case 'Period':
            randKey = '.';
            break;
        case 'Slash':
            randKey = '/';
            break;
        case 'spacekey':
            randKey = 'SPACE'
            break;
        default:
            randKey = key;
            break;
    }
    return randKey;
}

function pressedAnim(key) {
      let classKey
      switch (key) {
        case '[':
            classKey = 'BracketLeft';
            break;
        case ']':
            classKey = 'BracketRight';
            break;
        case ';':
            classKey = 'Semicolon';
            break;
        case '\'':
            classKey = 'Quote';
            break;
        case ',':
            classKey = 'Comma';
            break;
        case '.':
            classKey = 'Period';
            break;
        case '/':
            classKey = 'Slash';
            break;
        case ' ':
            classKey = 'spacekey'
            break;
        default:
            classKey = key;
            break;
    }

      return classKey;
    }

function changeMenuLabels(label, counter) {
    if (counter == 10) {
        label.classList.add('fade-out')
        setTimeout(() => {
            label.innerHTML = "YEAH WE DON'T HAVE A SCORE HERE :("
            label.classList.remove('fade-out')
        }, 500);
    }
}
document.addEventListener('keydown', keyboardTest)
window.addEventListener('blur', (e) => {
    setTimeout(() => {
        pauseMenu(e);
        keyboardTest.pause = isPause();
        pauseContainer.style.display = 'flex';
        keyboardContainer.classList.add('blur');
    }, 30000);
});

/****************************
||||
||||
\__/
 ||
 ||
 ||
 ||   here's a fork for my spaghetti
 ""
 *******************************/
