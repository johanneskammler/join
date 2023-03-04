async function init() {
  await downloadFromServer();
}
setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

let users = [];

function checkInp() {
  /*   users = JSON.parse(backend.getItem("storedUsers"));
  let forgotPasswordEmail = document.getElementById("email");
  if (forgotPasswordEmail.value.length > 1) {
    for (let i = 0; i < users.length; i++) {
      const element = users[i];

      console.log(forgotPasswordEmail.value);
      sendMail();
    }
  }
} */

  async function sendMail() {
    try {
      const response = await fetch(
        "https://gruppe-417.developerakademie.net/join/login/send_mail.php",
        {
          method: "POST",
          body: fd,
        }
      );

      if (response.status === 200) {
        this.mailSent = true;
        this.contactForm.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
}