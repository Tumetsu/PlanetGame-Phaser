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

        var worldwidth = 2000;
        var mapSizeMaxCurrent = 800;
        var mapSizeMax = 2000;
        var mapSizeX = 800;
        var mapSizeY = 700;
        var worldScale = 1;
        var stageGroup = null;
        var oldcamera = null;
        var currentcamerapositionX = 0;
        var currentcamerapositionY = 0;
        var followx = 0;
        var followy = 0;
        var rescalefactorx = 1;
        var rescalefactory = 1;


var state = {
    init: function() {

    },
    preload: function() {
        // STate preload logic goes here
        this.load.image("wall", "/assets/wall.png");
        this.load.image("background", "/assets/background-texture.png");
        this.load.spritesheet("player", "/assets/player.png", 48, 48);
        game.load.physics('physicsShipData', "/assets/shipPolygon.json");
        game.load.image('playership', 'assets/playership.png'); //load player's ship graphic
    },
    create: function(){
    /*
      // State create logic goes here
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.arcade.gravity.y = GRAVITY;

      
      this.background.autoScroll(-SPEED,0);

      this.player = this.add.sprite(0,0,'player');
      this.player.animations.add('fly', [0,1,2], 10, true);
      this.physics.arcade.enableBody(this.player);
      this.player.body.collideWorldBounds = true;
      this.reset();
    */  

        game.stage.backgroundColor = '#124184';
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0, 2000, 2000);
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.arcade.gravity.y = GRAVITY;
        //stageGroup = new Phaser.Group(game);
        this.background = this.add.tileSprite(0,0, this.world.width, this.world.height, 'background');
        
        var planet1 = new Planet(this, 300, 500, 100000);
        this.add.existing(planet1);
        var planet2 = new Planet(this, 1200, 700, 100000);
        this.add.existing(planet2);
        
        this.player = new SpaceShip(this, 200, 300);
        this.add.existing(this.player);
        

        

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
        //zoom();

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

var zoom = function() {
  
    // zoom in/out with a/o
        if ((mapSizeMaxCurrent < mapSizeMax)) 
        { 
            console.log("kasva");
            mapSizeMaxCurrent += 32; 
        }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.O) && (mapSizeMaxCurrent > worldwidth )) { mapSizeMaxCurrent -= 32; }
            console.log("2");
            mapSizeMaxCurrent = Phaser.Math.clamp(mapSizeMaxCurrent, worldwidth , mapSizeMax); 
            worldScale = mapSizeMaxCurrent/mapSizeMax;

            console.log(stageGroup);
            stageGroup.scale.set(worldScale);  // scales my stageGroup (contains all objects that shouldbe scaled)

            if(game.input.activePointer.isDown && !game.input.pointer2.isDown){   //move around the world
                if (oldcamera) { 
                    game.camera.x += oldcamera.x - game.input.activePointer.position.x; 
                    game.camera.y += oldcamera.y - game.input.activePointer.position.y; 
                }
                oldcamera = game.input.activePointer.position.clone();
                // store current camera position (relative to the actual scale size of the world)
                rescalefactorx = mapSizeX / (mapSizeX * worldScale); // multiply by rescalefactor to get original world value
                rescalefactory = mapSizeY / (mapSizeY * worldScale);
                currentcamerapositionX = game.camera.view.centerX*rescalefactorx;
                currentcamerapositionY = game.camera.view.centerY*rescalefactory;
            }
            else { //center camera on the point that was in the center of the view atm the zooming started
                oldcamera = null;
                if (!currentcamerapositionX){ // if not set yet (never zoomed)
                    currentcamerapositionX = game.camera.view.centerX;
                    currentcamerapositionY = game.camera.view.centerY;
                }
                followx = currentcamerapositionX*worldScale;
                followy = currentcamerapositionY*worldScale;

                game.camera.focusOnXY(followx, followy);
            }
}


var game = new Phaser.Game(
    864,
    486,
    Phaser.AUTO,
    'game',
    state
);

