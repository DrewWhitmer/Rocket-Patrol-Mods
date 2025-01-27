class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        //Green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        //White borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        //add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4 + borderPadding*4, 'spaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*6, 'spaceship', 0, 20, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*8, 'spaceship', 0, 10, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'smallSpaceship', 0, 60, game.settings.spaceshipSpeed * 1.5).setOrigin(0, 0);
        //define controls
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //initialize score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        //GAME OVER flag
        this.gameOver = false;


        //60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        this.speedUp = false;
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        //check collisions
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(!this.speedUp && this.clock.getElapsedSeconds() >= 30) {
            this.ship01.moveSpeed *= 1.5;
            this.ship02.moveSpeed *= 1.5;
            this.ship03.moveSpeed *= 1.5;
            this.ship04.moveSpeed *= 1.5;
            this.speedUp = true;
        }
    }

    //check for collision
    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    //EXPLODE THE SHIP
    shipExplode(ship) {
        //hide the ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        const emitter = this.add.particles(ship.x, ship.y, 'spark', {
            lifespan: 500,
            speed: {min: 50, max: 150},
            gravityY: 0,
            blendMode: 'ADD',
            emitting: false,
        });
        emitter.explode(100);
        
        boom.on('animationcomplete', () => {           
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
        //score add, timer add, and text update
        this.p1Score += ship.points;
        this.addTime(game.settings.timerAdder);
        this.scoreLeft.text = this.p1Score;
        //sound
        switch(Math.floor(Math.random() * 5)) {
            case 0:
                this.sound.play('sfx-explosion-1');
                break;
            case 1:
                this.sound.play('sfx-explosion-2');
                break;
            case 2:
                this.sound.play('sfx-explosion-3');
                break;
            case 3:
                this.sound.play('sfx-explosion-4');
                break;
            case 4:
                this.sound.play('sfx-explosion-5');
                break;
            
        }
        
    }

    //change the time of the timer
    addTime(newScale) {
        this.clock.timeScale = newScale;
        this.timer = this.time.delayedCall(500, () => {
            this.clock.timeScale = 1;
        }, null, this);
    }
}