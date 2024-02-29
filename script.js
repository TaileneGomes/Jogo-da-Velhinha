let currentPlayer = 'X'; //Váriavel para controlar o jogador atual
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]; //Representa o tabuleiro
let score = { X: 0, O: 0 }; //Objeto para controlar o placar

function play(cell, row, col) {
    if (cell.innerText === '' && !isGameOver()) { //Verificar se a célula esta vazia e o jogo não acabou
        cell.innerText = currentPlayer;
        board[row][col] = currentPlayer;
        if (checkWinner(currentPlayer)) { 
            score[currentPlayer]++;
            document.getElementById('score').innerText = `Placar: Jogador X - ${score.X} | Jogador O - ${score.O}`;
            alert(`Jogador ${currentPlayer} venceu!`); //Alerta de vitória
            reset();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('player-turn').innerText = `Vez do Jogador ${currentPlayer}`;
        if (isBoardFull()) {
            alert('Empate!');
            reset();
            return;
        }
    }
}

function checkWinner(player) {
    
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }
    
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
            return true;
        }
    }

    if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
        return true;
    }
    return false;
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function isGameOver() {
    return checkWinner('X') || checkWinner('O') || isBoardFull();
}

function reset() {
    currentPlayer = 'X';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    document.getElementById('player-turn').innerText = `Vez do Jogador X`;
}