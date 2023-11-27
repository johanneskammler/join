function openLogoutOption() {
    if (window.innerWidth > 1024) {
        document.getElementById("logout-box-resp").classList.toggle("d-none");
        document.getElementById("close-logout").classList.toggle("d-none");
    } else {
        document.getElementById("logout-box").classList.toggle("d-none");
        document.getElementById("close-logout").classList.toggle("d-none");
    }
}


function closeLogoutDiv() {
    document.getElementById("logout-box-resp").classList.add("d-none");
    document.getElementById("logout-box").classList.add("d-none");
    document.getElementById("close-logout").classList.add("d-none");
}


function logoutFromJoin() {
    window.location = "../index.html";
}


function backToHome() {
    window.location = "../summary/summary.html";
}

function openHelpSection() {
    window.location = "../help/help.html";
}