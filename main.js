//initially always a new game
var isNew = true;


//declartion of item class
var Item = function(dmg,quantity,uses){
    this.dmg = dmg;
    this.quantiy = quantity;
    this.uses = uses;
};
Item.protoype.helpInfo = function(){
    return this.uses;
};
Item.protoype.addQuantity = function(addQuant){
    this.quantity += addQuant;
};
Item.prototype.reduceQuantity = function(redQuant){
    this.quantity -+ redQuant;
};
Item.prototype.upgrade = function(){
    this.dmg += 1;
};
var bitChainSword = Item (4,0,"A sword used to delete corrupted data");
var virusGren = Item (10,0,"A grenade with highly destructive properties");
var bitRifle = Item (6,0,"A rifle used to devastate indescriminately");
var bitMachineGun = Item (8,0,"A gun that shoots rapidly");
var SQLInjector = Item (15,0,"A dangerous tool that preys on vulnerabilities");
var stuxnet = Item (40,0,"Nothing is a secret");

//declaration of character
var Character = function(){
    this.HP = 0;
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

/*past inventory object, doubtful usefulness
//declaration of inventory class
var Inventory = function(BCS,VS,BR,BM,SI,SN){
    //initializes inventorys to 0 capacity
    this.bitChainSword = BCS;
    this.virusGren = VS;
    this.bitRifle = BR;
    this.bitMachineGun = BM;
    this.SQLInjector = SI;
    this.stuxnet = SN;
};
Inventory.prototype.getInventory = function(){
    return ("<br><br>>Retrieving inventory...<br>bitChainSword - " + this.bitChainSword + "<br>virusGren - " + this.virusGren + "<br>bitRifle - " + this.bitRifle + "<br>bitMachineGun - " + this.bitMachineGun + "<br>SQLInjector - " +this.SQLInjector + "<br>Stuxnet - " + this.stuxnet);
};
Inventory.prototype.reduceInv = function(itemKey, redValue){
    this.itemKey -= redValue;
};
Inventory.prototype.addInv = function(itemKey, addValue){
    this.itemKey += addValue;
};
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
