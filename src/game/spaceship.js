//definition for player's ship


function SpaceShip(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'playership');
	this.anchor.setTo(0.5, 0.5);

	//physics
	game.physics.enable([this], Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.engineForce = 250;
	this.body.allowGravity = true;
	this.body.drag.y = 50;

	//input
	this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);




};

/*
SpaceShip.prototype = {
	constructor: SpaceShip,
	sayName: function() {
		alert("SPAAAACEEEE!");

};
*/


//inherit
SpaceShip.prototype = Object.create(Phaser.Sprite.prototype);	//inherit Sprite class.
SpaceShip.prototype.constructor = SpaceShip;

/*
SpaceShip.prototype.sayHi = function() {
	alert("SPAACEEE");
}
*/

/**
 * Automatically called by World.update
 */
SpaceShip.prototype.update = function() {

    if (this.upKey.isDown)
    {
    	this.body.velocity.y = -this.engineForce;
    }

};

