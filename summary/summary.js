let task_cards = [];
let ShowCurrentUserNameForSummery = [];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const d = new Date();
setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");
board = "summary.html";

async function init() {
  await includeHTML();
  await downloadFromServer();
  loadAtStart();
  checkSize();
  await getMaps();
  renderCurrentDate();
  task_cards = JSON.parse(backend.getItem("tasks")) || [];
  setTimeout(renderAmountToTasks, 150);
  await greetUser();

  function loadAtStart() {
    let nameTest = JSON.parse(backend.getItem("currentUser")) || [];
    if (nameTest.length < 2) {
      ShowCurrentUserNameForSummery = "Guest user";
    } else {
      ShowCurrentUserNameForSummery = nameTest;
    }
  }
}

function checkSize() {
  let size = window.innerWidth;
  setTimeout(toggleArrows, 50);

  if (size <= 1024) {
    sidebarTabled();
    hoverSummaryRespons();
  } else if (size > 1024) {
    sidebarDesktop();
    hoverSummaryHtml();
  }
}

function sidebarTabled() {
  let sidebar = document.getElementById("sidebar");
  if (sidebar == null) {
    return;
  }

  sidebar.classList.remove("sidebar");
  sidebar.classList.add("tablet-sidebar");
}

function sidebarDesktop() {
  let sidebar = document.getElementById("sidebar");
  if (sidebar == null) {
    return;
  }

  sidebar.classList.add("sidebar");
  sidebar.classList.remove("tablet-sidebar");
}

function hoverSummaryHtml() {
  document
    .getElementById("summary-html")
    .classList.add("section-background-normal");
  document.getElementById("summary_bg").classList.remove("section-background");
}

function hoverSummaryRespons() {
  document
    .getElementById("board_bg")
    .classList.remove("section-background-normal");
  document.getElementById("summary_bg").classList.add("section-background");
}

async function greetUser() {
  let currentTime = new Date().getHours();
  let name = ShowCurrentUserNameForSummery["userName"];
  if (currentTime < 12) {
    document.getElementById("greet-at-time").innerHTML = "Good morning, ";
  } else if (currentTime < 17) {
    document.getElementById("greet-at-time").innerHTML = "Good afternoon, ";
  } else {
    document.getElementById("greet-at-time").innerHTML = "Good evening, ";
  }
  if (name == undefined) {
    document.getElementById("greet-user").innerHTML =
      ShowCurrentUserNameForSummery;
  } else {
    document.getElementById("greet-user").innerHTML =
      ShowCurrentUserNameForSummery["userName"];
  }
}

function renderCurrentDate() {
  let currentYear = new Date().getFullYear().toString();
  let currentDay = new Date().getDate().toString();
  let currentMonth = month[d.getMonth()];
  document.getElementById(
    "urgent-date"
  ).innerHTML = `${currentMonth} ${currentDay}, ${currentYear}`;
}

async function renderAmountToTasks() {
  let urgentCounter = (await backend.getItem("urgentCounter")) || 0;
  document.getElementById("task-id-").innerHTML = urgentCounter;
  document.getElementById("task-to-do-id-").innerHTML = todosMap.size - 1;
  document.getElementById("task-in-board-id-").innerHTML =
    todosMap.size + progressesMap.size + feedbacksMap.size + donesMap.size - 4;
  document.getElementById("task-in-progress-id-").innerHTML =
    progressesMap.size - 1;
  document.getElementById("task-awaiting-feedback-id-").innerHTML =
    feedbacksMap.size - 1;
  document.getElementById("task-done-id-").innerHTML = donesMap.size - 1;
}

function goToBoard() {
  window.location = "../board/board.html";
}
