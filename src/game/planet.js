//definition for planet


function Planet(game, x, y) 
{
	Phaser.Sprite.call(this, game, x, y);
	this.anchor.setTo(0.5, 0.5);

	this.graphics = game.add.graphics(x, y);
	this.graphics.lineStyle(0);
    this.graphics.beginFill(0xFFFF0B, 0.5);
    this.graphics.drawCircle(0, 0,100);
	
	//physics
	this.mass = 60000;
	this.name = "planet";

};

//inherit
Planet.prototype = Object.create(Phaser.Sprite.prototype);	//inherit Sprite class.
Planet.prototype.constructor = Planet;

Planet.prototype.attraction = function(distance, otherMass) {
	var g = (this.mass * otherMass) / Math.pow(distance/10, 1);
	if (g > 800)
		g = 800;
	console.log(g);

	return g;
};


