async function init() {
  await includeHTML();
  checkSize();
}


function hoverPrivacyHtml() {
  document
    .getElementById("privacy-html")
    .classList.add("section-background-normal");
}


function goBackToLastPage() {
  window.history.back();
}


function checkSize() {
  let size = window.innerWidth;
  if (size <= 1024) {
    sidebarTabled();
  } else if (size > 1024) {
    sidebarDesktop();
    hoverPrivacyHtml();
  }
}


function sidebarTabled() {
  document.getElementById("sidebar").classList.remove("sidebar");
  document.getElementById("sidebar").classList.add("tablet-sidebar");
}


function sidebarDesktop() {
  document.getElementById("sidebar").classList.add("sidebar");
  document.getElementById("sidebar").classList.remove("tablet-sidebar");
}