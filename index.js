var inquirer = require("inquirer");
var Word = require("./Word.js");
var chalk = require("chalk");
var figlet = require("figlet");

var words = ["french horn", "trumpet", "flugelhorn", "trombone", "tuba", "cornet", "euphonium", "baritone", "wagnertuba", "tenorhorn"]

var guessesRemaining = 9;
var randomWord = " ";
var randomWordString = "";
var currentWord = "";
var wordGuessed = false;



var newWord = function() {

    randomWord = [Math.floor(Math.random() * words.length)];
    randomWordString = words[randomWord]
    currentWord = new Word(randomWordString);
    currentWord.wordDisplay();
};
newWord();

function checked() {
    function guessedYes(letter) {
        return (letter.guessed === true)
    };

    let array = currentWord.letters;
    let test = array.every(guessedYes);
   

    if (test === true) {
        wordGuessed = true;
    }
}

function reset(){
    inquirer.prompt([
        {
            type: "list",
            name: "continue",
            message: "Would you like a new word?",
            choices: ["Yes", "No"]
        }
    ]).then(function(answer){
        if(answer.continue === "Yes"){
            guessesRemaining = 9;
            wordGuessed = false;
            newWord();
            query();
        } else if(answer.continue === "No"){
            console.log("See you next time!")
        }
    })
}

let query = function () {
    checked();
    if (guessesRemaining > 0 && wordGuessed === false) {
        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a Letter! "
            }
        ]).then(function (answer) {
            if (randomWordString.indexOf(answer.guess) !== -1) {
                currentWord.checked(answer.guess);
                console.log(chalk.green("CORRECT!"))
                console.log("Guesses Remaining: " + guessesRemaining)
                currentWord.wordDisplay();
                query();
            }

            else if (randomWordString.indexOf(answer.guess) === -1) {
                guessesRemaining--;
                console.log(chalk.red("INCORRECT!"));
                console.log("Guesses Remaining: " + guessesRemaining);
                currentWord.wordDisplay();
                query();
            }
        })
    }
    else if (guessesRemaining <= 0 && wordGuessed === false) {
        console.log(chalk.red("Out of guesses!"));
        reset();

    }
    else if (guessesRemaining > 0 && wordGuessed === true) {
        console.log(chalk.green("You got it right! "));
        reset();
    }
}
query();