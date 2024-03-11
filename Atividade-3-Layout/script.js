let button = document.getElementById("newsletterButton");         

button.addEventListener("click", function(){
    let nameInput = document.querySelector("input[name=nome]");
    let emailInput = document.querySelector("input[name=email]");
    let formIsValid = validateForm(nameInput, emailInput);
    console.log(formIsValid);
    if(formIsValid){
        nameInput.style.borderColor = "transparent";        
        emailInput.style.borderColor = "transparent"; 
        setSucessButton(button);
        resetInputs(nameInput, emailInput);
        return;
    }           
});

function validateForm(nameInput, emailInput){
    let valueName = nameInput.value;
    let emailValue = emailInput.value;
    if(valueName === ""){
        nameInput.style.borderColor = "red";     
    }

    if(emailValue === ""){
        emailInput.style.borderColor = "red";     
    }

    if(valueName == "" && emailValue == ""){
        button.innerHTML = "Preencha os campos!"
        return false;
    }

    if(!emailValue.includes("@") || !emailValue.includes(".")){
        emailInput.style.borderColor = "red";  
        button.innerHTML = "Email inválido!"
        return false;
    }

    if(valueName != "" || emailValue != ""){
        return true;
    }
}  

function setSucessButton(button){
    console.log(button)
    button.innerHTML = "Newsletter Assinada!";
    button.style.borderColor = "rgb(29, 163, 29)";
    button.style.backgroundColor = "rgb(29, 163, 29)"
    button.style.color = "white";
    resetButton(button);
}

function resetButton(button){
    setTimeout(() => {
        button.innerHTML = "Assinar";
        button.style.borderColor = "black";
        button.style.backgroundColor = "white"
        button.style.color = "black";
    }, 2000);
}

function resetInputs(nameInput, emailInput){
    setTimeout(() => {    
        nameInput.value = "";
        emailInput.value = "";
    }, 2000);
}