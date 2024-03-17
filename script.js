
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const message = document.querySelector('.message');
    const validMovesCount = document.querySelector('.validMovesCount');


    let currentPlayer = 'X';
    const gridSize = 3; // Modify this value for different grid sizes
    let board = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => null));

    for (let row = 0; row < gridSize; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let col = 0; col < gridSize; col++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = row.toString();
            cellElement.dataset.col = col.toString();
            rowElement.appendChild(cellElement);
        }
        gameBoard.appendChild(rowElement);
    }

    gameBoard.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('cell')) {
            const row = parseInt(target.dataset.row);
            const col = parseInt(target.dataset.col);
            handleClick(row, col);
        }
    });

    const handleClick = (row, col) => {
        if (isValidMove(row, col)) { // Check if the cell is empty
            board[row][col] = currentPlayer; // Update the board state with current player's symbol

            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = currentPlayer; // Update the cell content with current player's symbol

            if (checkWinner(row, col)) {
                message.textContent = `${currentPlayer} wins!`;
                validMovesCount.textContent = '';
                disableClicks(); // Disable further clicks
            } else if (checkDraw()) {
                message.textContent = "It's a draw!";
                validMovesCount.textContent = 'No more valid moves';
                disableClicks(); // Disable further clicks
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //
                validMovesCount.textContent = `${countValidMoves()} valid moves left`;
                message.textContent = `Next turn: ${currentPlayer}`;
            }
        } else {
            message.textContent = "Invalid move!"; // Cell is already occupied
        }
    };

    const checkWinner = (lastRow, lastCol) => {
        const symbol = board[lastRow][lastCol];

        // Check row
        if (board[lastRow].every(cell => cell === symbol)) {
            return true;
        }

        // Check column
        if (board.every(row => row[lastCol] === symbol)) {
            return true;
        }

        // Check diagonal
        if (lastRow === lastCol) {
            if (board.every((row, i) => row[i] === symbol)) {
                return true;
            }
        }
        if (lastRow + lastCol === gridSize - 1) {
            if (board.every((row, i) => row[gridSize - 1 - i] === symbol)) {
                return true;
            }
        }

        return false;
    };

    const checkDraw = () => {
        return board.every(row => row.every(cell => cell !== null));
    };

    // Function to disable further clicks on the game board
    const disableClicks = () => {
        gameBoard.removeEventListener('click', handleClick);
    };

    const countValidMoves = () => {
        if (!board || board.length === 0) return 0;

        let validMoves = 0;

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (isValidMove(row, col)) {
                    validMoves++;
                }
            }
        }

        return validMoves;
    };

    const isValidMove = (row, col) => {
        return board[row][col] === null;
    };

    console.log(computeSum([1, 2, 3], [3, 4, 5]));

})

const computeSum = (arr1, arr2) => {
    if (!arr1 || !arr2 || arr1.length !== arr2.length) return null;

    const sumArray = [];
    const length = arr1.length;

    for (let i = 0; i < length; i++) {
        sumArray.push(arr1[i] + arr2[i]);
    }

    return sumArray;
};


// document.addEventListener('DOMContentLoaded', () => {
//     const cells = document.querySelectorAll('.cell');
//     const message = document.querySelector('.message');
//
//     let currentPlayer = 'X';
//     const gridSize = 3; // Modify this value for different grid sizes
//     let board = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => null));
//
//     const checkWinner = () => {
//         for (let row = 0; row < 3; row++) {
//             if (board[row][0] === currentPlayer && board[row][1] === currentPlayer && board[row][2] === currentPlayer) {
//                 return true;
//             }
//         }
//
//         for (let col = 0; col < 3; col++) {
//             if (board[0][col] === currentPlayer && board[1][col] === currentPlayer && board[2][col] === currentPlayer) {
//                 return true;
//             }
//         }
//
//         return board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer || board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer;
//     };
//
//     const checkDraw = () => {
//         return board.every(row => row.every(cell => cell !== null));
//     };
//
//     const handleClick = (row, col) => {
//         if (board[row][col] === null) {
//             board[row][col] = currentPlayer;
//             cells[row * 3 + col].textContent = currentPlayer;
//             if (checkWinner()) {
//                 message.textContent = `${currentPlayer} wins!`;
//                 cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
//             } else if (checkDraw()) {
//                 message.textContent = "It's a draw!";
//             } else {
//                 currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//                 message.textContent = `Next turn: ${currentPlayer}`;
//             }
//         } else {
//             message.textContent = "Invalid move!"
//         }
//     };
//
//     const handleCellClick = (event) => {
//         const row = parseInt(event.target.getAttribute('data-row'));
//         const col = parseInt(event.target.getAttribute('data-col'));
//         handleClick(row, col);
//     };
//
//     cells.forEach(cell => cell.addEventListener('click', handleCellClick));
// })

class TicTacToe {
    constructor(size = 3) {
        this.size = size;
        this.board = Array.from({length: size}, () => Array.from({ length: size}, () => null));
        this.currentPlayer = 'X';
    }

    move(row, col) {
        if (this.isValidMove(row, col)) {
            this.board[row][col] = this.currentPlayer;
            if (this.checkWinner(row, col)) {
                return `${this.currentPlayer} wins!`
            } else if (this.isBoardFull()) {
                return "It's a draw!";
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                return `Next turn: ${this.currentPlayer}`;
            }
        } else {
            return "Invalid move!"
        }
    }

    isValidMove(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size && this.board[row][col] === null;
    }

    checkWinner(row, col) {
        const symbol = this.board[row][col];
        if (this.board[row].every(cell => cell === symbol)) return true;
        if (this.board.every(row => row[col] === symbol)) return true;
        if (row === col && this.board.every((row, i) => row[i] === symbol)) return true;
        if (row + col === this.size - 1 && this.board.every((row, i) => row[this.size - 1 - i] === symbol)) return true;
        return false;
    }

    isBoardFull() {
        return this.board.every(row => row.every(cell => cell != null));
    }
}