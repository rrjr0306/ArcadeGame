// state

//  get board to display

//get board to register clicks, start with X

//switch user after every click

// set winning parameters

//disable board once a player has won or a tie is reached

//clean up code



//const's

let currentPlayer;
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
    gameRunning = true;
    board = [
            null, null, null,
            null, null, null,
            null, null, null
        ],
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    cells.forEach((cell) => cell.innerText = '');
    statusMessage.innerText = `Fill out your names:`
}



//functions

function startGame() {
    if (document.getElementById('playerX').value == '') {
        alert('Please enter your name');
        return;
    }

    playerX = document.getElementById('playerX').value;
    if (!document.getElementById('playerO').value) {
        playerO = 'Computer'
    }
    else {
        playerO = document.getElementById('playerO').value;
    }

    if (currentPlayer == 'X') {
        statusMessage.innerText = `${playerX}, it's your turn`;
    }

    else if (currentPlayer == 'O' && playerO != 'Computer') {
        statusMessage.innerText = `${playerO}, it's your turn`;
    }
    
    else {
        computerTurn();
    }
}


function changePlayer() {
    if (gameRunning) {
        if (currentPlayer == 'X') {
            currentPlayer = 'O';
            statusMessage.innerHTML = `It's ${playerO}'s turn`;
        }
        else if (currentPlayer == 'O') {
            currentPlayer = 'X'
            statusMessage.innerHTML = `It's ${playerX}'s turn`;
        }
    }    
    else {
        return;
    }
}



function changeIndex(cell, index) {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
}


function cellClicked(event) {
    let cell = event.target;
    let cellIndex = cell.dataset.cellIndex;
    if (gameRunning == false) {
        return;
    }

    if (cell.innerText != '') {
        alert('Please choose another cell');
        return;
    }

    changeIndex(cell, cellIndex);
    checkWinner();
    changePlayer();
    if (playerO == 'Computer') {
        setTimeout(computerTurn, 1000);
    }
}

function computerTurn() {
    for (let i = 0; i < winningCells.length; i++) {
        const wins = winningCells[i];
        const cellA = board[wins[0]];
        const cellB = board[wins[1]];
        const cellC = board[wins[2]];
        
        
        if(cellA == 'O' && cellB == 'O' && cellC == null) {            
            let cell = document.getElementById(findIndex(cellC));
            changeIndex(cell, cellC);
            break;
        }

        else if(cellA == null && cellB == 'O' && cellC == 'O') {
            let cell = document.getElementById(findIndex(cellA));
            changeIndex(cell, cellA);
            break;
        }

        else if(cellA == 'O' && cellB == null && cellC == 'O') {
            let cell = document.getElementById(findIndex(cellB));
            changeIndex(cell, cellB);
            break;
        }

        else {
            const indexes = [];
            if (playerO == 'Computer' && currentPlayer == 'O') {
                for (let i = 0; i < board.length; i++) {
                    if (board[i] == null) {
                        indexes.push(i);
                    }
                }
                document.getElementById('playerO').value = 'Computer';
                const randNum = indexes[Math.floor(Math.random() * indexes.length)];
                let cell = document.getElementById(randNum)
                let cellIndex = cell.dataset.cellIndex;
                cell.innerText = 'O'
                changeIndex(cell, cellIndex);
                break;
            }
        }

    }
    checkWinner();
    changePlayer();
}
function checkWinner() {
    for (let i = 0; i < winningCells.length; i++) {
        const wins = winningCells[i];
        const cellA = board[wins[0]];
        const cellB = board[wins[1]];
        const cellC = board[wins[2]];
        
        if(cellA == null || cellB == null || cellC == null) {
            continue;
        }
        
        else if(cellA == cellB && cellB == cellC) {
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
       
        else if (!board.includes(null)) {
            statusMessage.innerText = `It's a draw!`;
            alert("It's a draw!");
            gameRunning = false;
            break;
        }
        
        else {
            continue;
        }
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