//definition for planet


function Planet(game, x, y, mass) 
{
	Phaser.Sprite.call(this, game, x, y);
	this.anchor.setTo(0.5, 0.5);
	game.physics.p2.enable(this);

	

	this.graphics = game.add.graphics(x, y);
	this.graphics.lineStyle(0);
    this.graphics.beginFill(0xFFFF0B, 0.5);
    
    this.radius = 400;
	this.graphics.drawCircle(0, 0, this.radius);
	this.body.setCircle(this.radius/2);
	//physics
	this.mass = mass;
	this.name = "planet";
	this.body.debug = true;
	this.body.static = true;

};

//inherit
Planet.prototype = Object.create(Phaser.Sprite.prototype);	//inherit Sprite class.
Planet.prototype.constructor = Planet;

Planet.prototype.attraction = function(distance, otherMass) {
	var g = (this.mass * otherMass) / Math.pow(distance, 2);
	if (g > 400)
		g = 400;
	return g;
};


