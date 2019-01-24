var swDisplay = document.getElementById("swDisplay");
var swStartStopBtn = document.getElementById("swStartStop");
var swResetBtn = document.getElementById("swReset");
var swLapBtn   = document.getElementById("swLapBtn");
var swLaps = document.getElementById("swLaps");
var swLapsUpBtn = document.getElementById("swLapsUp");
var swLapsDownBtn = document.getElementById("swLapsDown");
var swLapsPanel = document.getElementById("swLapsPanel");

var swAmount = 0;
var swTimes = [0,0,0,0];
var swMaxs = [1000, 60, 60, 24];
var swTimeout = null;
var swRunning = false;
var swDisplayTxt = "00:00:00:000";
var lapPage = 0;
var lapPerPage = 3;

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
    //reset stopwatch
    swStop();
    swStartStopBtn.textContent = "Start";
    swAmount = 0;
    swTimes = [0,0,0,0];
    swDisplayTxt = "00:00:00:000";
    swDisplay.textContent = swDisplayTxt;
    //reset laps
    swClearChildren(swLaps);
    swLapsUpBtn.classList.remove("show");
    swLapsUpBtn.classList.add("hide");
    swLapsDownBtn.classList.remove("show");
    swLapsDownBtn.classList.add("hide");
    lapPage = 0;
    swLapsPanel.classList.remove("add");
    swLapsPanel.classList.add("remove");
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
    lap.classList.add("swLap");
    if(swLapsPanel.classList.contains("remove")){
        swLapsPanel.classList.remove("remove");
        swLapsPanel.classList.add("add");
    }
    if(swLaps.childElementCount >= lapPage * lapPerPage + lapPerPage){
        lap.classList.add("remove");
        if(swLapsDown.classList.contains("hide")){
            swLapsDown.classList.remove("hide");
            swLapsDown.classList.add("show");
        }
    }
    swLaps.appendChild(lap);  
}

function swDownPg(){
    var laps = swLaps.getElementsByClassName("swLap");
    for(var i = 0; i < lapPerPage; i++){
        laps[lapPage*lapPerPage+i].classList.remove("add");
        laps[lapPage*lapPerPage+i].classList.add("remove");
    }
    lapPage++;
    for(var i = 0; i < lapPerPage; i++){
        if(lapPage*lapPerPage+i < laps.length){
            laps[lapPage*lapPerPage+i].classList.remove("remove");
            laps[lapPage*lapPerPage+i].classList.add("add");
        }
    }

    //add page up if not visible
    if(swLapsUpBtn.classList.contains("hide")){
        swLapsUpBtn.classList.remove("hide");
        swLapsUpBtn.classList.add("show");
    }

    //remove pagedown if now on last page
    if(lapPage * lapPerPage +lapPerPage >= swLaps.childElementCount){
        swLapsDownBtn.classList.remove("show");
        swLapsDownBtn.classList.add("hide");
    }
}

function swUpPg(){
    var laps = swLaps.getElementsByClassName("swLap");
    for(var i = 0; i < lapPerPage; i++){
        if(lapPage*lapPerPage+i < laps.length){
            laps[lapPage*lapPerPage+i].classList.remove("add");
            laps[lapPage*lapPerPage+i].classList.add("remove");
        }
    }
    lapPage--;
    for(var i = 0; i < lapPerPage; i++){
        laps[lapPage*lapPerPage+i].classList.remove("remove");
        laps[lapPage*lapPerPage+i].classList.add("add");
    }

    //add page down if not visible
    if(swLapsDownBtn.classList.contains("hide")){
        swLapsDownBtn.classList.remove("hide");
        swLapsDownBtn.classList.add("show");
    }

    //remove pageup if now on last page
    if(lapPage * lapPerPage === 0){
        swLapsUpBtn.classList.remove("show");
        swLapsUpBtn.classList.add("hide");
    }
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
swLapsDownBtn.addEventListener("click", swDownPg);
swLapsUpBtn.addEventListener("click", swUpPg);