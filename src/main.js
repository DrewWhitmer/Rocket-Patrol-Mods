/*
Name: Drew Whitmer
Name of game:
Time: 3.5 hrs
Mods: Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
      (time is not necessarily subtracted, but the timer reverses for specific amount of time or speeds up for specific amount of 
      time so that the effect is the same.)

      Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
      (made the new ship half the size of the old one, 1.5 times as fast, and worth 40 points. Used piskel to make asset.)

      Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)
      (made new small orange sprite to use with it, explosion happens at the position of the spaceship on impact. Used piskel to make asset.)

      Create 4 new explosion sound effects and randomize which one plays on impact (3)
      (added the 4 new ones on top of the default one given to us. New sound effects are quiter than default one. Used JFXR to make sfx.)

      Allow the player to control the Rocket after it's fired (1)

      Implement the speed increase that happens after 30 seconds in the original game (1


*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
}

let game = new Phaser.Game(config);

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;

//UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;