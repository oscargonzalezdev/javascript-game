// This is the main class to manage the game
class Main {
    constructor() {
        this.intervalGame = null;
        this.diver = new Diver();
        this.trashArr = [];
        this.containerArr = [];
    }
    play(nameOfTheClass) {
        this.display(nameOfTheClass);
        this.diver.moveDiver();

    }
    // This Method creates and displays a new DOM elemnt (diver, trash or fish)
    display(nameOfTheClass) {
        // create
        const board = document.getElementById('game-board');
        const newElement = document.createElement('div');
        newElement.className = nameOfTheClass;
        board.appendChild(newElement);
        // display
        this.diver.diverElement = newElement;
        newElement.style.left = this.diver.positionX + "%";
        newElement.style.bottom = this.diver.positionY + "%";
        newElement.style.width = this.diver.width + "px";
        newElement.style.height = this.diver.height + "px";
    }
}

// class to manage the diver
class Diver {
    constructor() {
        this.name = null;
        this.width = 100;
        this.height = 50;
        this.positionX = 10;
        this.positionY = 93;
        this.diverElement = null;
        this.lives = null;
    }
    // Method to add move funtionality to the diver
    moveDiver() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    this.positionX++;
                    console.log('key right invoked');
                    break;
                case 'ArrowLeft':
                    this.positionX--;
                    console.log('key left invoked');
                    break;
                // case 'Space':
                //     game.movePlayer('down');
                //     break;
            }
        });

    }
}

// class to manage the objects in the sea
class Objects extends Diver {
    constructor() {
        super(type);
    }
}