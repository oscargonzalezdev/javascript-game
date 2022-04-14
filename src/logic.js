/* ----------------------------- GAME CLASS ----------------------------- */
class Game {
    constructor() {
        this.diver = new Diver();
        this.gameInterval = null;
        this.opponentsArray = []; // store instances of the class Opponent
        this.score = 0;
        this.health = 100;
        this.counter = 0;
        this.trash = 0;
    }
    // executed when the player press play
    play() {
        this.diver.showDiver();
        this.diver.moveDiver();
        this.setup();
    }
    // this method manages what happens inside the interval
    setup() {
        this.gameInterval = setInterval(() => {
            // update values on displayer
            scoreChild.innerHTML = this.score;
            trashChild.innerHTML = this.trash;
            healthChild.innerHTML = this.health +' %';

            // move and show oponents
            this.opponentsArray.forEach(opponent => {
                opponent.moveOpponent();
                opponent.showOpponent();
                this.collision(opponent);
                this.outside(opponent);
            });

            // create opponents
            if (this.counter % 50 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('fish');
                this.opponentsArray.push(newOpponent);
            }
            else if (this.counter % 40 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('shark');
                this.opponentsArray.push(newOpponent);
            }
            else if (this.counter % 30 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('trash1');
                this.opponentsArray.push(newOpponent);
            }
            else if (this.counter % 20 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('trash2');
                this.opponentsArray.push(newOpponent);
            }
            this.counter++;
        }, 150);
    }

    // detects collisions between diver and opponents
    collision(opponent) {
        let diver = this.diver.diverElement.getBoundingClientRect(); // this method return a object whit information about size and position
        let opp = opponent.opponentElement.getBoundingClientRect();

        // check values of vertical and horizontal axis
        if (diver.x < opp.x + opp.width && diver.x + diver.width > opp.x &&
            diver.y < opp.y + opp.height && diver.height + diver.y > opp.y) {
            switch (opponent.opponentElement.className) {
                case 'shark':
                    if(this.health > 0){
                        this.health -=5;
                    } else {
                        gameOver();
                    }
                    break;
                case 'trash1':
                case 'trash2':
                    opponent.opponentElement.remove();
                    this.score += 100;
                    this.trash +=1;
                    break;
                default:
                    break;
            }
        }
    }
    // check when elements are outside the game board
    outside(opponent) {
        if (opponent.positionX < 0) {
            this.opponentsArray.shift();
            opponent.opponentElement.remove();
            // console.log('element is outside');
        }
    }
}
/* ----------------------------- DIVER CLASS ----------------------------- */
class Diver {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 0;
        this.diverElement = null;
    }
    // this method shows and setup a new DOM element with class 'diver'
    showDiver() {
        const board = document.getElementById('game-board');
        this.diverElement = document.createElement('div');
        this.diverElement.className = 'diver';
        this.diverElement.style.width = this.width + '%';
        this.diverElement.style.height = this.height + '%';
        this.diverElement.style.left = this.positionX + '%';
        this.diverElement.style.top = this.positionY + '%';
        board.appendChild(this.diverElement);
    }

    // Method to add movility to the diver
    moveDiver() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    this.diverElement.style.left = this.positionX++ * 2 + '%';
                    break;
                case 'ArrowLeft':
                    this.diverElement.style.left = this.positionX-- * 2 + '%';
                    break;
                case ' ':
                case 'ArrowDown':
                    this.diverElement.style.top = this.positionY++ * 2 + '%';
                    break;
                case 'ArrowUp':
                    this.diverElement.style.top = this.positionY-- * 2 + '%';
                    break;
            }
        });
    }
}

/* ----------------------------- OPPONENT CLASS ----------------------------- */
class Opponent {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * 90);
        this.opponentElement = null;
        this.counter = 0;
    }

    createOpponent(typeOpponent) {
        const board = document.getElementById('game-board');
        this.opponentElement = document.createElement('div');
        this.opponentElement.className = typeOpponent;
        board.appendChild(this.opponentElement);
    }

    showOpponent() {
        this.opponentElement.style.width = this.width + '%';
        this.opponentElement.style.height = this.height + '%';
        this.opponentElement.style.left = this.positionX + '%';
        this.opponentElement.style.top = this.positionY + '%';
    }

    moveOpponent() {
        this.positionX--;
        this.opponentElement.style.left = this.positionX;
        setInterval(() => {
            if (this.counter % 2 === 0) {
                this.positionY += 1;
            } else {
                this.positionY -= 1;
            }
            this.counter++;
        }, 1000);
    }
}