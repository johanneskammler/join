let storedUsers = [];

setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function signUpUser() {
  let userName = document.getElementById("user").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pw").value;

  let newUser = {
    userName: userName,
    email: email,
    password: password,
  };

  storedUsers.push(newUser);

  // await downloadFromServer();
  await backend.setItem("storedUsers", JSON.stringify(storedUsers));

  if (userName == "") {
    alert("Bitte gib deinen Namen ein.");
    return false;
  } else if (email == "") {
    alert("Bitte gib deine E-Mail-Adresse ein.");
  } else if (password == "") {
    alert("Bitte gib ein Passwort ein.");
  } else {
    window.location = "../login/startPage.html";
  }

  return true;
}

async function retrieveUsers() {
  await downloadFromServer();
  let storedJSON = (await backend.getItem("storedUsers")) || [];
  if (storedJSON.length > 1) {
    storedUsers = JSON.parse(storedJSON);
  }
}
