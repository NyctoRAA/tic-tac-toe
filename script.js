const main = document.querySelector("main");
const startGameBtn = document.querySelector(".start-game");
const gameBoard = document.querySelector('.board-container');
let currentPlayer = "X";
let board = ['', '', '', '', '', '', '', '', ''];

function generateBoard() {

    if(gameBoard.children.length > 0) return;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        gameBoard.appendChild(cell);
    }
}

function clearBoard() {
    const cells = gameBoard.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.textContent = "";
    })
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

gameBoard.addEventListener('click', (event) => {
    const target = event.target;
    const index = target.getAttribute('data-index');

    if(target.classList.contains('cell') && board[index] === '') {
        board[index] = currentPlayer;
        target.textContent = currentPlayer;
        if(checkWin()) {
            // #TODO: change the alert to a stats board
            alert(currentPlayer + ' wins!');
            clearBoard();
        } else if (board.every(cell => cell !== '')) {
            alert("It's a draw!");
            clearBoard();
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
});

startGameBtn.addEventListener('click', generateBoard);