function init() {}

function popup() {
  let background = document.getElementById("popup");
  let card = document.getElementById("popup_card");

  background.classList.toggle("d-none");
  card.classList.toggle("d-none");
}

function checkSize() {
  let size = window.innerWidth;
  console.log(size);
  if (size < 1280) {
    document.getElementById("card").setAttribute("draggable", false);
  } else if (size > 1280) {
    document.getElementById("card").setAttribute("draggable", true);
  }
}
