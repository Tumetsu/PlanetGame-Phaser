 'use strict';
/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */


var SPEED = 200;
var GRAVITY = 0;

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
        game.stage.backgroundColor = '#124184';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = GRAVITY;
        
        
        var planet1 = new Planet(this, 300, 500, 4000000);
        this.add.existing(planet1);
        //var planet2 = new Planet(this, 600, 200, 400000);
        //this.add.existing(planet2);
        
        this.player = new SpaceShip(this, 200, 300);
        this.add.existing(this.player);
        

        //käy läpi pelimaailman oliot ja tulosta ne konsoliin.
        game.world.forEach(function(child) { console.log(child)}, this, true);



    },
    /*
    render: function() {
        game.debug.geom(this.player.engineLine);
        game.debug.lineInfo(this.player.engineLine, 32, 32);
    },
    */
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
    1000,
    1000,
    Phaser.AUTO,
    'game',
    state
);

