
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');

    let currentPlayer = 'X';

    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const checkWinner = () => {
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === currentPlayer && board[row][1] === currentPlayer && board[row][2] === currentPlayer) {
                return true;
            }
        }

        for (let col = 0; col < 3; col++) {
            if (board[0][col] === currentPlayer && board[1][col] === currentPlayer && board[2][col] === currentPlayer) {
                return true;
            }
        }

        return board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer || board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer;
    };

    const checkDraw = () => {
        return board.every(row => row.every(cell => cell !== null));
    };

    const handleClick = (row, col) => {
        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            cells[row * 3 + col].textContent = currentPlayer;
            if (checkWinner()) {
                message.textContent = `${currentPlayer} wins!`;
                cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
            } else if (checkDraw()) {
                message.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `Next turn: ${currentPlayer}`;
            }
        } else {
            message.textContent = "Invalid move!"
        }
    };

    const handleCellClick = (event) => {
        const row = parseInt(event.target.getAttribute('data-row'));
        const col = parseInt(event.target.getAttribute('data-col'));
        handleClick(row, col);
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
})

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