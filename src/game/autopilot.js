
function Autopilot() 
{
	this.targetG = 1;	

};

//Return vector with adjusted velocity and direction to stay in stable orbit (90 degree angle)
Autopilot.prototype.adjustVelocityForOrbit = function(gravityVec, velocity) {

	//to stay on stable orbit, velocity vector should be as long as g-vector and in 90 degrees angle
	var gSpd = Math.sqrt(Math.pow(gravityVec.x, 2) + Math.pow(gravityVec.y,2));

	//we are close the surface of the planet
	if (gSpd > this.targetG)
	{
		var gvAngle = Phaser.Math.degToRad(Phaser.Point.angle(gravityVec, velocity));
		var speed = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y,2));	
		var gvMagnitude = speed / Math.cos(gvAngle);
		var gV = Phaser.Point.normalize(gravityVec);
		gV = gV.multiply(gvMagnitude, gvMagnitude);


		var optVec = Phaser.Point.add(gravityVec, gV);
		optVec = Phaser.Point.perp(optVec);
		//console.log(optVec);
		return optVec
	}
	else
	{
		return velocity
	}



	

}