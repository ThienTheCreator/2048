let m = 4;
let n = 4;
let board = Array(m).fill().map(() => Array(n).fill(0));
let score = 0;

onload = function(event){
    board[0][0] = 1;
    printBoard();
}

function printBoard(){
    str = "";
    for(row of board){
        for(square of row){
            str += square + " ";
        }
        str += "<br/>";
    }

    document.getElementById("arrPrint").innerHTML = str;
};

document.onkeydown = function (event) {
    if(event.repeat)
        return;

    console.log(event);

    testBoard(event.key);
    printBoard();
};

function testBoard(key){
    switch(key){
        case "w": 
            for(let j = 0; j < n; j++){
                for(let i = 1; i < m; i++){
                    if(board[i][j] == 1){
                        board[i-1][j] = 1;
                        board[i][j] = 0;
                    }
                }
            }
            break;
        case "a":
            for(let i = 0; i < m; i++){
                for(let j = 1; j < n; j++){
                    if(board[i][j] == 1){
                        board[i][j-1] = 1;
                        board[i][j] = 0;
                    }
                }
            }
            break;
        case "s":
            for(let j = 0; j < n; j++){
                for(let i = m-2; i >= 0; i--){
                    if(board[i][j] == 1){
                        board[i+1][j] = 1;
                        board[i][j] = 0;
                    }
                }
            }
            break;
        case "d":
            for(let i = 0; i < m; i++){
                for(let j = n-2; j >= 0; j--){
                    if(board[i][j] == 1){
                        board[i][j+1] = 1;
                        board[i][j] = 0;
                    }
                }
            }
            break;
            break;
        default:
            break;
    }
}