//initially always a new game and not in combat state
var isNew = true;
var combatState = false;
var worldCompleted = 0;
var currentWorldComplete = true;

//2d array of current city
var cities = [
    ["proteine", "carborough", "fati", "fybre", "vytemen", "omi-3", "calcy", "fitness"],
    ["fffunc", "smeal", "stynche", "reak", "fetorery", "atmospeer", "impryzion", "odor"],
    ["roode", "embarr", "delycat", "pane", "weerd", "nerdii", "cryng", "awkward"],
    ["laus", "exhaust", "wrs", "lost", "anceent", "uslyss", "inadeq", "burn_out"]
];
var citiesCompleted = [
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false]
];
var currentCitySpawns = citySpawns();

/*
 * declaration of classes: 
 * Item, Character, EnemyChar, Player
 */

var Item = function (dmg, uses, quantity) {
    this.dmg = dmg;
    this.uses = uses;
    this.quantity = quantity;
};
Item.prototype.getInfo = function () {
    return this.uses;
};
Item.prototype.upgrade = function () {
    this.dmg += 1;
};
Item.prototype.reduceQuantity = function (redQuant) {
    this.quantity -= redQuant;
};
Item.prototype.addQuantity = function (addQuant) {
    this.quantity += addQuant;
};
Item.prototype.getDmg = function () {
    return this.dmg;
};

var bitChainSword = new Item(5, "A sword used to delete corrupted data", 20);
var virusGren = new Item(15, "A grenade with highly destructive properties", 0);
var bitRifle = new Item(10, "A rifle used to devastate indescriminately", 0);
var bitMachineGun = new Item(20, "A gun that shoots rapidly", 0);
var SQLInjector = new Item(35, "A dangerous tool that preys on vulnerabilities", 0);
var stuxnet = new Item(100, "Nothing is a secret", 0);
var health_1 = new Item(20, "Heals for 20 HP", 5);
var health_2 = new Item(40, "Heals for 40 HP", 0);
var health_3 = new Item(60, "Heals for 60 HP", 0);
var upgradeByte = new Item(1, "Clears slowing processes on target data", 0);
var speedUP = new Item(1, "Increases processing speeds", 0);
var hpUP = new Item(20, "Increases max health by 20 HP", 0);

//declaration of character
var Character = function (HP, dex) {
    this.HP = HP;
    this.dex = dex;
};
Character.prototype.getHP = function () {
    return this.HP;
};
Character.prototype.getDexterity = function () {
    return this.dex;
};
Character.prototype.reduceHP = function (redQuant) {
    this.HP -= redQuant;
};
Character.prototype.addHP = function (addQuant) {
    this.HP += addQuant;
};

//enemy class, child of character
function EnemyChar(HP, name, dexterity, move_1, move_2) {
    Character.call(this, HP, dexterity);
    this.name = name;
    this.move_1 = move_1;
    this.move_2 = move_2;
}
EnemyChar.prototype = Object.create(Character.prototype);
EnemyChar.prototype.constructor = Character;
EnemyChar.prototype.getAttack = function (moveKey) {
    if (moveKey === 1)
        return this.move_1;
    else if (moveKey === 2)
        return this.move_2;
};
EnemyChar.prototype.getName = function () {
    return this.name;
};

//player class, child of character
function Player(HP, dex, maxHP) {
    Character.call(this, HP, dex);
    /*indexes that correspond to item:
     *0 - bitChainSword
     *1 - virusGren
     *2 - bitRifle
     *3 - bitMachineGun
     *4 - SQLInjector
     *5 - stuxnet
     */
    this.maxHP = maxHP;
    this.inventory = [bitChainSword, virusGren, bitRifle, bitMachineGun, SQLInjector, stuxnet, health_1, health_2, health_3, upgradeByte,speedUP,hpUP];
}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Character;
Player.prototype.getInv = function () {
    return ("<br><br>>Inventory<br>---------------------<br>bitChainSword - " + this.inventory[0].quantity + "<br>virusGren - " + this.inventory[1].quantity + "<br>bitRifle - " + this.inventory[2].quantity + "<br>bitMachineGun - " + this.inventory[3].quantity + "<br>SQLInjector - " + this.inventory[4].quantity + "<br>Stuxnet - " + this.inventory[5].quantity + "<br>Health+ - " + this.inventory[6].quantity + "<br>Health++ - " + this.inventory[7].quantity + "<br>Health+++ - " + this.inventory[8].quantity + "<br>upgradeByte - " + this.inventory[9].quantity + "<br>speed++ - " + this.inventory[10].quantity + "<br>HP++ - " + this.inventory[11].quantity);
};
Player.prototype.increaseMax = function(){
    this.maxHP += 20;
};
Player.prototype.increaseDex = function(){
    this.dex ++;
};
Player.prototype.getMaxHP = function(){
    return this.maxHP;
};
Player.prototype.runRNG = function () {
    var enemyDex = currentEnemy.getDexterity();
    runRoll = Math.floor(Math.random() * 10 + 1);
    if (runRoll > enemyDex)
        return true;
    else
        return false;
};

var mainPlayer = new Player(100, 6, 100);
//instantiate placeholder currentEnemy object
var currentEnemy = new EnemyChar(0,"",0,0,0);

/*
 * combat system
 */
//generates enemy based on world
function eneGenerate() {
    //create function that generates name
    if(worldCompleted === 0)
        currentEnemy = new EnemyChar((Math.floor(Math.random()*20+20)),nameGenerate(0),(Math.floor(Math.random()*3+1)),(Math.floor(Math.random()*5+5)),(Math.floor(Math.random()*5+10)));
    else if(worldCompleted === 1)
        currentEnemy = new EnemyChar((Math.floor(Math.random()*20+30)),nameGenerate(1),(Math.floor(Math.random()*3+1)),(Math.floor(Math.random()*5+5)),(Math.floor(Math.random()*5+10)));
    else if(worldCompleted === 2)
        currentEnemy = new EnemyChar((Math.floor(Math.random()*20+40)),nameGenerate(2),(Math.floor(Math.random()*3+2)),(Math.floor(Math.random()*5+10)),(Math.floor(Math.random()*5+15)));
    else if(worldCompleted === 3)
        currentEnemy = new EnemyChar((Math.floor(Math.random()*30+70)),nameGenerate(3),(Math.floor(Math.random()*3+4)),(Math.floor(Math.random()*5+30)),(Math.floor(Math.random()*5+35)));
}
function nameGenerate(key){
    var name  = [
        ["Flexbeast","Hammonster","Triceratop","Skwat"],
        ["Sourmon","Sweetmon","Muskmon","Earthymon"],
        ["Coworker","Oppositesecks","Oldfrends","Chadat"],
        ["Failure","Panic","Outdated","Deadlines"]
    ];
    return name[key][Math.floor(Math.random()*4)];
}
function bossGenerate() {
    //create function that generates name
    if(worldCompleted === 0)
        currentEnemy = new EnemyChar((Math.floor(Math.random()*20+40)),"Trap Lord",(Math.floor(Math.random()*3+1)),(Math.floor(Math.random()*5+10)),(Math.floor(Math.random()*5+15)));
    else if(worldCompleted === 1)
        currentEnemy = new EnemyChar((Math.floor(Math.random()*20+50)),"Stench King",(Math.floor(Math.random()*3+1)),(Math.floor(Math.random()*5+25)),(Math.floor(Math.random()*5+35)));
    else if(worldCompleted === 2)
        currentEnemy = new EnemyChar((Math.floor(Math.random()*20+60)),"Beta Sultan",(Math.floor(Math.random()*3+2)),(Math.floor(Math.random()*5+30)),(Math.floor(Math.random()*5+45)));
    else if(worldCompleted === 3)
        currentEnemy = new EnemyChar((Math.floor(Math.random()*30+200)),"Creton",(Math.floor(Math.random()*3+4)),(Math.floor(Math.random()*5+50)),(Math.floor(Math.random()*5+75)));
}
//var playerTurn = firstAttackDet();
function firstAttackDet() {
    if (currentEnemy.getDexterity() > 5)
        return false;
    else
        return true;
}
function hitConfirm(atkDex, defDex) {
    var hitRatio = Math.ceil(atkDex / defDex);
    var hitRoll = Math.floor(Math.random() * 10 + 1);
    if ((hitRoll + hitRatio) > defDex) {
        return true;
    }
    else
        return false;
}
function eneAtk() {
    if (Math.random() > 0.7)
        return currentEnemy.getAttack(2);
    else
        return currentEnemy.getAttack(1);
}

//generates items based on world
function itemGenerate() {
    var itemRNG = Math.floor(Math.random() * 100 + 1);
    if (itemRNG > 85 && itemRNG <= 90) {
        upgradeByte.addQuantity(1);
        return "1 upgradeByte";
    }
    else if (itemRNG > 90 && itemRNG <= 95) {
        speedUP.addQuantity(1);
        return "1 speed++";
    }
    else if (itemRNG > 95 && itemRNG <= 100) {
        hpUP.addQuantity(1);
        return "1 HP++";
    }
    else {
        if (itemRNG <= 40) {
            if (worldCompleted < 2) {
                bitChainSword.addQuantity(10);
                return "10 bitChainSwords worth of data.";
            }
            else if (worldCompleted === 2) {
                bitRifle.addQuantity(10);
                return "10 bitRifles worth of data.";
            }
            else if (worldCompleted === 3) {
                SQLInjector.addQuantity(10);
                return "10 SQLInjectors worth of data.";
            }
        }
        else if (itemRNG > 40 && itemRNG <= 60) {
            if (worldCompleted < 2) {
                virusGren.addQuantity(3);
                return "3 virusGrens worth of data.";
            }
            else if (worldCompleted === 2) {
                bitMachineGun.addQuantity(3);
                return "3 bitMachineGuns worth of data.";
            }
            else if (worldCompleted === 3) {
                stuxnet.addQuantity(1);
                return "1 stuxnet worth of data.";
            }
        }
        else if (itemRNG > 60 && itemRNG <= 85) {
            if (worldCompleted < 2) {
                health_1.addQuantity(3);
                return "3 health+ worth of data.";
            }
            else if (worldCompleted === 2) {
                health_2.addQuantity(3);
                return "3 health++ worth of data.";
            }
            else if (worldCompleted === 3) {
                health_3.addQuantity(3);
                return "3 health+++ worth of data.";
            }
        }

    }
}
function citySpawns() {
    var cityOrder = [];
    for (p = 0; p < 7; p++) {
        if ((Math.floor(Math.random() * 4 + 1)) === 1)
            cityOrder[p] = "item";
        else
            cityOrder[p] = "enemy";
        cityOrder[7] = "boss";
    }
    return cityOrder;
}

/*
 *functions regarding saving and loading game
 */

/*
//main js file that stores variables for future gameplay
function saveGame() {
    if (storageAvailable('localStorage')) {
        storeObject("STD", document.getElementById("mainFrame").contentWindow.textDisplayed, false);

    }
    else {
        //change this error 
        alert("WTF!@");
    }
}
*/
//changes the iframe to a newgame
function newGame(url) {
    document.getElementById("mainFrame").src = url;
}
/*
//changes iframe to past game and recalls past variables
function loadGame(url) {
    isNew = false;
    document.getElementById("mainFrame").src = url;
}
//load data of variables from previous instance of game
function loadData() {
    var currentText = "" + readObject("STD");
    currentText += "<br>>Successful load";
    //alert(currentText);
    // document.getElementById("mainFrame").getElementByID("textBox").innerHTML = "am dog";
    document.getElementById("mainFrame").contentWindow.appendDisplay(currentText);
}
//stores object and converts JSON to string
function storeObject(key, val, isJson)
{
    if (isJson)
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
    catch (e) {
        return false;
    }
}

*/