console.log("js working");

var step = 0;
var board = document.getElementById("board");
board.addEventListener('click',function(event)
{
  if(step%2 === 0){
    event.target.innerHTML="X";
    event.target.style.background = "yellow";
    step++;
  }else {
    event.target.innerHTML="O";
    event.target.style.background = "blue";
    step++;
  }
});






var setBoxValue = function(key) {
  switch(key) {
    case 'box1': return '';
    case 'box2': return '';
    case 'box3': return '';
    case 'box4': return '';
    case 'box5': return '';
    case 'box6': return '';
    case 'box7': return '';
    case 'box7': return '';
    case 'box8': return '';
    case 'box9': return '';
  }
};

// decide who is winner
var getWinner = function() {
   if (winnerIsX()) {
     return 'x';
   }
   if (winnerIsO()) {
     return 'o';
   }
   return 'tie';
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
  return getBoxValue(a)==="x" && getBoxValue(b) === "x" && getBoxValue(c) === "x";
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
 return getBoxValue(a)==="o" && getBoxValue(b) === "o" && getBoxValue(c) === "o";
}

function getBoxValue(){


}
