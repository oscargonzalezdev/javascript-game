// create intances
let game = new Game();
// let diver = new Diver();
// let opponent = new Opponent();

game.play();


/* ----------------------------- INFO DISPLAY ----------------------------- */

// create tag elements in the DOM
const scoreChild = document.createElement("h1");
scoreChild.classList.add("finalScore");
const scoreParent = document.getElementById("score");
scoreParent.appendChild(scoreChild);
// scoreChild.innerHTML = 0;

const levelChild = document.createElement("h1");
const levelParent = document.getElementById("level");
levelParent.appendChild(levelChild);
levelChild.innerHTML = 0;

const livesChild = document.createElement("h1");
const livesParent = document.getElementById("lives");
livesParent.appendChild(livesChild);
livesChild.innerHTML = 0;

const trashChild = document.createElement("h1");
const trashParent = document.getElementById("trash");
trashParent.appendChild(trashChild);
trashChild.innerHTML = 0;