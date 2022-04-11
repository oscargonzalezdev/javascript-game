let main = new Main();
let diver = new Diver();


main.play('diver');


// function to generate a random number between min and max
function randomNumber(min, max) {
    let num = Math.random() * (max - min) + min;
    return Math.round(num);
};

