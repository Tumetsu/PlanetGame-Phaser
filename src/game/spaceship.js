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
	this.gravitySumVector = new Phaser.Point();

	//input
	this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);	

};


//inherit
SpaceShip.prototype = Object.create(Phaser.Sprite.prototype);	//inherit Sprite class.
SpaceShip.prototype.constructor = SpaceShip;


SpaceShip.prototype.calculateGravity = function() 
{
	this.gravitySumVector.x = 0;
	this.gravitySumVector.y = 0;

	this.game.world.forEach(function(obj) {
			
			if (obj.name === "planet")
			{
				var newVec = new Phaser.Point(obj.x - this.body.x, obj.y - this.body.y);
				//true force towards the planet
				newVec = newVec.normalize().multiply(obj.attraction(Phaser.Point.distance(this, obj), this.body.mass), 
						obj.attraction(Phaser.Point.distance(this, obj), this.body.mass));
				this.gravitySumVector = Phaser.Point.add(this.gravitySumVector, newVec);
			}
		}, this,true);

	this.body.gravity = this.gravitySumVector;		
}


/**
 * Automatically called by World.update
 */
SpaceShip.prototype.update = function() {

	this.calculateGravity();

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

   this.rotation = this.body.angle; 
};

