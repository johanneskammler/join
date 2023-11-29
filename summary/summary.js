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
board = "summary.html";

async function init() {
  await includeHTML();
  renderCurrentDate();
  await greetUser();
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
    document.getElementById("greet-at-time").innerHTML = "Good morning ";
  } else if (currentTime < 17) {
    document.getElementById("greet-at-time").innerHTML = "Good afternoon ";
  } else {
    document.getElementById("greet-at-time").innerHTML = "Good evening ";
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
