
// GLOBAL VARIABLES
// =======================================================================================
var possibleWords = ['happy', 'california', 'peace', 'shoeshine'];
var rand;
var currentWord;
var availableLetters = [];
var userChoice;
var wordToGuess = document.getElementById('wordToGuess');
var incorrectDom = document.getElementById('incorrectLetters');
var lettersRemaining = document.getElementById('availableLetters');
var consoleLog = document.getElementById('consoleLog'); 
var scoreDisplay = document.getElementById('score');
var displayToDom = [];
var guessedLetters = [];
var incorrectLetters = [];
var lives = 5;
var score = 0;
var gameScore = 0;
var placeHolder = incorrectLetters[incorrectLetters.length - 1];
var messagesToDisplay = { 
        youWin: 'You win! press "New Word" to get a new word to guess',
        alreadyPicked: 'You\'ve already picked this letter.',
        notLetter: 'This is not a letter',
        wrongLetter: ' was incorrect.', // After much debugging.. I caved and put userChoice as a parameter of the consoleLog function.
    };


// END GLOBAL VARIABLES
// =======================================================================================
console.log(currentWord);
// GAME FUNCTIONS (stored in an object)
// =======================================================================================
var gameFunctions = {
    startGame: function(){
        availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        rand = Math.floor(Math.random() * possibleWords.length);
        currentWord = possibleWords[rand];
        guessedLetters = [];
        incorrectLetters = [];
        displayToDom = [];
        lives = 5;
        score = 0;
        this.createUnderscores();
        this.updateScreen();
    },
    createUnderscores: function(){
        for (var i = 0; i < currentWord.length; i++){
            displayToDom.push('_');
        };
    },
    updateScreen: function(){
        wordToGuess.innerHTML = displayToDom.join(' ');
        incorrectDom.innerHTML = incorrectLetters.join(', ');
        lettersRemaining.innerHTML = availableLetters.join(', ');
        scoreDisplay.innerHTML = gameScore;
    },
    updateConsole: function (message){ 
        consoleLog.innerText = message;
    },
    userGuess: function(chosen){
        //  Check if selection is a valid character, if true.. continue
        if (availableLetters.includes(chosen)){
            // Remove it from list of array of available letters
            availableLetters.splice(availableLetters.indexOf(chosen), 1);
            // Check if letter has not been chosen already, if true.. continue
            if (guessedLetters.includes(chosen) == false){
                // Add to guessed letters array
                guessedLetters.push(userChoice);
                // Check if letter chosen IS IN the current word, if true.. continue
                if (currentWord.includes(chosen)){
                    // Loop through to match all correct letters
                    for (var y = 0; y < currentWord.length; y++){
                        // Update the array being displayed to the DOM
                        if (currentWord[y] === currentWord[currentWord.indexOf(chosen)]){
                            displayToDom[y] = chosen;
                            score += 1;
                        }
                    }
                    this.updateScreen();
                    if (score == currentWord.length){
                        gameScore += 1;
                        this.updateConsole(messagesToDisplay.youWin);
                        this.updateScreen();
                        this.startGame();
                    }
                }
                // If letter chosen IS NOT IN current word
                else {
                    lives -= 1;
                    incorrectLetters.push(chosen);
                    this.updateScreen();
                    this.updateConsole(chosen + messagesToDisplay.wrongLetter);
                };
            }
            else {
            }

        }
        else if (guessedLetters.includes(chosen)){
            this.updateConsole(messagesToDisplay.alreadyPicked);
        }
        else {
            this.updateConsole(messagesToDisplay.notLetter);
        };
    },
};
// END GAME FUNCTIONS
// =======================================================================================

window.onload = gameFunctions.startGame();

document.onkeydown = function(event){
    userChoice = event.key.toLowerCase();
    gameFunctions.userGuess(userChoice);
    
}

console.log(currentWord);



// SANDBOX 
// =======================================================================================

// Attempting to create a function that will display the propper message to the DOM.

// var consoleLog = document.getElementById('consoleLog');

// function updateConsole(message){
//     consoleLog.innerHTML = tempObj.messagesToDisplay.message;
// }

// var tempObj = {
//     messagesToDisplay: {
//         youWin: 'You win! press "New Word" to get a new word to guess',
//         alreadyPicked: 'You\'ve already picked this letter.',
//         notLetter: 'This is not a letter',
//     },
// }


// END SANDBOX
// =======================================================================================