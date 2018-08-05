var game = {
    animalDictionary: ["alligator", "ant", "bear", "bee", "bird", "camel", "cat", "cheetah", "chicken", "chimpanzee", "cow", "crocodile", "deer", "dog", "dolphin", "duck", "eagle", "elephant", "fish", "fly", "fox", "frog", "giraffe", "goat", "goldfish", "gorilla", "groundhog", "hamster", "hippopotamus", "hog", "horse", "kangaroo", "kitten", "lion", "lobster", "monkey", "octopus", "owl", "panda", "pig", "puppy", "rabbit", "rat", "scorpion", "seal", "shark", "sheep", "snail", "snake", "spider", "squirrel", "tiger", "turtle", "wolf", "zebra"],
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    secretWord: "",
    correctLetters: [],//user guesses so far, the starts with all dashes "-" and gets filled with user corret guesses as game progresses
    wrongLetters: [],
    maxWrongGuesses: 6,
    isUserWon: false,
    isUserLost: false,
    resetGame: function () {
        this.secretWord = "";
        this.correctLetters = [];
        this.wrongLetters = [];
        this.isUserWon = false;
        this.isUserLost = false;
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
    },
    guessLetter: function (letter) {
        //check letter against correct and wrong guesses
        if (!this.isLetterGuessedBefore(letter)) {
            var index = this.secretWord.indexOf(letter);
            if (index !== -1) {//if it's a correct guess
                //replace the dashes in the user guess word with the letter in the correct position(s)
                this.placeLetterInCorrectLettersArray(letter);
                //if the user guessed all the word correctly
                if (this.isWordCompleted()) {//the user WON!!!
                    this.gamesWon++;
                    this.isUserWon = true;
                    game.gamesPlayed++;

                }
                return true;//right guess 
            } else {
                //add the letter to the wrong guesses list
                this.wrongLetters.push(letter);
                //check the number of remaining guesses
                if (this.getRemainingWrongGuesses() === 0) {//the user LOST
                    game.gamesLost++;
                    this.isUserLost = true;
                    game.gamesPlayed++;
                    return false;//wrong guess
                }
            }
        }
    }
}
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

    } else {//otherwise, start interpreting key presses as user guesses
        var letter = event.key.toUpperCase();

        game.guessLetter(letter);
        if (game.isUserLost || game.isUserWon) {
            isGameStarted = false;
        }
        updateDisplay();

    }
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

    if (isGameStarted) {
        document.getElementById("image").style.display = "inline";
    }
    if (game.isUserWon || game.isUserLost) {
        if (game.isUserWon) {
            document.getElementById("image").setAttribute("src", "assets/images/" + "winner" + ".jpg");

        }
        if (game.isUserLost) {
            document.getElementById("image").setAttribute("src", "assets/images/" + "loser" + ".jpg");
            //Reveal the word
            var secretWord_array = [];
            for (var i = 0; i < game.secretWord.length; i++) {
                secretWord_array.push(game.secretWord[i]);
            }
            document.getElementById("current_guess").textContent = secretWord_array.join(" ");
        }
    } else {
        document.getElementById("image").setAttribute("src", "assets/images/" + game.wrongLetters.length + ".jpg");
    }




}