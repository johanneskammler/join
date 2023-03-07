async function init() {
  await downloadFromServer();
}
setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

let users = [];

async function onSubmit(event) {
  event.preventDefault();
  let formData = new FormData(event.target);
  let response = await action(formData);

  if (response.ok) {
    alert("Email was send!");
  } else {
    alert("Email not send!");
  }
}

function action(formData) {
  const input =
    "https://gruppe-417.developerakademie.net/join/login/send_mail.php";
  const requestInit = {
    method: "post",
    body: formData,
  };

  return fetch(input, requestInit);
}
