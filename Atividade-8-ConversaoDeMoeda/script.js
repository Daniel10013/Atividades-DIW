window.onload = playAudio();

function playAudio(){
    var audio = new Audio('./assets/sound/windows_boot_sound.mp3');
    audio.play();  
}

function refreshTime() {
    var timeDisplay = document.getElementById("time");
    var time = new Date()
    var timeToDisplay = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    timeDisplay.innerHTML = timeToDisplay;
}

setInterval(refreshTime, 1000);

document.getElementById("calc-button").addEventListener("click", function(){

    let realInput = document.getElementById("real-value");
    let realValue = realInput.value;

    if(realValue == 0 || isNaN(realValue)){
        document.querySelector(".result-box").innerHTML = "Valor inválido digitado!"
        return;
    }

    let currencesValues = {
        "dolar": "US$"+ formatValue(realValue / 5.09), 
        "euro": "€"+ formatValue(realValue / 5.47),
        "iene": "¥"+ formatValue(realValue / 0.033),
        "libra": "£"+ formatValue(realValue / 6.36),
        "franco": "Fr"+ formatValue(realValue / 5.60),
    }

    let selectedOption = document.getElementById("currence-option").value;
    let conversionValue = currencesValues[selectedOption];
    let result = conversionValue + "<br> Com base na cotação do dia 08/05/2024";

    document.querySelector(".result-box").innerHTML = result;
})

function formatValue(number){
    return Number(number).toFixed(2);
}