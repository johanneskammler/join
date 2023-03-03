let storedUsers = [];
let emailValue = false;

setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function signUpUser() {
    let userName = document.getElementById("user").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pw").value;

    checkIfEmailIsCorrectForm(email);

    if (emailValue == false) {
        return;
    }

    let newUser = {
        userName: userName,
        email: email,
        password: password,
    };

    storedUsers.push(newUser);

    await backend.setItem("storedUsers", JSON.stringify(storedUsers));

    if (userName == "") {
        alert("Bitte gib deinen Namen ein.");
        return false;
    } else if (email == "") {
        alert("Bitte gib deine E-Mail-Adresse ein.");
    } else if (password == "") {
        alert("Bitte gib ein Passwort ein.");
    } else {
        // newAccCreated();
        document.getElementById('sign-up-successful').classList.remove('d-none');
        setTimeout(() => {
            window.location = "../login/startPage.html";
        }, 3000);
    }

    emailValue = false;
    return true;
}

// function newAccCreated() {
//     document.getElementById('new_acc_created').classList.remove('d-none');
//     setTimeout(() => {
//         document.getElementById('new_acc_created').classList.add('d-none');
//     }, 2500);
// }

function checkIfEmailIsCorrectForm(email) {
    if (!email.includes('.')) {
        alert('Incorrect e-mail form!');
    } else {
        emailValue = true;
    }
}

async function retrieveUsers() {
    await downloadFromServer();
    let storedJSON = (await backend.getItem("storedUsers")) || [];
    if (storedJSON.length > 1) {
        storedUsers = JSON.parse(storedJSON);
    }
}

console.log(storedUsers);