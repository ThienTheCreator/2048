let AIActive = false;
let inputMove = ["w", "a", "s", "d"]

function calcHeuristic(aGameState){
    let val = 0;

    let m = aGameState.m;
    let n = aGameState.n;
    let aBoard = aGameState.board;
    let matrix = [[256, 1, 1, 1],
                  [ 64, 1, 1, 1],
                  [ 16, 1, 1, 1],
                  [  4, 1, 1, 1]];

    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            val += matrix[i][j] * aBoard[i][j];
        }
    }

    for(let i = 0; i < m; i++){
        for(let j = 1; j < n; j++){
            if(aBoard[i][j] == aBoard[i][j-1]){
                val += aBoard[i][j] / 8;
            }
        }
    }

    for(let j = 0; j < n; j++){
        for(let i = 1; i < m; i++){
            if(aBoard[i][j] == aBoard[i-1][j]){
                val += aBoard[i][j] / 8;
            }
        }
    }
    
    return val;
}

function expectimax(){
    let nextMove = maxNode(mainGame, 0, 1)
    
    if (nextMove != undefined) {
        playMove(nextMove);
    }
}

function maxNode(aGameState, iteration, maxIteration){
    let newGamestate = structuredClone(aGameState);
    let possibleMoves = possibleMove(newGamestate);

    let high = 0;
    let nextMove = possibleMoves[0];

    for (let i = 0; i < possibleMoves.length; i++) {
        let heuristic = chanceNode(nextGameState(possibleMoves[i], newGamestate), iteration, maxIteration);
        
        if (heuristic > high) {
            high = heuristic;
            nextMove = possibleMoves[i];
        }
    }

    if(iteration == 0){
        return nextMove;
    }else{
        return high;
    }
};

function chanceState(aGameState, position, arr){
    let newGamestate = structuredClone(aGameState);
    aGameState.board[position[0]][position[1]] = 2;
    let val1 = calcHeuristic(aGameState);
    
    aGameState.board[position[0]][position[1]] = 4;
    let val2 = calcHeuristic(aGameState);

    arr.push(val1 * .1 + val2 * .9);
}

function chanceNode(aGameState, iteration, maxIteration){
    if(possibleMove(aGameState).length == 0){
        return calcHeuristic(aGameState);
    }

    if(iteration < maxIteration){

    }

    let m = aGameState.m;
    let n = aGameState.n;

    let arr = [];

    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(aGameState.board[i][j] == 0){
                if(iteration < maxIteration){
                    aGameState.board[i][j] = 2;
                    arr.push(maxNode(aGameState, iteration + 1, maxIteration));
                    aGameState.board[i][j] = 4;
                    arr.push(maxNode(aGameState, iteration + 1, maxIteration));
                    aGameState.board[i][j] = 0;
                }else{
                    chanceState(aGameState, [i, j] , arr);
                }
            }
        }
    }

    let val = 0;
    for(let i = 0; i < arr.length; i++){
        val += arr[i];
    }

    if(arr.length > 0)
        val /= arr.length;

    return val;
}

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    }, ms);
};

let test = (async function () {
    while (AIActive) {
        await delay(100);
        expectimax(mainGame);
    }
});

test();