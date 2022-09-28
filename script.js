let m = 4;
let n = 4;
let board = Array(m).fill().map(() => Array(n).fill(0));
let score = 0;

onload = function(event){
    board[0][0] = 2;
    board[0][1] = 2;
    board[0][2] = 2;
    board[0][3] = 2;
    printBoard();
}

function printScore(){
    document.getElementById("score").innerHTML = "Score: " + score;
}

function printBoard(){
    let str = "";
    for(row of board){
        for(square of row){
            let temp = "";
            for(let i = 0; i < 10 - square.toString().length; i++){
                console.log(i);
                temp += "&nbsp;";
            }
            str += square + temp;
        }
        str += "<br/><br/>";
    }

    document.getElementById("container").innerHTML = str;
};

document.onkeydown = async function (event) {
    if(event.repeat)
        return;

    await testBoard(event.key);
    printScore();
    printBoard();
};

function testBoard(key) {
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

    if(key == "w" && up == false)
        return;

    if(key == "a" && left == false)
        return;
    
    if(key == "s" && down == false)
        return;
    
    if(key == "d" && right == false)
        return;

    switch (key) {
        case "w":
            for (let j = 0; j < n; j++) {
                for (let i = 1; i < m; i++) {
                    if (board[i][j] != 0) {
                        for (let index = 0; index < i; index++) {
                            if (board[index][j] == 0) {
                                board[index][j] = board[i][j];
                                board[i][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
            for (let j = 0; j < n; j++) {
                for (let i = 1; i < m; i++) {
                    if (board[i][j] == board[i-1][j]) {
                        board[i - 1][j] *= 2;
                        board[i][j] = 0;
                        score += board[i-1][j];
                    }
                }
            }
            for (let j = 0; j < n; j++) {
                for (let i = 1; i < m; i++) {
                    if (board[i][j] != 0) {
                        for (let index = 0; index < i; index++) {
                            if (board[index][j] == 0) {
                                board[index][j] = board[i][j];
                                board[i][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case "a":
            for (let i = 0; i < m; i++) {
                for (let j = 1; j < n; j++) {
                    if (board[i][j] != 0) {
                        for(let index = 0; index < j; index++){
                            if (board[i][index] == 0) {
                                board[i][index] = board[i][j];
                                board[i][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < m; i++) {
                for (let j = 1; j < n; j++) {
                    if (board[i][j] == board[i][j-1]) {
                        board[i][j - 1] *= 2;
                        board[i][j] = 0;
                        score += board[i][j-1];
                    }
                }
            }
            for (let i = 0; i < m; i++) {
                for (let j = 1; j < n; j++) {
                    if (board[i][j] != 0) {
                        for(let index = 0; index < j; index++){
                            if (board[i][index] == 0) {
                                board[i][index] = board[i][j];
                                board[i][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case "s":
            for (let j = 0; j < n; j++) {
                for (let i = m - 2; i >= 0; i--) {
                    if (board[i][j] != 0) {
                        for (let index = m-1; index > 0; index--) {
                            if (board[index][j] == 0) {
                                board[index][j] = board[i][j];
                                board[i][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
            for (let j = 0; j < n; j++) {
                for (let i = m - 2; i >= 0; i--) {
                    if (board[i][j] == board[i+1][j]) {
                        board[i + 1][j] *= 2;
                        board[i][j] = 0;
                        score += board[i+1][j];
                    }
                }
            }
            for (let j = 0; j < n; j++) {
                for (let i = m - 2; i >= 0; i--) {
                    if (board[i][j] != 0) {
                        for (let index = m-1; index > 0; index--) {
                            if (board[index][j] == 0) {
                                board[index][j] = board[i][j];
                                board[i][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case "d":
            for (let i = 0; i < m; i++) {
                for (let j = n - 2; j >= 0; j--) {
                    if (board[i][j] != 0) {
                        for(let index = n - 1; index > j; index--){
                            if (board[i][index] == 0) {
                                board[i][index] = board[i][j];
                                board[i][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < m; i++) {
                for (let j = n - 2; j >= 0; j--) {
                    if (board[i][j] == board[i][j+1]) {
                        board[i][j + 1] *= 2;
                        board[i][j] = 0;
                        score += board[i][j+1];
                    }
                }
            }
            for (let i = 0; i < m; i++) {
                for (let j = n - 2; j >= 0; j--) {
                    if (board[i][j] != 0) {
                        for(let index = n - 1; index > j; index--){
                            if (board[i][index] == 0) {
                                board[i][index] = board[i][j];
                                board[i][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
            break;
        default:
            return;
    }
    newNumber();
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