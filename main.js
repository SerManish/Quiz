var database = require('./database.json');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

questionNumber = 0;
maximumQuestions = 10;
subject = 'os',difficulty = 'easy';
subjects = ["os","coa"], difficulties = ["easy","medium","hard"];
questions = undefined;

// Shuffles original array
function shuffle ( myArray ) {
    var i = myArray.length;
    if ( i == 0 ) return false;
    while ( --i ) {
       var j = Math.floor( Math.random() * ( i + 1 ) );
       var temp = myArray[i];
       myArray[i] = myArray[j];
       myArray[j] = temp;
    }
}

function chooseSubject()
{
    readline.question('Choose subject \n 1. Operating System\n 2. Computer Organization & Architecture \n Your Option : ', (input) => {
        questionNumber = 0;
        subject = subjects[parseInt(input)-1];
        chooseDifficulty();
    });
}

function chooseDifficulty()
{
    readline.question('Choose Difficulty \n1. Easy\n2. Medium\n3. Hard\nYour Option : ', (input) => {
        difficulty = difficulties[parseInt(input)-1];
        questions = database[subject][difficulty];
        shuffle(questions);
        displayQuestion();
    });
}

function displayQuestion()
{
    if(questionNumber<maximumQuestions)
    {
        console.log(`\n(${questionNumber+1}) ${questions[questionNumber][0].slice(3)}`);
        for(let j = 1; j < 5; j++){
            console.log(questions[questionNumber][j]);
        }

        readline.question('Choose Correct Option: ', (answer) => {
            console.log(`Correct ${questions[questionNumber][5]}\n`);
            //if correct answer and explanation are not in single element
            if(questions[questionNumber].length>6){
                console.log(questions[questionNumber][6]+'\n');
            }
            questionNumber++;
            checkIfWantToContinue();
        });
    }
    else
    {
        console.log('You have completed the quiz!!');
        readline.close();
    }
        
}

function checkIfWantToContinue()
{
    readline.question('\nChoose a option \n1. Next Question\n2. Choose Subject and Difficulty\nor any other key to exit\nYour Option : ',(input)=>{
        if(input == "1")
            displayQuestion();
        else if(input == "2")
            chooseSubject();
        else
        {
            console.log("Thank You for taking the Quiz");
            readline.close();
        }
    });   
}

chooseSubject();