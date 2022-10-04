/* possibleMove, moveUp, moveLeft, moveDown, moveRight

possibleMove check if two values next to each other are the same, then it check if there is enough
space for individual directions to move in. Returns the direction for possible moves in this order
[up, left, down right]

move shift the tile over, then combines them if the are the same value, then shifts the tiles over
again.

*/

function possibleMove(aGameState){
    let m = aGameState.m;
    let n = aGameState.n;
    
    let up = false;
    let left = false;
    let down = false;
    let right = false;

    let aBoard = aGameState.board;
    for (let j = 0; j < n; j++) {
        for (let i = 1; i < m; i++) {
            if (aBoard[i][j] == aBoard[i-1][j] && aBoard[i][j] != 0) {
                up = true;
                down = true;
                break;
            }
        }
        if(up && down)
            break;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (aBoard[i][j] == aBoard[i][j-1] && aBoard[i][j] != 0) {
                left = true;
                right = true;
                break;
            }
        }
        if(right && left)
            break;
    }

    for (let j = 0; j < n; j++) {
        if(up)
            break;

        for (let i = 1; i < m; i++) {
            if (aBoard[i][j] != 0 && aBoard[i-1][j] == 0) {
                up = true;
                break;
            }
        }
    }

    for (let i = 0; i < m; i++) {
        if(left)
            break;

        for (let j = 1; j < n; j++) {
            if (aBoard[i][j] != 0 && aBoard[i][j-1] == 0) {
                left = true;
                break;
            }
        }
    }
    
    for (let j = 0; j < n; j++) {
        if(down)
            break;

        for (let i = m - 2; i >= 0; i--) {
            if (aBoard[i][j] != 0 && aBoard[i+1][j] == 0) {
                down = true;
                break;
            }
        }
    }

    for (let i = 0; i < m; i++) {
        if(right)
            break;

        for (let j = n - 2; j >= 0; j--) {
            if (aBoard[i][j] != 0 && aBoard[i][j+1] == 0) {
                right = true;
                break;
            }
        }
    }

    return [up, left, down, right];
}


function moveUp(aGameState){
    let m = aGameState.m;
    let n = aGameState.n;
    let aBoard = aGameState.board;

    for (let j = 0; j < n; j++) {
        for (let i = 1; i < m; i++) {
            if (aBoard[i][j] != 0) {
                for (let index = 0; index < i; index++) {
                    if (aBoard[index][j] == 0) {
                        aBoard[index][j] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    for (let j = 0; j < n; j++) {
        for (let i = 1; i < m; i++) {
            if (aBoard[i][j] == aBoard[i-1][j]) {
                aBoard[i - 1][j] *= 2;
                aBoard[i][j] = 0;
                aGameState.score += aBoard[i-1][j];
            }
        }
    }
    for (let j = 0; j < n; j++) {
        for (let i = 1; i < m; i++) {
            if (aBoard[i][j] != 0) {
                for (let index = 0; index < i; index++) {
                    if (aBoard[index][j] == 0) {
                        aBoard[index][j] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    aGameState.board = aBoard;
    return aGameState;
}

function moveLeft(aGameState){
    let m = aGameState.m;
    let n = aGameState.n;
    let aBoard = aGameState.board;

    for (let i = 0; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (aBoard[i][j] != 0) {
                for(let index = 0; index < j; index++){
                    if (aBoard[i][index] == 0) {
                        aBoard[i][index] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (aBoard[i][j] == aBoard[i][j-1]) {
                aBoard[i][j - 1] *= 2;
                aBoard[i][j] = 0;
                aGameState.score += aBoard[i][j-1];
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (aBoard[i][j] != 0) {
                for(let index = 0; index < j; index++){
                    if (aBoard[i][index] == 0) {
                        aBoard[i][index] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    aGameState.board = aBoard;
    return aGameState;
}

function moveDown(aGameState){
    let m = aGameState.m;
    let n = aGameState.n;
    let aBoard = aGameState.board;

    for (let j = 0; j < n; j++) {
        for (let i = m - 2; i >= 0; i--) {
            if (aBoard[i][j] != 0) {
                for (let index = m-1; index > 0; index--) {
                    if (aBoard[index][j] == 0) {
                        aBoard[index][j] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    for (let j = 0; j < n; j++) {
        for (let i = m - 2; i >= 0; i--) {
            if (aBoard[i][j] == aBoard[i+1][j]) {
                aBoard[i + 1][j] *= 2;
                aBoard[i][j] = 0;
                aGameState.score += aBoard[i+1][j];
            }
        }
    }
    for (let j = 0; j < n; j++) {
        for (let i = m - 2; i >= 0; i--) {
            if (aBoard[i][j] != 0) {
                for (let index = m-1; index > 0; index--) {
                    if (aBoard[index][j] == 0) {
                        aBoard[index][j] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }

    aGameState.board = aBoard;
    return aGameState;
}

function moveRight(aGameState){
    let m = aGameState.m;
    let n = aGameState.n;
    let aBoard = aGameState.board;

    for (let i = 0; i < m; i++) {
        for (let j = n - 2; j >= 0; j--) {
            if (aBoard[i][j] != 0) {
                for(let index = n - 1; index > j; index--){
                    if (aBoard[i][index] == 0) {
                        aBoard[i][index] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = n - 2; j >= 0; j--) {
            if (aBoard[i][j] == aBoard[i][j+1]) {
                aBoard[i][j + 1] *= 2;
                aBoard[i][j] = 0;
                aGameState.score += aBoard[i][j+1];
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = n - 2; j >= 0; j--) {
            if (aBoard[i][j] != 0) {
                for(let index = n - 1; index > j; index--){
                    if (aBoard[i][index] == 0) {
                        aBoard[i][index] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    aGameState.board = aBoard;
    return aGameState;
}