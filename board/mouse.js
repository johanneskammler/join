let card = document.getElementById("card");
let mouseDown = 0;

card.onmousedown = function () {
  ++mouseDown;
  console.log(mouseDown);
  checkClick();
};
card.onmouseup = function () {
  mouseDown = 0;
  console.log(mouseDown);
  setRotation();
  card.onmousemove = null;
};

function checkClick() {
  checkMouseMove();
  setTimeout(checkpopup, 150);
  setTimeout(checkTime, 800);
}

function checkTime() {
  if (mouseDown == 1) {
    console.log("Animation");
    setRotation();
  }
}

function checkpopup() {
  if (mouseDown == 0) {
    popup();
  }
}

function checkMouseMove() {
  card.onmousemove = function () {
    console.log("Animation");
  };
}
function setRotation() {
  card.classList.toggle("rotate-90-cw");
}
