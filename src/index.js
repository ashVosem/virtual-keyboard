import {
  KEY_CODE,
  KEYS_EN,
  KEYS_EN_CAPS,
  KEYS_RU,
  KEYS_RU_CAPS,
} from './keys.js';

class Keyboard {
  constructor() {
    this.isEng = JSON.parse(localStorage.getItem('isEng'));
  }

  init() {
    if (this.isEng === false) {
      document.querySelector('body').innerHTML = `
        <textarea class="textarea" readonly></textarea>
        <h1>shift+ctrl to change lang</h1>
        <div class="keyboard">
            <div class="keyboard__keys current" data="RU">
            </div>
            <div class="keyboard__keys disable" data="EN">
            </div>
            <div class="keyboard__keys disable" data="RU_CAPS">
            </div>
            <div class="keyboard__keys disable" data="EN_CAPS">
            </div>
        </div>
        `;
    } else if (this.isEng === true) {
      document.querySelector('body').innerHTML = `
        <textarea class="textarea" readonly></textarea>
        <h1>shift+ctrl to change lang</h1>
        <div class="keyboard">
            <div class="keyboard__keys disable " data="RU">
            </div>
            <div class="keyboard__keys current" data="EN">
            </div>
            <div class="keyboard__keys disable" data="RU_CAPS">
            </div>
            <div class="keyboard__keys disable" data="EN_CAPS">
            </div>
        </div>
        `;
    }
  }

  lang_set(KEYS, LANG) {
    for (let i = 0; i < KEYS.length; i++) {
      if (i === 14 || i === 28 || i === 41 || i === 54) {
        document.querySelector(`.keyboard__keys[data="${LANG}"]`).innerHTML += '<div class="clearfix"></div>';
      }
      KEYS[i] === 'Backspace' || KEYS[i] === 'CapsLock' || KEYS[i] === 'Shift' || KEYS[i] === 'Enter' || KEYS[i] === 'Tab'
        ? document.querySelector(`.keyboard__keys[data="${LANG}"]`).innerHTML += `<div class="keyboard__key keyboard__key--wide" data="${KEY_CODE[i]}">${KEYS[i]}</div>`
        : KEYS[i] === 'Space'
          ? document.querySelector(`.keyboard__keys[data="${LANG}"]`).innerHTML += `<div class="keyboard__key keyboard__key--super-wide" data="${KEY_CODE[i]}">${KEYS[i]}</div>`
          : document.querySelector(`.keyboard__keys[data="${LANG}"]`).innerHTML += `<div class="keyboard__key" data="${KEY_CODE[i]}">${KEYS[i]}</div>`;
    }
  }

  switch_lang(from, to) {
    document.querySelector(`.keyboard__keys[data=${from}]`).classList.remove('current');
    document.querySelector(`.keyboard__keys[data=${from}]`).classList.add('disable');

    document.querySelector(`.keyboard__keys[data=${to}]`).classList.remove('disable');
    document.querySelector(`.keyboard__keys[data=${to}]`).classList.add('current');
  }

  press_action() {
    let lang;

    this.isEng === false ? lang = 'RU' : lang = 'EN';

    let isShift = false;
    let isCaps = false;

    const thi$ = this; // bad code as lifestyle sorry

    const text = [];

    document.querySelectorAll('.keyboard__key').forEach((element) => {
      element.onmousedown = function (event) {
        document.querySelectorAll('.keyboard__key').forEach((element) => {
          element.classList.remove('active');
        });
        // SHIFT
        if (this.getAttribute('data') === 'ShiftLeft' || this.getAttribute('data') === 'ShiftRight') {
          isShift = true;
          switch (lang) {
            case 'RU':
              thi$.switch_lang('RU', 'RU_CAPS');
              this.getAttribute('data') === 'ShiftLeft'
                ? document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftLeft]').classList.add('active')
                : document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftRight]').classList.add('active');
              lang = 'RU_CAPS';
              break;
            case 'RU_CAPS':
              thi$.switch_lang('RU_CAPS', 'RU');
              this.getAttribute('data') === 'ShiftLeft'
                ? document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftLeft]').classList.add('active')
                : document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftRight]').classList.add('active');
              lang = 'RU';
              break;
            case 'EN':
              thi$.switch_lang('EN', 'EN_CAPS');
              this.getAttribute('data') === 'ShiftLeft'
                ? document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftLeft]').classList.add('active')
                : document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftRight]').classList.add('active');
              lang = 'EN_CAPS';
              break;
            case 'EN_CAPS':
              thi$.switch_lang('EN', 'EN_CAPS');
              this.getAttribute('data') === 'ShiftLeft'
                ? document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftLeft]').classList.add('active')
                : document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftRight]').classList.add('active');
              lang = 'EN';
              break;
          }
        } else {
          element.classList.add('active');

          switch (element.innerHTML) {
            case 'Ctrl':
              break;
            case 'CapsLock':
              break;
            case 'Win':
              break;
            case 'Alt':
              break;
            case 'Backspace':
              text.pop();
              document.querySelector('textarea').innerText = `${text.join('')}_`;
              break;
            case 'Enter':
              text.push('\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'); // got problems with \n\r
              document.querySelector('textarea').innerText = `${text.join('')}_`;
              break;
            case 'Tab':
              text.push('\t');
              document.querySelector('textarea').innerText = `${text.join('')}_`;
              break;
            case 'Space':
              text.push(' ');
              document.querySelector('textarea').innerText = `${text.join('')}_`;
              break;
            default:
              text.push(`${element.innerText}`);
              document.querySelector('textarea').innerText = `${text.join('')}_`;
              break;
          }
        }
        if (this.getAttribute('data') === 'CapsLock') {
          if (!isCaps) {
            isCaps = true;
          } else {
            isCaps = false;
          }
          switch (lang) {
            case 'RU':
              thi$.switch_lang('RU', 'RU_CAPS');
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              lang = 'RU_CAPS';
              break;
            case 'RU_CAPS':
              thi$.switch_lang('RU_CAPS', 'RU');
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              lang = 'RU';
              break;
            case 'EN':
              thi$.switch_lang('EN', 'EN_CAPS');
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              lang = 'EN_CAPS';
              break;
            case 'EN_CAPS':
              thi$.switch_lang('EN_CAPS', 'EN');
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              lang = 'EN';
              break;
          }
        }
      };
      element.onmouseup = function (event) {
        if (this.getAttribute('data') === 'ShiftLeft' || this.getAttribute('data') === 'ShiftRight') {
          isShift = false;
          switch (lang) {
            case 'RU':
              thi$.switch_lang('RU', 'RU_CAPS');
              lang = 'RU_CAPS';
              break;
            case 'RU_CAPS':
              thi$.switch_lang('RU_CAPS', 'RU');
              lang = 'RU';
              break;
            case 'EN':
              thi$.switch_lang('EN', 'EN_CAPS');
              lang = 'EN';
              break;
            case 'EN_CAPS':
              thi$.switch_lang('EN_CAPS', 'EN');
              lang = 'EN_CAPS';
              break;
          }
        } else {
          element.classList.remove('active');
        }
        if (this.getAttribute('data') === 'CapsLock' && !isCaps) {
          switch (lang) {
            case 'RU':
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              break;
            case 'RU_CAPS':
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              break;
            case 'EN':
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              break;
            case 'EN_CAPS':
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              break;
          }
        }
      };
    });

    document.querySelectorAll('.keyboard__key').forEach(() => {
      document.onkeydown = function (event) {
        event.preventDefault();
        document.querySelectorAll('.keyboard__key').forEach((element) => {
          element.classList.remove('active');
        });
        document.querySelector(`.current > .keyboard__key[data="${event.code}"]`).classList.add('active');
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          isShift = true;
          switch (lang) {
            case 'RU':
              thi$.switch_lang('RU', 'RU_CAPS');
              event.code === 'ShiftLeft'
                ? document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftLeft]').classList.add('active')
                : document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftRight]').classList.add('active');
              lang = 'RU_CAPS';
              break;
            case 'RU_CAPS':
              thi$.switch_lang('RU_CAPS', 'RU');
              event.code === 'ShiftLeft'
                ? document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftLeft]').classList.add('active')
                : document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftRight]').classList.add('active');
              lang = 'RU';
              break;
            case 'EN':
              thi$.switch_lang('EN', 'EN_CAPS');
              event.code === 'ShiftLeft'
                ? document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftLeft]').classList.add('active')
                : document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftRight]').classList.add('active');
              lang = 'EN_CAPS';
              break;
            case 'EN_CAPS':
              thi$.switch_lang('EN_CAPS', 'EN');
              event.code === 'ShiftLeft'
                ? document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftLeft]').classList.add('active')
                : document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=ShiftRight]').classList.add('active');
              lang = 'EN';
              break;
          }
        }
        if (event.code === 'ControlLeft' && isShift || event.code === 'ControlRight' && isShift) {
          switch (lang) {
            case 'RU':
              thi$.switch_lang('RU', 'EN');
              lang = 'EN';
              localStorage.setItem('isEng', true);
              break;
            case 'RU_CAPS':
              thi$.switch_lang('RU_CAPS', 'EN_CAPS');
              lang = 'EN_CAPS';
              localStorage.setItem('isEng', true);
              break;
            case 'EN':
              thi$.switch_lang('EN', 'RU');
              lang = 'RU';
              localStorage.setItem('isEng', false);
              break;
            case 'EN_CAPS':
              thi$.switch_lang('EN_CAPS', 'RU_CAPS');
              lang = 'RU_CAPS';
              localStorage.setItem('isEng', false);
              break;
          }
        }
        if (event.code === 'CapsLock') {
          if (!isCaps) {
            isCaps = true;
          } else {
            isCaps = false;
          }
          switch (lang) {
            case 'RU':
              thi$.switch_lang('RU', 'RU_CAPS');
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              lang = 'RU_CAPS';
              break;
            case 'RU_CAPS':
              thi$.switch_lang('RU_CAPS', 'RU');
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              lang = 'RU';
              break;
            case 'EN':
              thi$.switch_lang('EN', 'EN_CAPS');
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              lang = 'EN_CAPS';
              break;
            case 'EN_CAPS':
              thi$.switch_lang('EN_CAPS', 'EN');
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              lang = 'EN';
              break;
          }
        }
        const element = document.querySelector(`.current > .keyboard__key[data="${event.code}"]`).innerText;
        switch (element) {
          case 'Ctrl':
            break;
          case 'CapsLock':
            break;
          case 'Win':
            break;
          case 'Alt':
            break;
          case 'Shift':
            break;
          case 'Backspace':
            text.pop();
            document.querySelector('textarea').innerText = `${text.join('')}_`;
            break;
          case 'Enter':
            text.push('\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'); // got problems with \n\r
            document.querySelector('textarea').innerText = `${text.join('')}_`;
            break;
          case 'Tab':
            text.push('\t');
            document.querySelector('textarea').innerText = `${text.join('')}_`;
            break;
          case 'Space':
            text.push(' ');
            document.querySelector('textarea').innerText = `${text.join('')}_`;
            break;
          default:
            text.push(`${element}`);
            document.querySelector('textarea').innerText = `${text.join('')}_`;
            break;
        }
      };
      document.onkeyup = function (event) {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          isShift = false;
          switch (lang) {
            case 'RU':
              thi$.switch_lang('RU', 'RU_CAPS');
              lang = 'RU_CAPS';
              break;
            case 'RU_CAPS':
              thi$.switch_lang('RU_CAPS', 'RU');
              lang = 'RU';
              break;
            case 'EN':
              thi$.switch_lang('EN', 'EN_CAPS');
              lang = 'EN_CAPS';
              break;
            case 'EN_CAPS':
              thi$.switch_lang('EN_CAPS', 'EN');
              lang = 'EN';
              break;
          }
        }
        if (event.code === 'CapsLock' && !isCaps) {
          switch (lang) {
            case 'RU':
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              break;
            case 'RU_CAPS':
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              break;
            case 'EN':
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              break;
            case 'EN_CAPS':
              document.querySelector('.keyboard__keys[data=RU_CAPS] > .keyboard__key[data=CapsLock]').classList.add('active');
              break;
          }
        }
        document.querySelectorAll('.keyboard__key').forEach((element) => {
          element.classList.remove('active');
        });
      };
    });
  }
}
window.onload = function () {
  if (!(JSON.parse(localStorage.getItem('isEng')))) {
    localStorage.setItem('isEng', false);
  }

  const keyboard = new Keyboard();

  keyboard.init();

  keyboard.lang_set(KEYS_RU, 'RU');
  keyboard.lang_set(KEYS_RU_CAPS, 'RU_CAPS');
  keyboard.lang_set(KEYS_EN, 'EN');
  keyboard.lang_set(KEYS_EN_CAPS, 'EN_CAPS');

  keyboard.press_action();
};
