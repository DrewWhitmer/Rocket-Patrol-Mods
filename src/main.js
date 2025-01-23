/*
Name: Drew Whitmer
Name of game:
Time: 30 mins
Mods: Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
      (time is not necessarily subtracted, but the timer slows down so that the effect is the same)
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
}

let game = new Phaser.Game(config);

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;

//UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;