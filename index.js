import {
    KEY_CODE,
    KEYS_EN,
    KEYS_EN_CAPS,
    KEYS_RU,
    KEYS_RU_CAPS
} from './keys.js';

class Keyboard {
    constructor (KEYS) {
        this.KEYS = KEYS;
        this.isShift = false;
        this.isCaps = false;
    };
    init() {
        document.querySelector('body').innerHTML = `
        <textarea class="textarea"></textarea>
        <h1>shift+alt to change lang</h1>
        <div class="keyboard">
            <div class="keyboard__keys">
            </div>
        </div>
        `;
    };
    lang_set(KEYS) {
        for(let i = 0; i < KEYS.length; i++) {
            if(i === 14 || i === 29 || i === 42 || i === 55) {
                document.querySelector('.keyboard__keys').innerHTML += `<div class="clearfix"></div>`;
            }
            KEYS[i] === 'Backspace' || KEYS[i] === 'CapsLock' || KEYS[i] === 'Shift' || KEYS[i] === 'Enter'
            ? document.querySelector('.keyboard__keys').innerHTML += `<div class="keyboard__key keyboard__key--wide" data="${KEY_CODE[i]}">${KEYS[i]}</div>`
            : KEYS[i] === 'Space'
            ? document.querySelector('.keyboard__keys').innerHTML += `<div class="keyboard__key keyboard__key--super-wide" data="${KEY_CODE[i]}">${KEYS[i]}</div>`
            : document.querySelector('.keyboard__keys').innerHTML += `<div class="keyboard__key" data="${KEY_CODE[i]}">${KEYS[i]}</div>`;
        }
    };
    lang_remove() {
        document.querySelector('.keyboard__keys').innerHTML = '';
    }
}
window.onload = function() {
    let KEYS = KEYS_RU;
    
    const keyboard = new Keyboard(KEYS);

    let isCaps = false;
    let isShift = false;

    keyboard.init();
    keyboard.lang_set(KEYS);


    document.querySelectorAll('.keyboard__key').forEach(function(element) { 
        element.onclick = function(event) {
            document.querySelectorAll('.keyboard__key').forEach(function(element) { 
                element.classList.remove('active');
            });
            if(this.getAttribute('data') === 'ShiftLeft') {
                
            }
        }
    });

    document.onkeydown = function (event) {
        document.querySelectorAll('.keyboard__key').forEach(element => {
            if(element.code !== 'ShiftLeft') {
                element.classList.remove('active');
            }
        });
        document.querySelector(`.keyboard__key[data="${event.code}"]`).classList.add('active');

        if(event.code === 'ShiftLeft') {
            isShift = true;
            keyboard.lang_remove();
            switch(KEYS) {
                case KEYS_RU:
                    KEYS = KEYS_RU_CAPS;
                    break;
                case KEYS_RU_CAPS:
                    KEYS = KEYS_RU;
                    break;
                case KEYS_EN:
                    KEYS = KEYS_EN_CAPS;
                    break;
                case KEYS_EN_CAPS:
                    KEYS = KEYS_EN;
                    break;
            }
            keyboard.lang_set(KEYS);
        }
        if(event.code === 'AltLeft' && isShift) {
            keyboard.lang_remove();
            switch(KEYS) {
                case KEYS_RU:
                    KEYS = KEYS_EN;
                    break;
                case KEYS_RU_CAPS:
                    KEYS = KEYS_EN_CAPS;
                    break;
                case KEYS_EN:
                    KEYS = KEYS_RU;
                    break;
                case KEYS_EN_CAPS:
                    KEYS = KEYS_RU_CAPS;
                    break;
            }
            keyboard.lang_set(KEYS);
        }
        if(event.code === 'CapsLock') {
            if(isCaps === true) {
                isCaps = false;
            }
            else {
                keyboard.lang_remove();
                switch(KEYS) {
                    case KEYS_RU:
                        KEYS = KEYS_RU_CAPS;
                        break;
                    case KEYS_RU_CAPS:
                        KEYS = KEYS_RU;
                        break;
                    case KEYS_EN:
                        KEYS = KEYS_EN_CAPS;
                        break;
                    case KEYS_EN_CAPS:
                        KEYS = KEYS_EN;
                        break;
                }
                keyboard.lang_set(KEYS);
                isCaps = false;
            }
        }
    }
    document.onkeyup = function (event) {
        document.querySelectorAll('.keyboard__key').forEach(element => {
            if(element !== document.querySelector(`.keyboard__key[data="CapsLock"]`)) {
                element.classList.remove('active');
            }
            else if (isCaps === true) {
                element.classList.remove('active');
            }
        });
        if(event.code === 'ShiftLeft') {
            keyboard.lang_remove();
            switch(KEYS) {
                case KEYS_RU:
                    KEYS = KEYS_RU_CAPS;
                    break;
                case KEYS_RU_CAPS:
                    KEYS = KEYS_RU;
                    break;
                case KEYS_EN:
                    KEYS = KEYS_EN_CAPS;
                    break;
                case KEYS_EN_CAPS:
                    KEYS = KEYS_EN;
                    break;
            }
            keyboard.lang_set(KEYS);
            isShift = false;
        }
    }
}