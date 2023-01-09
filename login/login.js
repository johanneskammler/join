/* Lädt signUp.html und zurück kommt man dann auf startpage.html */

function renderSignUpPage() {
    window.location = "signUp.html";
}


function backToStart() {
    window.location = "startPage.html";
}


function forgotPassword() {
    window.location = "forgotPassword.html";
}


function backFromForgot() {
    document.getElementById('blue-screen').classList.add('blue-screen');
    document.getElementById('forgot_password').classList.add('shadow-drop-2-center');
    document.getElementById('forgot_password').classList.add('scale-down-center');
    document.getElementById('email').classList.add('slide-password-email');


    setTimeout(backToStart, 125);

}


function backFromReset() {
    forgotPassword();
}


function sendMeTheEmail() {
    var email = document.getElementById("email").value;
    if (email == "") {
        alert("Bitte gib eine E-Mail-Adresse ein.");
        return false;
    } else {
        document.getElementById('sent-overlay').classList.remove('d-none');
        document.getElementById('sent-box').classList.remove('d-none');
        setTimeout(backToStart, 1500);
    }
    return true;
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
        document.getElementById('reset-overlay').classList.remove('d-none');
        document.getElementById('reset-container').classList.remove('d-none');
        setTimeout(backToStart, 1500);
    }
    return true;
}


function signUpUser() {
    var user = document.getElementById("user").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pw").value;
    if (user == "") {
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