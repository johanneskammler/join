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
let searchHits = [];
let searchInputs = [];
let contactsEdit = [];
let currentProgress = 0;

let todo = "todo";
let feedback = "feedback";
let progress = "progress";
let done = "done";
let idCounter = 0;

/* check a background color for the new contacts up */

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

  getUrgentCounter();
  getCurrentContacts();
}

function openPopup(id) {
  generatePopup(id);
  popup();
  dateFutureTask();
}

function hoverBoardHtml() {
  document
    .getElementById("board_bg")
    .classList.add("section-background-normal");
  document.getElementById("board_bg").classList.remove("section-background");
}

function hoverBoardRespons() {
  document
    .getElementById("board_bg")
    .classList.remove("section-background-normal");
  document.getElementById("board_bg").classList.add("section-background");
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
  activateDragAndDrop();
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
    hoverBoardRespons();
  } else if (size > 1024) {
    draggableTrue();
    sidebarDesktop();
    hoverBoardHtml();
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
  dateFutureTask();
  subtasks = [];
}

/**
 * close the addTask div and add the d-none class from the div with id add-task
 */
function closeAddTask() {
  document.getElementById("add-board").classList.remove("slide-left");
  document.getElementById("add-board").classList.add("slide-right");
  setTimeout(openAddTask, 350);
  setTimeout(activateDragAndDrop, 350);
  subtasks = [];
  subCounterAdd = 0;
  selectedContacts = [];
}

/**
 * get the json data
 */

async function getFirstLetter(contacts, idCounter) {
  let namesSplit = new Map();
  let nameList = [];
  let letterList = [];
  let colorList = [];

  /*   let url = "../contacts.json";
    let response = await fetch(url); */
  let contactsJson = backend.getItem("contacts");
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
  /*     let subtask; */
  let currentId;

  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      loadCounter();
      if (idCounter == "leer") {
        idCounter = 0;
      }

      key = tasks[i];
      todosMap.set(`${idCounter}`, {
        category: key["category"],
        categorycolor: key["categorycolor"],
        contacts: key["contacts"],
        colors: key["colors"],
        letters: key["letters"],
        date: key["date"],
        description: key["description"],
        importance: key["importance"],
        subtask: key["subtasks"],
        subtaskStatus: "0",
        title: key["title"],
        progressStatus: key[0],
      });

      await saveMaps();
      await backend.deleteItem("tasks");
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
    contentTodo(section, id, todosMap);
  } else if (section === "progress") {
    contentTodo(section, id, progressesMap);
  } else if (section === "feedback") {
    contentTodo(section, id, feedbacksMap);
  } else if (section === "done") {
    contentTodo(section, id, donesMap);
  }
}

function setCardImportanc(id) {
  let footer = document.getElementById(`importance_footer${id}`);
  if (donesMap.get(`${id}`)["importance"] === "urgent") {
    footer.innerHTML = ` <img class="img-position" src="img-board/${importance}.png">
                        <img src="img-board/${importance}.png">`;
  }
}

function contentTodo(section, id, map) {
  let mapCategory = map.get(`${id}`)["category"];
  let mapCatColor = map.get(`${id}`)["categorycolor"];
  let mapTitle = map.get(`${id}`)["title"];
  let mapDescription = map.get(`${id}`)["description"];
  let totalSub = map.get(`${id}`)["subtask"];
  if (!Array.isArray(totalSub) && totalSub.length > 0) {
    totalSub = totalSub.split(",");
  }
  totalSub = totalSub.length;
  if (totalSub == undefined) {
    document.getElementById(`${section}-board`).innerHTML += setCardHTML(
      mapCategory,
      mapCatColor,
      mapTitle,
      mapDescription,
      undefined,
      undefined,
      id
    );
  } else {
    // totalSub = map.get(`${id}`)["subtask"].size;
    let progressStatus = map.get(`${id}`)["subtaskStatus"];
    document.getElementById(`${section}-board`).innerHTML += setCardHTML(
      mapCategory,
      mapCatColor,
      mapTitle,
      mapDescription,
      totalSub,
      progressStatus,
      id
    );
  }
}

function checkSubtasks(id, map) {
  let currentMap = new Map(map);
  let progressId = document.getElementById(`progress_box${id}`);
  if (currentMap.get(`${id}`)["subtask"] == "") {
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
}

function renderContactsDone(id) {
  let contacts = donesMap.get(`${id}`)["contacts"];
  let colors = donesMap.get(`${id}`)["colors"];
  let letters = donesMap.get(`${id}`)["letters"];

  if (contacts.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }
  if (donesMap.get(`${id}`)["colors"] == "string") {
    colors.split(",");
  }
  if (donesMap.get(`${id}`)["letters"] == "string") {
    letters.split(",");
  }
  let contactsSection = document.getElementById(`contacts_card${id}`);
  checkForContactNumber(contacts, letters, contactsSection, colors);
}

function renderContactsFeedback(id) {
  let contacts = feedbacksMap.get(`${id}`)["contacts"];
  let colors = feedbacksMap.get(`${id}`)["colors"];
  let letters = feedbacksMap.get(`${id}`)["letters"];

  if (contacts.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }
  if (feedbacksMap.get(`${id}`)["colors"] == "string") {
    colors.split(",");
  }
  if (feedbacksMap.get(`${id}`)["letters"] == "string") {
    letters.split(",");
  }
  let contactsSection = document.getElementById(`contacts_card${id}`);
  checkForContactNumber(contacts, letters, contactsSection, colors);
}

function renderContactsProgress(id) {
  let contacts = progressesMap.get(`${id}`)["contacts"];
  let colors = progressesMap.get(`${id}`)["colors"];
  let letters = progressesMap.get(`${id}`)["letters"];

  if (contacts.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }
  if (progressesMap.get(`${id}`)["colors"] == "string") {
    colors.split(",");
  }
  if (progressesMap.get(`${id}`)["letters"] == "string") {
    letters.split(",");
  }
  let contactsSection = document.getElementById(`contacts_card${id}`);
  checkForContactNumber(contacts, letters, contactsSection, colors);
}

function renderContactsTodo(id) {
  let contacts = todosMap.get(`${id}`)["contacts"];
  let element;
  if (typeof contacts === "string") {
    contacts = contacts.split(";");
  }

  if (contacts.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }

  let colors = [todosMap.get(`${id}`)["colors"]];
  if ((colors.length = 1)) {
    colors = colors[0];
  } else {
    colors = colors.split(",");
  }

  let letters = todosMap.get(`${id}`)["letters"];
  if (letters.length == 1) {
    letters = [letters[0]];
  } else {
    letters = String(letters).split(",");
  }
  let contactsSection = document.getElementById(`contacts_card${id}`);
  checkForContactNumber(contacts, letters, contactsSection, colors);
}

function checkForContactNumber(contacts, letters, contactsSection, colors) {
  let changedColorForDots;
  if (contacts.length > 2) {
    let element;
    for (let i = 0; i < 2; i++) {
      element = colors[i];

      contactsSection.innerHTML += `<p class="invate font" style="background-color: ${element};">${letters[i]}</p>`;
    }
    changedColorForDots = element.slice(0, 4);
    contactsSection.innerHTML += `<p class="invate font" style="background-color: ${changedColorForDots};">...</p>`;
  } else {
    for (let i = 0; i < contacts.length; i++) {
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
  document.getElementById("popup_card").innerHTML = renderPopupHTML(
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
  renderPopupContacts(colors, contactsSplit, letters);
  setTimeout(setPriority, 50, importance, id, section);
  checkSubtasksPopup(section, id);
  checkTitlePopup(section, id);
  generateSubtasksSum(id);
  saveMaps();
  generateCards();
}

function generateSubtasksSum(id) {
  let map = new Map(wichSection(id));
  let totalSub = map.get(`${id}`)["subtask"];
  if (!Array.isArray(totalSub) && totalSub.length > 0) {
    totalSub = totalSub.split(",");
  }
  totalSub = totalSub.length;
  document.getElementById(
    `done_status_popup${id}`
  ).innerHTML = `0/${totalSub} Done`;
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

function renderPopupContacts(colors, contactsSplit, letters) {
  let contact = document.getElementById(`assigned`);
  let card = document.getElementById("popup_card");
  if (colors[0] == "" && colors.length == 1) {
    contact.classList.add("d-none");
    card.style.marginTop = "80px";
  } else {
    for (let i = 0; i < contactsSplit.length; i++) {
      const element = contactsSplit[i];
      contact.innerHTML += renderPopupContactsHTML(colors, element, i, letters);
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

  let colors = String(section.get(`${id}`)["colors"]);
  colors = colors.split(",");
  let contactsSplit = section.get(`${id}`)["contacts"];

  let letters = String(section.get(`${id}`)["letters"]);
  letters = letters.split(",");

  if (typeof contactsSplit == "string") {
    contactsSplit = contactsSplit.split(",");
  }
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
  let taskId = document.getElementById(`task${id}`);
  let taskArray = section.get(`${id}`)[`subtask`];
  let taskLength;
  if (typeof taskArray == "string") {
    taskArray = taskArray.split(",");
  }
  taskLength = taskArray.length;
  for (let i = 0; i < taskLength; i++) {
    const element = taskArray[i];
    let pText = document.getElementById(`progress_text${id}`);
    pText.innerHTML += `
      <div id='subtask_checking${i}'>
        <p class="subtext" id="sub_p${id}">${element}</p>
        <div  class="sub-checkmark d-none">
          <img class="sub-img-setup d-none" id="cancel_sub${i}" src="../add_task/img-add_task/x_blue.png" onclick="removeProgress(${i})">
          <span id="span${i}">|</span>
          <img  class="sub-img-setup" id="add_sub${i}" src="../add_task/img-add_task/check_blue.png" onclick="addPorgress(${i})">
        </div>
      </div>`; // beim checken hacken entfernen und das P element mit text-decoration: line-through; durchstreichen
  }
  taskLength = section.get(`${id}`)[`subtask`].length;
  let tasks = section.get(`${id}`)[`subtask`];
}

function toggleSelecter(i) {
  let cancel = document.getElementById(`cancel_sub${i}`);
  let add = document.getElementById(`add_sub${i}`);
  let span = document.getElementById(`span${i}`);

  cancel.classList.toggle("d-none");
  add.classList.toggle("d-none");
  span.classList.toggle("mr15");
}

function removeProgress(i) {
  let subSum = document.getElementsByClassName("subtext");
  let pct = 100 / subSum.length;
  let progressPct = document.getElementById("progress_edit");

  if (progressPct.style.width == "0px") {
    return;
  } else if (
    !(progressPct.style.width == "100%") &&
    !(progressPct.style.width == "0px")
  ) {
    currentProgress = currentProgress - pct;
    progressPct.style = `width: ${currentProgress}%;`;
    toggleSelecter(i);
  }
}

function addPorgress(i) {
  let subSum = document.getElementsByClassName("subtext");
  let pct = 100 / subSum.length;
  let progressPct = document.getElementById("progress_edit");

  if (progressPct.style.width == "0px") {
    progressPct.style = `width: ${pct}%;`;
    currentProgress = pct;
    toggleSelecter(i);
  } else if (
    !(progressPct.style.width == "100%") &&
    !(progressPct.style.width == "0px")
  ) {
    currentProgress = currentProgress + pct;
    progressPct.style = `width: ${currentProgress}%;`;
    toggleSelecter(i);
  }
}

function checkMap(id) {
  let currentMap = new Map();
  if (todosMap.has(`${id}`)) {
    currentMap = new Map(todosMap);
  } else if (progressesMap.has(`${id}`)) {
    currentMap = new Map(progressesMap);
  } else if (feedbacksMap.has(`${id}`)) {
    currentMap = new Map(feedbacksMap);
  } else {
    currentMap = new Map(donesMap);
  }
  return currentMap;
}

function editContactsPopup(id) {
  let map = wichSection(id);
  if (map == undefined) {
    return;
  }
  let mapsContacts = map.get(`${id}`)["contacts"];
  if (typeof mapsContacts === "string") {
    mapsContacts = mapsContacts.split(",");
  }
  let contactsInPopup = [];
  let i = 0;
  while (contactsInPopup.length < mapsContacts.length) {
    let dok = document.getElementById(`contacts-checkbox-${i}`);
    console.log(contactsInPopup.indexOf(dok.value));
    if (mapsContacts.indexOf(dok.value) > -1) {
      contactsInPopup.push(i);
    }
    i++;
  }
  return contactsInPopup;
}

function setSubtasksLayout(id) {
  let progressText = document.getElementById(`progress_text${id}`);
  let subText = document.getElementById("subtask_id");
  let subP = document.getElementsByClassName("subtext");
  let subCheck = document.getElementsByClassName("sub-checkmark");

  progressText.classList.add("add-colum");
  subText.classList.add("mb");
  subText.classList.add("mt11");
  for (let i = 0; i < subP.length; i++) {
    const element = subP[i];
    element.classList.add("mt0");
    subCheck[i].classList.remove("d-none");
    document.getElementById(`subtask_checking${i}`).classList.add("scw");
  }
}

function edit(id) {
  let currentMap = new Map(checkMap(id));
  let popTop = document.getElementById("popup_card");
  let title = currentMap.get(`${id}`)["title"];
  let description = currentMap.get(`${id}`)["description"];
  let name = document.getElementsByClassName("fullName");

  for (let i = 0; i < name.length; i++) {
    const element = name[i];
    element.classList.add("d-none");
  }
  showEdit(title, description, id);
  dateFuture();
  setSubtasksLayout(id);
}

function dateFuture() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("select-date").setAttribute("min", today);
  // document.getElementById("select-date-task").setAttribute("min", today);
}

function dateFutureTask() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("select-date-task").setAttribute("min", today);
}

function showEdit(title, description, id) {
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
  document.getElementById("edit-assigned").innerHTML += assignedHTML(id);
  document.getElementById("contact").classList.add("flex-contact");
  document.getElementById(
    "edit_box"
  ).innerHTML += `<div class="ok" onclick="editDone(${id})"><p class="ok-text">Done</p></div>`;
  document.getElementById;
}

function editDone(id) {
  let titleEdit = document.getElementById("popup_title_edit").value;
  let descriptionEdit = document.getElementById("popup_description_edit").value;
  let dateEdit = document.getElementById("select-date").value;
  let contactsEdit = selectedContacts;
  let button = checkPrioBtn();
  let section = wichSection(id);

  let category = section.get(`${id}`)["category"];
  let categorycolor = section.get(`${id}`)["categorycolor"];
  let colors = section.get(`${id}`)["colors"];
  let letters = section.get(`${id}`)["letters"];
  let subtask = section.get(`${id}`)["subtask"];
  let subtaskStatus = section.get(`${id}`)["subtaskStatus"];
  if (titleEdit.length == 0) {
    titleEdit = section.get(`${id}`)["title"];
  }
  if (descriptionEdit.length == 0) {
    descriptionEdit = section.get(`${id}`)["description"];
  }
  if (dateEdit.length == 0) {
    dateEdit = section.get(`${id}`)["date"];
  }
  if (contactsEdit.length == 0 || contactsEdit[0] == "") {
    contact = section.get(`${id}`)["contacts"];
    contactsEdit = contact;
  }
  if (button == undefined) {
    button = section.get(`${id}`)["importance"];
  }

  saveIn(
    titleEdit,
    descriptionEdit,
    dateEdit,
    contactsEdit,
    button,
    section,
    category,
    categorycolor,
    colors,
    letters,
    subtask,
    subtaskStatus,
    id
  );

  /*   section.set(`${id}`, {
    category: `${category}`,
    categorycolor: `${categorycolor}`,
    colors: `${colors}`,
    contacts: `${contactsEdit}`,
    date: `${dateEdit}`,
    description: `${descriptionEdit}`,
    importance: `${button}`,
    letters: `${letters}`,
    subtask: `${subtask}`,
    subtaskStatus: `${subtaskStatus}`,
    title: `${titleEdit}`,
  }); */
  generatePopup(id);
}

function saveIn(
  titleEdit,
  descriptionEdit,
  dateEdit,
  contactsEdit,
  button,
  section,
  category,
  categorycolor,
  colors,
  letters,
  subtask,
  subtaskStatus,
  id
) {
  if (todosMap.has(`${id}`)) {
    todosMap.set(`${id}`, {
      category: `${category}`,
      categorycolor: `${categorycolor}`,
      colors: `${colors}`,
      contacts: `${contactsEdit}`,
      date: `${dateEdit}`,
      description: `${descriptionEdit}`,
      importance: `${button}`,
      letters: `${letters}`,
      subtask: `${subtask}`,
      subtaskStatus: `${subtaskStatus}`,
      title: `${titleEdit}`,
    });
  } else if (progressesMap.has(`${id}`)) {
    progressesMap.set(`${id}`, {
      category: `${category}`,
      categorycolor: `${categorycolor}`,
      colors: `${colors}`,
      contacts: `${contactsEdit}`,
      date: `${dateEdit}`,
      description: `${descriptionEdit}`,
      importance: `${button}`,
      letters: `${letters}`,
      subtask: `${subtask}`,
      subtaskStatus: `${subtaskStatus}`,
      title: `${titleEdit}`,
    });
  } else if (feedbacksMap.has(`${id}`)) {
    feedbacksMap.set(`${id}`, {
      category: `${category}`,
      categorycolor: `${categorycolor}`,
      colors: `${colors}`,
      contacts: `${contactsEdit}`,
      date: `${dateEdit}`,
      description: `${descriptionEdit}`,
      importance: `${button}`,
      letters: `${letters}`,
      subtask: `${subtask}`,
      subtaskStatus: `${subtaskStatus}`,
      title: `${titleEdit}`,
    });
  } else if (donesMap.has(`${id}`)) {
    donesMap.set(`${id}`, {
      category: `${category}`,
      categorycolor: `${categorycolor}`,
      colors: `${colors}`,
      contacts: `${contactsEdit}`,
      date: `${dateEdit}`,
      description: `${descriptionEdit}`,
      importance: `${button}`,
      letters: `${letters}`,
      subtask: `${subtask}`,
      subtaskStatus: `${subtaskStatus}`,
      title: `${titleEdit}`,
    });
  }
  setTimeout(activateDragAndDrop, 150);
}

function editContacts(id) {
  let map = wichSection(id);
  let contacts = map.get(`${id}`)["contacts"].split(",");
  return contacts;
}

function subtaskLayout(id) {
  let div = document.getElementById(`progress_text${id}`);
  let task = document.getElementById(`task${id}`);

  div.classList.add("progress-text-edit");
  task.classList.add("task-edit");
}

// EDIT END ____________________________________________________________________________________|
function checkPrioBtn() {
  let urgent = document.getElementById("importance-button1-colored").style
    .cssText;
  let medium = document.getElementById("importance-button2-colored").style
    .cssText;
  let low = document.getElementById("importance-button3-colored").style.cssText;
  let result;

  if (urgent.includes("flex")) {
    result = "urgent";
  } else if (medium.includes("flex")) {
    result = "medium";
  } else if (low.includes("flex")) {
    result = "low";
  }
  return result;
}

function setPriority(importance, id, section) {
  if (importance === "Urgent") {
    priority.innerHTML = buttonURGENT();
  } else if (importance === "Medium") {
    priority.innerHTML = buttonMEDIUM();
  } else if (importance === "Low") {
    priority.innerHTML = buttonLOW();
  }
}

function checkCards() {
  let id = draggedItem.id.slice(-1);
  let start = comeFrom.id.split("-")[0];
  let end = comeTo.childNodes[1].id.split("-")[0];
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

// SERACH SECTION
function takeSearch() {
  setTimeout(serach, 200);
}

function emptySearchArrays() {
  searchHits = [];
  searchInputs = [];
}
async function serach() {
  emptySearchArrays();
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
    highlightAndDone();
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
    if (values == "" || values === [] || values == undefined) {
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
      checkIfIncludes(values, key, input);
    } else {
      checkIfNumberIncludes(values, key, input);
      checkIfIncludes(values, key, input);
    }
  }
}

function checkIfIncludes(values, key, input) {
  if (!Number.isInteger(values)) {
    values = values.toLowerCase();
    outputSerach(values, key, input);
  }
}

function outputSerach(values, key, input) {
  if (values.includes(input)) {
    PushInArray(values, key, input);
  }
}

function outputNumber(values, key, input) {
  if (values.includes(input) && firstNumber.includes(input)) {
    highlightText(input, key);
    for (let i = idCounter - 1; i > -1; i--) {
      let card = document.getElementById(`card${i}`);
      card.classList.add("d-none");
    }
    let shine = document.getElementById(`card${key}`);
    shine.classList.remove("d-none");
    console.log("number/numbers: " + values);
  }
}

function PushInArray(values, key, input) {
  if (searchHits.indexOf(key) === -1) {
    searchInputs.push(input);
    searchHits.push(key);
  }
}

function highlightAndDone() {
  for (let i = idCounter - 1; i > -1; i--) {
    let card = document.getElementById(`card${i}`);
    card.classList.add("d-none");
  }

  for (let j = 0; j < searchHits.length; j++) {
    let idS = +searchHits[j];
    let inpS = searchInputs[j];
    let shine = document.getElementById(`card${idS}`);
    shine.classList.remove("d-none");
    highlightText(inpS, idS);
  }
}

async function cut() {
  await backend.deleteItem("todoJson");
  await backend.deleteItem("urgentCounter");
  await backend.deleteItem("progressJson");
  await backend.deleteItem("feedbackJson");
  await backend.deleteItem("doneJson");
}
