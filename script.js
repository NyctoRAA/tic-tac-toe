const main = document.querySelector("main");
const startGameBtn = document.querySelector(".start-game");

function generateBoard() {
    const boardContainer = document.querySelector('.board-container');

    if(boardContainer.children.length > 0) return;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.classList.add('board-cell');

        boardContainer.appendChild(cell);
    }
}

startGameBtn.addEventListener('click', generateBoard);