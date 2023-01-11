async function init() {
    await includeHTML();
}


function goBackToLastPage() {
    window.history.back();
}


function openHelpSection() {
    document.getElementById('help-section-btn').classList.add('d-none');
    window.location = "../help/help.html";
}