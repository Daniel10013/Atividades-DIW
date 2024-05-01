let mediaButton = document.querySelector(".calculate-media");

mediaButton.addEventListener("click", function(){
    let inputs = document.querySelectorAll(".media input");

    let canCalculate = true;
    inputs.forEach((eachInput, index)=>{
        if(eachInput.value == "" || isNaN(eachInput.value)){
            addError(eachInput, index, true)
            canCalculate = false;
        }
    })

    if(canCalculate == true){
        let sum = 0;
        inputs.forEach(function(eachInput){
            sum = sum + Number(eachInput.value);
        });
        console.log(sum);
        let media = sum / 3;
        showResult(media, document.querySelector(".result.media"));
    }
});

let calculateButtons = document.querySelectorAll(".calculate-options button");
calculateButtons.forEach(function(button){
    button.addEventListener("click", function(){
        let inputs = document.querySelectorAll(".calculadora input"); 
    
        let canCalculate = true;
        inputs.forEach((eachInput, index)=>{
            if(eachInput.value == "" || isNaN(eachInput.value)){
                addError(eachInput, index, false)
                canCalculate = false;
            }
        })
    
        if(canCalculate == true){
            let selectedOption = this.innerHTML;
            let number1 = Number(inputs[0].value);
            let number2 = Number(inputs[1].value);

            let operations = {
                "+": number1 + number2,
                "-": number1 - number2,
                "x": number1 * number2,
                "/": number1 / number2 
            }

            let result = operations[selectedOption];
            showResult(result, document.querySelector(".result.calculate"));
        }
    });
});


function addError(input, index, mediaOrCalculate){
    input.classList.add("error");
    input.value = "";
    input.placeholder = "Preencha Esse campo corretamente!";
    addReset(input, index, mediaOrCalculate);
}

function addReset(input, index, mediaOrCalculate){
    input.addEventListener("focus", function(){
        input.classList.remove("error");
        text = mediaOrCalculate == true ? "a nota" : "o número";
        input.placeholder = 'Digite ' + text + " " + (index + 1);
    });
}

function showResult(result, resultElement){
    resultElement.classList.remove("hidden")
    resultElement.innerHTML = "<h1>Resultado: " + result + "</h1>";
}