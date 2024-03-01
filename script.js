let currentPlayer = 'X'; // Variável para controlar o jogador atual
let board = [  //Representa o tabuleiro do jogo
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]; 
let score = { X: 0, O: 0 }; //Mantém o placar dos jogadores
let againstComputer = false; // Controlar o modo de jogo, se o jogo é contra o computador ou outro jogador

function play(cell, row, col) {
    if (cell.innerText === '' && !isGameOver()) { //verifica se a celula esta vazia e o jogo não acabou
        cell.innerText = currentPlayer; //Marca a célula com o símbolo do jogador atual
        board[row][col] = currentPlayer; //Atualiza o estado do tabuleiro
        if (checkWinner(currentPlayer)) {  //Verifica se o jogador atual ganhou
            score[currentPlayer]++;
            document.getElementById('score').innerText = `Placar: Jogador X - ${score.X} | Jogador O - ${score.O}`;
            alert(`Jogador ${currentPlayer} venceu!`); //Exibe uma msg de vitória
            reset();
            return;
        }
        if (!againstComputer) { // Se estiver jogando contra outro jogador
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('player-turn').innerText = `Vez do Jogador ${currentPlayer}`;
        } else { 
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            computerPlay();
        }
        if (isBoardFull()) {
            alert('Empate!');
            reset();
            return;
        }
    }
}

function computerPlay() { //Lógica para a jogada do computador, representa a jogada do computador
    let emptyCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                emptyCells.push({ row: i, col: j });
            }
        }
    }
    if (emptyCells.length > 0) { //Escolhe uma célula aleatória mara marcar com 0

        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let { row, col } = emptyCells[randomIndex];
        let cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.innerText = currentPlayer;
        board[row][col] = currentPlayer;
        if (checkWinner(currentPlayer)) { 
            score[currentPlayer]++;
            document.getElementById('score').innerText = `Placar: Jogador X - ${score.X} | Jogador O - ${score.O}`;
            alert(`Jogador ${currentPlayer} venceu!`);
            reset();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('player-turn').innerText = `Vez do Jogador ${currentPlayer}`;
    }
}
//Função que verifica se um jogador venceu
function checkWinner(player) {
    //verifica linhas e colunas
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }
    for (let j = 0; j < 3; j++) {
        //Verifica as diagonais
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
//Verifica se o tabuleiro esta cheio
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
//Função para verificar se o jogo acabou
function isGameOver() {
    return checkWinner('X') || checkWinner('O') || isBoardFull();
}

function reset() {
    currentPlayer = 'X'; //Reinicia o jogador atual paxa X
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    document.getElementById('player-turn').innerText = `Vez do Jogador X`;
}

function togglePlayerMode() {
    againstComputer = !againstComputer;
    reset();
    document.getElementById('player-turn').innerText = `Vez do Jogador X`;
}