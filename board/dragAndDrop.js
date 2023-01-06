let card = document.getElementsByClassName("card");
let choice = document.getElementsByClassName("choice");
let dragItem = null;

for (let i of card) {
  i.addEventListener("dragstart", dragStart);
  i.addEventListener("dragend", dragEnd);
}

function dragStart() {
  dragItem = this;

  setTimeout(() => (this.style.display = "none"), 0);
}

function dragEnd() {
  setTimeout(() => (this.style.display = "block"), 0);

  dragItem = null;
}

for (j of choice) {
  j.addEventListener("dragover", dragOver);
  j.addEventListener("dragenter", dragEnter);
  j.addEventListener("dragleave", dragLeave);
  j.addEventListener("drop", Drop);
}

function Drop() {
  this.append(dragItem);
  this.classList.remove("hover");
}

function dragOver(e) {
  this.classList.add("hover");
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove("hover");
}

function setRotation() {
  document.getElementById("card").classList.toggle("rotate-90-cw");
}
