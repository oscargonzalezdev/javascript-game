// create intances
let game = new Game();
let diver = new Diver();
let opponent = new Opponent();
startBox();

/* ----------------------------- INFO DISPLAY ----------------------------- */

// create tag elements in the DOM
const scoreChild = document.createElement("h1");
scoreChild.classList.add("finalScore");
const scoreParent = document.getElementById("score");
scoreParent.appendChild(scoreChild);

const levelChild = document.createElement("h1");
const levelParent = document.getElementById("level");
levelParent.appendChild(levelChild);
levelChild.innerHTML = 1;

const healthChild = document.createElement("h1");
const healthParent = document.getElementById("health");
healthParent.appendChild(healthChild);

const trashChild = document.createElement("h1");
const trashParent = document.getElementById("trash");
trashParent.appendChild(trashChild);

/* ----------------------------- SECTIONS ----------------------------- */
// show welcome message and instructions
function startBox() {
    const startBox = document.getElementById('startBox');
    startBox.style.display = 'block';
}

// play game button
function playGame(){
    const startBox = document.getElementById('startBox');
    startBox.style.display = 'none';
    game.play();
}

// game over box
function gameOver(){
    clearInterval(game.gameInterval);
    const gameOver = document.getElementById('gameOver');
    gameOver.style.display = 'block';
}

// try again box
function tryAgain(){
    window.location.reload();
}
