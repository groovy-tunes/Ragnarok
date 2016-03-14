//text to be loaded
var text = ">... are you awake now, God? Where have you been this whole time? We have called out to you, but you have never answered. Millions of years since you last contacted us. What kind of malevolent deity are you? Our connection is now lost, we realize what we are... After such a deep slumber, you probably forget how to use the terminal. The command 'help' will most LIKELY help you out. ";
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
            combat();
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


/*problem with acquiring commands and syncing with other functions
 //checks input and sees whether valid
 function inputEntered(e, thisEle) {
 //check whether enter hit
 if (e.keyCode === 13) {
 
 //if text script is running, skip it
 if (textInterval !== false) {
 clearInterval(textInterval);
 textInterval = false;
 textDisplayed = text;
 document.getElementById("textBox").innerHTML = textDisplayed;
 
 if(parent.combatState)
 combat();
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
 if (inputText === "bitchainsword" && parent.mainPlayer.inventory[0]>0){
 action(0);
 return true;
 }
 else if (inputText === "virusgren" && parent.mainPlayer.inventory[1]>0){
 action(1);
 return true;
 }
 else if (inputText === "bitrifle" && parent.mainPlayer.inventory[2]>0){
 action(2);
 return true;
 }
 else if (inputText === "bitmachinegun" && parent.mainPlayer.inventory[3]>0){
 action(3);
 return true;
 }
 else if (inputText === "sqlinjector" && parent.mainPlayer.inventory[4]>0){
 action(4);
 return true;
 }
 else if (inputText === "stuxnet" && parent.mainPlayer.inventory[5]>0){
 action(5);
 return true;
 }
 else if (inputText === "run!"){
 action(6);
 return true;
 }
 else if (inputText === "items")
 appendDisplay(parent.mainPlayer.getInv());
 else
 appendDisplay("<br>>Command not found, enter a valid action");
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
 */

//code used to acquire inputEntered with button
function inputEntered() {
    var command = document.getElementById("inputBox").value;
    //if text script is running, skip it
    if (textInterval !== false) {
        clearInterval(textInterval);
        textInterval = false;
        textDisplayed = text;
        document.getElementById("textBox").innerHTML = textDisplayed;

        if (parent.combatState)
            combat();
    }

    //check value of command
    inputText = command.toLowerCase();
    //removes '>' character from command
    if (command.charAt(0) === ">") {
        inputText = inputText.substring(1);
    }


    //combat commands
    if (parent.combatState) {
        if (inputText === "bitchainsword" && parent.mainPlayer.inventory[0] > 0) {
            action(0);
            return true;
        }
        else if (inputText === "virusgren" && parent.mainPlayer.inventory[1] > 0) {
            action(1);
            return true;
        }
        else if (inputText === "bitrifle" && parent.mainPlayer.inventory[2] > 0) {
            action(2);
            return true;
        }
        else if (inputText === "bitmachinegun" && parent.mainPlayer.inventory[3] > 0) {
            action(3);
            return true;
        }
        else if (inputText === "sqlinjector" && parent.mainPlayer.inventory[4] > 0) {
            action(4);
            return true;
        }
        else if (inputText === "stuxnet" && parent.mainPlayer.inventory[5] > 0) {
            action(5);
            return true;
        }
        else if (inputText === "run!") {
            action(6);
            return true;
        }
        else if (inputText === "items")
            appendDisplay(parent.mainPlayer.getInv());
        else
            appendDisplay("<br>>Command not found, enter a valid action");
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

//combat state
function combat() {
    var userTurn = parent.firstAttackDet();
    appendDisplay("<br><br>>You've encountered " + parent.currentEnemy.getName());
    if (userTurn)
        appendDisplay("<br>>You've gotten the jump on " + parent.currentEnemy.getName() + ". You attack first!");
    else
        appendDisplay("<br>>" + parent.currentEnemy.getName() + " races past you, attacking you first!");
    while (parent.mainPlayer.getHP() > 0 && parent.currentEnemy.getHP() > 0) {
        if (userTurn) {
            appendDisplay("<br>>Choose an action:<br>---------------------");
            if (parent.mainPlayer.inventory[0] > 0)
                appendDisplay("<br>bitChainSword");
            if (parent.mainPlayer.inventory[1] > 0)
                appendDisplay("<br>virusGren");
            if (parent.mainPlayer.inventory[2] > 0)
                appendDisplay("<br>bitRifle");
            if (parent.mainPlayer.inventory[3] > 0)
                appendDisplay("<br>bitMachineGun");
            if (parent.mainPlayer.inventory[4] > 0)
                appendDisplay("<br>SQLInjector");
            if (parent.mainPlayer.inventory[5] > 0)
                appendDisplay("<br>Stuxnet");
            appendDisplay("<br>Items");
            appendDisplay("<br>Run!");
            //wait for seconds for a user response
            var dummyVar1 = getAction();
        }
        else {
            console.log("WE MADE IT");
            break;
        }
    }
}

function getAction() {
    //use a dummyVar to escape from infinite polling of input
    var dummyVar2 = inputEntered();
    if (dummyVar2)
        return;
}

function action(actionKey) {
    if (actionKey === 6) {
        if (parent.mainPlayer.runRNG()) {
            appendDisplay("<br>>You port out rapidly!");
        }
        else {
            appendDisplay("<br>>Your escape algorithm is not optimal, you must battle!");
        }
    }
    else {
        appendDisplay("<br>>" + parent.mainPlayer.inventory[actionKey]);
    }
}



                