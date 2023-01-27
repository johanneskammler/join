setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");
/*gruppe-417.developerakademie.net/join/smallest_backend_ever*/
let startposition;
let todosMap = new Map();
todosMap.set("NaN", { value: "none" });
let progressesMap = new Map();
progressesMap.set("NaN", { value: "none" });
let feedbacksMap = new Map();
feedbacksMap.set("NaN", { value: "none" });
let donesMap = new Map();
donesMap.set("NaN", { value: "none" });
let mapsList = ["todosMap", "progressesMap", "feedbacksMap", "donesMap"];

let comeFrom;
let comeTo;

let progresses = [];
let feedbacks = [];
let dones = [];
let contacts = [];

let todo = "todo";
let feedback = "feedback";
let progress = "progress";
let done = "done";
let idCounter = 0; // Später im Server speichern da sonst wieder von 0 anfängt !!!
/**
 * This function Initialized some functions that need to run with onload of the body
 *
 */

function checkMaps(place) {
  console.log(place);
}

async function init() {
  await includeHTML();
  await downloadFromServer();
  checkSize();

  generateCards();
  draggableTrue();
  setTimeout(activateDragAndDrop, 300); /* setCards(); */
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
  document.getElementById("popup_title").classList.remove("card-content-popup");
  document.getElementById("card_content").classList.remove("set-content");

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
    sidebarTabled();
    draggableFalse();
  } else if (size > 1024) {
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

async function getFirstLetter(contacts, idCounter) {
  let namesSplit = new Map();
  let nameList = [];
  let letterList = [];
  let colorList = [];

  let url = "../contacts.json";
  let response = await fetch(url);
  let contactsJson = await response.json();
  let namesList = [];
  for (let i = 0; i < contactsJson.length; i++) {
    namesList.push(contactsJson[i]["name"]);
  }

  for (let i = 0; i < contacts.length; i++) {
    if (namesList.indexOf(`${contacts[i]}`) >= 0) {
      const element = contacts[i];
      let index = namesList.indexOf(`${contacts[i]}`);
      let name = element.split(" ");
      let justName = `${name[0]} ${name[1]}`;
      let nameColor = contactsJson[index]["color"];
      let firstLetter = name[0].split("");
      let secondLetter = name[1].split("");
      let firstLetters = firstLetter[0] + secondLetter[0];

      nameList.push(justName);
      letterList.push(firstLetters);
      colorList.push(nameColor);
    }
  }
  namesSplit.set(`${idCounter}`, {
    contacts: `${nameList}`,
    letters: `${letterList}`,
    color: `${colorList}`,
  });
  return namesSplit;
}

async function setCards(section) {
  let tasks = (await JSON.parse(backend.getItem("tasks"))) || [];

  for (let i = 0; i < tasks.length; i++) {
    let contacts = tasks[idCounter]["contacts"];
    let namesSplit = await getFirstLetter(contacts, idCounter);
    let idSection = "`${diCounter}`+ section";
    key = tasks[i];
    todosMap.set(`${idCounter}`, {
      category: `${key["category"]}`,
      categorycolor: `${key["category-color"]}`,
      contacts: `${key["contacts"]}`,
      colors: `${namesSplit.get(`${idCounter}`)["color"]}`,
      letters: `${namesSplit.get(`${idCounter}`)["letters"]}`,
      date: `${key["date"]}`,
      description: `${key["decription"]}`,
      importance: `${key["importance"]}`,
      subtask: `${key["subtasks"]}`,
      subtaskStatus: "0",
      title: `${key["title"]}`,
    });

    // saveMaps();
    /* backend.deleteItem("tasks"); */

    cardContent(section, idCounter);
    renderContacts(idCounter);
    idCounter++;
  }
}

function cardContent(section, id) {
  document.getElementById(`${section}-board`).innerHTML += setCardHTML(
    todosMap.get(`${id}`)["category"],
    todosMap.get(`${id}`)["color"],
    todosMap.get(`${id}`)["title"],
    todosMap.get(`${id}`)["description"],
    todosMap.get(`${id}`)["totalSubtasks"],
    todosMap.get(`${id}`)["progressStatus"]
  );
}

function checkSubtasks(subtasks, idCounter) {
  if (subtasks.length == 0) {
    document.getElementById(`progress_box${idCounter}`).classList.add("d-none");
  }
}

function renderContacts(id) {
  let colors = todosMap.get(`${id}`)["colors"].split(",");
  let letters = todosMap.get(`${id}`)["letters"].split(",");
  for (let i = 0; i < colors.length; i++) {
    const element = colors[i];

    document.getElementById(
      `contacts_card${idCounter}`
    ).innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
  }
}

function generateCards() {
  setCards(todo);
  /*   setCards(progress);
  setCards(feedback);
  setCards(done); */
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

    <div class="card-content-popup" id="card_content">
      <p class="popup-text font" id="popup_description">
        ${description}
      </p>
      
      <div class="date-box-popup" id="date_box">
        <p class="due-date" >Due date:</p>
        <p id="date">16-01-2023</p>
      </div>
      
      <div class="priority-box" id="edit_priority">
        <p class="priority">Priority:</p>
        <p id="priority"></p>
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
      
      <div class="edit-box" id="edit_box">
        <img src="img-board/edit-button.png" class="pointer" onclick="edit(${id})">
      </div>
    </div>`;
  checkSubtasksPopup(subtask, id);
  renderPopupContacts(colors, contactsSplit, letters);
  setTimeout(setPriority, 50, todosMap.get(`${id}`)["importance"]);
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

  let colors = todosMap.get(`${id}`)["colors"].split(",");
  let contactsSplit = todosMap.get(`${id}`)["contacts"].split(",");
  let letters = todosMap.get(`${id}`)["letters"].split(",");

  category = todosMap.get(`${id}`)["category"];
  color = todosMap.get(`${id}`)["color"];
  title = todosMap.get(`${id}`)["title"];
  description = todosMap.get(`${id}`)["description"];
  subtask = todosMap.get(`${id}`)["subtasks"];
  progressStatus = todosMap.get(`${id}`)["progressStatus"];

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
  let currentCard = todosMap.get(`${id}`);
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
  document.getElementById("popup_title").classList.add("set-title");
  document.getElementById("card_content").classList.add("set-content");
  document.getElementById("popup_description").innerHTML =
    descriptionHTML(description);

  document.getElementById("date_box").innerHTML = dateHTML();
  document.getElementById("edit_priority").classList.add("correctPrio");
  document.getElementById("edit_priority").innerHTML = priorityHTML();
  document.getElementById("edit-assigned").innerHTML += assignedHTML();
  document.getElementById("contact").classList.add("flex-contact");
  document.getElementById(
    "edit_box"
  ).innerHTML += `<div class="ok"><p class="ok-text">Done</p></div>`;
  document.getElementById;
}

function setPriority(priority) {
  if (priority === "urgent") {
    setCardUrgent();
  } else if (priority === "medium") {
    priority.innerHTML = buttonMEDIUM();
  } else {
    priority.innerHTML = buttonLOW();
  }
}

function setCardUrgent() {
  priority.innerHTML = buttonURGENT();
}

function setImportanceCard(importance) {}

function checkCards() {
  searchCards();
}

function searchCards() {
  let start = comeFrom.id.split("-")[0];
  let end = comeTo.childNodes[1].id.split("-")[0];
  let id = draggedItem.id.slice(-1);
  setMapsPosition(start, end, id);
}

function setMapsPosition(start, end, id) {
  if (start === "todo" && end === "progress") {
    progressesMap.set(id, todosMap.get(id));
    todosMap.delete(id);
  } else if (start === "todo" && end === "feedback") {
    feedbacksMap.set(id, todosMap.get(id));
    todosMap.delete(id);
  } else if (start === "todo" && end === "done") {
    donesMap.set(id, todosMap.get(id));
    todosMap.delete(id);
  }
}

async function saveMaps() {
  /*  backend.setItem("todosMap", JSON.stringify(todosMap)); */
  backend.setItem("progressesMap", JSON.stringify(progressesMap));
  backend.setItem("feedbacksMap", JSON.stringify(feedbacksMap));
  backend.setItem("donesMap", JSON.stringify(donesMap));
  /*   backend.setItem("idCounter", JSON.stringify(idCounter)); */
}

async function getMaps() {
  /*  todosMap = JSON.parse(backend.getItem("todosMap")) || []; */
  progressesMap = JSON.parse(backend.getItem("progressesMap")) || [];
  feedsbackMap = JSON.parse(backend.getItem("feedbacksMap")) || [];
  donesMap = JSON.parse(backend.getItem("donesMap")) || [];
  /*   idCounter = JSON.parse(backend.getItem("idCounter")) || []; */
}
