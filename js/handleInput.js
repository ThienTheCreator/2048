// prevents holding down key to work mutiple times
document.onkeydown = function (event) {
    if(event.repeat)
        return;

    playMove(event.key);
};

function playMove(key){
    let tempGameState = nextGameState(key, mainGame);
    if(tempGameState != undefined){
        mainGame = tempGameState; 
        updateScore(mainGame);
        mainGame = newNumber(mainGame);
        updateBoard(mainGame);
    }
    
    if(isWin(mainGame) && !mainGame.hasWon){
        document.getElementById("endScreen").innerHTML = "Congradulations! You Win!";
        document.getElementById("endScreen").style.zIndex = "0";
        document.getElementById("endScreen").className = "endAnimation";
        
        // make screen disappear after some time
        setTimeout(function() {
            document.getElementById("endScreen").style.zIndex = "-1";
            document.getElementById("endScreen").className = "endScreen";
        }, 3000);
        
        mainGame.hasWon = true;
    };
    if(isLose(mainGame)){
        document.getElementById("endScreen").innerHTML = "Game Over!";
        document.getElementById("endScreen").style.zIndex = "0";
        document.getElementById("endScreen").className = "endAnimation";
    };
    updateBoard(mainGame);
}

function isWin(aGameState){
    let m = aGameState.m;
    let n = aGameState.n;
    let aBoard = aGameState.board;

    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(aBoard[i][j] == 2048){   
                return true;
            }
        }
    }

    return false;
};

function isLose(aGameState){
    let m = aGameState.m;
    let n = aGameState.n;
    let aBoard = aGameState.board;

    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(aBoard[i][j] == 0)
                return false;
        }
    }

    for(let i = 0; i < m; i++){
        for(let j = 1; j < n; j++){
            if(aBoard[i][j] == aBoard[i][j-1])
                return false;
        }
    }

    for(let j = 0; j < n; j++){
        for(let i = 1; i < m; i++){
            if(aBoard[i][j] == aBoard[i-1][j])
                return false;
        }
    }

    return true;
};

// check if move is possible with given input
function nextGameState(key, aGameState) {
    let [up, left, down, right] = possibleDirection(aGameState);

    if((key == "w" || key == "ArrowUp") && up == false)
        return;

    if((key == "a" || key == "ArrowLeft") && left == false)
        return;
    
    if((key == "s" || key == "ArrowDown") && down == false)
        return;
    
    if((key == "d" || key == "ArrowRight") && right == false)
        return;

    switch (key) {
        case "w": case "ArrowUp":
            aGameState = moveUp(aGameState);
            break;
        case "a": case "ArrowLeft":
            aGameState = moveLeft(aGameState);
            break;
        case "s": case "ArrowDown":
            aGameState = moveDown(aGameState);
            break;
        case "d": case "ArrowRight":
            aGameState = moveRight(aGameState);
            break;
        default:
            return;
    }
    
    return aGameState;
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    
    let [up, left, down, right] = possibleDirection(mainGame);
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* swipe left*/
            if(left == false)
                return;

            mainGame = moveLeft(mainGame);
        } else {
            /* swipe right*/
            if(right == false)
                return;

            mainGame = moveRight(mainGame);
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* swipe up*/
            if(up == false)
                return;

            mainGame = moveUp(mainGame);
        } else { 
            /* swipe down*/
            if(down == false)
                return;

            mainGame = moveDown(mainGame);
        }                                                                 
    }
    
    /* reset values */
    xDown = null;
    yDown = null;

    updateScore(mainGame);
    mainGame = newNumber(mainGame);
    updateBoard(mainGame);
};

function resetGame(){
    mainGame = new gameState();
    mainGame = newNumber(mainGame);
    mainGame = newNumber(mainGame);    
    updateBoard(mainGame);
    updateScore(mainGame);

    document.getElementById("endScreen").style.zIndex = "-1";
    document.getElementById("endScreen").className = "endScreen";
}

function changeAI(){
    if(AIActive){
        AIActive = false;
        document.getElementById("AIButton").innerHTML = "AI: Off";
    }else{
        AIActive = true;
        document.getElementById("AIButton").innerHTML = "AI: On";
        test();
    }
    console.log(AIActive);
}