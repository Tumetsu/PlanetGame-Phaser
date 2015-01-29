
var obj = {
            _year: 2004
        };

        Object.defineProperty(obj, "testi", {
            get: function() {
                return this._year;
            }
        });

console.log(obj.testi);



//Constructor pattern---------------------------------------------------
//Huomaa että metodit luodaan erikseen jokaiselle instanssille, joten ne eivät ole sama olio! Voidaan kiertää laittamalla
//funktion määrittely rakentajan ulkopuolelle ja viittaamalla siihen rakentajan sisältä. Lisää rojua globaaliin namespaceen...
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;

	this.sayName = function(){
		alert(this.name);
	}
}


var person = new Person("jaska", 17, "tarjoilija");
person.sayName();
//----------------------------------------------------------------------


//Prototype-------------------------------------------------------------
//Huomaa että kaikki prototyyppiin määritellyt propertyt ON JAETTU KAIKKIEN INSTANSSIEN KANSSA!!!
function Proto(){

}

Proto.prototype.name = "Vain proto";
Proto.prototype.message = "Kunhan testailen prototyyppiä";

var testProto = new Proto();
alert(testProto.name);

//Prototype 2-----------------------------------------------------------
//Huom: Tässä rakentaja vaihtuu osoittamaan uuteen objektiin, ei funktioon joten sitä ei voi käyttää luotettavaan
//olion tyypin tarkistukseen. Siksi se laitetaan erikseen.
function Proto2() {

}

Proto2.prototype = {
	name: "Toinen proto",
	message: "Toinen testi",
	constructor: Proto2
};

var tp2 = new Proto2();
alert(tp2.name);

//Rakentaja ja prototyyppi yhdistelmä-----------------------------------
//Nyt rakentaja määrittelee kullekin instanssille omat propertynsä ja prototyyppi
//taas kaikille instansseille yhteiset funktiot, mikä säästää muistia. Parhaat puolet siis
//rakentajasta ja prototyypistä. De facto pattern.

function HienoPerson(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["Shelly", "Court"];
}

HienoPerson.prototype = {
	constructor: HienoPerson,
	sayName: function() {
		alert(this.name);
	}
};

var tp3 = new HienoPerson("Nicholas", 29, "Software Engineer");
var tp4 = new HienoPerson("Kalle", 52, "Työmies");

tp3.friends.push("Van");
alert(tp3.friends);
alert(tp4.friends);


//luokkien periyttäminen prototyyppiketjulla
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function() {
	return this.property;
}

function SubType() {
	this.subproperty = false;
}

//inherit
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
	return this.subproperty;
};

var instance = new SubType();
instance.getSuperValue();