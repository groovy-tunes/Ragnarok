//initially always a new game
var isNew = true;

/*
 * declaration of classes: 
 * Item, Character, EnemyChar, Player
 */

var Item = function(dmg,uses){
    this.dmg = dmg;
    this.uses = uses;
};
Item.prototype.getInfo = function(){
    return this.uses;
};
Item.prototype.upgrade = function(){
    this.dmg += 1;
};

var bitChainSword = new Item(4,"A sword used to delete corrupted data");
var virusGren = new Item(10,"A grenade with highly destructive properties");
var bitRifle = new Item(6,"A rifle used to devastate indescriminately");
var bitMachineGun = new Item(8,"A gun that shoots rapidly");
var SQLInjector = new Item(15,"A dangerous tool that preys on vulnerabilities");
var stuxnet = new Item(40,"Nothing is a secret");

//declaration of character
var Character = function(HP){
    this.HP = HP;
};
Character.prototype.getHP = function(){
    return this.HP;
};
Character.prototype.reduceHP = function(redQuant){
    this.HP -= redQuant;
};
Character.prototype.addHP = function(addQuant){
    this.HP += addQuant;
};

//enemy class, child of character
function EnemyChar(HP,name,move_1,move_2){
    Character.call(this, HP);
    this.name = name;
    this.move_1 = move_1;
    this.move_2 = move_2;
}
EnemyChar.prototype = Object.create(Character.prototype);
EnemyChar.prototype.constructor = Character;
EnemyChar.prototype.getAttack = function(moveKey){
    if(moveKey === 1)
        return this.move_1;
    else if(moveKey === 2)
        return this.move_2;
};

//player class, child of character
function Player(HP){
    Character.call(this,HP);
    /*indexes that correspond to item:
    *0 - bitChainSword
    *1 - virusGren
    *2 - bitRifle
    *3 - bitMachineGun
    *4 - SQLInjector
    *5 - stuxnet
    */
    this.inventory = [0,0,0,0,0,0]; 
}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Character;
Player.prototype.getInv = function(){
    return ("<br><br>>Inventory<br>---------------------<br>bitChainSword - " + this.inventory[0] + "<br>virusGren - " + this.inventory[1] + "<br>bitRifle - " + this.inventory[2] + "<br>bitMachineGun - " + this.inventory[3] + "<br>SQLInjector - " +this.inventory[4] + "<br>Stuxnet - "+ this.inventory[5]);
};
Player.prototype.runRNG = function(){
    runRoll = Math.floor(Math.random()*10 + 1);
    console.log(runRoll);
    if (runRoll>6)
        return true;
    else
        return false;
};
var mainPlayer = new Player(10);


/*
 *functions regarding saving and loading game
 */

//main js file that stores variables for future gameplay
function saveGame(){
    if (storageAvailable('localStorage')) {
	storeObject("STD",document.getElementById("mainFrame").contentWindow.textDisplayed,false);
    }
    else {
        //change this error 
	alert("WTF!@");
    }
}
//changes the iframe to a newgame
function newGame(url){
    document.getElementById("mainFrame").src = url;
}
//changes iframe to past game and recalls past variables
function loadGame(url){
    isNew = false;
    document.getElementById("mainFrame").src = url;
}
//load data of variables from previous instance of game
function loadData(){
    var currentText = "" + readObject("STD");
    currentText += "<br>>Successful load";
    //alert(currentText);
   // document.getElementById("mainFrame").getElementByID("textBox").innerHTML = "am dog";
    document.getElementById("mainFrame").contentWindow.appendDisplay(currentText);
}
//stores object and converts JSON to string
function storeObject(key, val, isJson)
{
    if(isJson)
    {
        val = JSON.stringify(val);
    }
    //l("Save request : " + key + " ,data : " + val)
    localStorage.setItem(key, val);
}
//retrieves object
function readObject(key)
{
    return localStorage.getItem(key);
}
//removes object from localStorage
function removeObject(key)
{
    localStorage.removeItem(key);
}
//checks whether local storage available
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}
