var swDisplay = document.getElementById("swDisplay");

var swAmount = 0;
var swTimes = [0,0,0,0];
var swTimeout = null;
var swRunning = false;

//used when to start or continue sw
function swStart(){
    //set runing to true
    //create date object
    //call swRun with created date object
}

//used to stop sw
function swStop(){
    //stop swRun Timeout
    //set running to false
}

//used to reset sw
function swReset(){
    //calls swStop
    //reset swAmount to 0
    //runFormatTime and set swDisplay to return value
}

//sets and increments stopwatch value
function swRun(prevTime){
    //create date object for curTime
    //add curTime - prevTime to swAmount
    //run convertFromMS
    //runFormatTime and set swDisplay to return value
    //run swRun with curTime after setTimeout of 10ms
}

//convert ms value into hr/min/sec/ms
function swConvertFromMS(msTime){
    
}

//create display for sw given swTimes array
function swFormatTime(){

}



