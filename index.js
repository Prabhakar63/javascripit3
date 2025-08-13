var card = document.getElementById('card');
var clock = document.getElementById('clock');

card.addEventListener('mouseover', function () {
    card.style.background = "linear-gradient(90deg,rgb(19, 183, 19) 0%, #ffd200 100%)";
    card.innerHTML = "you are in";
    card.appendChild(clock);
});

card.addEventListener('mouseout', function () {
    card.style.background = "linear-gradient(90deg,rgb(221, 88, 26) 0%, #fcb69f 100%)";
    card.innerHTML = "you are out";
    card.appendChild(clock);
});

card.addEventListener('click', function () {
    card.style.background = "linear-gradient(90deg,rgb(209, 226, 54) 0%, #ee0979 100%)";
    card.innerHTML = "you Clicked ";
    card.appendChild(clock);
});


function playBeep(frequency, duration, type = 'sine', volume = 0.15) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gain.gain.value = volume;
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            ctx.close();
        }, duration);
    } catch (e) {
       
    }
}

function updateClock() {
    var date = new Date();
    var hours = date.getHours().toString().padStart(2, '0');
    var mins = date.getMinutes().toString().padStart(2, '0');
    var secs = date.getSeconds().toString().padStart(2, '0');
    var timeStr = hours + ":" + mins + ":" + secs;
    clock.innerHTML = timeStr;
    document.getElementById('background-clock').innerHTML = timeStr;

    
if (secs === "00 to 60" && mins === "00") {
    playBeep(180, 600, 'triangle', 0.28); 
} else if (secs === "00") {
    playBeep(550, 250, 'square', 0.20);   
} else {
    playBeep(1200, 60, 'sawtooth', 0.13); 
}
}

window.setInterval(updateClock, 1000);
updateClock();