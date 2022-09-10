// state
let initialState;
const gameState = {
    players: ['x', 'o'],
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    score: {'x score': 0, 'o score': 0}
};
const gameArea = document.getElementById('gameBoard');



function buildInitialState() {
    for (let i = 0; i < 9; i++) {
        const newCells = document.createElement('div');
        newCells.classList.add('cell');
        newCells.dataset.index = i;
        gameArea.appendChild(newCells);
    }
}

buildInitialState()

// render
function renderState() {
    
}

// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}
// const board = document.getElementById('board');
// board.addEventListener('click', onBoardClick); // etc