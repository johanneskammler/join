/* Lädt signUp.html und zurück kommt man dann auf startpage.html */

function renderSignUpPage() {
  window.location = "signUp.html";
}


function backToStart() {
  window.location = "startPage.html";
}


function forgotPassword() {
  window.location = "forgotPassword.html";
}


function backFromForgot() {
  backToStart();
}


function backFromReset() {
  forgotPassword();
}