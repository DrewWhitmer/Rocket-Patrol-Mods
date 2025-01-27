class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    //preload assets
    preload() {
        //load images
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('smallSpaceship', './assets/SmallSpaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('spark', './assets/spark.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        //load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav');
        this.load.audio('sfx-explosion-1', './assets/sfx-explosion-1.wav');
        this.load.audio('sfx-explosion-2', './assets/sfx-explosion-2.wav');
        this.load.audio('sfx-explosion-3', './assets/sfx-explosion-3.wav');
        this.load.audio('sfx-explosion-4', './assets/sfx-explosion-4.wav');
        this.load.audio('sfx-explosion-5', './assets/sfx-explosion-5.wav');
        this.load.audio('sfx-shot', './assets/sfx-shot.wav');
    }

    create() {
        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        //menu setup
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        //add keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                timerAdder: 0,
                timerSubtracter: 10,
            }
            this.sound.play('sfx-select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                timerAdder: .01,
                timerSubtracter: 5,
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}