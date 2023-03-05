async function init() {
    await downloadFromServer();
}
setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

let users = [];


async function sendMail() {
    try {
        const response = await fetch(
            "https://gruppe-417.developerakademie.net/join/login/send_mail.php", {
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
    } finally {}
}