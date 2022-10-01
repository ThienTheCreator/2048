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
    printBoard();
};
