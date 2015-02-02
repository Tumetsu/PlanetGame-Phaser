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

            
var zoomMinWidth = 864;
var mapSizeXCurrent = 2000;
var mapSizeX = 2000;
var mapSizeY = 1125;
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

        game.world.setBounds(0,0, 2000, 2000);
        game.physics.startSystem(Phaser.Physics.P2JS);  
        this.background = this.add.tileSprite(-500,-500, this.world.width+1000, this.world.height+1000, 'background');

        //group to add all zoomable gameobjects
        stageGroup = this.add.group();
        stageGroup.x = 0;
        stageGroup.y = 0;
        stageGroup.visible = true;
        
        //draw rectangle around level limits
        this.stageLimits = new Phaser.Graphics(this, 0,0);
        stageGroup.add(this.stageLimits);
        this.stageLimits.lineStyle(8, 0xffffff, 0.2);
        this.stageLimits.drawRect(0,0, this.world.width, this.world.height);
        
        //add few gameobjects
        var planet1 = new Planet(this, stageGroup, 300, 500, 100000);
        stageGroup.add(planet1);
        var planet2 = new Planet(this, stageGroup, 2000, 0, 100000);
        stageGroup.add(planet2);
        this.player = new SpaceShip(this, 200, 300);
        stageGroup.add(this.player);
        
        game.camera.bounds = null;
        

    },
    /*
    render: function() {
        game.debug.geom(this.player.engineLine);
        game.debug.lineInfo(this.player.engineLine, 32, 32);
    },
    */
    update: function() {
        
        zoom(); //Temporary

    },
    reset:function(){
       
    }

   
};

var zoom = function() {
    //Modified from code here: http://www.html5gamedevs.com/topic/7150-how-to-zoom-out-from-center-of-gameworld/

    // zoom in/out with a/o
    if (game.input.keyboard.isDown(Phaser.Keyboard.A) && (mapSizeXCurrent < mapSizeX)) { 
        mapSizeXCurrent += 32; 
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.O) && (mapSizeXCurrent > zoomMinWidth )) {
        mapSizeXCurrent -= 32; 
    }

    mapSizeXCurrent = Phaser.Math.clamp(mapSizeXCurrent, zoomMinWidth , mapSizeX); 
    worldScale = mapSizeXCurrent/mapSizeX;
    stageGroup.scale.set(worldScale);  // scales my stageGroup (contains all objects that should be scaled)

    
    //center camera on the point that was in the center of the view atm the zooming started
    oldcamera = null;
    if (!currentcamerapositionX){ // if not set yet (never zoomed)
        currentcamerapositionX = game.camera.view.centerX;
        currentcamerapositionY = game.camera.view.centerY;
    }
    followx = currentcamerapositionX*worldScale;
    followy = currentcamerapositionY*worldScale;

    game.camera.focusOnXY(followx, followy);
            
}



var game = new Phaser.Game(
    864,
    486,
    Phaser.AUTO,
    'game',
    state
);

