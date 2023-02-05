setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");
/*gruppe-417.developerakademie.net/join/smallest_backend_ever*/
let startposition;
let todosMap = new Map();
todosMap.set("x", { value: "none" });
let progressesMap = new Map();
progressesMap.set("x", { value: "none" });
let feedbacksMap = new Map();
feedbacksMap.set("x", { value: "none" });
let donesMap = new Map();
donesMap.set("x", { value: "none" });
let mapsList = ["todosMap", "progressesMap", "feedbacksMap", "donesMap"];
let maps = [];
let mapsValue = ["description", "title"];
let comeFrom;
let comeTo;

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
  draggableTrue();
  setTimeout(activateDragAndDrop, 300); /* setCards(); */
  await getMaps();

  generateCards();
  checkIfEmpty();

  tasks = (await JSON.parse(backend.getItem("tasks"))) || [];
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
  //html.classList.toggle("hide-overflow-y");
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
  renderContactsAddTask();
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

async function setTasks() {
  let tasks = (await JSON.parse(backend.getItem("tasks"))) || [];
  let subtask;
  let currentId;

  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      loadCounter();
      if (idCounter == "leer") {
        idCounter = 0;
      }
      let contacts = tasks[i]["contacts"];
      let namesSplit = await getFirstLetter(contacts, idCounter);

      key = tasks[i];
      todosMap.set(`${idCounter}`, {
        category: key["category"],
        categorycolor: key["categorycolor"],
        contacts: key["contacts"],
        colors: namesSplit.get(`${idCounter}`)["color"],
        letters: namesSplit.get(`${idCounter}`)["letters"],
        date: key["date"],
        description: key["decription"],
        importance: key["importance"],
        subtask: key["subtasks"],
        subtaskStatus: "0",
        title: key["title"],
      });

      await saveMaps();
      await backend.deleteItem("tasks");

      /*       cardContent(section, idCounter);
      renderContacts(section, idCounter); */
      subtask = todosMap.get(`${idCounter}`)["substack"];
      currentId = idCounter;
      idCounter++;
      idCounterToJson();
    }
  }
  setCards(todo);
}

function setCards(section) {
  if (section === "todo") {
    let todo = document.getElementById("todo-board");
    todo.innerHTML = "";
    for (const [key, value] of todosMap) {
      if (!(key === "x")) {
        cardContent(section, key);
        if (todosMap.get(`${key}`)["subtask"].length === 0) {
          checkSubtasks(key, todosMap);
        }
        renderContacts(section, key);
      }
    }
  }
  if (section === "progress") {
    let progress = document.getElementById("progress-board");
    progress.innerHTML = ``;
    for (const [key, value] of progressesMap) {
      if (!(key === "x")) {
        cardContent(section, key);
        if (progressesMap.get(`${key}`)["subtask"].length === 0) {
          checkSubtasks(key, progressesMap);
        }
        renderContacts(section, key);
      }
    }
  }
  if (section === "feedback") {
    let feedback = document.getElementById("feedback-board");
    feedback.innerHTML = ``;
    for (const [key, value] of feedbacksMap) {
      if (!(key === "x")) {
        cardContent(section, key);
        if (feedbacksMap.get(`${key}`)["subtask"].length === 0) {
          checkSubtasks(key, feedbacksMap);
        }
        renderContacts(section, key);
      }
    }
  }
  if (section === "done") {
    let done = document.getElementById("done-board");
    done.innerHTML = "";
    for (const [key, value] of donesMap) {
      if (!(key === "x")) {
        cardContent(section, key);
        if (donesMap.get(`${key}`)["subtask"].length === 0) {
          checkSubtasks(key, donesMap);
        }
        renderContacts(section, key);
      }
    }
  }
}

function cardContent(section, id) {
  if (section === "todo") {
    contentTodo(section, id);
  } else if (section === "progress") {
    contentProgress(section, id);
  } else if (section === "feedback") {
    contentFeedback(section, id);
  } else if (section === "done") {
    contentDone(section, id);
  }
}

function contentDone(section, id) {
  document.getElementById(`${section}-board`).innerHTML += setCardHTML(
    donesMap.get(`${id}`)["category"],
    donesMap.get(`${id}`)["categorycolor"],
    donesMap.get(`${id}`)["title"],
    donesMap.get(`${id}`)["description"],
    donesMap.get(`${id}`)["totalSubtasks"],
    donesMap.get(`${id}`)["progressStatus"],
    id
  );
  let importance = donesMap.get(`${id}`)["importance"];
}
function setCardImportanc(id) {
  let footer = document.getElementById(`importance_footer${id}`);
  if (donesMap.get(`${id}`)["importance"] === "urgent") {
    footer.innerHTML = ` <img class="img-position" src="img-board/${importance}.png">
                        <img src="img-board/${importance}.png">`;
  }
}

function contentFeedback(section, id) {
  document.getElementById(`${section}-board`).innerHTML += setCardHTML(
    feedbacksMap.get(`${id}`)["category"],
    feedbacksMap.get(`${id}`)["categorycolor"],
    feedbacksMap.get(`${id}`)["title"],
    feedbacksMap.get(`${id}`)["description"],
    feedbacksMap.get(`${id}`)["totalSubtasks"],
    feedbacksMap.get(`${id}`)["progressStatus"],
    id
  );
}

function contentProgress(section, id) {
  document.getElementById(`${section}-board`).innerHTML += setCardHTML(
    progressesMap.get(`${id}`)["category"],
    progressesMap.get(`${id}`)["categorycolor"],
    progressesMap.get(`${id}`)["title"],
    progressesMap.get(`${id}`)["description"],
    progressesMap.get(`${id}`)["totalSubtasks"],
    progressesMap.get(`${id}`)["progressStatus"],
    id
  );
}

function contentTodo(section, id) {
  document.getElementById(`${section}-board`).innerHTML += setCardHTML(
    todosMap.get(`${id}`)["category"],
    todosMap.get(`${id}`)["categorycolor"],
    todosMap.get(`${id}`)["title"],
    todosMap.get(`${id}`)["description"],
    todosMap.get(`${id}`)["totalSubtasks"],
    todosMap.get(`${id}`)["progressStatus"],
    id
  );
}

function checkSubtasks(id, map) {
  let currentMap = new Map(map);
  let progressId = document.getElementById(`progress_box${id}`);
  if (currentMap.get(`${id}`)["subtask"]) {
    progressId.classList.add("d-none");
    addHeight(id);
  }
}

function addHeight(id) {
  let list = document.getElementById(`footer${id}`);
  list.style.height = "55px";
}

function renderContacts(section, id) {
  if (section === "todo") {
    renderContactsTodo(id);
  } else if (section === "progress") {
    renderContactsProgress(id);
  } else if (section === "feedback") {
    renderContactsFeedback(id);
  } else if (section === "done") {
    renderContactsDone(id);
  }
  /*   let colors = todosMap.get(`${id}`)["colors"].split(",");
  let letters = todosMap.get(`${id}`)["letters"].split(",");
  for (let i = 0; i < colors.length; i++) {
    const element = colors[i];

    document.getElementById(
      `contacts_card${id}`
    ).innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
  } */
}

function renderContactsDone(id) {
  let contacts = donesMap.get(`${id}`)["contacts"];
  if (contacts.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }
  let colors = donesMap.get(`${id}`)["colors"].split(",");
  let letters = donesMap.get(`${id}`)["letters"].split(",");
  for (let i = 0; i < colors.length; i++) {
    const element = colors[i];

    document.getElementById(
      `contacts_card${id}`
    ).innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
  }
}

function renderContactsFeedback(id) {
  let contacts = feedbacksMap.get(`${id}`)["contacts"];
  if (contacts.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }
  let colors = feedbacksMap.get(`${id}`)["colors"].split(",");
  let letters = feedbacksMap.get(`${id}`)["letters"].split(",");
  for (let i = 0; i < colors.length; i++) {
    const element = colors[i];

    document.getElementById(
      `contacts_card${id}`
    ).innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
  }
}

function renderContactsProgress(id) {
  let contacts = progressesMap.get(`${id}`)["contacts"];
  if (contacts.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }
  let colors = progressesMap.get(`${id}`)["colors"].split(",");
  let letters = progressesMap.get(`${id}`)["letters"].split(",");
  for (let i = 0; i < colors.length; i++) {
    const element = colors[i];

    document.getElementById(
      `contacts_card${id}`
    ).innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
  }
}

function renderContactsTodo(id) {
  let contacts = todosMap.get(`${id}`)["contacts"];
  let element;

  if (contacts.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }
  let colors = todosMap.get(`${id}`)["colors"].split(",");
  let letters = todosMap.get(`${id}`)["letters"].split(","); /// Die ifs raus nehmen wenn ohne kontackte nicht erstellbar ist
  let contactsSection = document.getElementById(`contacts_card${id}`);
  if (contacts.length > 2) {
    for (let i = 0; i < 2; i++) {
      const element = colors[i];

      contactsSection.innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
    }
    contactsSection.innerHTML += `<p class="invate font" style="background-color: ${element};">...</p>`;
  } else {
    for (let i = 0; i < colors.length; i++) {
      const element = colors[i];

      contactsSection.innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
    }
  }
}

function generateCards() {
  setTasks();

  setCards(progress);
  setCards(feedback);
  setCards(done);
  return;
}

function renderPopup(
  category,
  color,
  title,
  description,
  progressStatus,
  id,
  colors,
  contactsSplit,
  letters,
  section,
  importance
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
  
    <div class="popup-card-title" id="popup-card-title">
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
        
        <h3 class="subtask">Subtask's:</h3><p class="tasks" id="task"></p>
        </div>
        <div class="progress-box-2">
          <div class="progressbar">
            <div class="progress" id="progress-nr0"></div>
          </div>
          <p class="done-p" id="done_status font">0/1 Done</p>
        </div>
      </div>
      
      <div class="assigned" id="assigned">
        <p class="assigned-to" id="edit-assigned">Assigned To:</p>
        <div id="assigned_contacts">
          <div id="contact"></div>
        </div>
      </div>
      
      <div class="edit-box" id="edit_box">
        <img src="img-board/edit-button.png" class="pointer" onclick="edit(${id})">
      </div>
    </div>`;
  renderPopupContacts(colors, contactsSplit, letters);
  setTimeout(setPriority, 50, importance, id, section);
  checkSubtasksPopup(section, id);
  checkTitlePopup(section, id);
}

function checkSubtasksPopup(section, id) {
  let popSub = document.getElementById(`progress_box_popup${id}`);
  if (section.get(`${id}`)["subtask"] == "") {
    popSub.classList.add("d-none");
  }
}

function checkTitlePopup(section, id) {
  let titlePopup = document.getElementById("popup_title");
  if (titlePopup.innerHTML.length < 17) {
  }
}

/* function checkSubtasks(subtask, id) {
  if (subtask === "") {
    document.getElementById(`progress_box_popup${id}`).classList.add("d-none");
  }
} */

function renderPopupContacts(colors, contactsSplit, letters) {
  let contact = document.getElementById(`assigned`);
  let card = document.getElementById("popup_card");
  if (colors[0] == "" && colors.length == 1) {
    contact.classList.add("d-none");
    card.style.marginTop = "80px";
  } else {
    for (let i = 0; i < contactsSplit.length; i++) {
      const element = contactsSplit[i];
      contact.innerHTML += `
        <div class="contactsDiv">
          <p class="invate font" style="background-color: ${colors[i]};">${letters[i]}</p>
          <p class="font fullName">${element}</p>
        </div>`;
    }
  }
}

function generatePopup(id) {
  let section = new Map(wichSection(id));
  let category;
  let color;
  let title;
  let description;
  let progressStatus;
  let importance;

  let colors = section.get(`${id}`)["colors"].split(",");
  let contactsSplit = section.get(`${id}`)["contacts"];
  let letters = section.get(`${id}`)["letters"].split(",");

  category = section.get(`${id}`)["category"];
  color = section.get(`${id}`)["categorycolor"];
  title = section.get(`${id}`)["title"];
  description = section.get(`${id}`)["description"];
  subtasks = section.get(`${id}`)["subtasks"];
  progressStatus = section.get(`${id}`)["progressStatus"];
  importance = section.get(`${id}`)["importance"];

  renderPopup(
    category,
    color,
    title,
    description,
    progressStatus,
    id,
    colors,
    contactsSplit,
    letters,
    section,
    importance
  );
  renderSubtasksPopup(id, section);
}

function wichSection(id) {
  if (todosMap.has(`${id}`)) {
    return todosMap;
  } else if (progressesMap.has(`${id}`)) {
    return progressesMap;
  } else if (feedbacksMap.has(`${id}`)) {
    return feedbacksMap;
  } else if (donesMap.has(`${id}`)) {
    return donesMap;
  }
}

function renderSubtasksPopup(id, section) {
  let task = document.getElementById("task");
  task.innerHTML = `${section.get(`${id}`)["subtask"]}`;
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

function setPriority(importance, id, section) {
  /////////////////////////////////////////////////////////////////////////
  if (importance === "urgent") {
    priority.innerHTML = buttonURGENT();
  } else if (importance === "medium") {
    priority.innerHTML = buttonMEDIUM();
  } else if (importance === "low") {
    priority.innerHTML = buttonLOW();
  }
}

function buttonURGENT() {
  return `<button class="importance-popup" type="button">
            <span>Urgent</span>
            <img src="../add_task/img-add_task/urgent.png">
          </button>`;
}

function buttonMEDIUM() {
  return `<button  class="importance-popup" type="button">
            <span>Medium</span>
            <img src="../add_task/img-add_task/medium.png">
          </button>`;
}

function buttonLOW() {
  return `<button  class="importance-popup" type="button">
            <span>Low</span>
            <img src="../add_task/img-add_task/low.png">
          </button>`;
}

function checkCards() {
  let start = comeFrom.id.split("-")[0];
  let end = comeTo.childNodes[1].id.split("-")[0];
  let id = draggedItem.id.slice(-1);
  if (start === "todo") {
    setFromTodo(end, id);
  } else if (start === "progress") {
    setFromProgress(end, id);
  } else if (start === "feedback") {
    setFromFeedback(end, id);
  } else if (start === "done") {
    setFromDone(end, id);
  }
  saveMaps();
}

function setFromTodo(end, id) {
  if (end === "progress") {
    progressesMap.set(id, todosMap.get(id));
    todosMap.delete(id);
  } else if (end === "feedback") {
    feedbacksMap.set(id, todosMap.get(id));
    todosMap.delete(id);
  } else if (end === "done") {
    donesMap.set(id, todosMap.get(id));
    todosMap.delete(id);
  }
}

function setFromProgress(end, id) {
  if (end === "todo") {
    todosMap.set(id, progressesMap.get(id));
    progressesMap.delete(id);
  } else if (end === "feedback") {
    feedbacksMap.set(id, progressesMap.get(id));
    progressesMap.delete(id);
  } else if (end === "done") {
    donesMap.set(id, progressesMap.get(id));
    progressesMap.delete(id);
  }
}

function setFromFeedback(end, id) {
  if (end === "todo") {
    todosMap.set(id, feedbacksMap.get(id));
    feedbacksMap.delete(id);
  } else if (end === "progress") {
    progressesMap.set(id, feedbacksMap.get(id));
    feedbacksMap.delete(id);
  } else if (end === "done") {
    donesMap.set(id, feedbacksMap.get(id));
    feedbacksMap.delete(id);
  }
}

function setFromDone(end, id) {
  if (end === "todo") {
    todosMap.set(id, donesMap.get(id));
    donesMap.delete(id);
  } else if (end === "progress") {
    progressesMap.set(id, donesMap.get(id));
    donesMap.delete(id);
  } else if (end === "feedback") {
    feedbacksMap.set(id, donesMap.get(id));
    donesMap.delete(id);
  }
}

async function getMaps() {
  loadCounter();
  let todos = (await JSON.parse(backend.getItem("todoJson"))) || [];
  if (todos.length > 1) {
    todosMap = new Map(Object.entries(JSON.parse(todos)));
  }

  let progresses = (await JSON.parse(backend.getItem("progressJson"))) || [];
  if (progresses.length > 1) {
    progressesMap = new Map(Object.entries(JSON.parse(progresses)));
  }

  let feedbacks = (await JSON.parse(backend.getItem("feedbackJson"))) || [];
  if (feedbacks.length > 1) {
    feedbacksMap = new Map(Object.entries(JSON.parse(feedbacks)));
  }

  let dones = (await JSON.parse(backend.getItem("doneJson"))) || [];
  if (dones.length > 1) {
    donesMap = new Map(Object.entries(JSON.parse(dones)));
  }
  maps = [todosMap, progressesMap, feedbacksMap, donesMap];
}

async function saveMaps() {
  const todos = JSON.stringify(Object.fromEntries(todosMap));
  await backend.setItem("todoJson", JSON.stringify(todos));
  const progresses = JSON.stringify(Object.fromEntries(progressesMap));
  await backend.setItem("progressJson", JSON.stringify(progresses));
  const feedbackes = JSON.stringify(Object.fromEntries(feedbacksMap));
  await backend.setItem("feedbackJson", JSON.stringify(feedbackes));
  const dones = JSON.stringify(Object.fromEntries(donesMap));
  await backend.setItem("doneJson", JSON.stringify(dones));
}

async function idCounterToJson() {
  await backend.setItem("count", JSON.stringify(idCounter));
}

async function loadCounter() {
  idCounter = parseInt(await JSON.parse(backend.getItem("count"))) || 0;
}

async function checkIfEmpty() {
  if (
    todosMap.size === 1 &&
    progressesMap.size === 1 &&
    feedbacksMap.size == 1 &&
    donesMap.size === 1
  ) {
    await backend.deleteItem("count");
    idCounter = 0;
  }
}

function takeSearch() {
  setTimeout(serach, 200);
}

async function serach() {
  let input = document.getElementById("inp-board").value;

  if (input === "") {
    generateCards();
    setTimeout(activateDragAndDrop, 150);
  } else {
    input = input.toLowerCase();
    console.log(input);

    for (let i = 0; i < maps.length; i++) {
      const map = maps[i];
      searchMaps(map, input);
    }
  }
}

function highlightText(input, key) {
  let title = document.getElementById(`title${key}`);
  let description = document.getElementById(`description${key}`);
  let inputs = input;

  inputs = inputs.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  let pattern = new RegExp(`${inputs}`, "gi");

  title.innerHTML = title.textContent.replace(
    pattern,
    (match) => `<mark>${match}</mark>`
  );
  description.innerHTML = description.textContent.replace(
    pattern,
    (match) => `<mark>${match}</mark>`
  );
}

function searchMaps(map, input) {
  for (const [key, value] of map) {
    if (key == "x") {
      continue;
    }
    searchInValue(value, key, input);
  }
}

function searchInValue(value, key, input) {
  for (let i = 0; i < mapsValue.length; i++) {
    let values = value[mapsValue[i]];
    if (values == "" || values === []) {
      continue;
    }
    if (
      Number.isInteger(parseInt(values)) &&
      Number.isInteger(parseInt(input))
    ) {
      outputNumber(values, key, input);
    } else if (
      Number.isInteger(parseInt(values)) ||
      Number.isInteger(parseInt(input))
    ) {
      continue;
    } else if (Array.isArray(values)) {
      for (let j = 0; j < values.length; j++) {
        const element = values[j];
        checkIfIncludes(element, key, input);
      }
    } else if (mapsValue[i] === "description" || mapsValue[i] === "title") {
      let splitted = values.split(" ");
      if (splitted.length === 1) {
        checkIfIncludes(values, key, input);
      }
      for (let i = 0; i < splitted.length; i++) {
        let element = splitted[i];
        checkIfIncludes(element, key, input);
      }
    } else {
      checkIfNumberIncludes(values, key, input);
      checkIfIncludes(values, key, input);
    }
  }
}

function checkIfIncludes(values, key, input) {
  let firstLetter;
  if (!Number.isInteger(values)) {
    values = values.toLowerCase();
    firstLetter = values.slice(0, 1);
    outputSerach(values, key, input, firstLetter);
  }
}

function outputSerach(values, key, input, firstLetter) {
  if (firstLetter.includes(input) && values.includes(input)) {
    highlightText(input, key);
    console.log(values);
    for (let i = idCounter - 1; i > -1; i--) {
      let card = document.getElementById(`card${i}`);
      card.classList.add("d-none");
    }
    let shine = document.getElementById(`card${key}`);
    shine.classList.remove("d-none");
  }
}

function outputNumber(values, key, input) {
  let firstNumber = getFirstNumber(values);

  if (values.includes(input) && firstNumber.includes(input)) {
    highlightText(input, key);
    for (let i = idCounter - 1; i > -1; i--) {
      let card = document.getElementById(`card${i}`);
      card.classList.add("d-none"); /// push die treffer id in ein array und befreie sie von d none
    }
    let shine = document.getElementById(`card${key}`);
    shine.classList.remove("d-none");
    console.log("number/numbers: " + values);
  }
}

function getFirstNumber(values) {
  let firstNumberAsString = values.slice(0, 1);
  return firstNumberAsString;
}

// wenn mapsValue[3] ist kommt eine zahl die in der if abfrage zeile 782 für einen Fehler sorgt
// Schreibe eine extra funktion die die zahlen als input und value überprüft
