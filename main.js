var database = require('./database.json');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

questionNumber = 0;
maximumQuestions = 10;
subject = 'os',difficulty = 'easy';
subjects = ["os","dsa"], difficulties = ["easy","medium","hard"];

function chooseSubject()
{
    readline.question('Choose subject \n 1. Operating System\n 2. Data Structure and Algorithm \n Your Option : ', (input) => {
        questionNumber = 0;
        subject = subjects[parseInt(input)-1];
        chooseDifficulty();
    });
}

function chooseDifficulty()
{
    readline.question('Choose Difficulty \n1. Easy\n2. Medium\n3. Hard\nYour Option : ', (input) => {
        difficulty = difficulties[parseInt(input)-1];
        displayQuestion();
    });
}

function displayQuestion()
{
    if(questionNumber<maximumQuestions)
    {
        console.log("");
        for(let i=0;i<5;i++)
            console.log(database[subject][difficulty][questionNumber][i]);
        readline.question('Choose the correct option : ',(input)=>{
            for(let i=5;i<6;i++)
                console.log(database[subject][difficulty][questionNumber][i]);
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