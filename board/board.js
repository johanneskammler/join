let responsAsJson;
let cardsMap = new Map();
let todos = [];
let todosMap = new Map();
let progresses = [];
let pogressMap = new Map();
let feedbackes = [];
let feedbacksMap = new Map();
let dones = [];
let donesMap = new Map();
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

/*  
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
  let response = await fetch(path);
  responsAsJson = await response.json();
}

function getFirstLetter(contacts) {
  let letters = [];
  let firstLetters;
  const contactInMap = new Map();

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let name = element.split(" ");
    let justName = `${name[0]}, ${name[1]}`;
    let nameColor = name[2];
    let firstLetter = name[0].split("");
    let secondLetter = name[1].split("");
    firstLetters = firstLetter[0] + secondLetter[0];

    contactInMap.set(`${justName}`, {
      letters: firstLetters,
      color: nameColor,
    });
  }
  return contactInMap;
}

/**
 * check how the lenght is from responsAsJson['todo']
 * <div onmousedown="return false" draggable="true" class="card" id="card${object}" onclick="popup(${object})">
 */
function setCards(section) {
  let object = Object.keys(responsAsJson[section]).length;
  for (let i = 0; i < object; i++) {
    const element = responsAsJson[section][i];
    let subtasks = element["subtask-title"];
    let totalSubtasks = subtasks.length;
    cardsMap.set(`${idCounter}`, {
      category: `${element["category"]}`,
      color: `${element["color"]}`,
      title: `${element["title"]}`,
      description: `${element["description"]}`,
      subtasks: `${element["subtask-title"]}`,
      progressStatus: `${element["progress-status"]}`,
      contacts: `${element["contacts"]}`,
      totalSubtasks: `${totalSubtasks}`,
    });
    let contacts = element["contacts"];

    let letters = getFirstLetter(contacts);
    // for (const [key, value] of cardsMap) {
    document.getElementById(`${section}-board`).innerHTML += setCardHTML(
      cardsMap.get(`${idCounter}`)["category"],
      cardsMap.get(`${idCounter}`)["color"],
      cardsMap.get(`${idCounter}`)["title"],
      cardsMap.get(`${idCounter}`)["description"],
      cardsMap.get(`${idCounter}`)["totalSubtasks"],
      cardsMap.get(`${idCounter}`)["progressStatus"]
    );
    cardsMap.get(`${idCounter}`)["subtasks"];
    checkSubtasks(cardsMap.get(`${idCounter}`)["subtasks"], idCounter);

    renderContacts(letters, idCounter);
    idCounter++;
    // }
  }
}

function checkSubtasks(subtasks, idCounter) {
  if (subtasks.length == 0) {
    document.getElementById(`progress_box${idCounter}`).classList.add("d-none");
  }
}

function renderContacts(letters, idCounter) {
  for (const [key, value] of letters) {
    document.getElementById(
      `contacts_card${idCounter}`
    ).innerHTML += `<p class="invate font">${value["letters"]}</p>`;
  }
}

function generateCards() {
  setCards(todo);
  setCards(progress);
  setCards(feedback);
  setCards(done);
}

function renderPopup(
  category,
  color,
  title,
  description,
  subtask,
  progressStatus,
  contact,
  id
) {
  document.getElementById("popup_card").innerHTML = `
    <div class="card-head">
                <div class="card-head">
                        <div class="category-overlay" id="c-color${idCounter}" style="background-color: ${color}">
                          <p id="c_overlay${idCounter}">${category}</p>
                        </div>
                      </div>
            </div>
            <div class="popup-card-title">
                <h1 class="popup-title font" id="popup_title">${title}</h1>
            </div>
            <div class="card-content-popup">
                <p class="popup-text font" id="popup_description">
                    ${description}
                </p>
                <div class="date-box-popup">
                  <p class="due-date" >Due date:</p>
                    <p id="date">16-01-2023</p>
                </div>
                <div class="priority-box">
                    <p class="priority">Priority:</p>
                    <p id="priority"> urgent</p>
                </div>
                <div class="assigned">
                    <p class="assigned-to">Assigned To:</p>
                    <div id="assigned_contacts">
                        <div id="contact">
                      
                        </div>
                    </div>
                </div>
                <div class="edit-box">
                    <img src="img-board/edit-button.png" class="pointer ">
                </div>
            </div>`;
  renderPopupContacts(contact, id);
}

function renderPopupContacts(contact, id) {
  document.getElementById(`assigned_contacts`).innerHTML = `${contact}`;
}

function generatePopup(id) {
  let category = document.getElementById(`c_overlay${id}`).innerHTML;
  let color = document.getElementById(`c-color${id}`).style.backgroundColor;
  let title = document.getElementById(`title${id}`).innerHTML;
  let description = document.getElementById(`description${id}`).innerHTML;
  let subtask = document.getElementById(`pogress${id}`);
  let progressStatus = document.getElementById;
  let contact = document.getElementById(`contacts_card${id}`).innerHTML;

  renderPopup(
    category,
    color,
    title,
    description,
    subtask,
    progressStatus,
    contact,
    id
  );
}
