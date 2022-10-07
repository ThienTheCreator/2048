onload = function(event){
    let m = mainGame.m;
    let n = mainGame.n;
    let gridContainer = this.document.getElementById("gridContainer");
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            let tile = document.createElement("div");
            tile.className = "tile";
            tile.id = "" + i + j;
            gridContainer.appendChild(tile);
        }
    }

    mainGame = newNumber(mainGame);
    mainGame = newNumber(mainGame);    
    updateBoard(mainGame);
}

// a new number is generate 90% chance of 2 and 10% chance of 4
function newNumber(aGameState){
    let newGameState = structuredClone(aGameState);
    let m = newGameState.m;
    let n = newGameState.n;

    let arr = new Array();
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(newGameState.board[i][j] == 0){
                arr.push([i,j]);
            }
        }
    }

    if(arr.length == 0)
        return;

    let min = Math.ceil(0);
    let max = Math.floor(arr.length - 1);
    let index = Math.floor(Math.random() * (max - min + 1) + min);
    
    let row = arr[index][0];
    let col = arr[index][1];
    
    let num = Math.random() < 0.9 ? 2 : 4;;
    newGameState.board[row][col] = num;

    return newGameState;
}

function updateScore(aGameState){
    document.getElementById("scoreVal").innerHTML = aGameState.score;
}

function updateBoard(aGameState){
    let m = aGameState.m;
    let n = aGameState.n;
    let id = "";
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            id = "" + i + j;
            if(aGameState.board[i][j] == 0){
                document.getElementById(id).className = "tile";
                document.getElementById(id).innerHTML = "";
            }else{
                document.getElementById(id).className = "tile tile-" + aGameState.board[i][j];
                document.getElementById(id).innerHTML = aGameState.board[i][j];
            }
        }
    }

};