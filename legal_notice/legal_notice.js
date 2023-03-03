async function init() {
  await includeHTML();
  checkSize();
}


function hoverLegalNoticeHtml() {
  document
    .getElementById("legal-notice-html")
    .classList.add("legal_notice_html");
}


function goBackToLastPage() {
  window.history.back();
}


function hoverNoticeHtml() {
  document
    .getElementById("notice_bg")
    .classList.add("section-background-normal");
  document.getElementById("notice_bg").classList.remove("section-background");
}


function hoverNoticeRespons() {
  document
    .getElementById("notice_bg")
    .classList.remove("section-background-normal");
  document.getElementById("notice_bg").classList.add("section-background");
}


function checkSize() {
  let size = window.innerWidth;
  console.log(size);
  if (size <= 1024) {
    console.log("smaller than 1024");
    sidebarTabled();
  } else if (size > 1024) {
    console.log("bigger than 1024");

    sidebarDesktop();
    hoverNoticeHtml();
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


function draggableFalse() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.setAttribute("draggable", false);
  }
}


function draggableTrue() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.setAttribute("draggable", true);
    card.onmousedown = "";
  }
}