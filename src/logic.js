class Game {
    constructor(){
        this.diver = new Diver();
        // this.opponent = new Opponent();
        this.gameInterval = null;
        this.opponentsArray = []; // will store instances of the class Opponent
        this.counter = 0;
    }
    play (){
        this.diver.showDiver();
        this.diver.moveDiver();
        this.setup('fish');
        this.setup('shark');
    }
    setup(typeOpponent){
        this.gameInterval = setInterval( () => {

            // move and draw oponents
            this.opponentsArray.forEach(opponent => {
                opponent.moveOpponent();
                opponent.showOpponent();
            });

            // create new oponents
            if (this.counter % 10 === 0){
                const newOpponent = new Opponent();
                // this.opponent.opponentElement.style.left = this.positionX;
                newOpponent.createOpponent(typeOpponent);
                this.opponentsArray.push(newOpponent);
            } 
            this.counter++;
        }, 200);
    }
}
// class to manage the diver
class Diver {
    constructor() {
        this.width = 100;
        this.height = 50;
        this.positionX = 0;
        this.positionY = 0;
        this.diverElement = null;
        this.lives = null;
    }
    // this method shows and setup a new DOM element with class 'diver'
    showDiver() {
        const board = document.getElementById('game-board');
        this.diverElement = document.createElement('div');
        this.diverElement.className = 'diver';
        this.diverElement.style.width = this.width + 'px';
        this.diverElement.style.height = this.height + 'px';
        this.diverElement.style.left = this.positionX +'%';
        this.diverElement.style.top = this.positionY +'%';
        board.appendChild(this.diverElement);
    }

    // Method to add movility to the diver
    moveDiver() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    this.diverElement.style.left = this.positionX++ + '%';
                    break;
                case 'ArrowLeft':
                    this.diverElement.style.left = this.positionX-- + '%';
                    break;
                case ' ':
                case 'ArrowDown':
                    this.diverElement.style.top = this.positionY++ + '%';
                    break;
                case 'ArrowUp':
                    this.diverElement.style.top = this.positionY-- + '%';
                    break;
            }
        });
    }
    // element moves up automatically
    // autoDiving() {
    //     this.positionY--;
    // }
}

class Opponent {
    constructor(){
        this.width = 50;
        this.height = 50;
        this.positionX = 0;
        this.positionY = Math.floor(Math.random() * 90) +'%';
        this.opponentElement = null; 
    }

    createOpponent(typeOpponent) {
        const board = document.getElementById('game-board');
        this.opponentElement = document.createElement('div');
        this.opponentElement.className = typeOpponent;
        board.appendChild(this.opponentElement);
    }

    showOpponent(){
        this.opponentElement.style.width = this.width + 'px';
        this.opponentElement.style.height = this.height + 'px';
        this.opponentElement.style.right = this.positionX +'px';
        this.opponentElement.style.top = this.positionY +'%';
    }

    moveOpponent(){
        this.positionX++;
        this.opponentElement.style.right = this.positionX;
    }
}