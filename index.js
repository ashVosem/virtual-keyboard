const KEYS_EN = ['`', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace',
        'Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", 'Delete',
        'CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", 'Enter',
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", '&uarr;', "Shift",
        "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl","&larr;", "&darr;", "&rarr;"
]
const KEYS_EN_CAPS = ['~', '!', "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Backspace',
        'Tab', "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", 'Delete',
        'CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', 'Enter',
        "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", '&uarr;', "Shift",
        "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl","&larr;", "&darr;", "&rarr;"
]
const KEYS_RU = ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace',
        'Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", 'Delete',
        'CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", 'Enter',
        "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '&uarr;', "Shift",
        "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl","&larr;", "&darr;", "&rarr;"
]
const KEYS_RU_CAPS = ['Ё', '!', '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", 'Backspace',
        'Tab', "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", 'Delete',
        'CapsLock', "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", 'Enter',
        "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", '&uarr;', "Shift",
        "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl","&larr;", "&darr;", "&rarr;"
]

document.querySelector('body').innerHTML = `
    <textarea class="textarea"></textarea>
    <h1>shift+alt to change lang</h1>
    <div class="keyboard">
        <div class="keyboard__keys">
        </div>
    </div>   
`;

function init() {
    for(let i = 0; i < KEYS_RU.length; i++) {
        if(i === 14 || i === 29 || i === 42 || i === 55) {
            document.querySelector('.keyboard__keys').innerHTML += `<div class="clearfix"></div>`;
        }
        KEYS_RU[i] === 'Backspace' || KEYS_RU[i] === 'CapsLock' || KEYS_RU[i] === 'Shift' || KEYS_RU[i] === 'Enter' 
        ? document.querySelector('.keyboard__keys').innerHTML += `<div class="keyboard__key keyboard__key--wide">${KEYS_RU[i]}</div>`
        : KEYS_RU[i] === 'Space'
        ? document.querySelector('.keyboard__keys').innerHTML += `<div class="keyboard__key keyboard__key--super-wide">${KEYS_RU[i]}</div>`
        : document.querySelector('.keyboard__keys').innerHTML += `<div class="keyboard__key">${KEYS_RU[i]}</div>`;
    }
}
init();
