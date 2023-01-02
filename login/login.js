function renderSignUpPage() {
    document.getElementById('login-headline').innerHTML = 'Sign up';
    document.getElementById('sign-up').style = 'display: none;';
    document.getElementById('back-arrow').style = 'display: block;';
    document.getElementById('user').classList.remove('d-none');
    document.getElementById('user').style = 'margin-bottom: 29px;';
    document.getElementById('pw-recovery').style.display = 'none';
    document.getElementById('login-btn').innerHTML = 'Sign up';
    document.getElementById('login-btn').style = 'margin-top: 85px; margin-left: 120px; transition: none;';
    document.getElementById('guest-btn').classList.add('d-none');
}


function backToLogin() {
    document.getElementById('login-headline').innerHTML = 'Log in';
    document.getElementById('sign-up').style = 'display: flex; animation: none; opacity: 1;';
    document.getElementById('back-arrow').style = 'display: none;';
    document.getElementById('user').classList.add('d-none');
    document.getElementById('pw-recovery').style.display = 'flex';
    document.getElementById('login-btn').innerHTML = 'Log in';
    document.getElementById('login-btn').style = 'margin-top: 0; margin-left: 0; transition: none;';
    document.getElementById('guest-btn').classList.remove('d-none');
}