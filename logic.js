
// GLOBAL VARIABLES
// =======================================================================================
var possibleWords = ['pull-up-with-the-sticks', 'pump-shotty', 'tilted-towers', 'double-pump', 'battle-bus', 'tomato-town', 'trump-tower', 'battle-royale', '"revive-me-bro!!!"', 'salty-springs', 'retail-row', 'any-extra-shield?'];
var rand;
var currentWord;
var availableLetters = [];
var userChoice;
var wordToGuess = document.getElementById('wordToGuess');
var incorrectDom = document.getElementById('incorrectLetters');
var healthBar = document.getElementById('healthBarInner');
var consoleLog = document.getElementById('consoleLog'); 
var scoreDisplay = document.getElementById('score');
var healthDisplay = document.getElementById('healthDisplay')
var newWord = document.getElementById('newWord');
var gifContainer = document.getElementById('gifContainer');
var popUp = document.getElementById('test');
var displayToDom = [];
var guessedLetters = [];
var incorrectLetters = [];
var health = 100;
var lives = 10;
var score = 0;
var gameScore = 0;
var isPlaying = true;
var messagesToDisplay = { 
        youWin: 'You win! press "New Word" to get a new word to guess.',
        youLose: 'You lost!! Press "Reset" if you would like to keep playing.',
        alreadyPicked: 'You\'ve already picked this letter.',
        notLetter: 'Please choose a letter.',
        wrongLetter: ' was incorrect.', // After much debugging.. I caved and put userChoice as a parameter of the consoleLog function.
    };
var gifObject = {
    youWin: "<img src='https://thumbs.gfycat.com/RigidFlickeringIndianringneckparakeet-size_restricted.gif'alt='You win!!' />",
    youLose: "<img src='https://thumbs.gfycat.com/ElasticPinkBluetickcoonhound-size_restricted.gif' alt = 'You lose!!' />",
}


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
        health = 100;
        lives = 10;
        score = 0;
        healthBar.style.width = "100%";
        this.createUnderscores();
        this.updateScreen();
    },
    getNewWord: function(){
        availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        rand = Math.floor(Math.random() * possibleWords.length);
        currentWord = possibleWords[rand];
        isPlaying = true;
        guessedLetters = [];
        incorrectLetters = [];
        displayToDom = [];
        gifContainer.innerHTML = "";
        consoleLog.innerHTML = "";
        health = 100;
        lives = 10;
        score = 0;
        healthBar.style.width = "100%";
        this.createUnderscores();
        this.updateScreen();
    },
    createUnderscores: function(){
        for (var i = 0; i < currentWord.length; i++){
            if (availableLetters.includes(currentWord[i])){
                displayToDom.push('_');
            }
            else {
                displayToDom.push(currentWord[i]);
                score += 1;
            }
        };
    },
    updateScreen: function(){
        wordToGuess.innerHTML = displayToDom.join(' ');
        incorrectDom.innerHTML = incorrectLetters.join(', ');
        healthDisplay.innerHTML = health + ' / 100';
        scoreDisplay.innerHTML = gameScore;
    },
    updateGif: function(gif){
        gifContainer.innerHTML = gif;
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
                        this.updateGif(gifObject.youWin);
                        this.updateConsole(messagesToDisplay.youWin);
                        this.updateScreen();
                        
                    }
                }
                // If letter chosen IS NOT IN current word
                else {
                    lives -= 1;
                    health -= 10;
                    incorrectLetters.push(chosen);
                    healthBar.style.width = health + '%';
                    this.updateScreen();
                    this.updateConsole('"' + chosen + '"' + messagesToDisplay.wrongLetter);
                    if (lives == 0){
                        isPlaying = false;
                        gameScore = 0;
                        newWord.innerText = 'Reset';
                        this.updateScreen();
                        wordToGuess.innerText = currentWord;
                        this.updateConsole(messagesToDisplay.youLose);
                        this.updateGif(gifObject.youLose);
                    }
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
    if (isPlaying == true){
        userChoice = event.key.toLowerCase();
        gameFunctions.userGuess(userChoice);
    }
    else {
        alert('You lost!! Maybe press "New word" and see what happens?? idk..');
    }
};


var escBtn = document.getElementById('escBtn');

function togglePopUp(){
    popUp.style.display = 'none';
    console.log('it worked');
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