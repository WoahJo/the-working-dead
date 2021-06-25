const results = document.querySelector('#results');
const usrScore = document.querySelector('#usrScore');
const cpuScore = document.querySelector('#cpuScore');
const rndCount = document.querySelector('#rounds');
const plyArea = document.querySelector('#usr-play');
const choices = document.querySelector('#choices');


const declare = document.createElement('h2');
const usrDeclare = document.createElement('h2');
const cpuDeclare = document.createElement('h2');
const rndsDeclare = document.createElement('h2');
const againButton = document.createElement('button');

results.appendChild(declare);
cpuScore.appendChild(cpuDeclare);
usrScore.appendChild(usrDeclare);
rndCount.appendChild(rndsDeclare);


let usrPoints = 0;
let cpuPoints = 0;
let rnds = 0;

usrDeclare.textContent = `You: ${usrPoints}`;
cpuDeclare.textContent = `Lurker: ${cpuPoints}`;
rndsDeclare.textContent = `Round: ${rnds}`;

function playRound(userTurn, compTurn){

    usrDeclare.textContent = `You: ${usrPoints}`;
    cpuDeclare.textContent = `Lurker: ${cpuPoints}`;
    rndsDeclare.textContent = `Round: ${rnds}`;

    //Function (computerPlay) that randomly selects rock, paper or scissors
    function computerPlay(){
        let choices = ["rock", "paper", "scissors"];
        let rando = Math.floor(Math.random() * 3);
        return choices[rando];
    }

    //Create variable and assign the computerPlay result to the variable
    compTurn = computerPlay();
    userTurn = userTurn.toLowerCase();

    //Start a new game
    function tryAgain(){
        plyArea.appendChild(choices);
        againButton.remove();
        declare.textContent = "";
        usrPoints = 0;
        cpuPoints = 0; 
        rnds = 0;
        playRound();
    }

    //Actions at the end of a match
    function endOfMatch(){
        choices.remove();
        plyArea.appendChild(againButton);
        againButton.textContent = "Try again?";
        againButton.classList.add('tryAgain');
        againButton.addEventListener("click", tryAgain);
        return;
    }

    //Display stats
    function stats(){
        usrDeclare.textContent = `You: ${usrPoints}`;
        cpuDeclare.textContent = `Lurker: ${cpuPoints}`;
        rndsDeclare.textContent = `Round: ${rnds}`;
    }

    //Determine round winner
    switch(true){
        //Tie
        case compTurn === userTurn: 
            rnds += 1;
            setTimeout(() => {
                declare.textContent = `You both chose ${userTurn}! It's a tie!`;
                stats();
            }, 500);
            //btn.classList.toggle('choiceFocus', false);
            break;

        //Announces win and updates score with a 1 second delay
        case (userTurn == "rock" && compTurn == "scissors") || (userTurn == "paper" && compTurn == "rock") || (userTurn == "scissors" && compTurn == "paper"): 
            usrPoints += 1; 
            rnds += 1;
            setTimeout(() => {
                declare.textContent = `Lurker chose ${compTurn}. You win!`;
                stats();
            }, 500);
            //btn.classList.toggle('choiceFocus', false);
            break;
            
            //Annouces loss and updates score with 1 second delay
        default:
            cpuPoints += 1; 
            rnds += 1;
            setTimeout(() => {
                declare.textContent = `Lurker chose ${compTurn} and wins!`;
            stats();
            }, 500);
            //btn.classList.toggle('choiceFocus', false);
        break;  
    }

    //Determine overall winner
    if((usrPoints == 5 && usrPoints > cpuPoints)){
        choices.remove();
        setTimeout(() => {declare.textContent = `You beat the Lurker in ${rnds} rounds! Try again?`;
        endOfMatch();
        }, 3000);
    }
    else if (cpuPoints == 5 && cpuPoints > usrPoints){
        choices.remove();
        setTimeout(() => {declare.textContent = `Lurker beat you in ${rnds} rounds! Try again?`; 
        endOfMatch();
        }, 3000);
    }
}
// playRound();

const btn = document.querySelector('button');
const btns = document.querySelectorAll('.choice');

btns.forEach(btn => btn.addEventListener("click", function(e){
    btn.classList.toggle('choiceFocus');
    setTimeout(() => {
        btn.classList.toggle('choiceFocus');
    }, 2000)
    let usrChose = this.textContent;
    
    playRound(usrChose);
}));


// game();