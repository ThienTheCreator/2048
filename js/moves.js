function moveUp(){
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
}

function moveLeft(){
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
}

function moveDown(){
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
}

function moveRight(){
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
}