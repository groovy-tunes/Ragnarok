//initially always a new game
var isNew = true;

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