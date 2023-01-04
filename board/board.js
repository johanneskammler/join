function init() {}

function popup() {
  let background = document.getElementById("popup");
  let card = document.getElementById("popup_card");

  background.classList.toggle("d-none");
  card.classList.toggle("d-none");
}

var mouseDown = 0;
function clicked() {
  document.getElementById("card").onmousedown = function () {
    ++mouseDown;
    console.log(mouseDown);
    checkClick();
  };
}
document.onmouseup = function () {
  mouseDown = 0;
  console.log(mouseDown);
};

function checkClick() {
  setTimeout(checkTime, 1200);
}

function checkTime() {
  if (mouseDown == 1) {
    console.log("popup");
  }
}
