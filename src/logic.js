class Game {
    constructor(){
        this.diver = new Diver();
        this.opponent = new Opponent();
        this.gameInterval = null;
        this.opponentsArray = [];
    }
    play (){
        this.diver.show();
        this.diver.move();
        // this.diver.autoDiving();
        this.opponent.show();
        this.opponent.move();
        this.gameInterval = setInterval(() => {
            
        }, 500);
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
    show() {
        const board = document.getElementById('game-board');
        this.diverElement = document.createElement('div');
        this.diverElement.className = 'diver';
        board.appendChild(this.diverElement);
        this.diverElement.style.width = this.width + 'px';
        this.diverElement.style.height = this.height + 'px';
        this.diverElement.style.left = this.positionX +'%';
        this.diverElement.style.top = this.positionY +'%';
    }

    // Method to add movility to the diver
    move() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    this.diverElement.style.left = this.positionX++ + '%';
                    this.diverElement.style.left = this.positionX++ + '%';
                    break;
                case 'ArrowLeft':
                    this.diverElement.style.left = this.positionX-- + '%';
                    this.diverElement.style.left = this.positionX-- + '%';
                    break;
                case ' ':
                case 'ArrowDown':
                    this.diverElement.style.top = this.positionY++ + '%';
                    this.diverElement.style.top = this.positionY++ + '%';
                    break;
                case 'ArrowUp':
                    this.diverElement.style.top = this.positionY-- + '%';
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
        this.positionX = 90;
        this.positionY = Math.floor(Math.random() * 90);
        this.opponentElement = null;
        this.modifier = 0;
    }
    show() {
            const board = document.getElementById('game-board');
            this.opponentElement = document.createElement('div');
            this.opponentElement.className = 'opponent';
            this.opponentElement.style.width = this.width + 'px';
            this.opponentElement.style.height = this.height + 'px';
            this.opponentElement.style.left = this.positionX + '%';
            this.opponentElement.style.top = this.positionY +'%';
            board.appendChild(this.opponentElement);
    }
    move(){
        this.opponentElement.style.left = this.positionX--;
    }

}
