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
let playerX;
let playerO;
let board = [
    null, null, null,
    null, null, null,
    null, null, null
];

const cells = document.querySelectorAll('.cell')
const gameArea = document.getElementById('gameBoard');
const startButton = document.getElementById('startButton');
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
startButton.addEventListener('click', buildInitialState);

//initial state

function buildInitialState(event) {
    playerX = document.getElementById('playerX').value;
    if (!document.getElementById('playerO').value) {
        playerO = 'computer'
    }
    else {
        playerO = document.getElementById('playerO').value;
    }
    gameRunning = true;
    board = [
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
    board[index] = currentPlayer;
}


function cellClicked(event) {
    let cell = event.target;
    let cellIndex = cell.dataset.cellIndex;
    
    if (gameRunning == false) {
        console.log('game is not running')
        return;
    }

    if (!cell.innerText) {
        cell.innerText = currentPlayer;
    }
    else {
        alert('Please choose another cell');
    }

    
    changeIndex(cell, cellIndex);

    if (!board.includes(null)) {
    gameRunning = false;    
    };

    console.log(currentPlayer)
    checkWinner();
}


function checkWinner() {
    
    for (let i = 0; i < winningCells.length; i++) {
        const wins = winningCells[i];
        const cellA = board[wins[0]];
        const cellB = board[wins[1]];
        const cellC = board[wins[2]];

        if(cellA == null || cellB == null || cellC == null){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            // if (currentPlayer = 'X') {
            //     alert(`${playerX} has won!`);
            //     gameRunning = false;
            //     break;
            // }

            // else if (currentPlayer = 'O') {
            //     alert(`${playerO} has won!`);
            //     gameRunning = false;
            //     break;
            // }
            
            
            
            
            
            alert(`${currentPlayer} has won!`)
            gameRunning = false;
            console.log(`${currentPlayer} has won!!!`)
            break;
        }

    }


    if (!gameRunning) {
        console.log("game isn't running here either!")
    }

    if (!board.includes(null)) {
        alert("It's a draw!")
        gameRunning = false;
    }

    else {
        changePlayer();
    }

}


function resetGame() {
    playerX = '';
    playerO = '';
    buildInitialState();
    }

// buildInitialState()