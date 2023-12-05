let users = [];

async function init() {
  if (users.length === 0) {
    let data = await getItem("user");
    if (data) {
      users = JSON.parse(data);
      console.log("Benutzerdaten geladen:", users);
    } else {
      console.log("Keine Benutzerdaten gefunden.");
    }
  } else {
    console.log("Benutzerdaten sind bereits im Array vorhanden:", users);
  }
}

async function register() {
  let userName = document.getElementById("user");
  let email = document.getElementById("email");
  let password = document.getElementById("pw");

  users.push({
    userName: userName.value,
    email: email.value,
    password: password.value,
  });

  showBanner();
  resetForm(userName, email, password);
  await setItem("user", JSON.stringify(users));
}

function showBanner() {
  let banner = document.getElementById("sign-up-successful");
  let button_text = document.getElementById("text_button");
  let button_spinner = document.getElementById("button_spinner");

  banner.classList.remove("d-none");
  button_spinner.classList.remove("d-none");
  button_text.classList.add("d-none");

  console.log(users);

  setTimeout(() => {
    banner.classList.add("d-none");
    backToStart();
  }, 1470);
}

function resetForm(userName, email, password) {
  userName.value = "";
  email.value = "";
  password.value = "";
}

function backToStart() {
  window.location = "../../index.html";
}
