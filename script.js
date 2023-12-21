let currentUserID = [];
let userData = [];

async function init() {
  let data = await getItem("user");
  userData.push(JSON.parse(data));
  console.log(userData[0]);
}

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pw").value;
  let isLoggedIn = await checkInputValue(email, password);
  let loginBtnText = document.getElementById("login_btn_text");
  let btnSpinner = document.getElementById("button_spinner");

  if (isLoggedIn) {
    console.log("login success");
    loginBtnText.classList.add("d-none");
    btnSpinner.classList.remove("d-none");
    console.log(currentUserID);

    setTimeout(() => {
      window.location = "summary/summary.html";
    }, 2000);
  } else {
    alert("Incorrect login credentials!");
  }
}

async function checkInputValue(email, password) {
  for (let i = 0; i < userData[0].length; i++) {
    const user = userData[0][i];

    if (user["email"] === email && user["password"] === password) {
      currentUserID.push(user["id"]);
      await setItem("currentUserID", JSON.stringify(currentUserID));

      return true;
    }
  }
  return false;
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
