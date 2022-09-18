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
let statusMessage = document.getElementById('statusMessage');
const cells = document.querySelectorAll('.cell')
const gameArea = document.getElementById('gameBoard');
const startButton = document.getElementById('startButton'); 
const resetButton = document.getElementById('resetButton');
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
startButton.addEventListener('click', startGame);



//initial state

function buildInitialState(event) {
    playerX = document.getElementById('playerX').value;
    if (!document.getElementById('playerO').value) {
        playerO = 'Computer'
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
    statusMessage.innerText = `Fill out your names:`
}



//functions

function startGame() {
    buildInitialState();
    statusMessage.innerText = `${playerX}, it's your turn`;
    document.getElementById('playerO').value = 'Computer'
}


function changePlayer() {
       
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
        statusMessage.innerHTML = `It's ${playerO}'s turn`;
        console.log('wtf X');
    }
    else if (currentPlayer === 'O') {
        currentPlayer = 'X'
        statusMessage.innerHTML = `It's ${playerX}'s turn`;
        console.log('wtf O');
    }


}

function changeIndex(cell, index) {
    board[index] = currentPlayer;
}


function cellClicked(event) {
    let cell = event.target;
    let cellIndex = cell.dataset.cellIndex;

    if (gameRunning == false) {
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

    checkWinner();
    changePlayer();
    computerTurn();
}

function computerTurn() {
    if (gameRunning) {
        const indexes = [];
        if (playerO == 'Computer' && currentPlayer == 'O') {
            for (let i = 0; i < board.length; i++) {
                if (board[i] == null) {
                    indexes.push(i);
                }
            }
            const randNum = indexes[Math.floor(Math.random() * indexes.length)];
            let cell = document.getElementById(randNum)
            let cellIndex = cell.dataset.cellIndex;
            cell.innerText = 'O'
            changeIndex(cell, cellIndex);
        
        }
        changePlayer();
    }
    else {
        return; 
    }
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
            if (currentPlayer == 'X') {
                alert(`${playerX} has won!`);
                statusMessage.innerText = `${playerX} won!`;
                console.log(statusMessage.innerHTML);
                gameRunning = false;
                break;
            }

            else {
                alert(`${playerO} has won!`);
                statusMessage.innerText = `${playerO} won!`;
                console.log(statusMessage.innerHTML);
                gameRunning = false;
                break;
            }
                       
        }

    }


    if (!gameRunning) {
        console.log("game isn't running here either!")
    }

    if (!board.includes(null)) {
        alert("It's a draw!")
        gameRunning = false;
    }
}


function resetGame() {
    playerX = '';
    playerO = '';
    document.getElementById('playerX').value = '';
    document.getElementById('playerO').value = '';
    buildInitialState();
}

buildInitialState()