

async function onSubmit(event) {
  event.preventDefault();
  let formData = new FormData(event.target);
  let response = await action(formData);
}



function backFromForgot() {
  document.getElementById("blue-screen").classList.add("blue-screen");
  document
    .getElementById("forgot_password")
    .classList.add("shadow-drop-2-center");
  document.getElementById("forgot_password").classList.add("scale-down-center");
  document.getElementById("email").classList.add("slide-password-email");
  setTimeout(() => {
    navigateToIndex();
  }, 20);
}

function sendMeTheEmail() {
  var email = document.getElementById("email").value;
  if (email == "") {
    return false;
  } else {
    document.getElementById("sent-overlay").classList.remove("d-none");
    document.getElementById("sent-box").classList.remove("d-none");
   setTimeout(() => {
    navigateToIndex();
   }, 1000);
    return true;
  }
}

function navigateToIndex() {
  window.location = "../index.html";
}