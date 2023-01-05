var mouseDown = 0;
document.getElementById("card").onmousedown = function () {
  ++mouseDown;
  console.log(mouseDown);
  checkClick();
};
document.getElementById("card").onmouseup = function () {
  mouseDown = 0;
  console.log(mouseDown);
  document.getElementById("card").onmousemove = null;
};

function checkClick() {
  checkMouseMove();
  setTimeout(checkpopup, 150);
  setTimeout(checkTime, 800);
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

function checkMouseMove() {
  document.getElementById("card").onmousemove = function () {
    console.log("Animation");
  };
}
