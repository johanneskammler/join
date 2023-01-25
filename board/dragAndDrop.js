async function activateDragAndDrop() {
  let card = document.getElementsByClassName("card");
  let choice = document.getElementsByClassName("choice");
  let todos = [];
  let progresses = [];
  let feedbacks = [];
  let dones = [];

  for (let i of card) {
    i.addEventListener("dragstart", dragStart);
    i.addEventListener("dragend", dragEnd);
  }

  for (j of choice) {
    j.addEventListener("dragover", dragOver);
    j.addEventListener("dragenter", dragEnter);
    j.addEventListener("dragleave", dragLeave);
    j.addEventListener("drop", Drop);
  }
}
let dragItem = null;

function dragStart() {
  if (window.innerWidth < 1024) {
    return;
  }
  dragItem = this;

  setTimeout(() => (this.style.display = "none"), 0);
}

function dragEnd() {
  if (window.innerWidth < 1024) {
    return;
  }
  checkCards();
  setTimeout(() => (this.style.display = "block"), 0);

  dragItem = null;
}

function Drop() {
  if (window.innerWidth < 1024) {
    return;
  }
  this.append(dragItem);
  this.classList.remove("hover");
  /*   setTimeout(ScrollbarExist, 250); */
}

function dragOver(e) {
  if (window.innerWidth < 1024) {
    return;
  }
  this.classList.add("hover");
  e.preventDefault();
}

function dragEnter(e) {
  if (window.innerWidth < 1024) {
    return;
  }
  e.preventDefault();
}

function dragLeave() {
  if (window.innerWidth < 1024) {
    return;
  }
  this.classList.remove("hover");
}

function setRotation() {
  if (window.innerWidth < 1024) {
    return;
  }
  document.getElementById("card").classList.toggle("rotate-90-cw");
}
