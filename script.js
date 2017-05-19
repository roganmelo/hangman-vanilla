let attempts = 5;
let errors = 0;
let word = '';
let display = document.querySelector('.word');

const prepareWord = () => {
  let words = [
    'ABACATE', 'ABACAXI', 'ACEROLA', 'AMEIXA', 'AMORA', 'ANONA', 'ARATICUM', 'ATEMOIA', 'BANANA', 'CAJU', 'CAQUI', 'CARAMBOLA', 'CEREJA', 'COCO', 'CUPUAÇU', 'DAMASCO', 'FEIJOA', 'FIGO', 'FRAMBOESA', 'GOIABA', 'GOJI', 'GRAVIOLA', 'GROSELHA', 'GRUMIXAMA', 'JABUTICABA', 'JACA', 'JAMBO', 'KINO', 'KIWI', 'LARANJA', 'LICHIA', 'LONGAN', 'MAÇÃ', 'MAMÃO', 'MANGA', 'MANGOSTIM', 'MARMELO', 'MELANCIA', 'MEXERICA', 'MIRTILO', 'MORANGO', 'NECTARINA', 'NONI', 'PEQUI', 'PERA', 'PÊSSEGO', 'PHYSALIS', 'PINHA', 'PITANGA', 'PITAYA', 'ROMÃ', 'SAPOTI', 'TAMARILLO', 'TAMARINDO', 'TANGERINA', 'TOMATE', 'TORANJA', 'VAGEM', 'UVA', 'UGLI'
  ];
  word = words[Math.floor(Math.random() * 60) + 1];
  word = word.split('');
  display.textContent = word.map(l => '_').join(' ');
}

const createAlphabetKeyboard = () => {
  let keyboard = document.querySelector('.letters');
  let alphabet = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];

  for(let i = 0; i < alphabet.length; i++) {
    let letter = alphabet[i];
    keyboard.innerHTML += `<span id="${letter}" class="letter" onclick="clickEvent(event)">${letter}</span>`;
  }
}

const clickEvent = (event) => {
  console.log('test');
  chooseLetter(event.target, event.target.textContent);
}

const keypressEvent = (event) => {
  let target = document.querySelector(`#${event.key.toUpperCase()}`);
  chooseLetter(target, event.key.toUpperCase());
}

const chooseLetter = (target, letter) => {
  let initialTextContent = display.textContent;
  let textContent = display.textContent.split(' ');

  for(let i = 0; i < word.length; i++) {
    if(word[i] === letter) {
      textContent[i] = letter;
    }

    display.textContent = textContent.join(' ');
  }

  if(initialTextContent === textContent.join(' ')) {
    target.className += ' error';
    errors++;

    if(errors >= attempts) {
      document.querySelector('.content').innerHTML = `
        <span class="result-text">YOU LOSE!</span>
        <span class="result-text">WORD: ${word.join('')}</span>
      `;
    }
  } else if(textContent.indexOf('_') === -1) {
    document.querySelector('.content').innerHTML = `<span class="result-text">YOU WIN!</span>`;
  } else {
    target.className += ' correct';
  }

  target.className += ' selected';
}

prepareWord();
createAlphabetKeyboard();
