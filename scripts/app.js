console.log("js working");

var step = 0;
var board = document.getElementById("board");
var restartBtn = document.getElementById("restartBtn");
var clearBtn =document.getElementById("clearBtn");
var selectionBtn = document.getElementById('backgroundBtn');
var winner ="";
var playerX=0;
var playerO=0;
var tie=0;

webInit();

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
        congraduation(winner);
        show();
        showLong();
        playerX++;
        document.getElementById('playerXS').innerHTML = playerX.toString();
      }
      if(winner === 'O'){
        congraduation(winner);
        show();
        showLong();
        playerO++;
        document.getElementById('playerOS').innerHTML = playerO.toString();
      }
      if(step === 9 ){
        if (winner !== 'X' && winner !== 'O'){
          congraduation(winner);
          show();
          showLong();
          tie++;
          document.getElementById('TieS').innerHTML = tie.toString();
        }
      }
  }

});

restartBtn.addEventListener('click',function(){
    window.clearInterval(timer);
    hidden();
    resetBox();
});

clearBtn.addEventListener("click",function(){
    window.clearInterval(timer);
    hidden();
    resetBox();
    playerX = 0;
    playerO = 0;
    tie = 0;
    document.getElementById('playerXS').innerHTML = playerX.toString();
    document.getElementById('TieS').innerHTML = playerO.toString();
    document.getElementById('playerOS').innerHTML = tie.toString();
});

selectionBtn.addEventListener('change',function(){
    changeBackground();
});

//=================== functions ========================


function resetBox(){
  step=0;
  winner='';
  var boxs = document.getElementsByClassName("box");
  for (var i=0; i<9; i++){
    boxs[i].innerHTML='';
    boxs[i].style.background= "";
  }
  document.getElementById('timeLeft').innerHTML= '0';
  document.getElementById('timeInput').value = '0';
}

function show(){
  document.getElementById('congraduation').style.height = "0px";
  document.getElementById('congraduation').style.visibility= "visible";

}

function showLong(){
    document.getElementById('congraduation').style.height = "200px";
}

function hidden(){
  document.getElementById('congraduation').style.height = "0px";
  document.getElementById('congraduation').style.visibility= "hidden";
}


function congraduation(winner){
    if (winner ==="X"){
      var xWiner = document.getElementById('congraduationP');
      xWiner.innerHTML ="Player black win !"
    }else if(winner ==="O"){
      var oWiner = document.getElementById('congraduationP');
      oWiner.innerHTML ="Player white win !"
    }else {
      var noWiner = document.getElementById('congraduationP');
      noWiner.innerHTML ="This round tie !!!"
    }
};

function changeBackground(){
   var option = document.getElementById('backgroundBtn').value;
   if (option ==="dark"){
   document.getElementById('body').style.background = "URL('images/Wiki-background.jpg')";
   document.getElementById('body').style.backgroundSize = "cover";
   document.getElementById('body').style.color ="white";
 } else if (option ==='bright'){
   document.getElementById('body').style.background = "URL('images/background2.jpg')";
   document.getElementById('body').style.backgroundSize = "cover";
   document.getElementById('body').style.color = "black";
 }else{
 }
}
// ======================== loacal storage =======================
function saveScore(){
  localStorage.setItem("playerX",playerX);
  localStorage.setItem("playerO",playerO);
  localStorage.setItem("tie",tie);
}

window.setInterval(saveScore,1000);

function webInit(){
  if (localStorage.getItem("playerX")){
  document.getElementById("playerXS").innerHTML = localStorage.getItem("playerX").toString();
  playerX=Number(localStorage.getItem("playerX"));
  }
  if(localStorage.getItem("tie")){
  document.getElementById("TieS").innerHTML = localStorage.getItem("tie").toString();
  tie=Number(localStorage.getItem("tie"));
  }
  if(localStorage.getItem("playerO")){
  document.getElementById("playerOS").innerHTML = localStorage.getItem("playerO").toString();
  playerO=Number(localStorage.getItem("playerO"));
  }

}


// ======== timer function =============
var timer = null;
var startBtn = document.getElementById("timerBtn");
function timerCountDown(){
   var timeLeft = Number(document.getElementById('timeInput').value);
   timeLeft = timeLeft - 1;
   console.log(timeLeft);
   document.getElementById('timeLeft').innerHTML = timeLeft.toString();
   document.getElementById('timeInput').value = timeLeft.toString();
   if (Number(document.getElementById('timeLeft').innerHTML) <= 0 ||
   Number(document.getElementById('timeInput').value) <= 0){
     window.clearInterval(timer);
   }
}

 startBtn.addEventListener('click',function(){
   window.clearInterval(timer);
   timer = window.setInterval(timerCountDown,1000);
});


// ===============decide who is winner functions================
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
