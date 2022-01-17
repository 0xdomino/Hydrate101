let score = Number(document.getElementById("myScore").innerHTML);

let btn3 = document.getElementById("btn-300");
let btn6 = document.getElementById("btn-600");
let btn8 = document.getElementById("btn-800");
let btnReset = document.getElementById("btn-reset");

let percentScore;
let valuePercent;

btn3.addEventListener("click", () => {
    score += 300;
    document.getElementById("myScore").innerHTML = String(score);
    percentScore = (score / 2000) * 100;
    valuePercent = Math.round(percentScore);
    updateProgressBar(myProgressBar, percentScore);
});

btn6.addEventListener("click", () => {
    score += 600;
    document.getElementById("myScore").innerHTML = String(score);
    percentScore = (score / 2000) * 100;
    valuePercent = Math.round(percentScore);
    updateProgressBar(myProgressBar, percentScore);
});

btn8.addEventListener("click", () => {
    score += 800;
    document.getElementById("myScore").innerHTML = String(score);
    percentScore = (score / 2000) * 100;
    valuePercent = Math.round(percentScore);
    updateProgressBar(myProgressBar, percentScore);
});

btnReset.addEventListener("click", () => {
    score = 0;
    document.getElementById("myScore").innerHTML = String(score);
    percentScore = (score / 2000) * 100;
    valuePercent = Math.round(percentScore);
    updateProgressBar(myProgressBar, percentScore);
});

// let countTimer = Number(document.getElementById("count-timer").innerHTML);
// let btnStart = document.getElementById("start-timer");
// let btnStop = document.getElementById("stop-timer");
// let intervalID;

// btnStart.addEventListener("click", () => {
//     alert("Timer is start");
//     intervalID = setInterval(() => {
//         alert("You have to drink a water.");
//         countTimer += 1;
//         document.getElementById("count-timer").innerHTML = String(countTimer);
//     }, 1000 * 60 * 60);
// });

// btnStop.addEventListener("click", () => {
//     alert("Timer is stop");
//     clearInterval(intervalID);
// });
class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset"),
        };

        this.interval = null;
        this.remainingSeconds = 0;

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
            const inputMinutes = prompt("Enter number of minutes:");

            if (inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">start</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
                alert("Please drinks water");
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                <span class="material-icons">start</span>
            </button>
            <button type="button" class="timer__btn timer__btn--reset">
                <span class="material-icons">timer</span>
            </button>
        `;
    }
}

new Timer(document.querySelector(".timer"));

// Progress-bar
function updateProgressBar(progressBar, value) {
    value = Math.round(value);
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(
        ".progress__text"
    ).textContent = `${score} / 2000`;
}

const myProgressBar = document.querySelector(".progress");
