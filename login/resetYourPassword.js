let forgotPasswordEmail = document.getElementById('email').value;


function sendMeTheEmail() {
    let users = JSON.parse(backend.getItem("storedUsers"));
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if (element["email"] == forgotPasswordEmail){
            document.cookie = forgotPasswordEmail;
            p1 = forgotPasswordEmail;
            sendMail()
            
        }
    }
}






async function sendMail() {
try {
    const response = await fetch("https://gruppe-417.developerakademie.net/join/login/send_mail.php", {
      method: 'POST',
      body: fd
    });

    if (response.status === 200) {
      this.mailSent = true;
      this.contactForm.reset();
    }
  } catch (error) {
    console.log(error);
  } finally {
    nameField.disabled = false;
    messageField.disabled = false;
    sendButton.disabled = false;
    mail.disabled = false;
  }
}