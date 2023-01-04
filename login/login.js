// Jede Section hard coden, einzeln stylen, dann als gesamte DIV container via JS ein- und ausblenden




/*function renderSignUpPage() {
    document.getElementById('login-headline').innerHTML = 'Sign up';
    document.getElementById('sign-up').style = 'display: none;';
    document.getElementById('back-from-signup').style = 'display: block;';
    document.getElementById('user').classList.remove('d-none');
    document.getElementById('user').style = 'margin-bottom: 29px;';
    document.getElementById('pw-recovery').style.display = 'none';
    document.getElementById('login-btn').classList.add('d-none');
    document.getElementById('guest-btn').classList.add('d-none');
    document.getElementById('sign-up-btn').classList.remove('d-none');
    document.getElementById('login-buttons').classList.add('center-signup-btn');
    document.getElementById('logos').style = 'background-color: #4589ff;';
    document.getElementById('blue-logo').src = '../login/img/logo_white.png';
    document.getElementById('white-logo').src = '../login/img/logo_blue.png';
}


function backFromSignUp() {
    document.getElementById('login-headline').innerHTML = 'Log in';
    document.getElementById('sign-up').style = 'display: flex; animation: none; opacity: 1;';
    document.getElementById('back-from-signup').style = 'display: none;';
    document.getElementById('user').classList.add('d-none');
    document.getElementById('pw-recovery').style.display = 'flex';
    document.getElementById('login-btn').innerHTML = 'Log in';
    document.getElementById('login-btn').style = 'margin-top: 0; margin-left: 0; transition: none;';
    document.getElementById('guest-btn').classList.remove('d-none');
    document.getElementById('logos').style = 'background-color: white;';
    document.getElementById('login-buttons').classList.remove('center-signup-btn');
    document.getElementById('blue-logo').src = '../login/img/logo_blue.png';
    document.getElementById('white-logo').src = '../login/img/logo_white.png';
}


function forgotPassword() {
    document.getElementById('login-headline').innerHTML = 'I forgot my password';
    document.getElementById('login-headline').style = 'font-size: 48px;';
    document.getElementById('sign-up').style = 'display: none;';
    document.getElementById('back-from-password').style = 'display: block;';
    document.getElementById('pw-recovery').style.display = 'none';
    document.getElementById('guest-btn').classList.add('d-none');
    document.getElementById('pw').style = 'display: none;';
    document.getElementById('logos').style = 'background-color: #4589ff;';
    document.getElementById('login-btn').classList.add('d-none');
    document.getElementById('guest-btn').classList.add('d-none');
    document.getElementById('password-btn').classList.remove('d-none');
    document.getElementById('password-btn').style = 'width: 270px; margin-top: -100px;';
    document.getElementById('login-buttons').classList.add('center-signup-btn');
    document.getElementById('reset-instructions').classList.remove('d-none');
    document.getElementById('blue-logo').src = '../login/img/logo_white.png';
    document.getElementById('white-logo').src = '../login/img/logo_blue.png';
}*/


/* Lädt signUp.html und zurück kommt man dann auf startpage.html */
function renderSignUpPage() {
    window.location = "signUp.html";
}

function backToStart() {
    window.location = 'startPage.html';
   
}


