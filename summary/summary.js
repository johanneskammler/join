let task_cards = [];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
setURL("https://gruppe-417.developerakademie.net/smallest_backend_ever");
board = "summary.html"


async function init() {
  await includeHTML();
  checkMainSize();
  renderCurrentDate();
  renderAmountToTasks();
  await downloadFromServer();
  task_cards = JSON.parse(backend.getItem('tasks')) || [];
  await greetUser();
  /*
  setTimeout(() => {
    markSummaryNav();
  }, 250); */
}


async function greetUser() {
  let currentTime = new Date().getHours();
  if (currentTime < 12) {
    document.getElementById("greet-at-time").innerHTML = "Good morning, ";
  } else {
    document.getElementById("greet-at-time").innerHTML = "Good evening, ";
  }
  /* document.getElementById("greet-user").innerHTML = getCurrentUserName(); */
}


function syncSummaryTasks(state) {
  let states = task_cards.filter((a) => a.state === state)
  let amountState = states.length;
  return amountState
}


function syncSummaryUrgent() {
  let urgent = task_cards.filter((a) => a.priority[0] === "urgent")
  let amountUrgent = urgent.length;
  return amountUrgent
}


function renderCurrentDate() {
  let currentYear = new Date().getFullYear().toString();
  let currentDay = new Date().getDate().toString();
  let currentMonth = month[d.getMonth()];
  document.getElementById('urgent-date').innerHTML = `${currentMonth} ${currentDay}, ${currentYear}`;
}


function renderAmountToTasks() {
  getDoc('task-to-do-id-').innerHTML = syncSummaryTasks("to_do");
  getDoc('task-in-board-id-').innerHTML = task_cards.length;
  getDoc('task-in-progress-id-').innerHTML = syncSummaryTasks("in_progress");
  getDoc('task-awaiting-feedback-id-').innerHTML = syncSummaryTasks("await_feedback");
  getDoc('task-done-id-').innerHTML = syncSummaryTasks("done");
  getDoc("task-id-").innerHTML = syncSummaryUrgent();
}


/*
function markSummaryNav(){
  document.getElementById("summary-html").classList.add("bgNavBlue");
  document.getElementById("mob-summary-html").classList.add("bgNavBlue");
}*/



/*let borderContainer = document.getElementsByClassName("task-urgent");
let borderLine = document.getElementsByClassName("border-line");

if (borderLine.style.backgroundColor === "white") {
  borderLine.style.borderLeft = "3px solid #4589ff";
} else {
  borderLine.style.borderLeft = "3px solid white";
}*/


/*let currentTime = new Date().getHours();
if (currentTime < 12) {
  document.getElementById('greeting').innerHTML = 'Guten Morgen';
} else if (currentTime < 18) {
  document.getElementById('greeting').innerHTML = 'Guten Mittag';
} else {
  document.getElementById('greeting').innerHTML = 'Guten Abend';
}*/

function goToBoard() {
  window.location = "../board/board.html";
}