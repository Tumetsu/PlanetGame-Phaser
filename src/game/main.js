 'use strict';
/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */


var SPEED = 200;
var GRAVITY = 900;

var state = {
    init: function() {

    },
    preload: function() {
        // STate preload logic goes here
        this.load.image("wall", "/assets/wall.png");
        this.load.image("background", "/assets/background-texture.png");
        this.load.spritesheet("player", "/assets/player.png", 48, 48);
        game.load.image('playership', 'assets/playership.png'); //load player's ship graphic
    },
    create: function(){
    /*
      // State create logic goes here
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.arcade.gravity.y = GRAVITY;

      this.background = this.add.tileSprite(0,0, this.world.width, this.world.height, 'background');
      this.background.autoScroll(-SPEED,0);

      this.player = this.add.sprite(0,0,'player');
      this.player.animations.add('fly', [0,1,2], 10, true);
      this.physics.arcade.enableBody(this.player);
      this.player.body.collideWorldBounds = true;
      this.reset();
    */  
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = GRAVITY;
        var player = new SpaceShip(game, 200, 300);
        game.add.existing(player);

     


    },
    update: function() {
        // State Update Logic goes here.
        /*
        if(this.gameStarted){
        }else{
            this.player.y = this.world.centerY + (8 * Math.cos(this.time.now/200));
        }
        */
    },
    reset:function(){
        /*
        this.gameStarted = false;
        this.gameOver = false;
        this.score = 0;

        this.player.body.allowGravity = false;
        this.player.reset(this.world.width / 4, this.world.centerY);
        this.player.animations.play('fly');
        */
    }


   
};



var game = new Phaser.Game(
    800,
    480,
    Phaser.AUTO,
    'game',
    state
);

