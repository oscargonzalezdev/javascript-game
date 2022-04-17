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
        backgroundSound.play();
        welcomeSound.pause();
    }
    // this method manages what happens inside the interval
    setup() {
        this.gameInterval = setInterval(() => {
            // create opponents
            if (this.counter % 12 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('fish1');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 22 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('fish2');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 33 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('fish3');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 44 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('fish4');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 55 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('fish5');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 25 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('shark1');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 50 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('shark2');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 9 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('trash1');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 28 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('trash2');
                this.opponentsArray.push(newOpponent);
            }
            if (this.counter % 41 === 0) {
                const newOpponent = new Opponent();
                newOpponent.createOpponent('trash3');
                this.opponentsArray.push(newOpponent);
            }            
            // update values on displayer
            scoreChild.innerHTML = this.score;
            trashChild.innerHTML = this.trash;
            healthChild.innerHTML = this.health +' %';

            // move and show oponents
            this.opponentsArray.forEach(opponent => {
                opponent.showOpponent();
                opponent.moveOpponent();
                this.collision(opponent);
                this.outside(opponent);
            });

            this.counter++;
        }, 100);
    }

    // detects collisions between diver and opponents
    collision(opponent) {
        let diver = this.diver.diverElement.getBoundingClientRect(); // this method return a object whit information about size and position
        let opp = opponent.opponentElement.getBoundingClientRect();

        // check values of vertical and horizontal axis
        if (diver.x < opp.x + opp.width && diver.x + diver.width > opp.x &&
            diver.y < opp.y + opp.height && diver.height + diver.y > opp.y) {
            switch (opponent.opponentElement.className) {
                case 'shark1':
                case 'shark2':
                    if(this.health > 0){
                        this.health -=4;
                        sharkSound.play();
                    } else {
                        gameOver();
                        backgroundSound.pause();
                        welcomeSound.play();
                    }
                    break;
                case 'trash1':
                    opponent.opponentElement.remove();
                    this.score += 11;
                    this.trash += 1;
                    trashSound.play();
                    break;
                case 'trash2':
                    opponent.opponentElement.remove();
                    this.score += 5;
                    this.trash += 1;
                    trashSound.play();
                    break;

                case 'trash3':
                    opponent.opponentElement.remove();
                    this.score += 50;
                    this.trash += 1;
                    trashSound.play();
                    break;
            }
        }
    }
    // check when elements are outside the game board
    outside(opponent) {
        if (opponent.positionX < -20) {
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
        this.positionX = 0;
        this.positionY = 0;
        this.diverElement = null;
    }
    // this method shows and setup a new DOM element with class 'diver'
    showDiver() {
        const board = document.getElementById('game-board');
        this.diverElement = document.createElement('img');
        this.diverElement.src = './resources/images/diver.png'
        this.diverElement.className = 'diver';
        this.diverElement.style.width = this.width + 'vw';
        this.diverElement.style.left = this.positionX + '%';
        this.diverElement.style.top = this.positionY + '%';
        board.appendChild(this.diverElement);
    }

    // Method to add movility to the diver
    moveDiver() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    this.diverElement.style.left = this.positionX++ * 3 + '%';
                    break;
                case 'ArrowLeft':
                    this.diverElement.style.left = this.positionX-- * 3 + '%';
                    break;
                case ' ':
                case 'ArrowDown':
                    this.diverElement.style.top = this.positionY++ * 3 + '%';
                    break;
                case 'ArrowUp':
                    this.diverElement.style.top = this.positionY-- * 3 + '%';
                    break;
            }
        });
    }
}

/* ----------------------------- OPPONENT CLASS ----------------------------- */
class Opponent {
    constructor() {
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * 90);
        this.opponentElement = null;
        this.counter = 0;
    }
    // create a new opponent
    createOpponent(typeOpponent) {
        const board = document.getElementById('game-board');
        this.opponentElement = document.createElement('img');
        this.opponentElement.className = typeOpponent;
        switch (this.opponentElement.className) {
            case 'fish1':
                this.opponentElement.src = './resources/images/fish1.png';
                this.opponentElement.style.width = 3 + 'vw';
                this.opponentElement.style.zIndex = 1;
                break;
            case 'fish2':
                this.opponentElement.src = './resources/images/fish2.png';
                this.opponentElement.style.width = 3 + 'vw';
                this.opponentElement.style.zIndex = 1;
                break;
            case 'fish3':
                this.opponentElement.src = './resources/images/fish3.png';
                this.opponentElement.style.width = 2 + 'vw';
                this.opponentElement.style.zIndex = 2;
                break;
            case 'fish4':
                this.opponentElement.src = './resources/images/fish4.png';
                this.opponentElement.style.width = 3 + 'vw';
                this.opponentElement.style.zIndex = 1;
                break;
            case 'fish5':
                this.opponentElement.src = './resources/images/fish5.png';
                this.opponentElement.style.width = 3 + 'vw';
                this.opponentElement.style.zIndex = 1;
                break;
            case 'fish5':
                this.opponentElement.src = './resources/images/fish5.png';
                this.opponentElement.style.width = 3 + 'vw';
                this.opponentElement.style.zIndex = 1;
                break;
            case 'shark1':
                this.opponentElement.src = './resources/images/shark1.png';
                this.opponentElement.style.width = 10 + 'vw';
                this.opponentElement.style.zIndex = 2;
                break;
            case 'shark2':
                this.opponentElement.src = './resources/images/shark2.png';
                this.opponentElement.style.width = 10 + 'vw';
                this.opponentElement.style.zIndex = 2;
                break;
            case 'trash1':
                this.opponentElement.src = './resources/images/trash1.png';
                this.opponentElement.style.width = 5 + 'vw';
                this.opponentElement.style.zIndex = 1;
                break;
            case 'trash2':
                this.opponentElement.src = './resources/images/trash2.png';
                this.opponentElement.style.width = 5 + 'vw';
                this.opponentElement.style.zIndex = 1;
                break;
            case 'trash3':
                this.opponentElement.src = './resources/images/trash3.png';
                this.opponentElement.style.width = 5 + 'vw';
                this.opponentElement.style.zIndex = 1;
                break;
        }
        board.appendChild(this.opponentElement);
    }
    // add size and position to opponents
    showOpponent() {
        this.opponentElement.style.left = this.positionX + '%';
        this.opponentElement.style.top = this.positionY + '%';
    }
    // allows opponents to move
    moveOpponent() {
        this.positionX--;
        this.opponentElement.style.left = this.positionX;
        if (this.opponentElement.className == 'shark1' || this.opponentElement.className == 'shark2'){
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
}