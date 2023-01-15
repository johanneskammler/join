let responsAsJson;
let todos = [];
let progresses = [];
let feedbackes = [];
let dones = [];
let todo = "todo";
let feedback = "feedback";
let progress = "progress";
let done = "done";
let idCounter = 0; // Später im Server speichern da sonst wieder von 0 anfängt !!!
/**
 * This function Initialized some functions that need to run with onload of the body
 *
 */
async function init() {
  await includeHTML();
  checkSize();
  await getCardInfo();
  generateCards();
  activateDragAndDrop();
  draggableTrue();
}

/**
 * Remove the display none from the div's and show the popup
 * scroll to the top for good view (Layout)
 * block scolling while view on popup
 */
function popup(id) {
  generatePopup(id);
  let background = document.getElementById("popup");
  let card = document.getElementById("popup_card");
  let list = document.getElementsByTagName("html");
  let html = list[0];

  window.scrollTo(0, 0);
  html.classList.toggle("hide-overflow-y");
  card.classList.toggle("d-none");
  background.classList.toggle("d-none");
}

function generatePopup(id) {
  let category = document.getElementById(`c_text${idCounter}`);
  let color = document.getElementsByClassName;
}
// Setze die  generatePopup do das es die ganze Daten hat !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<<<<<<

/*   const element = responsAsJson[section][i];
    let category = element["category"];
    let color = element["color"];
    let title = element["title"];
    let description = element["description"];
    let progress = element["progress"];
    let progressStatus = element["progress-status"];
    let contacts = element["contacts"];

    let letters = getFirstLetter(contacts); */

/**
 * check size by onload and on resize window too and start the function
 * to set the sidebar and deactivate the dragAndDrop
 */
function checkSize() {
  let size = window.innerWidth;
  console.log(size);
  if (size <= 1024) {
    console.log("smaller than 1024");
    sidebarTabled();
    draggableFalse();
  } else if (size > 1024) {
    console.log("bigger than 1024");
    draggableTrue();
    sidebarDesktop();
  }
}

/**
 * set The Sidebar to the Bottom
 */
function sidebarTabled() {
  document.getElementById("sidebar").classList.remove("sidebar");
  document.getElementById("sidebar").classList.add("tablet-sidebar");
}

/**
 * set the sidebar to the left
 */
function sidebarDesktop() {
  document.getElementById("sidebar").classList.add("sidebar");
  document.getElementById("sidebar").classList.remove("tablet-sidebar");
}

/**
 * disable the dragAndDrop function
 */
function draggableFalse() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.setAttribute("draggable", false);
  }
}

/**
 * abled the dragAndDrop
 */

function draggableTrue() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.setAttribute("draggable", true);
    card.onmousedown = "";
  }
}

function renderAddTask() {
  document.getElementById("add_task").innerHTML = renderAddTaskHTML();
}

/**
 * open addTask and remove the d-none class from the div with id add-task
 */
function openAddTask() {
  document.getElementById("add_task").classList.toggle("d-none");
  window.scrollTo(0, 0);
  let list = document.getElementsByTagName("html");
  let html = list[0];

  html.classList.toggle("hide-overflow-y");
  renderAddTask();
}
/**
 * close the addTask div and add the d-none class from the div with id add-task
 */
function closeAddTask() {
  document.getElementById("add-board").classList.remove("slide-left");
  document.getElementById("add-board").classList.add("slide-right");
  setTimeout(openAddTask, 350);
}

/**
 * get the json data
 */
async function getCardInfo() {
  let path = "../cards.json";
  let respons = await fetch(path);
  responsAsJson = await respons.json();
}

function getFirstLetter(contacts) {
  let letters = [];
  let firstLetters;

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let name = element.split(" ");
    let firstLetter = name[0].split("");
    let secondLetter = name[1].split("");
    firstLetters = firstLetter[0] + secondLetter[0];
    letters.push(firstLetters);
  }
  return letters;
}

/**
 * check how the lenght is from responsAsJson['todo']
 * <div onmousedown="return false" draggable="true" class="card" id="card${object}" onclick="popup(${object})">
 */
function setCards(section) {
  let object = Object.keys(responsAsJson[section]).length;
  for (let i = 0; i < object; i++) {
    const element = responsAsJson[section][i];
    let category = element["category"];
    let color = element["color"];
    let title = element["title"];
    let description = element["description"];
    let progress = element["progress"];
    let progressStatus = element["progress-status"];
    let contacts = element["contacts"];

    let letters = getFirstLetter(contacts);

    document.getElementById(`${section}-board`).innerHTML += setCardHTML(
      category,
      color,
      title,
      description,
      progress,
      progressStatus
    );

    renderContacts(letters, idCounter);
    idCounter++;
  }
}

function renderContacts(letters, idCounter) {
  for (let i = 0; i < letters.length; i++) {
    const firstLetters = letters[i];
    document.getElementById(
      `contacts_card${idCounter}`
    ).innerHTML += `<p class="invate font">${firstLetters}</p>`;
  }
}

function generateCards() {
  setCards(todo);
  setCards(progress);
  setCards(feedback);
  setCards(done);
}
