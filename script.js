const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]           
];

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes("") ? null : "Draw";
}

function handleClick(e) {
    const idx = e.target.dataset.index;
    if (!gameActive || board[idx]) return;
    board[idx] = currentPlayer;
    e.target.textContent = currentPlayer;
    const result = checkWinner();
    if (result) {
        gameActive = false;
        statusDiv.textContent =
            result === "Draw" ? "It's a draw!" : `Player ${result} wins!`;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    cells.forEach(cell => cell.textContent = "");
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
statusDiv.textContent = `Player ${currentPlayer}'s turn`;
