onload = function(event){
    newNumber();
    newNumber();
    printBoard();
}

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

function printScore(){
    document.getElementById("scoreVal").innerHTML = score;
}

function printBoard(){
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

document.onkeydown = function (event) {
    if(event.repeat)
        return;

    handleKeyPress(event.key);
    printScore();
    printBoard();
};

function possibleMove(){
    let up = false;
    let left = false;
    let down = false;
    let right = false;

    for (let j = 0; j < n; j++) {
        for (let i = 1; i < m; i++) {
            if (board[i][j] == board[i-1][j] && board[i][j] != 0) {
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
            if (board[i][j] == board[i][j-1] && board[i][j] != 0) {
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
            if (board[i][j] != 0 && board[i-1][j] == 0) {
                up = true;
                break;
            }
        }
    }

    for (let i = 0; i < m; i++) {
        if(left)
            break;

        for (let j = 1; j < n; j++) {
            if (board[i][j] != 0 && board[i][j-1] == 0) {
                left = true;
                break;
            }
        }
    }
    
    for (let j = 0; j < n; j++) {
        if(down)
            break;

        for (let i = m - 2; i >= 0; i--) {
            if (board[i][j] != 0 && board[i+1][j] == 0) {
                down = true;
                break;
            }
        }
    }

    for (let i = 0; i < m; i++) {
        if(right)
            break;

        for (let j = n - 2; j >= 0; j--) {
            if (board[i][j] != 0 && board[i][j+1] == 0) {
                right = true;
                break;
            }
        }
    }

    return [up, left, down, right];
}

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

