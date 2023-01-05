let card = document.getElementById("card");
let mouseDown = 0;

card.onmousedown = function () {
  ++mouseDown;
  console.log(mouseDown);
  checkClick();
};
card.onmouseup = function () {
  mouseDown = 0;
  card.onmousemove = null;
  console.log(mouseDown);
};

function checkClick() {
  setTimeout(checkpopup, 200);
  setTimeout(checkTime, 1000);
}

function checkTime() {
  if (mouseDown == 1) {
    console.log("Animation");
  }
}

function checkpopup() {
  if (mouseDown == 0) {
    popup();
  }
}

function setRotation() {
  card.classList.toggle("rotate-90-cw");
}
