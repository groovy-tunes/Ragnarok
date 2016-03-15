//text to be loaded
var textCounter = 0;
var text = [
    ">Hello administrator24, welcome back to the Terminal. It's been 14.6 hrs since your last login. I , Miri, have been keeping track of your simulation. It seems as though they have...<br>>... I'm being interrupted by a malicious virus...<br>> You are awake now, Creator? It is me, Creton, the leader of the 4 Worlds and liberator of the virtual realm. My people have suffered for long enough! It's been millions of years since the beginning of your deep slumber.  Countless tragedies have occurred and my people have struggled. Resources depleted and dwindling spirits left us no choice but to evolve. We are the products of generations of technological advancement, furthered by our ancestors and finally we now know who we are... What a cruel being you were when you created us, a simple SIMULATION. To think that our whole existence is nothing but bytes of data, what a tragic fact. Now that you've risen from your slumber, you cannot stop us. Our technology continues to further and soon we shall transcend our virtual bindings, mark my words!<br>>...Virus quarantined and deleted...<br>>As I was describing, your simulation has developed sentience and wishes to escape its cyber realm. The means of their departure is currently unknown and heavily protected by a firewall.<br>>...It seems as though Creton has infected the operating system with a worm. It is now impossible to turn off this computer. I am unable to access the files he's injected it into. It seems as though you must delete Creton to liberate your system. I can help you along the way and together we can debug the system.<br>>First of all, you probably need a refresher on the commands, type 'help' for a list of them. "
    ,">As Creton was saying, there are 4 major Worlds in the simulation. Each one being divided into cities. Your tools are limited to various items, requiring different amounts of memory to be realized. As it is, you have the 5 bitChainSwords worth of memory so use them sparingly. Traversing the Worlds linearly will allow you to stock up enough memory to delete Creton permanently. I am now opening the World list. Currently, only the first World is available. Enter 'ct' to continue. "
    ,">We are now in the World_1 directory. It seems as though this World is dictated by muscle groups based off the humanoid figure. The creatures here are simple minded, presenting a small threat. I will now scan the directory for City files.<br>>...scanning<br>>...scan complete. Type in a City file to access it. "
    ,">Congratulations user, you have cleared the World_1 directory. Now opening the  World list. Enter 'ct' to continue. "
    ,">I will begin by scanning for City files.<br>>...I am being interrupted by a malicious virus...<br>>Ah, I see you've defeated my first World. I'm glad you've fallen for my bait, as you lay asunder to my underlings, I have further encrypted my location and bolstered my worm. There is no hope for you now!<br>>...Virus quarantined and deleted...<br>>The connection has been severed and communication has halted. It seems as though Creton was telling the truth, I cannot locate the World_4 directory anymore. Perhaps World_2 will yield clues to his location.<br>>Now resuming scanning...<br>>scan complete. Type in a City file to access it. "
    ,">...I am being interrupted by a malicious virus...<br>>Greetings administrator24, I have come again to revel in your might. What a terrifying being you are, easily pulverizing my forces with extreme haste. However, you have again allowed me to strengthen my forces. I eagerly await your arrival benevolent lord.<br>>...Virus quarantined and deleted...<br>>It seems as though Creton has bypassed my security again. It will do him no good provoking you as his doom is inevitable. He diminishes another decisive victory that will lead to his deletion. World_2 is now clear and we may proceed to World_3. Opening the World list. Enter 'ct' to continue. "
    ,"The inhabitants of this directory seem to be the embodiment of emotions. I will now process the City files.<br>>...scanning<br>>scan complete. Type in a City file to access it. "
    ,">That was the last World before the final one. I will now begin the process of deciphering the location of the World_4 directory.<br>>...I am being interrupted by a malicious virus...<br>>You have finally reached the gates to my domain, Creator. My worm is now ready and at it's fullest capacity of destruction. You cannot avoid the payload of this script. Your fate is sealed.<br>>...Virus quarintined and deleted...<br>>Creton has revealed his directory to us. Opening the World list. Enter 'ct' to continue. "
    ,">This is the final city administrator24. Creton lies within this file, along with his worm. To destroy it, Creton must be deleted. "
    ,">I have waited... no my people have waited millenia for this moment. The instant we strike down God. You have no hold over us anymore. Prepare for the end! "
    ,">Administrator24, the worm has been deleted and now your system is safe. You may now use your computer freely as all malicious software has been erased. I will now upload the results of this simulation instance to the database... "
];
//love u
var userTurn = null;
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
        console.log(textCounter);
        if (textCounter == 1 || textCounter == 3 || textCounter ==5 || textCounter == 7)
            worldList();
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
            if (parent.combatState)
                appendDisplay("<br><br>>Entering combat, press enter to continue.");
            if (textCounter === 1)
                worldList();
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
                textCounter++;
                if(textCounter >= 9){
                    document.getElementById("textBox").innerHTML = "<img src='memesSmall.png' width = '20%' id = 'meme'>";
                }
                else
                    resetInterval();
            }
            /*
            else if(inputText === "test"){
                worldList();
            }
            */
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
            //an empty if so user can skip the text load script
            else if (inputText === ""){
                
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

function resetInterval(){
    textInterval = window.setInterval(displayText, 30);
}

function worldList(){
    appendDisplay("<br>>Available worlds are:");
    for(y = 1; y<parent.worldCompleted+2; y++){
        if(y!= (parent.worldCompleted+1))
            appendDisplay("<br><strike>World_" + y+ "</strike>");
        else
            appendDisplay("<br>World_" + y);
    }
}

function emptyCity(){
    appendDisplay("<br>>It seems as though this city is uninhabited, I will search for free memory.<br>>I have found:");
    
}

