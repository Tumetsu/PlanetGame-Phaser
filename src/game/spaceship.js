//definition for player's ship
function SpaceShip(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'playership');
	this.anchor.setTo(0.5, 0.5);
	
	game.camera.follow(this);

	//physics
	game.physics.p2.enable(this);

	this.body.collideWorldBounds = true;
	this.engineForce = 150;
	this.body.setZeroDamping();
	this.body.clearShapes();
	this.body.loadPolygon('physicsShipData', 'playership');

	this.body.mass = 1;
	this.turnSpeed = 3;
	this.gravitySumVector = new Phaser.Point();

	//input
	this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);	

	this.engineLine = new Phaser.Line(x,y,x,y);
	//this.body.debug = true;

};


//inherit
SpaceShip.prototype = Object.create(Phaser.Sprite.prototype);	//inherit Sprite class.
SpaceShip.prototype.constructor = SpaceShip;


SpaceShip.prototype.calculateGravity = function() 
{
	this.gravitySumVector.x = 0;
	this.gravitySumVector.y = 0;

	this.parent.forEach(function(obj) {
			
			if (obj.name === "planet")
			{

				var newVec = new Phaser.Point(obj.x - this.body.x, obj.y - this.body.y);
				var dist = Phaser.Point.distance(this, obj);

				//true force towards the planet
				newVec = newVec.normalize().multiply(obj.attraction(dist, this.body.mass), 
						obj.attraction(dist, this.body.mass));
				this.gravitySumVector = Phaser.Point.add(this.gravitySumVector, newVec);
			}
		}, this,true);

	this.body.velocity.x += this.gravitySumVector.x;
	this.body.velocity.y += this.gravitySumVector.y;
	this.body.setZeroRotation();
}


/**
 * Automatically called by World.update
 */
SpaceShip.prototype.update = function() {
	
	this.calculateGravity();

	//thrust
    if (this.upKey.isDown)
    {
    	this.body.thrust(this.engineForce);
    }

	if (this.downKey.isDown)
    {
    	//this.body.velocity.y += this.engineForce;
    	this.body.setZeroForce();
    	this.body.setZeroVelocity();
    }

    if (this.rightKey.isDown)
    {
    	this.body.angle += this.turnSpeed;
    }

    if (this.leftKey.isDown)
    {
    	this.body.angle -= this.turnSpeed;
    }

   //this.rotation = this.body.angle; 
};

