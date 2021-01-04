const database = require("./database");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
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

function update(){
  if(i<ln){
    showNextQuestion();
  } else{
    rl.close();
  }
}
  
function showNextQuestion(){
  console.log(`(${i+1}) ${questions[i][0].slice(3)}`);
  for(let j = 1; j < 5; j++){
    console.log(questions[i][j]);
  }

  rl.question('Type correct answer: ', (answer) => {
      console.log(`Correct ${questions[i][5]}\n`);

      //if correct answer and explanation are not in single element
      if(questions[i].length>6){
        console.log(questions[i][6]+'\n');
      }
      i++;
      update();
  });
}

let difficulty = 'hard', subject = 'dsa';
let questions = database[subject][difficulty];
shuffle(questions);
// console.log(questions, questions.length);

let ln = questions.length, i=0;

update();