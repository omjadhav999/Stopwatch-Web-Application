let timerDisplay = document.getElementById('timer');
let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let laps = document.getElementById('laps');

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerHTML = "Stop";
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    timerDisplay.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    laps.innerHTML = "";
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        let lapTime = timerDisplay.innerHTML;
        let li = document.createElement('li');
        li.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
