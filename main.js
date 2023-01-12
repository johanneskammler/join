function checkMainSize() {
  let size = window.innerWidth;
  console.log(size);
  if (size < 1024) {
    sidebarMainTabled();
  } else if (size > 1024) {
    enableMainSidebar();
  }
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
