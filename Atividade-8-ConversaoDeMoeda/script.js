
function refreshTime() {
    var timeDisplay = document.getElementById("time");
    var time = new Date()
    var timeToDisplay = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    timeDisplay.innerHTML = timeToDisplay;
}

setInterval(refreshTime, 1000);