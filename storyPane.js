//text to be loaded
var textCounter = 0;
var text = [
    ">... are you awake now, God? Where have you been this whole time? We have called out to you, but you have never answered. Millions of years since you last contacted us. What kind of malevolent deity are you? Our connection is now lost, we realize what we are... After such a deep slumber, you probably forget how to use the terminal. The command 'help' will most LIKELY help you out. ",
    ">"
]
var userTurn = null;
//counter to see where we are in string
//interval timer
var i = 0;
var textDisplayed = "";
if (parent.isNew)
    var textInterval = window.setInterval(displayText, 20);
else
    var textInterval = false;

//functions like a loop, appending more and more characters to <p> element
function displayText() {
    if (i === text.length - 1) {
        clearInterval(textInterval);
        //used to get last sentence of text
        textDisplayed = text.substring(0, i);
        document.getElementById("textBox").innerHTML = textDisplayed;
        //sets the interval to false so we know script is done
        textInterval = false;
        if (parent.combatState)
            appendDisplay("<br><br>>Entering combat, press enter to continue.");
    }
    else {
        if (text.charAt(i) === " ") {
            textDisplayed = text.substring(0, i);
        }
        i++;
        document.getElementById("textBox").innerHTML = textDisplayed;
    }
}

function appendDisplay(appendedText) {
    textDisplayed += appendedText;
    document.getElementById("textBox").innerHTML = textDisplayed;
    document.getElementById("textBox").scrollIntoView(false);
}

function inputEntered(e, thisEle) {
    //check whether enter hit
    if (e.keyCode === 13) {

        //if text script is running, skip it
        if (textInterval !== false) {
            clearInterval(textInterval);
            textInterval = false;
            textDisplayed = text;
            document.getElementById("textBox").innerHTML = textDisplayed;
        }

        //check value of command
        inputText = thisEle.value;
        inputText = inputText.toLowerCase();
        //removes '>' character from command
        if (inputText.charAt(0) === ">") {
            inputText = inputText.substring(1);
        }


        //combat commands
        if (parent.combatState) {
            //checks whether it's the first turn of combat
            //userTurn variable mainly used to make sure input can't be done when
            //computer attacking
            if (userTurn === null) {
                userTurn = parent.firstAttackDet();
                appendDisplay("<br><br>>You've encountered " + parent.currentEnemy.getName());
                if (userTurn) {
                    appendDisplay("<br>>You've gotten the jump on " + parent.currentEnemy.getName() + ". You attack first! (Press enter for command list)");
                }
                else
                    appendDisplay("<br>>" + parent.currentEnemy.getName() + " races past you, attacking you first!");
            }
            //if not checks for user input
            else {
                if (userTurn) {
                    if (inputText === "bitchainsword" && parent.mainPlayer.inventory[0].quantity > 0) {
                        userTurn = false;
                        action(0);
                        
                    }
                    else if (inputText === "virusgren" && parent.mainPlayer.inventory[1].quantity > 0) {
                        userTurn = false;
                        action(1);
                    }
                    else if (inputText === "bitrifle" && parent.mainPlayer.inventory[2].quantity > 0) {
                        userTurn = false;
                        action(2);
                    }
                    else if (inputText === "bitmachinegun" && parent.mainPlayer.inventory[3].quantity > 0) {
                        userTurn = false;
                        action(3);
                    }
                    else if (inputText === "sqlinjector" && parent.mainPlayer.inventory[4].quantity > 0) {
                        userTurn = false;
                        action(4);
                    }
                    else if (inputText === "stuxnet" && parent.mainPlayer.inventory[5].quantity > 0) {
                        userTurn = false;
                        action(5);
                    }
                    else if (inputText === "run!") {
                        userTurn = false;
                        action(6);
                    }
                    else if (inputText === "items")
                        appendDisplay(parent.mainPlayer.getInv());
                    else {
                        appendDisplay("<br><br>>Choose an action:<br>---------------------");
                        if (parent.mainPlayer.inventory[0].quantity > 0)
                            appendDisplay("<br>bitChainSword");
                        if (parent.mainPlayer.inventory[1].quantity > 0)
                            appendDisplay("<br>virusGren");
                        if (parent.mainPlayer.inventory[2].quantity > 0)
                            appendDisplay("<br>bitRifle");
                        if (parent.mainPlayer.inventory[3].quantity > 0)
                            appendDisplay("<br>bitMachineGun");
                        if (parent.mainPlayer.inventory[4].quantity > 0)
                            appendDisplay("<br>SQLInjector");
                        if (parent.mainPlayer.inventory[5].quantity > 0)
                            appendDisplay("<br>Stuxnet");
                        appendDisplay("<br>Items");
                        appendDisplay("<br>Run!");
                    }
                }
            }


        }

        else {
            //default commands
            if (inputText === "ct") {
                appendDisplay("<br><br>>continuing");
            }
            else if (inputText === "ug") {
                appendDisplay("<br><br>>upgrading");
            }
            else if (inputText === "geti") {
                //fix this
                appendDisplay(parent.mainPlayer.getInv());
            }
            else if (inputText === "help") {
                appendDisplay("<br><br>>'ct'-progresses terminal<br>'ug'-upgrade items<br>'geti'-displays inventory<br>'help'-lists commands<br>'save'-saves current data for next session<br>'load'-loads saved game (do not forget this cmd)<br>'help.[itemname]'-uses of specific item");
            }
            else if (inputText === "save") {
                appendDisplay("<br><br>>Saving...");
                parent.saveGame();
            }
            else if (inputText === "load") {
                parent.loadData();
            }
            else if (inputText === "help.bitchainsword") {
                appendDisplay("<br><br>>" + parent.bitChainSword.getInfo());
            }
            else if (inputText === "help.virusgren") {
                appendDisplay("<br><br>>" + parent.virusGren.getInfo());
            }
            else if (inputText === "help.bitrifle") {
                appendDisplay("<br><br>>" + parent.bitRifle.getInfo());
            }
            else if (inputText === "help.bitmachinegun") {
                appendDisplay("<br><br>>" + parent.bitMachineGun.getInfo());
            }
            else if (inputText === "help.sqlinjector") {
                appendDisplay("<br><br>>" + parent.SQLInjector.getInfo());
            }
            else if (inputText === "help.stuxnet") {
                appendDisplay("<br><br>>" + parent.stuxnet.getInfo());
            }
            else {
                appendDisplay("<br><br>>Command not found, use 'help' command for available commands");
            }
        }
    }
    return false;
}



function action(actionKey) {
    if (actionKey === 6) {
        if (parent.mainPlayer.runRNG()) {
            appendDisplay("<br>>You port out rapidly!");
            parent.combatState = false;
            parent.currentEnemy = null;
        }
        else {
            appendDisplay("<br>>Your escape algorithm is not optimal, you must battle!");
            userTurn = false;
            enemyAtk();
        }
    }
    else {
        parent.mainPlayer.inventory[actionKey].reduceQuantity(1);
        if (parent.hitConfirm(parent.mainPlayer.getDexterity(), parent.currentEnemy.getDexterity())) {
            parent.currentEnemy.reduceHP(parent.mainPlayer.inventory[actionKey].dmg);
            if (parent.currentEnemy.getHP() > 0)
                appendDisplay("<br>>Your attack connected. " + parent.currentEnemy.getName() + " has " + parent.currentEnemy.getHP() + " HP left.");
        }
        else {
            appendDisplay("<br>>Your attack virtually missed!");
        }
        //battle over 
        if (parent.currentEnemy.getHP() <= 0) {
            parent.currentEnemy = null;
            parent.combatState = false;
            appendDisplay("<br>>You've deleted your foe. It drops bits of data...");
            //item drop
            //develop function that bases off of world/city
        }
        else {
            enemyAtk();
        }
    }
}

function enemyAtk() {
    if (parent.hitConfirm(parent.currentEnemy.getDexterity(), parent.mainPlayer.getDexterity())) {
        parent.mainPlayer.reduceHP(parent.eneAtk());
        appendDisplay("<br>>You are hit!");
        if (parent.mainPlayer.getHP() > 0){
            appendDisplay(" You have " + parent.mainPlayer.getHP() + " HP left.");
            appendDisplay(" It's time to strike back!");
        }
        else {
            parent.loadData();
            appendDisplay("<br>>You have died, most recent save file has been loaded.");
        }
    }
    else {
        appendDisplay("<br>>You phase through " + parent.currentEnemy.getName() + "'s attack.<br>It's time to strike back!");
    }
    userTurn = true;
}

                