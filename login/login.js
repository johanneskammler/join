/* Lädt signUp.html und zurück kommt man dann auf startpage.html */
let currentUser;
async function init() {
  await retrieveUsers();
}

async function checkInput() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pw").value;

  for (let i = 0; i < storedUsers.length; i++) {
    const element = storedUsers[i];
    if (element["email"] == email) {
      if (element["email"] == email && element["password"] == password) {
        await loginSteps(element);
      } else {
        alert("Password is incorrect!");
        return;
      }
    }
  }
}

async function loginSteps(element) {
  currentUser = element;
  userAsJson = JSON.stringify(currentUser);
  await backend.setItem("currentUser", userAsJson);
  openSummaryAsUser();
}

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
  document.getElementById("blue-screen").classList.add("blue-screen");
  document
    .getElementById("forgot_password")
    .classList.add("shadow-drop-2-center");
  document.getElementById("forgot_password").classList.add("scale-down-center");
  document.getElementById("email").classList.add("slide-password-email");

  setTimeout(backToStart, 125);
}

function backFromReset() {
  forgotPassword();
}

function sendMeTheEmail() {
  var email = document.getElementById("email").value;
  if (email == "") {
    return false;
  } else {
    document.getElementById("sent-overlay").classList.remove("d-none");
    document.getElementById("sent-box").classList.remove("d-none");
    setTimeout(backToStart, 1500);
    return true;
  }
}

function resetPassword() {
  var password = document.getElementById("new-password").value;
  var confirmedPassword = document.getElementById("confirm-password").value;
  if (password == "") {
    alert("Bitte gib ein Passwort ein.");
    return false;
  } else if (confirmedPassword == "") {
    alert("Bitte bestätige dein Passwort.");
  } else if (password != confirmedPassword) {
    alert("Passwörter stimmen nicht überein.");
  } else {
    document.getElementById("reset-overlay").classList.remove("d-none");
    document.getElementById("reset-container").classList.remove("d-none");
    setTimeout(backToStart, 1500);
  }
  return true;
}

function openSummaryAsUser() {
  window.location = "../summary/summary.html";
}

async function openSummary() {
  currentUser = "Guest user";
  userAsJson = JSON.stringify(currentUser);
  await backend.setItem("currentUser", userAsJson);
  window.location = "../summary/summary.html";
}
