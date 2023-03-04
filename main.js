function checkMainSize() {
  let size = window.innerWidth;
  if (size < 1024) {
    sidebarMainTabled();
    hoverSummaryRespons();
  } else if (size > 1024) {
    enableMainSidebar();
    hoverSummaryHtml();
  }
}


function hoverSummaryHtml() {
  document
    .getElementById("summary-html")
    .classList.add("section-background-normal");
  document.getElementById("summary_bg").classList.remove("section-background");
}


function hoverSummaryRespons() {
  document
    .getElementById("summary_bg")
    .classList.remove("section-background-normal");
  document.getElementById("summary_bg").classList.add("section-background");
}


function sidebarMainTabled() {
  document.getElementById("sidebar").classList.remove("sidebar");
  document.getElementById("sidebar").classList.add("tablet-sidebar");
  document.getElementById("help-section-btn").classList.add("d-none");
  document.getElementById("header-name").classList.add("d-none");
}


function enableMainSidebar() {
  document.getElementById("sidebar").classList.add("sidebar");
  document.getElementById("sidebar").classList.remove("tablet-sidebar");
  document.getElementById("help-section-btn").classList.remove("d-none");
  document.getElementById("header-name").classList.remove("d-none");
}