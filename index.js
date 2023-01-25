const buttonElements = document.querySelectorAll('button');
let row = 1; // Número total de columnas
let letter = 1; // Número total de filas
let points = 0;
const wordCollection = ['abeto', 'actor', 'aguas']; //
//const wordForTheDay = 'Shout'; // Este valor es definido por una función que escoge una palabra aleatria de toda una colección de palabras no mayores a 5 caracteres.
const wordElements = document.querySelectorAll('.words-row');// Esta variable trae consigo la palabra, ya que la clase 'words-row' contiene 5 valores que se ingresan en los contenedores.
let gameOver = false; //
let guessedCorrectly = false; //

buttonElements.forEach((element) => {
    element.addEventListener('click',function (){ //Cuando el botón es presionado, éste ejecuta la función keypress
        keypress(element.attributes["data-key"].value) //data-key es el valor que cada botón tiene asignado en el html.
    });
});

function populateWord(key) { // La función principal de este arreglo es verficar que el valor en los contenedores no supere los 5.
    if (letter < 6){
        wordElements[row - 1 ].querySelectorAll('.word')[letter - 1].innerText = key; // Se agrega a cada contenedor el valor ingresado
        letter += 1;                                                                  //y aumenta el valor de la variable letter para que se
                                                                                      // recorra, ejecutando la psoción: (1,1),(1,2),(1,3),(1,4),(1,5)
    }
}

const prueba = wordCollection[Math.floor(Math.random() * wordCollection.length)]

function checkWord() {
    const letterElements = wordElements[row - 1].querySelectorAll('.word'); // La función trae los valores en los contenedores y los
    let numCorrectLetter = 0;                                                 // compara, revisando que sean el mismo valor que hay en la variable

    letterElements.forEach((element, index) => {//wordForTheDay
        const indexOfLetterInWordOfTheDay = prueba.toLowerCase().indexOf
        (element.innerText.toLowerCase());

        if(indexOfLetterInWordOfTheDay === index){ // En caso de que alguno de los valores esté dentro de la variable y esté en la misma posición, le asigna la clase
            numCorrectLetter += 1;
            element.classList.add('correctPosition');// correctPosition y le cambia el color del fondo y la letra.
        }else if(indexOfLetterInWordOfTheDay > 0){ // En caso de que alguno de los valores esté dentro de la variable pero no esté en la misma posición, le asigna la clase
            element.classList.add('badPosition'); // badPosition y le cambia el color del fondo y la letra.
        } else {
            element.classList.add('notInTheWord'); //Ya para descartar la última opicón, es porque este no está en la variable y no forma parte de la palabra.
        }
    });
    if(numCorrectLetter === 5){
        gameOver = true;
        guessedCorrectly = true;

        alert('You have done! Congratulations, now you have 1 point more. :D')
    }
}

function enterWord() {
    if (letter < 6){ // Si el valor de valores en los divs es menor a 6, le menciona al usuario que le faltan valores por ingresar.
        alert('Not enough letters');
    } else{
        checkWord(); // Si el total del valores es de 5, entonces les aplica el la función checKWord
        row += 1; // Después de verificar la palabra, termina aumentando el valor de la columna y reiniciando el valor de la fila
        letter = 1; // Así comienza una nueva fila: (2,1),(2,2),(2,3),(2,4),(2,5) y aspi sucesivamente hasta terminar en: (6,5) y aplicando la función reset.
    }
}

function deleteLetter() {
    const letterElements = wordElements[row - 1].querySelectorAll('.word'); //

    for (let index = letterElements.length - 1; index >= 0; index--){
        const element = letterElements[index]; // El elemento almacena la posición del último valor y lo compara para ver si contiene algún valor o está vacío, si lo está, decrementa y continua
        if (element.innerText !== ''){ //Ésta función tiene como utilidad usar el tamaño de los elemntos en la cuadricula
            element.innerText = '';     //como un valor para ir regresando y vaciando el div en caso de que tenga algún valor.
            letter -= 1; // Decremento en la variable.
            break;
        }
    }
}


function keypress(key) {
    if (key.toLowerCase() === 'enter'){ //Al momento de presionar el data-key (enter) y si concuerda con enter, ejecuta la función enterWord.
        enterWord();
    } else if (key.toLowerCase() === 'del'){ //Al momento de presionar el data-key (enter) y si concuerda con enter, ejecuta la función enter.
        deleteLetter();
    } else {                                // De lo contrario,al ingresar algún otro data-key, aplica la función populateWord
        populateWord(key);
    }
}

