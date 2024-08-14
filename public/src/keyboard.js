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

function keyboardTest(event){
    const key = event.key;
    (!keyboardTest.pause)? keyboardTest.pause = false : false;

    if (key === 'Escape') {
        keyboardTest.pause = isPause();
        pauseContainer.style.display = keyboardTest.pause ? "flex" : "none";
    }

    if (keyboardTest.pause){
        pauseContainer.addEventListener('keypress', pauseMenu(event))
    } else if (!keyboardTest.pause) {
        // CODE HERE
        console.log(key)
    }
    // checkKey(key, activeKey)
}
document.addEventListener('keydown', keyboardTest)
