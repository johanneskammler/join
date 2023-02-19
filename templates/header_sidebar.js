function openLogoutOption() {
    if (window.innerWidth > 1024) {
        document.getElementById("logout-box-resp").classList.toggle("d-none");
    } else {
        document.getElementById("logout-box").classList.toggle("d-none");
    }
}


function logoutFromJoin() {
    window.location = "../login/index.html";
}


function backToHome() {
    window.location = "../summary/summary.html";
}