console.log("js working");

var step = 0;
var board = document.getElementById("board");
var restartBtn = document.getElementById("restartBtn");
var clearBtn =document.getElementById("clearBtn");
var winner ="";
var playerX=0;
var playerO=0;
var tie=0;


board.addEventListener('mouseover',function(event){
   if(step%2 === 0){
     event.target.style.cursor = "url('images/black-x.png'), cell";
   }else{
     event.target.style.cursor = "url('images/white-o.png'), cell";
   }


})

board.addEventListener('click',function(event)
{
  if (event.target.className ==="box" && step < 9 && winner != "X" && winner != "O" &&
      event.target.innerHTML != "X" && event.target.innerHTML != "O"
  ){
      if(step%2 === 0){
        event.target.innerHTML="X";
        event.target.style.backgroundImage = "url('images/black-x.png')";
        step++;
      }else {
        event.target.innerHTML="O";
        event.target.style.backgroundImage = "url('images/white-o.png')";
        step++;
      }
      winner = getWinner();
      if(winner === 'X'){
        playerX++;
        document.getElementById('playerXS').innerHTML = playerX.toString();
      }
      if(winner === 'O'){
        playerO++;
        document.getElementById('playerOS').innerHTML = playerO.toString();
      }
      if(step === 9 ){
        if (winner !== 'X' && winner !== 'O'){
          tie++;
          document.getElementById('TieS').innerHTML = tie.toString();
        }
      }
  }

});

restartBtn.addEventListener('click',function(){
    resetBox();
});

clearBtn.addEventListener("click",function(){
    resetBox();
    var playerX = 0;
    var playerO = 0;
    var tie = 0;
    document.getElementById('playerXS').innerHTML = playerX.toString();
    document.getElementById('TieS').innerHTML = playerO.toString();
    document.getElementById('playerOS').innerHTML = tie.toString();
});



function resetBox(){
  step=0;
  winner='';
  var boxs = document.getElementsByClassName("box");
  for (var i=0; i<9; i++){
    boxs[i].innerHTML='';
    boxs[i].style.background= "";
  }
}

// decide who is winner
var getWinner = function() {
   if (winnerIsX()) {
     return 'X';
   }
   if (winnerIsO()) {
     return 'O';
   }
   return '';
 };
//====   x ======
 function winnerIsX(){
  return winsRowX() || winsColumnX() || winsDiagonalX();
};

 function winsRowX(){
   return allThreeX ("box1","box2","box3") ||
          allThreeX ("box4","box5","box6") ||
          allThreeX ("box7","box8","box9");
 };

  function winsColumnX(){
    return allThreeX ("box1","box4","box7") ||
           allThreeX ("box2","box5","box8") ||
           allThreeX ("box3","box6","box9");
  };

function winsDiagonalX(){
  return allThreeX ("box1","box5","box9") ||
         allThreeX ("box3","box5","box7");
};

function allThreeX(a,b,c){
  return getBoxValue(a)==="X" && getBoxValue(b) === "X" && getBoxValue(c) === "X";
}

// =====  o =====
 function winnerIsO(){
  return winsRowO() || winsColumnO() || winsDiagonalO();
};

function winsRowO(){
  return allThreeO ("box1","box2","box3") ||
         allThreeO ("box4","box5","box6") ||
         allThreeO ("box7","box8","box9");
};

 function winsColumnO(){
   return allThreeO ("box1","box4","box7") ||
          allThreeO ("box2","box5","box8") ||
          allThreeO ("box3","box6","box9");
 };

function winsDiagonalO(){
 return allThreeO ("box1","box5","box9") ||
        allThreeO ("box3","box5","box7");
};

function allThreeO(a,b,c){
 return getBoxValue(a)==="O" && getBoxValue(b) === "O" && getBoxValue(c) === "O";
}

function getBoxValue(a){
    return document.getElementById(a).innerHTML;
}
