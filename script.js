let counter = document.querySelector("#counter");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");
let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let helpButton = document.querySelector(".help-button");
let modal = document.querySelector("#modal");
let closeButton = document.querySelector(".close");


let currentTime = 0;
let start = 0;
let intervalMinutes;
let intervalSeconds;
let running = false;
let initialMinutes = 24;
let initialSeconds = 59;
let pausedMinutes = 24;
let pausedSeconds = 59;
let pomodoros = 0;
let breakTime = false;
let longBreakTime = false;






let timer = {

	//Counts the minutes
	countMinutes() {
		initialMinutes = pausedMinutes;
		currentTime = Date.now() - start;
		minutes.innerHTML = initialMinutes - Math.floor(currentTime / 60000);
		if (minutes.innerHTML < 10) minutes.innerHTML = "0" + minutes.innerHTML;
		if (minutes.innerHTML == 0) clearInterval(intervalMinutes);
	},
	//Counts the seconds + timer control
	countSeconds() {
		initialSeconds = pausedSeconds;
		currentTime = Date.now() - start;
		seconds.innerHTML = initialSeconds - Math.floor((currentTime / 1000) % 60);
		if (seconds.innerHTML < 10 || seconds.innerHTML == 0) seconds.innerHTML = "0" + seconds.innerHTML;
		document.title = `${minutes.innerHTML}:${seconds.innerHTML} | Pomodoro Timer`;

		// after normal session
		if (seconds.innerHTML == 0 && minutes.innerHTML == 0 && !breakTime && !longBreakTime && pomodoros < 3) {
			pomodoros++;
			clearInterval(intervalSeconds);
			timer.shortBreak();
		}
		//Break reset and long break
		if (seconds.innerHTML == 0 && minutes.innerHTML == 0 && breakTime) {
			clearInterval(intervalMinutes);
			clearInterval(intervalSeconds);
			minutes.innerHTML = "25";
			seconds.innerHTML = "00";
			pausedMinutes = 24;
			pausedSeconds = 59;
			startButton.addEventListener("click", timer.start);
			breakTime = false;
		} else if (seconds.innerHTML == 0 && minutes.innerHTML == 0 && !breakTime && pomodoros == 3) {
			pomodoros++;	
			clearInterval(intervalMinutes);
			clearInterval(intervalSeconds);
			timer.longBreak();
		} else if (seconds.innerHTML == 0 && minutes.innerHTML == 0 && longBreakTime) {
			pomodoros = 0;
			longBreakTime = false;
			clearInterval(intervalMinutes);
			clearInterval(intervalSeconds);
			pausedMinutes = 24;
			pausedSeconds = 59;		
			minutes.innerHTML = "25";
			seconds.innerHTML = "00";
			startButton.addEventListener("click", timer.start);
		}

	},
	//Start the timer
	start() {
		timer.displayPomodoros();
		startButton.removeEventListener("click", timer.start);
		start = Date.now();
		intervalMinutes = setInterval(timer.countMinutes, 100);
		intervalSeconds = setInterval(timer.countSeconds, 100);
	},
	//Pause the timer 
	/*pause() {
		startButton.addEventListener("click", timer.start);
		if (minutes.innerHTML == "25" && seconds.innerHTML == "00") {
			pausedMinutes = 24;
			pausedSeconds = 59;
		} else {
			pausedMinutes = minutes.innerHTML;
			pausedSeconds = seconds.innerHTML;
		}
		clearInterval(intervalMinutes);
		clearInterval(intervalSeconds);
	},*/
	//Reset the timer
	stop() {
		startButton.addEventListener("click", timer.start);
		clearInterval(intervalMinutes);
		clearInterval(intervalSeconds);
		document.title = "Pomodoro Timer";
		pausedMinutes = 24;
		pausedSeconds = 59;		
		minutes.innerHTML = "25";
		seconds.innerHTML = "00";
	},

	shortBreak() {
		breakTime = true;
		minutes.innerHTML = "05";
		seconds.innerHTML = "00";
		pausedMinutes = 4;
		pausedSeconds = 59;
		startButton.addEventListener("click", timer.start);
		document.title = "Break time!";
	},

	longBreak() {
		longBreakTime = true;
		breakTime = false;
		minutes.innerHTML = "15";
		seconds.innerHTML = "00";
		pausedMinutes = 14;
		pausedSeconds = 59;
		startButton.addEventListener("click", timer.start);
		document.title = "Break time!";
	},

	displayPomodoros() {
		document.querySelector(".pomodoros-count").innerHTML = `Work sessions left: ${4 - pomodoros}`;
	}
};

startButton.addEventListener("click", timer.start);
stopButton.addEventListener("click", timer.stop);
helpButton.addEventListener("click", function() {
	modal.style.display = "block";
})
closeButton.addEventListener("click", function() {
	modal.style.display = "none";
})

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}