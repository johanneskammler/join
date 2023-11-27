let currentUser;

async function checkInput() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("pw");

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Bitte geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein.");
    return;
  }

  const user = storedUsers.find((element) => element.email === email);

  if (user) {
    if (user.password === password) {
      await loginSteps(user);
      openSummaryAsUser();
    } else {
      alert("Das Passwort ist falsch.");
    }
  } else {
    alert("Die angegebene E-Mail-Adresse wurde nicht gefunden.");
  }
}

async function loginSteps(element) {
  currentUser = element;
  userAsJson = JSON.stringify(currentUser);
  await backend.setItem("currentUser", userAsJson);
}

function renderSignUpPage() {
  window.location = "../register/signUp.html";
}



function forgotPassword() {
  window.location = "forgotPassword/forgotPassword.html";
}

function backFromReset() {
  forgotPassword();
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
  window.location = "summary/summary.html";
}
