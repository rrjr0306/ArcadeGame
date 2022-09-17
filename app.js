// state

//  get board to display

//get board to register clicks, start with X

//switch user after every click

// set winning parameters

//disable board once a player has won or a tie is reached

//clean up code



//const's

let currentPlayer = 'X';
let gameRunning = false;
const gameState = {
    board: [
    null, null, null,
    null, null, null,
    null, null, null
    ]
};
const cells = document.querySelectorAll('.cell')
const gameArea = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const statusText = document.getElementById('statusMessage');
const winningCells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


//event listeners
cells.forEach((cell) => cell.addEventListener('click', cellClicked));
resetButton.addEventListener('click', resetGame);


//initial state

function buildInitialState(event) {
    gameRunning = true;
    gameState.board = [
            null, null, null,
            null, null, null,
            null, null, null
        ],
    
    currentPlayer = 'X';
    cells.forEach((cell) => cell.innerText = '');
    
    }


//functions


function changePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    }
    else {
        currentPlayer = 'X'
    }
}

function changeIndex(cell, index) {
    gameState.board[index] = currentPlayer;
}


function cellClicked(event) {
    let cell = event.target;
    let cellIndex = cell.dataset.cellIndex;
    if (!cell.innerText) {
        cell.innerText = currentPlayer;
    }
    else {
        alert('Please choose another cell');
    }
    
    changeIndex(cell, cellIndex);
    changePlayer();
    console.log(gameState.board)
}


function checkWinner() {
    for (let i = 0; i < 9; i++) {
        const wins = winningCells[i];
        const cellA = gameState.board[wins[0]];
        const cellB = gameState.board[wins[1]];
        const cellC = gameState.board[wins[2]];
        
        if (cellA === cellB && cellB === cellC) {
            gameRunning = false;
            alert(`${currentPlayer} has won!`);
            break;
        }
    }
}

function resetGame() {
    buildInitialState();
}

