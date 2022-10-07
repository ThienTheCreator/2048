let AIActive = false;
let inputMove = ["w", "a", "s", "d"]

function calcHeuristic(aGameState){
    let val = 0;

    let m = aGameState.m;
    let n = aGameState.n;
    let aBoard = aGameState.board;
    let matrix = [[16, 9,  5,  1],
                  [15, 10, 6,  2],
                  [14, 11, 7,  3],
                  [13, 12, 8,  4]];

    for(let i = 0; i < m; i++){
        val += matrix[i][0] * aBoard[i][0];
    }

    for(let i = 0; i < m; i++){
        for(let j = 1; j < n; j++){
            if(aBoard[i][j] == aBoard[i][j-1]){
                val += aBoard[i][j];
            }
        }
    }

    for(let j = 0; j < n; j++){
        for(let i = 1; i < m; i++){
            if(aBoard[i][j] == aBoard[i-1][j]){
                val += aBoard[i][j];
            }
        }
    }

    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(aBoard[i][j] == aBoard[i][j-1]){
                val += 100;
            }
        }
    }
    
    return val;
}

function predictMove(){
    let possibleMoves = possibleMove(mainGame)
    let m = { 0: "w", 1: "a", 2: "s", 3: "d" }
    let moves = [];
    for (let i = 0; i < possibleMoves.length; i++) {
        if (possibleMoves[i]) {
            moves.push(m[i]);
        }
    }

    let high = 0;
    let nextMove = moves[0];

    for (let i = 0; i < moves.length; i++) {
        let heuristic = calcHeuristic(nextGameState(moves[i], mainGame));
        console.log(heuristic, high);
        if (heuristic > high) {
            high = heuristic;
            nextMove = moves[i];
        }
    }

    if (nextMove != undefined) {
        playMove(nextMove);
    }
}

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    }, ms);
};

let test = (async function () {
    while (AIActive) {
        await delay(100);
        predictMove(mainGame);
    }
});

test();