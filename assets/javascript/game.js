var game = {
    animalDictionary: ["alligator", "ant", "bear", "bee", "bird", "camel", "cat", "cheetah", "chicken", "chimpanzee", "cow", "crocodile", "deer", "dog", "dolphin", "duck", "eagle", "elephant", "fish", "fly", "fox", "frog", "giraffe", "goat", "goldfish", "gorilla", "groundhog", "hamster", "hippopotamus", "hog", "horse", "kangaroo", "kitten", "lion", "lobster", "monkey", "octopus", "owl", "panda", "pig", "puppy", "rabbit", "rat", "scorpion", "seal", "shark", "sheep", "snail", "snake", "spider", "squirrel", "tiger", "turtle", "wolf", "zebra"],
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    secretWord: "",
    correctLetters: [],//user guesses so far, the starts with all dashes "-" and gets filled with user corret guesses as game progresses
    wrongLetters: [],
    maxWrongGuesses: 8,
    resetGame: function () {
        this.secretWord = "";
        this.correctLetters = [];
        this.wrongLetters = [];
    },
    chooseSecretWord: function () {
        //generate a random number between 0 and length of animals list-1
        var index = Math.floor(Math.random() * this.animalDictionary.length);
        this.secretWord = this.animalDictionary[index].toUpperCase();
        console.log("Secret Word: " + this.secretWord);
        //initialize the correct Letters array to dashes
        for (var i = 0; i < this.secretWord.length; i++) {
            this.correctLetters.push("-");
        }
    },
    getRemainingWrongGuesses: function () {
        return this.maxWrongGuesses - this.wrongLetters.length;
    },
    isLetterGuessedBefore: function (letter) {
        //check if the letter is in the wrong letters or in the correct letters
        return (this.correctLetters.includes(letter) || this.wrongLetters.includes(letter));
    },
    placeLetterInCorrectLettersArray: function (letter) {
        //inspect all letters of the secret word
        for (var i = 0; i < this.correctLetters.length; i++) {
            //when you find the letter in the secret word in that position
            if (this.secretWord[i] === letter) {
                //place it in the corresponding place in the correct letters array
                this.correctLetters[i] = letter;
            }
        }
    },
    isWordCompleted: function () {
        //if the correct Letters array has no dashes, then the user guessed all letters correctly
        return !this.correctLetters.includes("-");
    }
};
var isGameStarted = false;
document.addEventListener("keydown", function (event) {
    //remove start prompt message
    if (!isGameStarted) {//if the user presses any key to start the game
        document.getElementById("prompt").textContent = "";
        isGameStarted = true;
        //initialize the game data
        game.resetGame();
        //Choose a secret word
        game.chooseSecretWord();
        //display the empty user guess word with dashes
        updateDisplay();

    } else {//otherwise, start interpreting key presses as  user guesses
        var letter = event.key.toUpperCase();
        //check if the letter is not used before
        if (!game.isLetterGuessedBefore(letter)) {
            var index = game.secretWord.indexOf(letter);
            if (index !== -1) {//if it's a correct guess
                //replace the dashes in the user guess word with the letter in the correct position(s)
                game.placeLetterInCorrectLettersArray(letter);
                //if the user guessed all the word correctly
                if (game.isWordCompleted()) {//the user WON!!!
                    game.gamesWon++;
                    isGameStarted = false;//game ended
                    game.gamesPlayed++;
                }
                updateDisplay();
            } else {
                //add the letter to the wrong guesses list
                game.wrongLetters.push(letter);
                //check the number of remaining guesses
                if (game.getRemainingWrongGuesses() === 0) {//the user LOST
                    game.gamesLost++;
                    isGameStarted = false;//game ended
                    //reveal the solution
                    for (var i = 0; i < game.secretWord.length; i++) {
                        game.correctLetters[i] = game.secretWord[i];
                    }
                    game.gamesPlayed++;
                }
                updateDisplay();

            }
        }
    }





    //--increment the correct guesses counter
    //--if all the letters guessed correctly:
    //----display a message that the user Won.
    //----increment the number of games won and the number of the total played games
    //--update the display
    //if the user guessed a wrong letter
    //--add the letter to the list of wrong guesses
    //--decrement the number of remaining incorrect guesses
    //------If the number wrong guesses became zero
    //---------Display a message that the user lost the game
    //---------Increment the number of losses
    //reset the game and start all over

});
function updateDisplay() {

    if (isGameStarted) {
        document.getElementById("prompt").textContent = "";

    } else {
        document.getElementById("prompt").textContent = "Press Any Key to Begin a New Game...";
    }
    document.getElementById("games_played").textContent = game.gamesPlayed;
    document.getElementById("games_won").textContent = game.gamesWon;
    document.getElementById("games_lost").textContent = game.gamesLost;

    document.getElementById("current_guess").textContent = game.correctLetters.join(" ");
    document.getElementById("wrong_letters").textContent = game.wrongLetters.join(",");
    document.getElementById("remaining_guesses").textContent = "" + game.getRemainingWrongGuesses();

}