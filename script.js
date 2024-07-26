document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const newGameButton = document.getElementById('newGameButton');
    const playerX = '❤️';
    const playerO = 'x';
    let currentPlayer = playerX;
    let gameBoard = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (!gameBoard[index] && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWinner()) {
                showResult(`${currentPlayer} wins!`);
            } else if (gameBoard.every(cell => cell)) {
                showResult('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === playerX ? playerO : playerX;
            }
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => gameBoard[index] === currentPlayer);
        });
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.style.display = 'flex';
    }

    function restartGame() {
        gameBoard.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = playerX;
        resultScreen.style.display = 'none';
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
    newGameButton.addEventListener('click', restartGame);
});