onload = function(event){
    newNumber();
    newNumber();
    
    updateBoard();
}

// a new number is generate 90% chance of 2 and 10% chance of 4
function newNumber(){
    let arr = new Array();
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(board[i][j] == 0){
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
    board[row][col] = num;
}

function updateScore(){
    document.getElementById("scoreVal").innerHTML = score;
}

function updateBoard(){
    let id = "";
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            id = "" + i + j;
            if(board[i][j] == 0){
                document.getElementById(id).className = "tile";
                document.getElementById(id).innerHTML = "";
            }else{
                document.getElementById(id).className = "tile tile-" + board[i][j];
                document.getElementById(id).innerHTML = board[i][j];
            }
        }
    }

};



