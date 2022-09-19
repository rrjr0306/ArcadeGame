// state

//  get board to display

//get board to register clicks, start with X

//switch user after every click

// set winning parameters

//disable board once a player has won or a tie is reached

//clean up code



//const's

var currentPlayer
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
    console.log(`start of buildstate: ${currentPlayer}`);  
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
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    cells.forEach((cell) => cell.innerText = '');
    statusMessage.innerText = `Fill out your names:`
    console.log(`end of buildstate: ${currentPlayer}`);  
}



//functions

function startGame() {
    console.log(`start of start game: ${currentPlayer}`);  
    if (document.getElementById('playerX').value == '') {
        alert('Please enter your name');
        return;
    }

    buildInitialState();
    if (currentPlayer == 'X') {
        statusMessage.innerText = `${playerX}, it's your turn`;
    }

    else {
        statusMessage.innerText = `${playerO}, it's your turn`;
        computerTurn();
    }  
    console.log(`end of start game: ${currentPlayer}`);
}


function changePlayer() {
    console.log(`start of changePlayer: ${currentPlayer}`); 
    if (!board.includes(null)) {
        gameRunning = false;
        checkWinner();
    } 
    
    else {    
         
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
            statusMessage.innerHTML = `It's ${playerO}'s turn`;
        }
        else if (currentPlayer === 'O') {
            currentPlayer = 'X'
            statusMessage.innerHTML = `It's ${playerX}'s turn`;
            }
    }
    console.log(`end of changePlayer: ${currentPlayer}`); 
}

function changeIndex(cell, index) {
    console.log(`start of changeIndex: ${currentPlayer}`); 
    board[index] = currentPlayer;
    console.log(`end of changeIndex: ${currentPlayer}`); 
}


function cellClicked(event) {
    console.log(`start of cellClicked: ${currentPlayer}`); 
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
    
    if (playerO == 'Computer') {
        setTimeout(computerTurn, 1000);
    }
    drawCheck();
    console.log(`end of cellClicked: ${currentPlayer}`); 
}

function computerTurn() {
    console.log(`start of computerTurn: ${currentPlayer}`); 
    if (gameRunning) {
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
        
        }
        drawCheck();
        checkWinner();
        changePlayer();
    }
    else {
    checkWinner();
    }
    console.log(`end of computerTurn: ${currentPlayer}`); 
}



function checkWinner() {
    console.log(`start of checkWinner: ${currentPlayer}`); 
    for (let i = 0; i < winningCells.length; i++) {
        const wins = winningCells[i];
        const cellA = board[wins[0]];
        const cellB = board[wins[1]];
        const cellC = board[wins[2]];

        if(cellA == null || cellB == null || cellC == null){
            continue;
        }


        if (gameRunning) {
            if(cellA == cellB && cellB == cellC){
                if (currentPlayer == 'X') {
                    alert(`${playerO} has won!`);
                    statusMessage.innerText = `${playerO} won!`;
                    console.log(statusMessage.innerHTML);
                    gameRunning = false;
                    break;
                }

                else {
                    alert(`${playerX} has won!`);
                    statusMessage.innerText = `${playerX} won!`;
                    console.log(statusMessage.innerHTML);
                    gameRunning = false;
                    break;
                }
                        
            }
        }    
    }

    drawCheck();

    // if (!board.includes(null)) {
    //     statusMessage.innerText = `It's a draw!`;
    //     alert("It's a draw!");
    //     gameRunning = false;
    // }

    // if (!gameRunning) {
    //     if (!board.includes(null)) {
    //         statusMessage.innerText = `It's a draw!`;
    //         alert("It's a draw!");
    //         gameRunning = false;
    //     }
    // }
    console.log(`end of checkWinner: ${currentPlayer}`); 
}

function drawCheck() {
    console.log(`start of drawCheck: ${currentPlayer}`); 
    if (gameRunning && !board.includes(null)) {
        statusMessage.innerText = `It's a draw!`;
        alert("It's a draw!");
        gameRunning = false;
    }
    console.log(`end of drawCheck: ${currentPlayer}`); 
}


function resetGame() {
    playerX = '';
    playerO = '';
    document.getElementById('playerX').value = '';
    document.getElementById('playerO').value = '';
    buildInitialState();
}

buildInitialState()