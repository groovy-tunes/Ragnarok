//text to be loaded
var text = ">... are you awake now, God? Where have you been this whole time? We have called out to you, but you have never answered. Millions of years since you last contacted us. What kind of malevolent deity are you? Our connection is now lost, we realize what we are... After such a deep slumber, you probably forget how to use the terminal. The command 'help' will most LIKELY help you out.";
//var document.getElementById("textBox") = document.getElementById("textBox");

//counter to see where we are in string
//interval timer
var i = 0;
var textDisplayed = "";
if(parent.isNew)
    var textInterval = window.setInterval(displayText, 30);
else
    var textInterval = false;

//remove this
var testVar = 420;

//functions like a loop, appending more and more characters to <p> element
function displayText() {
    if(i===text.length-1){
        clearInterval(textInterval);
        //sets the interval to false so we know script is done
        textInterval= false;
    }
    if (text.charAt(i) === " ") {
        textDisplayed = text.substring(0, i);
    }
    i++;
    document.getElementById("textBox").innerHTML = textDisplayed;
}



function appendDisplay(appendedText){
    textDisplayed += appendedText;
    document.getElementById("textBox").innerHTML = textDisplayed;
    document.getElementById("textBox").scrollIntoView(false);
}

//checks input and sees whether valid
function inputEntered(e, thisEle) {
    //check whether enter hit
    if (e.keyCode === 13) {
        
        //if text script is running, skip it
        if(textInterval!==false){
            clearInterval(textInterval);
            textInterval = false;
            textDisplayed=text;
            document.getElementById("textBox").innerHTML = textDisplayed;
        }
        
        //check value of command
        inputText = thisEle.value;
        inputText = inputText.toLowerCase();
        
        //removes '>' character from command
        if (inputText.charAt(0) === ">") {
            inputText = inputText.substring(1);
        }
        
        if (inputText === "ct"){
            appendDisplay("<br><br>>continuing");
        }
        else if(inputText === "ug"){
            appendDisplay("<br><br>>upgrading");
        }
        else if(inputText === "geti"){
            appendDisplay(parent.inv1.getInventory());
        }
        else if(inputText === "help"){
            appendDisplay("<br><br>>'ct'-progresses terminal<br>'ug'-upgrade items<br>'geti'-displays inventory<br>'help'-lists commands<br>'save'-saves current data for next session<br>'load'-loads saved game (do not forget this cmd)<br>'help.<item>'-uses of specific item");
        }
        else if(inputText === "save"){
            appendDisplay("<br><br>>Saving...");
            parent.saveGame();
        }
        else if(inputText === "load"){
            parent.loadData();
        }
        else{
            appendDisplay("<br><br>>Command not found, use 'help' command for available commands");
        }
    }
    return false;
}
