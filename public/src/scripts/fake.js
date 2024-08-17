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

    if (key === 'Escape') {
        fakeTyping.pause = isPause();
        pauseContainer.style.display = fakeTyping.pause ? "flex" : "none";
        fakeContainer.classList.toggle('blur', fakeTyping.pause);
    }

    if (fakeTyping.pause) {
        pauseContainer.addEventListener('keypress', pauseMenu(event))
    } else if (!fakeTyping.pause) {
        // CODE HERE
        let counter = 0;
        let text = "I am lazy to do this."
        text = text.split('');

        window.addEventListener('keypress', (e) => {
            let textSpan = document.createElement('span');
            textSpan.innerText = text[counter];
            fakeContainer.appendChild(textSpan);
            console.log(textSpan);
        });

        window.addEventListener('keyup', () => counter++);
        console.log('acasacakbkhj')
    }
}

document.addEventListener('keydown', fakeTyping)



// TO DOOOOO
