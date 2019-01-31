class Stopwatch{
    constructor(stopwatch){
        this.swDisplay = stopwatch.getElementsByClassName("swDisplay")[0];
        this.swStartStopBtn = stopwatch.getElementsByClassName("swStartStop")[0];
        this.swResetBtn = stopwatch.getElementsByClassName("swReset")[0];
        this.swLapBtn   = stopwatch.getElementsByClassName("swBtn")[1];
        this.swLaps = stopwatch.getElementsByClassName("swLaps")[0];
        this.swLapsUpBtn = stopwatch.getElementsByClassName("swLapsUp")[0];
        this.swLapsDownBtn = stopwatch.getElementsByClassName("swLapsDown")[0];
        this.swLapsPanel = stopwatch.getElementsByClassName("swLapsPanel")[0];

        this.swAmount = 0;
        this.swTimes = [0,0,0,0];
        this.swMaxs = [1000, 60, 60, 24];
        this.swTimeout = null;
        this.swRunning = false;
        this.swDisplayTxt = "00:00:00:000";
        this.lapPage = 0;
        this.lapPerPage = 3;

        this.swStartStopBtn.addEventListener("click", () => this.swStartOrStop());
        this.swResetBtn.addEventListener("click", () => this.swReset());
        this.swLapBtn.addEventListener("click", () => this.swLap());
        this.swLapsDownBtn.addEventListener("click", () => this.swDownPg());
        this.swLapsUpBtn.addEventListener("click", () => this.swUpPg());
    }

    //used when to start or continue sw
    swStart(){
        this.swRunning = true;
        var curTime = Date.now();
        this.swRun(curTime);
    }

    //used to stop sw
    swStop(){
        this.swRunning = false;
    }

    swStartOrStop(){
        if(this.swRunning){
            this.swStop();
            this.swStartStopBtn.textContent = "Start";
        }
        else{
            this.swStart();
            this.swStartStopBtn.textContent = "Stop";
        }
    }

    //used to reset sw
    swReset(){
        //reset stopwatch
        this.swStop();
        this.swStartStopBtn.textContent = "Start";
        this.swAmount = 0;
        this.swTimes = [0,0,0,0];
        this.swDisplayTxt = "00:00:00:000";
        this.swDisplay.textContent = this.swDisplayTxt;
        //reset laps
        this.swClearChildren(this.swLaps);
        this.swLapsUpBtn.classList.remove("show");
        this.swLapsUpBtn.classList.add("hide");
        this.swLapsDownBtn.classList.remove("show");
        this.swLapsDownBtn.classList.add("hide");
        this.lapPage = 0;
        this.swLapsPanel.classList.remove("add");
        this.swLapsPanel.classList.add("remove");
    }

    //sets and increments stopwatch value
    swRun(prevTime){
        if(this.swRunning){
            var curTime = Date.now();
            this.swAmount += curTime - prevTime;
            this.swConvertFromMS(this.swAmount);
            this.swDisplayTxt = this.swFormatTime();
            this.swDisplay.textContent = this.swDisplayTxt;
            this.swTimeout = setTimeout(() => this.swRun(curTime), 10);
        }
        else{
            clearTimeout(this.swTimeout);
        }
    }

    //conversion and formatting functions
    //convert ms value into hr/min/sec/ms
    swConvertFromMS(msTime){
        // this.swTimes[0] = msTime%100;
        // this.swTimes[1] = msTime/100%60;
        // this.swTimes[2] = msTime/100/60%60;
        // this.swTimes[3] = msTime/100/60/60%24;
        var unconverted = msTime;
        for(var i = 0; i<this.swMaxs.length; i++){
            this.swTimes[i] = unconverted%this.swMaxs[i];
            unconverted = Math.floor(unconverted/this.swMaxs[i]);
        }
    }

    //create display for sw given this.swTimes array
    swFormatTime(){
        var display = "";
        for(var i = this.swTimes.length-1; i>0; i--){
            var placeValue = this.swTimes[i];
            if(placeValue < 10){
                placeValue = "0"+placeValue;
            }
            display = display + placeValue + ":";
        }

        if(this.swTimes[0] < 10){
            display = display + "00" + this.swTimes[0];
        }
        else if(this.swTimes[0]<100){
            display = display + "0" +this.swTimes[0];
        }
        else{
            display = display + this.swTimes[0];
        }
        return display;
    }

    //Lap Functions
    //Adds laps
    swLap(){
        var lap = document.createElement("li");
        lap.textContent = this.swDisplayTxt;
        lap.classList.add("swLap");
        if(this.swLapsPanel.classList.contains("remove")){
            this.swLapsPanel.classList.remove("remove");
            this.swLapsPanel.classList.add("add");
        }
        if(this.swLaps.childElementCount >= this.lapPage * this.lapPerPage + this.lapPerPage){
            lap.classList.add("remove");
            if(this.swLapsDownBtn.classList.contains("hide")){
                this.swLapsDownBtn.classList.remove("hide");
                this.swLapsDownBtn.classList.add("show");
            }
        }
        this.swLaps.appendChild(lap);  
    }

    swDownPg(){
        var laps = this.swLaps.getElementsByClassName("swLap");
        for(var i = 0; i < this.lapPerPage; i++){
            laps[this.lapPage*this.lapPerPage+i].classList.remove("add");
            laps[this.lapPage*this.lapPerPage+i].classList.add("remove");
        }
        this.lapPage++;
        for(var i = 0; i < this.lapPerPage; i++){
            if(this.lapPage*this.lapPerPage+i < laps.length){
                laps[this.lapPage*this.lapPerPage+i].classList.remove("remove");
                laps[this.lapPage*this.lapPerPage+i].classList.add("add");
            }
        }

        //add page up if not visible
        if(this.swLapsUpBtn.classList.contains("hide")){
            this.swLapsUpBtn.classList.remove("hide");
            this.swLapsUpBtn.classList.add("show");
        }

        //remove pagedown if now on last page
        if(this.lapPage * this.lapPerPage +this.lapPerPage >= this.swLaps.childElementCount){
            this.swLapsDownBtn.classList.remove("show");
            this.swLapsDownBtn.classList.add("hide");
        }
    }

    swUpPg(){
        var laps = this.swLaps.getElementsByClassName("swLap");
        for(var i = 0; i < this.lapPerPage; i++){
            if(this.lapPage*this.lapPerPage+i < laps.length){
                laps[this.lapPage*this.lapPerPage+i].classList.remove("add");
                laps[this.lapPage*this.lapPerPage+i].classList.add("remove");
            }
        }
        this.lapPage--;
        for(var i = 0; i < this.lapPerPage; i++){
            laps[this.lapPage*this.lapPerPage+i].classList.remove("remove");
            laps[this.lapPage*this.lapPerPage+i].classList.add("add");
        }

        //add page down if not visible
        if(this.swLapsDownBtn.classList.contains("hide")){
            this.swLapsDownBtn.classList.remove("hide");
            this.swLapsDownBtn.classList.add("show");
        }

        //remove pageup if now on last page
        if(this.lapPage * this.lapPerPage === 0){
            this.swLapsUpBtn.classList.remove("show");
            this.swLapsUpBtn.classList.add("hide");
        }
    }

    //Removes All Laps
    swClearChildren(element){
        while(element.lastChild){
            element.removeChild(element.lastChild);
        }
    }
}

let test = new Stopwatch(document.getElementsByClassName('stopwatch')[0]);



