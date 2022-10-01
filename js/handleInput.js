// prevents holding down key to work mutiple times
document.onkeydown = function (event) {
    if(event.repeat)
        return;

    handleKeyPress(event.key);
    updateScore();
    updateBoard();
};

// check if move is possible with given input
function handleKeyPress(key) {
    let [up, left, down, right] = possibleMove();

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
            moveUp();
            break;
        case "a": case "ArrowLeft":
            moveLeft();
            break;
        case "s": case "ArrowDown":
            moveDown();
            break;
        case "d": case "ArrowRight":
            moveRight();
            break;
        default:
            return;
    }
    newNumber();
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

    let [up, left, down, right] = possibleMove();

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* swipe left*/
            if(left == false)
                return;

            moveLeft();
        } else {
            /* swipe right*/
            if(right == false)
                return;

            moveRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* swipe up*/
            if(up == false)
                return;

            moveUp();
        } else { 
            /* swipe down*/
            if(down == false)
                return;

            moveDown();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;
    
    newNumber();
    updateBoard();
};