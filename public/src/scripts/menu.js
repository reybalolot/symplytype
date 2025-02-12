const radioButtons = document.querySelectorAll('input[name="modes"]');
const mainContainer = document.querySelector('.main-container');
const menuContainer = document.querySelector('.menu-container');
const pauseContainer = document.querySelector('.pause-container');
const loadingScreen = document.querySelector('.loading');
let modeSelected;

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

// set up
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
    if (e.key === 'Enter') {
        const radioForm = document.getElementById('radioForms');
        const formData = new FormData(radioForm);
        modeSelected = formData.get('modes');

        // if (modeSelected) {
        //     fetch('http://localhost:4000/mode', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ mode : modeSelected })
        //     })
        //     .then(response => response.text())
        //     .then(data => {
            //         console.log('Processed data from server:', data);
        //     }).catch((error) => {
            //         console.error('Error:', error);
        //      })
        // }
    }
    // if (selectMode.mode != 'menu') {
    //     if (selectMode.mode == 'fake') {
    //         menuContainer.style.display = 'none';
    //         fakeContainer.style.display = 'flex';
    //     }
    //     else if (selectMode.mode == 'type') {
    //         menuContainer.style.display = 'none';
    //         typeContainer.style.display = 'flex';
    //         document.addEventListener('keydown', typingTest);
    //     }
    //     else if (selectMode.mode == 'keyboard') {
    //         menuContainer.style.display = 'none';
    //         keyboardContainer.style.display = 'flex';
    //         document.addEventListener('keydown', keyboardTest);
    //     }
    //     else if (selectMode.mode == 'pause');
    // }
});

window.addEventListener('load', () => {
    // on first visit
    if (!localStorage.getItem('visited')) {
        loadingScreen.style.display = 'flex';

        const classNames = ['.l', '.o', '.a', '.d', '.i', '.n', '.g'];
        let i = 1;
        classNames.forEach((className) => {
            setTimeout(() => {
                const key = document.querySelector(className);
                key.classList.add('chosen');
                // key.classList.add('fade');
            }, (1000 * i) / 4);
            i++;
        });

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            radioButtons[0].focus();
            radioButtons[0].checked = true;
        }, 2000);

        localStorage.setItem('visited', 'true');
    } else {
        radioButtons[0].focus();
        radioButtons[0].checked = true;
    }
});

window.addEventListener('blur', () => {
    setTimeout(() => {
        localStorage.setItem('visited', '')
    }, 50000);
})
