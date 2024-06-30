const main = document.querySelector("main");
const selectPlayersBtn = document.querySelector(".select-players");
const gameBoard = document.querySelector('.gameBoard');
const myModal = document.querySelector('.new-game-dialog');
const gameForm = document.querySelector('.gameForm');
const closeModalBtn = document.querySelector('.close-modal-btn');
const playersNameDiv = document.querySelector('.player-names');
const player1StatsDiv = document.querySelector('.player1-stats');
const player2StatsDiv = document.querySelector('.player2-stats');
const roundResultDiv = document.querySelector('.round-result');
const backdrop = document.createElement('div');
backdrop.classList.add('backdrop');
document.body.appendChild(backdrop);

let currentPlayer = "X";
let board = ['', '', '', '', '', '', '', '', ''];
let player1Score = 0;
let player2Score = 0;
let players = { X: '', O: '' };

const restartGameBtn = document.createElement('button');
restartGameBtn.classList.add('restart-btn');
restartGameBtn.textContent = "Restart Game";
const endGameBtn = document.createElement('button');
endGameBtn.classList.add('end-game-btn');
endGameBtn.textContent = "End Game";

function generateBoard() {
    gameBoard.style.display = 'grid';
    playersNameDiv.style.display = 'flex';
    player1StatsDiv.style.display = 'flex';
    player2StatsDiv.style.display = 'flex';
    selectPlayersBtn.style.display = 'none';

    if(gameBoard.children.length > 0) return;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        gameBoard.appendChild(cell);
    }

    const gameBoardButtonsContainer = document.querySelector(".gameBoard-buttons");
    if (!gameBoardButtonsContainer.contains(restartGameBtn)) {
        gameBoardButtonsContainer.appendChild(restartGameBtn);
    }
    if (!gameBoardButtonsContainer.contains(endGameBtn)) {
        gameBoardButtonsContainer.appendChild(endGameBtn);
    }
}

function clearBoard() {
    const cells = gameBoard.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.textContent = "";
    })

    board = ['', '', '', '', '', '', '', '', ''];
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

function updateScore(reset = false) {
    if (reset) {
        player1Score = 0;
        player2Score = 0;
    } else {
        if (currentPlayer === "X") {
            player1Score++;
        } else {
            player2Score++;
        }
    }

    player1StatsDiv.textContent = `${gameForm.player1.value} Score: ${player1Score}`;
    player2StatsDiv.textContent = `${gameForm.player2.value} Score: ${player2Score}`;
}

function showResult(message) {
    roundResultDiv.textContent = message;
      roundResultDiv.style.display = "flex";
      setTimeout(() => {
        roundResultDiv.classList.add('hidden');
        setTimeout(() => {
          roundResultDiv.style.display = "none";
          roundResultDiv.classList.remove('hidden');
        }, 400); // same time as the defined in the css transition
    }, 2400); // seconds for the result of the round to disappear
}

function restartGame() {
    clearBoard();
    updateScore(true);
}

function endGame() {
    // location.reload();
    clearBoard();

    selectPlayersBtn.style.display = "flex";

    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    gameBoard.style.display = 'none';
    playersNameDiv.style.display = 'none';
    player1StatsDiv.style.display = 'none';
    player2StatsDiv.style.display = 'none';
    roundResultDiv.style.display = 'none';

    restartGameBtn.remove();
    endGameBtn.remove();

    player1Score = 0;
    player2Score = 0;

    players.X = '';
    players.O = '';

    currentPlayer = "X";
}

function openModal() {
    myModal.showModal();
    backdrop.classList.add('show');
}

function closeModal() {
    myModal.close();
    backdrop.classList.remove('show');
}

gameBoard.addEventListener('click', (event) => {
    const target = event.target;
    const index = target.getAttribute('data-index');

    if(target.classList.contains('cell') && board[index] === '') {
        board[index] = currentPlayer;
        target.textContent = currentPlayer;
        if(checkWin()) {
            showResult(`${players[currentPlayer]} wins!`);
            updateScore();
            clearBoard();
        } else if (board.every(cell => cell !== '')) {
            showResult("It's a draw!");
            clearBoard();
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
});

gameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    players.X = gameForm.player1.value;
    players.O = gameForm.player2.value;
    closeModal();
    generateBoard();
    playersNameDiv.textContent = `${players.X} vs ${players.O}`;
    player1StatsDiv.textContent = `${gameForm.player1.value} Score: ${player1Score}`;
    player2StatsDiv.textContent = `${gameForm.player2.value} Score: ${player1Score}`;
})

selectPlayersBtn.addEventListener('click', () => openModal);
closeModalBtn.addEventListener('click', () => closeModal);
restartGameBtn.addEventListener('click', restartGame);
endGameBtn.addEventListener('click', endGame);