let loginButtonElement = document.getElementById("login-button");
let signupButtonElement = document.getElementById("signup-button");
let submitLoginButtonElement = document.getElementById("button-submit-login-form");
let registerBoxElement = document.getElementById("register-box");
let registerButtonElement = document.getElementById("register-button");
let loginBoxElement = document.getElementById("login-box");
let backButtonElement = document.getElementById("button-back");
let submitRegisterButtonElement = document.getElementById("button-submit-register-form");


loginButtonElement.addEventListener("click", function () {
    submitRegisterButtonElement.disable = true;
    submitLoginButtonElement.click();
});

registerButtonElement.addEventListener("click", function () {
    submitLoginButtonElement.disable = true;
    submitRegisterButtonElement.click();
});

signupButtonElement.addEventListener("click", function () {
    loginBoxElement.style.zIndex = "-1";
    submitLoginButtonElement.disable = "true";
    registerBoxElement.style.zIndex = "1";
    backButtonElement.style.visibility = "visible";
    backButtonElement.style.marginLeft = "600px";
    backButtonElement.style.marginTop = "235px";
    backButtonElement.disable = false;


});

backButtonElement.addEventListener("click", function () {
    loginBoxElement.style.zIndex = "1";
    submitLoginButtonElement.disable = "false";
    registerBoxElement.style.zIndex = "-1";
    backButtonElement.style.marginTop = "400px";
    backButtonElement.disable = true;
});