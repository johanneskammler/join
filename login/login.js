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


function sendMeTheEmail() {
  var email = document.getElementById("email").value;
  if (email == "") {
    alert("Bitte gib eine E-Mail-Adresse ein.");
    return false;
  } else {
    document.getElementById('sent-overlay').classList.remove('d-none');
    document.getElementById('sent-box').classList.remove('d-none');
    setTimeout(backToStart, 1500);
  }
  return true;
}