const buttonElements = document.querySelectorAll('button');
let row = 1;
let letter = 1;
const wordForTheDay = 'Shout';
const wordElements = document.querySelectorAll('.words-row');

buttonElements.forEach((element) => {
    element.addEventListener('click',function (){
        keypress(element.attributes["data-key"].value)
    });
});

function populateWord(key) {
    if (letter < 6){
        wordElements[row - 1 ].querySelectorAll('.word')[letter - 1].innerText = key;
        letter += 1;
    }
}

function checkWord() {
    const letterElements = wordElements[row - 1].querySelectorAll('.word');

    letterElements.forEach((element, index) => {
        const indexOfLetterInWordOfTheDay = wordForTheDay.toLowerCase().indexOf
        (element.innerText.toLowerCase());

        if(indexOfLetterInWordOfTheDay === index){
            element.classList.add('correctPosition');
        }else if(indexOfLetterInWordOfTheDay > 0){
            element.classList.add('badPosition');
        } else {
            element.classList.add('notInTheWord');
        }
    });
}

function enterWord() {
    if (letter < 6){
        alert('Not enough letters');
    } else{
        checkWord();
        row += 1;
        letter += 1;
    }
}

function deleteLetter() {
    const letterElements = wordElements[row - 1].querySelectorAll('.word');

    for (let index = letterElements.length - 1; index >= 0; index--){
        const element = letterElements[index];
        if (element.innerText !== ''){
            element.innerText = '';
            letter -= 1;
            break;
        }
    }
}


function keypress(key) {
    if (key.toLowerCase() === 'enter'){
        enterWord();
    } else if (key.toLowerCase() === 'del'){
        deleteLetter();
    } else {
        populateWord(key);
    }
}