var swDisplay = document.getElementById("swDisplay");
var swStartStopBtn = document.getElementById("swStartStop");
var swResetBtn = document.getElementById("swReset");
var swLapBtn   = document.getElementById("swLapBtn");
var swLaps = document.getElementById("swLaps");

var swAmount = 0;
var swTimes = [0,0,0,0];
var swMaxs = [1000, 60, 60, 24];
var swTimeout = null;
var swRunning = false;
var swDisplayTxt = "00:00:00:000";

//used when to start or continue sw
function swStart(){
    swRunning = true;
    var curTime = Date.now();
    swRun(curTime);
}

//used to stop sw
function swStop(){
    swRunning = false;
}

function swStartOrStop(){
    if(swRunning){
        swStop();
        swStartStopBtn.textContent = "Start";
    }
    else{
        swStart();
        swStartStopBtn.textContent = "Stop";
    }
}

//used to reset sw
function swReset(){
    swStop();
    swStartStopBtn.textContent = "Start";
    swAmount = 0;
    swTimes = [0,0,0,0];
    swDisplayTxt = "00:00:00:000";
    swDisplay.textContent = swDisplayTxt;
    swClearChildren(swLaps);
}

//sets and increments stopwatch value
function swRun(prevTime){
    if(swRunning){
        var curTime = Date.now();
        swAmount += curTime - prevTime;
        swConvertFromMS(swAmount);
        swDisplayTxt = swFormatTime();
        swDisplay.textContent = swDisplayTxt;
        swTimeout = setTimeout(function(){swRun(curTime);}, 100);
    }
    else{
        clearTimeout(swTimeout);
    }
}

//conversion and formatting functions
//convert ms value into hr/min/sec/ms
function swConvertFromMS(msTime){
    // swTimes[0] = msTime%100;
    // swTimes[1] = msTime/100%60;
    // swTimes[2] = msTime/100/60%60;
    // swTimes[3] = msTime/100/60/60%24;
    var unconverted = msTime;
    for(var i = 0; i<swMaxs.length; i++){
        swTimes[i] = unconverted%swMaxs[i];
        unconverted = Math.floor(unconverted/swMaxs[i]);
    }

}

//create display for sw given swTimes array
function swFormatTime(){
    var display = "";
    for(var i = swTimes.length-1; i>0; i--){
        var placeValue = swTimes[i];
        if(placeValue < 10){
            placeValue = "0"+placeValue;
        }
        display = display + placeValue + ":";
    }

    if(swTimes[0] < 10){
        display = display + "00" + swTimes[0];
    }
    else if(swTimes[0]<100){
        display = display + "0" +swTimes[0];
    }
    else{
        display = display + swTimes[0];
    }
    return display;
}

//Lap Functions
//Adds laps
function swLap(){
    var lap = document.createElement("li");
    lap.textContent = swDisplayTxt;
    swLaps.appendChild(lap);  
}

//Removes All Laps
function swClearChildren(element){
    while(element.lastChild){
        element.removeChild(element.lastChild);
    }
}

swStartStopBtn.addEventListener("click", swStartOrStop);
swResetBtn.addEventListener("click", swReset);
swLapBtn.addEventListener("click", swLap);