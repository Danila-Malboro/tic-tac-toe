let currentPlayer = "X";
let gameEnded = false;
let board = ["","","","","","","","",""];
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
function cellClicked(cellIndex) {
    if(!gameEnded && board[cellIndex] === "") {
        const cell = document.getElementById(`cell${cellIndex}`);
        cell.textContent = currentPlayer;
        cell.setAttribute('data-value', currentPlayer);
        board[cellIndex] = currentPlayer;
        if(checkWinner(currentPlayer)) {
            document.getElementById("message").textContent = `Игрок ${currentPlayer} победил!`;
            gameEnded = true;
        } else if (isBoardFull()) {
            document.getElementById("message").textContent = "Ничья!";
            gameEnded = true;
        }else {
            currentPlayer = currentPlayer === "X" ? "O": "X";
        }
        // Тут вызываем бота после функции 
        if (currentPlayer === "O") {
            botMove();
        }        
    }
}

function checkWinner(player) {
    for(const pattern of winPatterns) {
        const[a, b, c] = pattern;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return board.every(cell =>  cell !== "");
}
function botMove() {
    if (!gameEnded) {
        let availableCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                availableCells.push(i); // Сохраняем индекс свободной ячейки
            }
        }
        
        if (availableCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableCells.length);
            const cellIndex = availableCells[randomIndex];
            cellClicked(cellIndex);
        }
    }
}

//Тут функцию бота создаем 
function botmove(){
//Создаем  randomindex. Оно будет содержать любое число от 0 до 8
    let randomindex = Math.floor(Math.random() * 9);
// Цикл while проверяет каждую ячейку
    while(board[randomindex] !== ""){
        randomindex = Math.floor(Math.random() * 9);
    }
    cellclicked(randomindex);
}

function restartGame() {
    currentPlayer = "X";
    gameEnded = false;
    board = ["","","","","","","","",""];
    document.getElementById("message").textContent = "";
    const cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.textContent = "";
        cell.setAttribute('data-value', "");
    }
}