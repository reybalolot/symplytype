// Keyboard Mode Functions
function getKey() {
    let characters = 'abcdefghijklmnopqrstuvwxyz,./;\'[]'
    let randKey = keys[Math.floor(Math.random() * keys.length)];
    randKey.classList.add('key-pressed')

    return randKey;
}

function checkKey(key, activeKey) {
    if (key == activeKey.innerHTML) {
        activeKey.classList.remove('key-pressed');
        console.log("correct");
    } else {
        console.log("wrong")
    }
}
