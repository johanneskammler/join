setURL("https://gruppe-417.developerakademie.net/smallest_backend_ever");

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
  await downloadFromServer();
}

function openPopup(id) {
  generatePopup(id);
  popup();
}

/**
 * Remove the display none from the div's and show the popup
 * scroll to the top for good view (Layout)
 * block scolling while view on popup
 */
function popup(id) {
  let background = document.getElementById("popup");
  let card = document.getElementById("popup_card");
  let list = document.getElementsByTagName("html");
  let html = list[0];
  document.getElementById("edit_priority").classList.remove("correctPrio");

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

function getFirstLetter(contacts, idCounter) {
  let namesSplit = new Map();
  let nameList = [];
  let letterList = [];
  let colorList = [];

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let name = element.split(" ");
    let justName = `${name[0]} ${name[1]}`;
    let nameColor = name[2];
    let firstLetter = name[0].split("");
    let secondLetter = name[1].split("");
    let firstLetters = firstLetter[0] + secondLetter[0];

    nameList.push(justName);
    letterList.push(firstLetters);
    colorList.push(nameColor);
  }
  namesSplit.set(`${idCounter}`, {
    contacts: `${nameList}`,
    letters: `${letterList}`,
    color: `${colorList}`,
  });
  return namesSplit;
}

/**
 * check how the lenght is from responsAsJson['todo']
 * <div onmousedown="return false" draggable="true" class="card" id="card${object}" onclick="popup(${object})">
 */
function setCards(section) {
  let object = Object.keys(responsAsJson[section]).length;
  for (let i = 0; i < object; i++) {
    const element = responsAsJson[section][i]; //
    let contacts = element["contacts"];
    let namesSplit = getFirstLetter(contacts, idCounter);
    // die Funktion getFirstLetter gib ein Objekt zurück, verpacken in ein array und in map. einpflegen !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! <-------
    let subtasks = element["subtask-title"];
    let totalSubtasks = subtasks.length;

    cardsMap.set(`${idCounter}`, {
      category: `${element["category"]}`,
      color: `${element["color"]}`,
      title: `${element["title"]}`,
      description: `${element["description"]}`,
      subtasks: `${element["subtask-title"]}`,
      progressStatus: `${element["progress-status"]}`,
      contacts: `${namesSplit.get(`${idCounter}`)["contacts"]}`,
      letters: `${namesSplit.get(`${idCounter}`)["letters"]}`,
      colors: `${namesSplit.get(`${idCounter}`)["color"]}`,
      totalSubtasks: `${totalSubtasks}`,
    });

    let colors = cardsMap.get(`${idCounter}`)["colors"].split(",");
    let letters = cardsMap.get(`${idCounter}`)["letters"].split(",");

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

    renderContacts(idCounter, colors, letters);
    idCounter++;
    // }
  }
}

function checkSubtasks(subtasks, idCounter) {
  if (subtasks.length == 0) {
    document.getElementById(`progress_box${idCounter}`).classList.add("d-none");
  }
}

function renderContacts(idCounter, colors, letters) {
  for (let i = 0; i < colors.length; i++) {
    const element = colors[i];

    document.getElementById(
      `contacts_card${idCounter}`
    ).innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
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
  id,
  colors,
  contactsSplit,
  letters
) {
  document.getElementById("popup_card").innerHTML = `
    <div class="card-head relative" id="popup_head">
      <div class="category-overlay" id="c-color" style="background-color: ${color}">
        <p id="c_overlay${id}">${category}</p>
      </div>
      <div onclick="popup()" class="close-box">
      
        <img src="img-board/line.png" class="close-img">
        <img src="img-board/line.png" >
      </div>
    </div>
  
    <div class="popup-card-title">
      <h1 class="popup-title font" id="popup_title">${title}</h1>
    </div>

    <div class="card-content-popup">
      <p class="popup-text font" id="popup_description">
        ${description}
      </p>
      
      <div class="date-box-popup" id="date_box">
        <p class="due-date" >Due date:</p>
        <p id="date">16-01-2023</p>
      </div>
      
      <div class="priority-box" id="edit_priority">
        <p class="priority">Priority:</p>
        <p id="priority"> urgent</p>
      </div>
      
      <div class="progress-box-popup" id="progress_box_popup${id}">
        <div class="progess-text">
        
        <h3 class="subtask">Subtask's:</h3><p class="tasks">${subtask}</p>
        </div>
        <div class="progress-box-2">
          <div class="progressbar">
            <div class="progress" id="progress-nr0"></div>
          </div>
          <p class="done-p" id="done_status font">0/1 Done</p>
        </div>
      </div>
      
      <div class="assigned" >
        <p class="assigned-to" id="edit-assigned">Assigned To:</p>
        <div id="assigned_contacts">
          <div id="contact"></div>
        </div>
      </div>
      
      <div class="edit-box">
        <img src="img-board/edit-button.png" class="pointer" onclick="edit(${id})">
      </div>
    </div>`;
  checkSubtasksPopup(subtask, id);
  renderPopupContacts(colors, contactsSplit, letters);
}

function checkSubtasksPopup(subtask, id) {
  if (subtask === "") {
    document.getElementById(`progress_box_popup${id}`).classList.add("d-none");
  }
}

function renderPopupContacts(colors, contactsSplit, letters) {
  for (let i = 0; i < contactsSplit.length; i++) {
    const element = contactsSplit[i];
    document.getElementById(`contact`).innerHTML += `
      <div class="contactsDiv">
        <p class="invate font" style="background-color: ${colors[i]};">${letters[i]}</p>
        <p class="font fullName">${element}</p>
      </div>`;
  }
}

function generatePopup(id) {
  let category;
  let color;
  let title;
  let description;
  let subtask;
  let progressStatus;

  let colors = cardsMap.get(`${id}`)["colors"].split(",");
  let contactsSplit = cardsMap.get(`${id}`)["contacts"].split(",");
  let letters = cardsMap.get(`${id}`)["letters"].split(",");

  category = cardsMap.get(`${id}`)["category"];
  color = cardsMap.get(`${id}`)["color"];
  title = cardsMap.get(`${id}`)["title"];
  description = cardsMap.get(`${id}`)["description"];
  subtask = cardsMap.get(`${id}`)["subtasks"];
  progressStatus = cardsMap.get(`${id}`)["progressStatus"];

  renderPopup(
    category,
    color,
    title,
    description,
    subtask,
    progressStatus,
    id,
    colors,
    contactsSplit,
    letters
  );
}

function edit(id) {
  let currentCard = cardsMap.get(`${id}`);
  let title = currentCard["title"];
  let description = currentCard["description"];
  let name = document.getElementsByClassName("fullName");
  for (let i = 0; i < name.length; i++) {
    const element = name[i];
    element.classList.add("d-none");
  }

  document.getElementById(`c-color`).classList.add("d-none");
  document.getElementById(
    "popup_title"
  ).innerHTML = `<input type="text" class="popup-title-edit" id="popup_title_edit" placeholder="${title}">`;
  document.getElementById(
    "popup_description"
  ).innerHTML = `<div class="edit-title">
                  <h4>Description<h4>
                  <textarea cols="36" rows="5" charswidth="500" name="text_body"id="popup_description_edit" placeholder="${description}"></textarea>
                </div>`;
  document.getElementById("date_box").innerHTML = `
    <div class="correctDate">
      <h4 class="due-date-text">Due date</h4>
      <input type="date" placeholder="dd/mm/yyyy" id="select-date" class="select-date" required />
    </div>`;
  document.getElementById("edit_priority").classList.add("correctPrio");
  document.getElementById("edit_priority").innerHTML = `
              <div class="importance-buttons">
                <button onclick="fillImportanceButton1()" class="importance-button1" id="importance-button1"
                    type="button">
                    <span>Urgent</span>
                    <img src="../add_task/img-add_task/urgent.png" />
                </button>
                <button onclick="emptyImportanceButton1()" class="importance-button1-colored"
                    id="importance-button1-colored" style="display: none" type="button">
                    <span>Urgent</span>
                    <img src="../add_task/img-add_task/urgent_white.png" />
                </button>

                <button onclick="fillImportanceButton2()" class="importance-button2" id="importance-button2"
                    type="button">
                    <span>Medium</span>
                    <img src="../add_task/img-add_task/medium.png" />
                </button>
                <button onclick="emptyImportanceButton2()" class="importance-button2-colored"
                    id="importance-button2-colored" style="display: none" type="button">
                    <span>Medium</span>
                    <img src="../add_task/img-add_task/medium_white.png" />
                </button>

                <button onclick="fillImportanceButton3()" class="importance-button3" id="importance-button3"
                    type="button">
                    <span>Low</span>
                    <img src="../add_task/img-add_task/low.png" />
                </button>
                <button onclick="emptyImportanceButton3()" class="importance-button3-colored"
                    id="importance-button3-colored" style="display: none" type="button">
                    <span>Low</span>
                    <img src="../add_task/img-add_task/low_white.png" />
                </button>
            </div>`;
  document.getElementById("edit-assigned").innerHTML += `
              <div class="contacts-box">
                <div style="position: relative">
                    <div class="contacts-dropdown">
                        <p onclick="openContactsToSelect()" class="select-contacts">
                            Select contacts to assign
                        </p>
                        <img onclick="openContactsToSelect()" src="../add_task/img-add_task/dropdown_blue.png"
                            class="drop-down-arrow" id="contacts-drop-down-arrow" />
                        <div id="contacts-drop-down" class="contacts-dropdown-content d-none">
                            <div class="contacts-list-elem">
                                <label class="control control-checkbox">
                                    <div class="contacts-list-elem-box">
                                        <span class="rendered-contact-name">You</span>
                                        <input type="checkbox" />
                                        <div class="control-indicator"></div>
                                    </div>
                                </label>
                            </div>
                            <div class="contacts-list-elem new-contact">
                                Invite new contact
                                <img src="../add_task/img-add_task/contact_blue.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div`;
  document.getElementById("contact").classList.add("flex-contact");
}

/*       "importance"   einfügen noch in .json*/
task = JSON.parse(backend.getItem("tasks")) || [];
