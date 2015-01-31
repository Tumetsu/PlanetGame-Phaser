//definition for player's ship


function SpaceShip(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'playership');
	this.anchor.setTo(0.5, 0.5);

	//physics
	game.physics.enable([this], Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.engineForce = 5;
	this.body.allowGravity = true;
	this.body.drag.x = 0;
	this.body.drag.y = 0;
	this.body.maxVelocity.x = 500;
	this.body.maxVelocity.y = 500;
	this.body.mass = 1;
	this.gravitySumVector = { x: 0, y:0};

	//temporary gravity center
	this.closestMassCenter = null;
	this.distToClosest = 0;
	this.gravPower = 900;

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


SpaceShip.prototype.findClosestAttractor = function() 
{
	//console.log("check");
	var closest = null;
	this.game.world.forEach(function(obj) {
			
			if (obj.name === "planet")
			{
				//find closest planet
				if (closest === null)
				{
					closest = obj;
					this.distToClosest = Phaser.Point.distance(this, obj);	
				}
				else 
				{
					var dist = Phaser.Point.distance(this, obj);
					if (dist < this.distToClosest)
					{
						closest = obj;
						this.distToClosest = dist;
					}
				}
				
			}
		}, this,true);

	//set new mass center-point
	this.closestMassCenter = closest;
		
}



/**
 * Automatically called by World.update
 */
SpaceShip.prototype.update = function() {

	this.findClosestAttractor();

	// Calculate gravity as the normalised vector from the ship to the planet
    this.body.gravity = new Phaser.Point(this.closestMassCenter.x - this.body.x, this.closestMassCenter.y - this.body.y);
    // Normalize and multiply by actual strength of gravity desired
    //console.log(this.closestMassCenter.attraction);
    this.body.gravity = this.body.gravity.normalize().multiply(this.closestMassCenter.attraction(this.distToClosest, this.body.mass), this.closestMassCenter.attraction(this.distToClosest, this.body.mass));

    if (this.upKey.isDown)
    {
    	this.body.velocity.y *= this.engineForce;
    }

	if (this.downKey.isDown)
    {
    	this.body.velocity.y += this.engineForce;
    }
    if (this.rightKey.isDown)
    {
    	this.body.velocity.x += this.engineForce;
    }

    if (this.leftKey.isDown)
    {
    	this.body.velocity.x -= this.engineForce;
    }

    
};

