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
plyArea.appendChild(againButton);


let usrPoints = 0;
let cpuPoints = 0;
let rnds = 0;

usrDeclare.textContent = `Your score: ${usrPoints}`;
cpuDeclare.textContent = `CPU score: ${cpuPoints}`;
rndsDeclare.textContent = `Round: ${rnds}`;

function playRound(userTurn, compTurn){
    usrDeclare.textContent = `Your score: ${usrPoints}`;
    cpuDeclare.textContent = `CPU score: ${cpuPoints}`;
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
        plyArea.appendChild(againButton);
        choices.remove();
        againButton.textContent = "Try again?";
        againButton.classList.add('tryAgain');
        againButton.addEventListener("click", tryAgain);
        return;
    }

    //Display stats
    function stats(){
        usrDeclare.textContent = `Your score: ${usrPoints}`;
        cpuDeclare.textContent = `CPU score: ${cpuPoints}`;
        rndsDeclare.textContent = `Round: ${rnds}`;
    }

    //Determine round winner
    switch(true){
        case compTurn === userTurn: 
        declare.textContent = `You both chose ${userTurn}! It's a tie!`;
        rnds += 1;
        rndsDeclare.textContent = `Round: ${rnds}`;
        break;

        case (userTurn == "rock" && compTurn == "scissors") || (userTurn == "paper" && compTurn == "rock") || (userTurn == "scissors" && compTurn == "paper"): 
        declare.textContent = `CPU chose ${compTurn}. You win!`;
        usrPoints += 1; 
        rnds += 1;
        stats();
        break;

        default: 
        declare.textContent = `CPU chose ${compTurn}. CPU wins!`;
        cpuPoints += 1; 
        rnds += 1;
        stats();
        break;
    }

    //Determine overall winner
    if((usrPoints == 5 && usrPoints > cpuPoints)){
        declare.textContent = `You beat the CPU in ${rnds} rounds!`;
        endOfMatch();
    }
    else if (cpuPoints == 5 && cpuPoints > usrPoints){
        declare.textContent = `CPU beat you in ${rnds} rounds!`;
        endOfMatch();
    }
}
// playRound();

const btn = document.querySelector('button');
const btns = document.querySelectorAll('.choice');

btns.forEach(btn => btn.addEventListener("click", function(e){
    let usrChose = this.textContent;

    playRound(usrChose);
}));


// game();