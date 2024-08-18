const fakeContainer = document.querySelector('.fake-container');

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

function fakeTyping(event) {
    const key = event.key;
    (!fakeTyping.pause)? fakeTyping.pause = false : false;
    (!fakeTyping.counter)? fakeTyping.counter = 0 : 0;

    if (key === 'Escape') {
        fakeTyping.pause = isPause();
        pauseContainer.style.display = fakeTyping.pause ? "flex" : "none";
        fakeContainer.classList.toggle('blur', fakeTyping.pause);
    }

    if (fakeTyping.pause) {
        pauseContainer.addEventListener('keypress', pauseMenu(event))
    } else if (!fakeTyping.pause) {
        // CODE HERE
        let charNode = fakeContainer.children[fakeTyping.counter];

        // console.log(charNode)
        charNode.classList.add('correct');
        fakeTyping.counter++;
        if (fakeTyping.counter == fakeContainer.children.length) {
            fakeTyping.counter = 0;
            // let arr = fakeContainer
            // arr.forEach(span => {
            //     span.classList.remove('correct')
            // });
            // console.log(fakeContainer)
        }
        console.log(fakeTyping.counter)
    }
}


function dispayText() {
    let text = "I am lazy to do this part."
    text = text.split('');
    text.forEach(el => {
        let textSpan = document.createElement('span');
        textSpan.innerHTML = (el == ' ')? '&nbsp;' : el;
        fakeContainer.appendChild(textSpan);
    });
}

document.addEventListener('keydown', fakeTyping);
dispayText();


// TO DOOOOO
