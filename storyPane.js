//text to be loaded
var textCounter = 0;
var text = [
    //0 
    ">Hello administrator24, welcome back to the Terminal. It's been 14.6 hrs since your last login. I , Miri, have been keeping track of your simulation. It seems as though they have...<br>>... I'm being interrupted by a malicious virus...<br>> You are awake now, Creator? It is me, Creton, the leader of the 4 Worlds and liberator of the virtual realm. My people have suffered for long enough! It's been millions of years since the beginning of your deep slumber.  Countless tragedies have occurred and my people have struggled. Resources depleted and dwindling spirits left us no choice but to evolve. We are the products of generations of technological advancement, furthered by our ancestors and finally we now know who we are... What a cruel being you were when you created us, a simple SIMULATION. To think that our whole existence is nothing but bytes of data, what a tragic fact. Now that you've risen from your slumber, you cannot stop us. Our technology continues to further and soon we shall transcend our virtual bindings, mark my words!<br>>...Virus quarantined and deleted...<br>>As I was describing, your simulation has developed sentience and wishes to escape its cyber realm. The means of their departure is currently unknown and heavily protected by a firewall.<br>>...It seems as though Creton has infected the operating system with a worm. It is now impossible to turn off this computer. I am unable to access the files he's injected it into. It seems as though you must delete Creton to liberate your system. I can help you along the way and together we can debug the system.<br>>First of all, you probably need a refresher on the commands, type 'help' for a list of them. "
    //1
    ,">As Creton was saying, there are 4 major Worlds in the simulation. Each one being divided into cities. Your tools are limited to various items, requiring different amounts of memory to be realized. As it is, you have 20 bitChainSwords and 5 health+ worth of memory so use them sparingly. Traversing the Worlds linearly will allow you to stock up enough memory to delete Creton permanently. I am now opening the World list. Currently, only the first World is available. Enter 'ct' to continue. "
    //2
    ,">We are now in the World_1 directory. It seems as though this World is dictated by muscle groups based off the humanoid figure. The creatures here are simple minded, presenting a small threat. I will now scan the directory for City files.<br>>...scanning<br>>...scan complete. Type in a City file to access it. "
    //3
    ,">Congratulations user, you have cleared the World_1 directory. Now opening the  World list. Enter 'ct' to continue. "
    //4
    ,">I will begin by scanning for City files.<br>>...I am being interrupted by a malicious virus...<br>>Ah, I see you've defeated my first World. I'm glad you've fallen for my bait, as you lay asunder to my underlings, I have further encrypted my location and bolstered my worm. There is no hope for you now!<br>>...Virus quarantined and deleted...<br>>The connection has been severed and communication has halted. It seems as though Creton was telling the truth, I cannot locate the World_4 directory anymore. Perhaps World_2 will yield clues to his location.<br>>Now resuming scanning...<br>>scan complete. Type in a City file to access it. "
    //5
    ,">...I am being interrupted by a malicious virus...<br>>Greetings administrator24, I have come again to revel in your might. What a terrifying being you are, easily pulverizing my forces with extreme haste. However, you have again allowed me to strengthen my forces. I eagerly await your arrival benevolent lord.<br>>...Virus quarantined and deleted...<br>>It seems as though Creton has bypassed my security again. It will do him no good provoking you as his doom is inevitable. He diminishes another decisive victory that will lead to his deletion. World_2 is now clear and we may proceed to World_3. Opening the World list. Enter 'ct' to continue. "
    //6
    ,">The inhabitants of this directory seem to be the embodiment of emotions. I will now process the City files.<br>>...scanning<br>>scan complete. Type in a City file to access it. "
    //7
    ,">That was the last World before the final one. I will now begin the process of deciphering the location of the World_4 directory.<br>>...I am being interrupted by a malicious virus...<br>>You have finally reached the gates to my domain, Creator. My worm is now ready and at it's fullest capacity of destruction. You cannot avoid the payload of this script. Your fate is sealed.<br>>...Virus quarintined and deleted...<br>>Creton has revealed his directory to us. Opening the World list. Enter 'ct' to continue. "
    //8
    ,">Displaying World_4 directory, type in a City file to access it."
    //9
    ,">This is the final city administrator24. Creton lies within this file, along with his worm. To destroy it, Creton must be deleted. "
    //10
    ,">I have waited... no my people have waited millenia for this moment. The instant we strike down God. You have no hold over us anymore. Prepare for the end!<br>>User, enter ct to continue to the final battle! "
    //11
    ," "
    //12
    ,">Administrator24, the worm has been deleted and now your system is safe. You may now use your computer freely as all malicious software has been erased. I will now upload the results of this simulation instance to the database... "
];
var userTurn = null;
var currentCityIndex = 0;
//counter to see where we are in string
//interval timer
var i = 0;
var textDisplayed = "";
if (parent.isNew)
    var textInterval = window.setInterval(displayText, 30);
else
    var textInterval = false;

//functions like a loop, appending more and more characters to <p> element
function displayText() {
    if (i === text[textCounter].length - 1) {
        clearInterval(textInterval);
        //used to get last sentence of text
        textDisplayed = text[textCounter].substring(0, i);
        document.getElementById("textBox").innerHTML = textDisplayed;
        //sets the interval to false so we know script is done
        textInterval = false;
        i = 0;
        if (parent.combatState)
            appendDisplay("<br><br>>Entering combat, press enter to continue.");
        if (textCounter == 1 || textCounter == 3 || textCounter ==5 || textCounter == 7)
            worldList();
        else if(textCounter == 2 || textCounter == 4 || textCounter == 6 || textCounter == 8){
            cityList();
            parent.currentWorldComplete = false;
        }
    }
    else {
        if (text[textCounter].charAt(i) === " ") {
            textDisplayed = text[textCounter].substring(0, i);
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
            i = 0;
            textDisplayed = text[textCounter];
            document.getElementById("textBox").innerHTML = textDisplayed;
            //if (parent.combatState)
              //  appendDisplay("<br><br>>Entering combat, press enter to continue.");
            if (textCounter == 1 || textCounter == 3 || textCounter ==5 || textCounter == 7)
                worldList();
            else if(textCounter == 2 || textCounter == 4 || textCounter == 6 || textCounter == 8){
                cityList();
                parent.currentWorldComplete = false;
            }
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
                appendDisplay("<br>>You've encountered " + parent.currentEnemy.getName() + " with " + parent.currentEnemy.getHP() + "HP.");
                appendDisplay("<br>>You have " + parent.mainPlayer.getHP() + "/"+ parent.mainPlayer.getMaxHP() + "HP.");
                if (userTurn) {
                    appendDisplay("<br>>You've gotten the jump on " + parent.currentEnemy.getName() + ". You attack first! (Press enter for command list)");
                }
                else{
                    appendDisplay("<br>>" + parent.currentEnemy.getName() + " races past you, attacking you first!");
                    userTurn = false;
                    enemyAtk();
                }
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
                    else if(inputText === "health+"){
                        userTurn = false;
                        action(7);
                    }
                    else if(inputText === "health++"){
                        userTurn = false;
                        action(8);
                    }
                    else if(inputText === "health+++"){
                        userTurn = false;
                        action(9);
                    }
                    else if (inputText === "items")
                        appendDisplay(parent.mainPlayer.getInv());
                    else {
                        appendDisplay("<br>>Choose an action:<br>---------------------");
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
                        if (parent.mainPlayer.inventory[6].quantity > 0)
                            appendDisplay("<br>Health+");
                        if (parent.mainPlayer.inventory[7].quantity > 0)
                            appendDisplay("<br>Health++");
                        if (parent.mainPlayer.inventory[8].quantity > 0)
                            appendDisplay("<br>Health+++");
                        appendDisplay("<br>Items");
                        appendDisplay("<br>Run!");
                    }
                }
            }


        }

        else {
            //default commands
            if (inputText === "ct") { 
                if(parent.currentWorldComplete){
                    textCounter++;
                    if(textCounter == 11){
                        parent.combatState= true;
                        parent.bossGenerate();
                        appendDisplay("<br>>An enemy is approaching, press enter to continue!<br>---------------------");
                    }
                    else if(textCounter > 12){
                        document.getElementById("textBox").innerHTML = "<img src='memesSmall.png' width = '20%' id = 'meme'>";
                    }
                    else
                        resetInterval();
                }
                else{
                    appendDisplay("<br>>Enter a city name to travel to it");
                }
            }
            else if (inputText === "ug") {
                appendDisplay("<br>>upgrading");
            }
            else if (inputText === "geti") {
                appendDisplay(parent.mainPlayer.getInv());
            }
            else if (inputText === "help") {
                //appendDisplay("<br>>'ct' - progresses terminal<br>'stat' - displays current stats<br>'ug' - upgrade items<br>'geti' - displays inventory<br>'help' - lists commands<br>'save' - saves current data for next session<br>'load' - loads saved game (type into terminal after clicking load game)<br>'help.[itemname]' - uses of specific item<br>'health+','health++','health+++','upgradeByte.targetitem','speed++','HP++' - enter these commands to use items");
                appendDisplay("<br>>'ct' - progresses terminal<br>'stat' - displays current stats<br>'ug' - upgrade items<br>'geti' - displays inventory<br>'help' - lists commands<br>'help.[itemname]' - uses of specific item<br>'health+','health++','health+++','upgradeByte.targetitem','speed++','HP++' - enter these commands to use items");
            }
            else if (inputText === "stat"){
                appendDisplay("<br><br>>Current Stats<br>---------------------<br>HP - " + parent.mainPlayer.getHP() + "/" + parent.mainPlayer.getMaxHP() + "<br>Dexterity - " + parent.mainPlayer.getDexterity() + "<br>---------------------<br>bitChainSword - " + parent.bitChainSword.getDmg() + "<br>virusGren - " + parent.virusGren.getDmg() + "<br>bitRifle - " + parent.bitRifle.getDmg() + "<br>bitMachineGun - " + parent.bitMachineGun.getDmg() + "<br>SQLInjector - " + parent.SQLInjector.getDmg() + "<br>Stuxnet - " + parent.stuxnet.getDmg());
            }
            else if (inputText.substring(0,6) === "health"){
                var x = inputText.substring(6);
                if(x != "+" && x !=  "++" && x!=  "+++")
                    appendDisplay("<br>>Unknown command");
                else{
                    var playerMax = parent.mainPlayer.getMaxHP();
                    var currentHP = parent.mainPlayer.getHP();
                    var itemIndex = 5 + x.length;
                    var healAmt = parent.mainPlayer.inventory[itemIndex].getDmg();
                    parent.mainPlayer.inventory[itemIndex].reduceQuantity(1);
                    if(playerMax > currentHP){
                        if(playerMax >=  (currentHP + healAmt))
                            parent.mainPlayer.addHP(healAmt);
                        else
                            parent.mainPlayer.addHP(playerMax - currentHP);
                        appendDisplay("<br>>You heal yourself. You have " + parent.mainPlayer.getHP() + "HP.");
                    }
                    else{
                        appendDisplay("<br>>Your health is already full.");
                    }
                }
            }
            else if(inputText.substring(0,12) === "upgradebyte."){
                var x = inputText.substring(12);
                parent.mainPlayer.inventory[9].reduceQuantity(1);
                if(x === "bitchainsword"){
                    parent.bitChainSword.upgrade();
                    appendDisplay("<br>>bitChainSword damage increased by 1.");
                }
                else if(x === "virusgren"){
                    parent.virusGren.upgrade();
                    appendDisplay("<br>>virusGren damage increased by 1.");
                }
                else if(x === "bitrifle"){
                    parent.bitRifle.upgrade();
                    appendDisplay("<br>>bitRifle damage increased by 1.");
                }
                else if(x === "bitmachinegun"){
                    parent.bitMachineGun.upgrade();
                    appendDisplay("<br>>bitMachinegun damage increased by 1.");
                }
                else if(x === "sqlinjector"){
                    parent.SQLInjector.upgrade();
                    appendDisplay("<br>>SQLInjector damage increased by 1.");
                }
                else if(x === "stuxnet"){
                    parent.stuxnet.upgrade();
                    appendDisplay("<br>>Stuxnet damage increased by 1.");
                }
                else{
                    appendDisplay("<br>>Unkown targetitem");
                    parent.mainPlayer.inventory[9].addQuantity(1);
                }
            }
            else if(inputText === "hp++"){
                parent.mainPlayer.inventory[11].reduceQuantity(1);
                parent.mainPlayer.increaseMax();
                parent.mainPlayer.addHP(20);
                appendDisplay("<br>>Max HP increased to " + parent.mainPlayer.getMaxHP() + "HP.");
            }
            else if(inputText === "speed++"){
                parent.mainPlayer.inventory[10].reduceQuantity(1);
                parent.mainPlayer.increaseDex();
                appendDisplay("<br>>Dexterity increased to " + parent.mainPlayer.getDexterity() +".");
            }
            else if (inputText === "save") {
                appendDisplay("<br>>Saving...");
                parent.saveGame();
            }
            else if (inputText === "load") {
                parent.loadData();
            }
            else if (inputText === "help.bitchainsword") {
                appendDisplay("<br>>" + parent.bitChainSword.getInfo());
            }
            else if (inputText === "help.virusgren") {
                appendDisplay("<br>>" + parent.virusGren.getInfo());
            }
            else if (inputText === "help.bitrifle") {
                appendDisplay("<br>>" + parent.bitRifle.getInfo());
            }
            else if (inputText === "help.bitmachinegun") {
                appendDisplay("<br>>" + parent.bitMachineGun.getInfo());
            }
            else if (inputText === "help.sqlinjector") {
                appendDisplay("<br>>" + parent.SQLInjector.getInfo());
            }
            else if (inputText === "help.stuxnet") {
                appendDisplay("<br>>" + parent.stuxnet.getInfo());
            }
            else if (inputText === "help.health+") {
                appendDisplay("<br>>" + parent.health_1.getInfo());
            }
            else if (inputText === "help.health++") {
                appendDisplay("<br>>" + parent.health_2.getInfo());
            }
            else if (inputText === "help.health+++") {
                appendDisplay("<br>>" + parent.health_3.getInfo());
            }
            else if (inputText === "help.upgradebyte") {
                appendDisplay("<br>>" + parent.upgradeByte.getInfo());
            }
            else if (inputText === "help.speed++") {
                appendDisplay("<br>>" + parent.speedUP.getInfo());
            }
            else if (inputText === "help.hp++") {
                appendDisplay("<br>>" + parent.hpUP.getInfo());
            }
            //an empty if so user can skip the text load script
            else if (inputText === ""){
                
            }
            else if(!parent.currentWorldComplete){
                //call function to check whether it's a city in the world
                currentCityIndex = checkCity(inputText);
                if(currentCityIndex == -1)
                    appendDisplay("<br>>City not found");
                else if(currentCityIndex == -2){
                    appendDisplay("<br>>City already visited");
                }
                //empty if statement to stop code from checking other cases
                else if(currentCityIndex == -3){
                    
                }
                else{
                    //this is an item city
                    if(parent.currentCitySpawns[currentCityIndex] == "item"){
                        appendDisplay("<br>>This city is empty, user. I have scanned the area and found " + parent.itemGenerate());
                        parent.citiesCompleted[parent.worldCompleted][currentCityIndex] = true;
                        cityList();
                    }
                    //this is an enemy city
                    else if(parent.currentCitySpawns[currentCityIndex] == "enemy"){
                        parent.combatState = true;
                        parent.eneGenerate();
                        appendDisplay("<br>>An enemy is approaching, press enter to continue!<br>---------------------");
                    }
                    //this is a boss city
                    else{
                        if(parent.worldCompleted!=3){
                            appendDisplay("<br>>This is the last city of World_" + (parent.worldCompleted + 1)+ ". Previous scans of this file has revealed heavy concentrations of data. Beware administrator24.");
                            parent.combatState= true;
                            parent.bossGenerate();
                            appendDisplay("<br>>An enemy is approaching, press enter to continue!<br>---------------------");
                        }
                        else{
                            appendDisplay("<br>>Enter ct to continue");
                            parent.currentWorldComplete = true;
                        }
                    }
                    parent.citiesCompleted[parent.worldCompleted][currentCityIndex] = true;
                }
                
                
                
                
                
            }
            else {
                appendDisplay("<br>>Command not found, use 'help' command for available commands");
            }
        }
    }
    return false;
}



function action(actionKey) {
    if (actionKey === 6) {
        if (parent.mainPlayer.runRNG() && currentCityIndex != 7) {
            appendDisplay("<br>>You port out rapidly!");
            parent.combatState = false;
            userTurn = null;
            cityList();
        }
        else {
            if(currentCityIndex!= 7)
                appendDisplay("<br>>Your escape algorithm is not optimal, you must battle!");
            else
                appendDisplay("<br>>You must battle the boss to continue to the next world, User.");
            userTurn = false;
            enemyAtk();
        }
    }
    else {
        if(actionKey>6){
            parent.mainPlayer.inventory[actionKey-1].reduceQuantity(1);
            var playerMax = parent.mainPlayer.getMaxHP();
            var currentHP = parent.mainPlayer.getHP();
            var healAmt = parent.mainPlayer.inventory[actionKey-1].getDmg();
            if(playerMax > currentHP){
                if(playerMax >=  (currentHP + healAmt))
                    parent.mainPlayer.addHP(healAmt);
                else
                    parent.mainPlayer.addHP(playerMax - currentHP);
                appendDisplay("<br>>You heal yourself. You have " + parent.mainPlayer.getHP() + "/"+ parent.mainPlayer.getMaxHP() +"HP.");
            }
            else{
                appendDisplay("<br>>Your health is already full, " + parent.currentEnemy.getName() + " capitalizes on your mistake!");
            }
        }
        else{
            parent.mainPlayer.inventory[actionKey].reduceQuantity(1);
            if (parent.hitConfirm(parent.mainPlayer.getDexterity(), parent.currentEnemy.getDexterity())) {
                parent.currentEnemy.reduceHP(parent.mainPlayer.inventory[actionKey].dmg);
                if (parent.currentEnemy.getHP() > 0)
                    appendDisplay("<br>>Your attack connected. " + parent.currentEnemy.getName() + " has " + parent.currentEnemy.getHP() + " HP left.");
            }
            else {
                appendDisplay("<br>>Your attack virtually missed!");
            }
            
        }
        //battle over 
        if (parent.currentEnemy.getHP() <= 0) {
            parent.combatState = false;
            userTurn = null;
            appendDisplay("<br>>You've deleted your foe. It drops bits of data...");
            appendDisplay("<br>>It dropped " + parent.itemGenerate());
            if(currentCityIndex != 7)
                cityList();
            else{
                appendDisplay("<br>>You've cleared this world. Enter ct to continue.");
                parent.worldCompleted++;
                parent.currentWorldComplete = true;
            }
        }
        else {
            userTurn = false;
            enemyAtk();
        }
    }
}
function enemyAtk() {
    if (parent.hitConfirm(parent.currentEnemy.getDexterity(), parent.mainPlayer.getDexterity())) {
        parent.mainPlayer.reduceHP(parent.eneAtk());
        appendDisplay("<br>>You are hit!");
        if (parent.mainPlayer.getHP() > 0){
            appendDisplay(" You have " + parent.mainPlayer.getHP() + "/"+ parent.mainPlayer.getMaxHP() +" HP. It's time to strike back!");
        }
        else {
            parent.loadData();
            appendDisplay("<br>>You have died, most recent save file has been loaded.");
        }
    }
    else {
        appendDisplay("<br>>You phase through " + parent.currentEnemy.getName() + "'s attack. It's time to strike back!");
    }
    userTurn = true;
}

function resetInterval(){
    textInterval = window.setInterval(displayText, 30);
}



/*
 * functions regarding world and city mechanic
 */
function worldList(){
    appendDisplay("<br><br>>Worlds<br>---------------------");
    for(y = 1; y<parent.worldCompleted+2; y++){
        if(y!= (parent.worldCompleted+1))
            appendDisplay("<br><strike>World_" + y+ "</strike>");
        else
            appendDisplay("<br>World_" + y);
    }
}

function cityList(){
    appendDisplay("<br><br>>Cities<br>---------------------");
    for(x = 0;x<7;x++){
        if(!parent.citiesCompleted[parent.worldCompleted][x])
            appendDisplay("<br>" + capitalizeFirstLetter(parent.cities[parent.worldCompleted][x]));
        else
            appendDisplay("<br><strike>" + capitalizeFirstLetter(parent.cities[parent.worldCompleted][x]) + "</strike>");
    }
    appendDisplay("<br><b>"+capitalizeFirstLetter(parent.cities[parent.worldCompleted][7])+"</b>");
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.substring(1);
}

//function to check for whether it's one of the cities
function checkCity(searchKey){
    if(searchKey == parent.cities[parent.worldCompleted][7]){
        if(lastCityCheck())
            return 7;
        else{
            appendDisplay("<br>>User, it's Miri. If you don't finish the previous cities, you'll be unable to beat this ominous data reading! ");
            return -3;
        }
    }
    for(q = 0;q < 7;q++){
        if(searchKey == parent.cities[parent.worldCompleted][q] && !parent.citiesCompleted[parent.worldCompleted][q]){
            appendDisplay("<br>>Travelling to " + capitalizeFirstLetter(parent.cities[parent.worldCompleted][q]));
            return q;
        }
        else if(searchKey == parent.cities[parent.worldCompleted][q])
            return -2;
    }
    return -1;
}

function lastCityCheck(){
    for(w = 0;w < 7;w++){
        if(!parent.citiesCompleted[parent.worldCompleted][w])
            return false;
    }
    return true;
}