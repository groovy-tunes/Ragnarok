//initially always a new game
var isNew = true;

//main js file that stores variables for future gameplay
function saveGame(){
    if (storageAvailable('localStorage')) {
	localStorage.sTextDisplayed = document.getElementById("mainFrame").contentWindow.textDisplayed;
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

function loadGame(url){
    isNew = false;
    document.getElementById("mainFrame").src = url;
    loadData();
}

function loadData(){
    //error
    //alert(localStorage.sTextDisplayed);
    var currentText = localStorage.sTextDisplayed;
    currentText += "<br>>Successful load";
    alert(currentText);
    document.getElementById("mainFrame").contentWindow.appendDisplay(currentText);
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