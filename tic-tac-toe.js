const theX = "X";
const theO = "O";
let theX_Turn;
let squares;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

 

function playGame(){
    theX_Turn = true; 
    let board = document.getElementById("board");
    

    squares = [...board.children];
        squares.forEach((child) => {
        child.classList.add("square");
        child.addEventListener("click", select,{once:true});
        child.addEventListener("mouseover", mouseOver);
        child.addEventListener("mouseout", mouseOut);

        
      
    });

    function mouseOver(event){
       event.target.classList.add("hover")
    }
    
    function mouseOut(event){
        event.target.classList.remove("hover");
        
    } 
    
}

 

function select(event){
    if (theX_Turn == true) {
        event.target.innerHTML = theX;
        event.target.classList.add(theX);
        event.target.classList.remove(theO);
    } else{
        event.target.innerHTML = theO;
        event.target.classList.add(theO);
        event.target.classList.remove(theX);
    }
    let activePlayer = theX_Turn ? theX:theO;

    if(checkWinner(activePlayer))updateMessage(activePlayer);
    theX_Turn = !theX_Turn;
}

function checkWinner(character){
  return WINNING_COMBINATIONS.some((combination) => combination.every((index) =>
  squares[index].classList.contains(character)));
}
   

function updateMessage(character){
  message = document.getElementById("status");
  message.innerHTML = "Congratulations! " + character + " is the Winner!";
  message.classList.add("you-won");
}

function gameRestart(){
  theX_Turn = true;
  squares.forEach((square) =>{ square.innerHTML ="";
    square.classList.remove(theO);
    square.classList.remove(theX);
    square.addEventListener("click", select,{once:true});
    
  
  });



  document.getElementById("status").innerHTML = "Move your mouse over a square and click to play an X or an O.";
  document.getElementById("status").classList.remove("you-won");
}


addEventListener("DOMContentLoaded", function() {
    playGame();
    document.querySelector(".btn").addEventListener("click", gameRestart);
});

