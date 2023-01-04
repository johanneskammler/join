var mouseDown = 0;
function clicked() {
  ++mouseDown;
  console.log(mouseDown);
  checkClick();
}
document.getElementById("card").onmousedown = function () {
  clicked();
};
document.getElementById("demo").onmousedown = function () {
  mouseDown();
};

document.onmouseup = function () {
  mouseDown = 0;
  console.log(mouseDown);
};

function checkClick() {
  setTimeout(checkpopup, 150);
  setTimeout(checkTime, 1200);
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
