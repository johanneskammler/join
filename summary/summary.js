async function init() {
  await includeHTML();
  checkMainSize();
}

var today = new Date();
document.write(today.toDateString());

/*let borderContainer = document.getElementsByClassName("task-urgent");
let borderLine = document.getElementsByClassName("border-line");

if (borderLine.style.backgroundColor === "white") {
  borderLine.style.borderLeft = "3px solid #4589ff";
} else {
  borderLine.style.borderLeft = "3px solid white";
}*/


let currentTime = new Date().getHours();
if (currentTime < 12) {
  document.getElementById('greeting').innerHTML = 'Guten Morgen';
} else if (currentTime < 18) {
  document.getElementById('greeting').innerHTML = 'Guten Mittag';
} else {
  document.getElementById('greeting').innerHTML = 'Guten Abend';
}

function goToBoard() {
  window.location = "../board/board.html";
}