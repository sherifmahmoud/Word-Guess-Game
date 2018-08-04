var game = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    secretWord: "",
    guessedWord: "",
    usedWrongLetters: "",
    resetGame: function () {
        this.secretWord = "";
        this.guessedWord = "";
        this.usedWrongLetters = "";
    },
    generateSecretWord: function () { }
};
document.addEventListener("keyup", function (event) {
    console.log(event.key.toUpperCase() + " key is up...");
    //initialize the game data
    //Generate a secret word
    //display the empty user guess word with dashes
    //take the letter the user guessed
    //if it's the first time the user guessed this letter,
    //if this letter is in the secret word:
    //--replace the dashes in the user guess word with the letter in the correct position(s)
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