
const score = JSON.parse(localStorage.getItem('score'))
|| { wins: 0, losses: 0 , tie: 0};



let choice = "";

let computerChoice = "";

let result= "Lets play";
const getComputerChoice= () =>  {
const choices = ["rock", "paper", "scissors"];
return choices[Math.floor(Math.random() * choices.length)];
};

/*
Function to add event listeners to the game buttons
 We attach an event listener to each button with the ".moves-button" class.
 When a button is clicked, the playGame() function is called.
*/
function getTheID() {
  document.querySelectorAll(".moves-button").forEach(button => {
    button.addEventListener("click", (event) => {
      let id = event.currentTarget.id;
      playGame(id);
    });
  });
};

getTheID();

const playGame = (id) => {
    choice = id;
    computerChoice = getComputerChoice();
    result = whoWon(choice, computerChoice);
    uiUpdate(); 
};
/*  The old code:
    Each button has an event listener that corresponds to a specific choice (rock, paper, scissors).

    Below, we manually add event listeners to each button:
    This code is now redundant because we use querySelectorAll above, 
    which is more efficient and avoids repetition.

document.getElementById("rock").addEventListener("click", () => {
  choice = "rock";
  computerChoice = getComputerChoice();
  result = whoWon(choice, computerChoice);
  uiUpdate(); 
});

document.getElementById("paper").addEventListener("click", () => {
  choice = "paper";
  computerChoice = getComputerChoice();
  result = whoWon(choice, computerChoice);
  uiUpdate(); 
});

document.getElementById("scissors").addEventListener("click", () => {
  choice = "scissors";
  computerChoice = getComputerChoice();
  result = whoWon(choice, computerChoice);
  uiUpdate();
});

*/
//Add a feature to reset the score.
document.getElementById("rscore").addEventListener("click", () => {
   resetScore();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    resetScore(); 
  }
});

document.getElementById("auto-play").addEventListener("click", () => {
  autoPlay();
  document.getElementById("auto-play").innerHTML = isAutoPlayOn ? "Stop Auto Play" : "Auto Play";
  
});

//Add a feature to auto play the game every 1 second.
let isAutoPlayOn = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlayOn) {
  intervalId = setInterval(() => {
    choice = getComputerChoice();
    computerChoice = getComputerChoice();
    result = whoWon(choice, computerChoice);
    uiUpdate();  
  }, 1000);
  isAutoPlayOn = true;}
  else{
    clearInterval(intervalId);
    isAutoPlayOn = false;
  }
};

//Add a feature to auto play/stop the game every 1 second with the press of the "a" key.
addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlay();
    document.getElementById("auto-play").innerHTML = isAutoPlayOn ? "Stop Auto Play" : "Auto Play";
  }
});


function whoWon(choice, computerChoice) {
  if (choice === computerChoice) {
    score.tie++;
    
    return "Tie";}
  else if (choice === "rock" ) {
    if (computerChoice === "paper") {
      score.computer++;
      return "Computer won";
    } else {
      score.player++;
      return "You won";
    }
  }else if (choice === "paper") {
    if (computerChoice === "scissors") {
      score.computer++;
      return "Computer won";
    } else {
      score.player++;
      return "You won";
    }
  }else if (choice === "scissors") {
    if (computerChoice === "rock") {
      score.computer++;
      return "Computer won";
    } else {
      score.player++;
      return "You won";
    }
  }
}


function resetScore() {
  score.player = 0;
  score.computer = 0;
  score.tie = 0; 
  localStorage.setItem('score', JSON.stringify(score));
  uiUpdate();
  document.querySelector('.result').innerHTML = `Score reseted`;
};
  
function uiUpdate() {
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.result').innerHTML = `${result} `;
  document.querySelector('.choice').innerHTML = `You <img src="images/${choice}-emoji.png"  class ="moves"> <img src="images/${computerChoice}-emoji.png"  class ="moves">  Computer `;
  document.querySelector('.score').innerHTML = `Player: ${score.player}  Computer: ${score.computer}  Tie: ${score.tie}`;
};

uiUpdate();