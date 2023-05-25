setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");
let startposition;
let todosMap = new Map();
todosMap.set("x", { value: "none" });
let progressesMap = new Map();
progressesMap.set("x", { value: "none" });
let feedbacksMap = new Map();
feedbacksMap.set("x", { value: "none" });
let donesMap = new Map();
donesMap.set("x", { value: "none" });
let mapsList = [todosMap, progressesMap, feedbacksMap, donesMap];
let maps = [];
let mapsValue = ["description", "title"];
let comeFrom;
let comeTo;
let searchHits = [];
let searchInputs = [];
let contactsEdit = [];
let globalProgress = [];
let todo = "todo";
let feedback = "feedback";
let progress = "progress";
let done = "done";
let idCounter = 0;
let actualContacts;

/**
 * This function Initialized some functions that need to run with onload of the body
 *
 */

async function init() {
  await includeHTML();
  await downloadFromServer();
  checkSize();
  draggableTrue();
  setTimeout(activateDragAndDrop, 400); /* setCards(); */
  await getMaps();
  generateCards();
  checkIfEmpty();
  tasks = (await JSON.parse(backend.getItem("tasks"))) || [];
  actualContacts = (await JSON.parse(backend.getItem("contacts"))) || [];
  getUrgentCounter();
  getCurrentContacts();
  setTimeout(load, 500);
}

function openPopup(id) {
  generatePopup(id);
  popup();
  dateFutureTask();
  setId(id);
  setTimeout(toggleArrows, 100);
}

function hoverBoardHtml() {
  let boardBG = document.getElementById("board_bg");
  if (boardBG == null) {
    return;
  }

  boardBG.classList.add("section-background-normal");
  boardBG.classList.remove("section-background");
}

function hoverBoardRespons() {
  let boardBG = document.getElementById("board_bg");
  if (boardBG == null) {
    return;
  }
  boardBG.classList.remove("section-background-normal");
  boardBG.classList.add("section-background");
}

/**
 * Remove the display none from the div's and show the popup
 * scroll to the top for good view (Layout)
 * block scolling while view on popup
 */

function popup(id) {
  let background = document.getElementById("popup");
  let card = document.getElementById("popup_card");
  let editPrio = document.getElementById("edit_priority");
  let title = document.getElementById("popup_title");
  let content = document.getElementById("card_content");

  editPrio.classList.remove("correctPrio");
  title.classList.remove("card-content-popup");
  content.classList.remove("set-content");

  window.scrollTo(0, 0);
  card.classList.toggle("d-none");
  background.classList.toggle("d-none");
  activateDragAndDrop();
  newContactAddTaskActive = true;
  selectedContacts = [];
}

/*  
/**
 * check size by onload and on resize window too and start the function
 * to set the sidebar and deactivate the dragAndDrop
 */
function checkSize() {
  let size = window.innerWidth;
  setTimeout(toggleArrows, 50);

  if (size <= 1024) {
    sidebarTabled();
    draggableFalse();
    hoverBoardRespons();
  } else if (size > 1024) {
    draggableTrue();
    sidebarDesktop();
    hoverBoardHtml();
    activateDragAndDrop();
  }
}

/**
 * set The Sidebar to the Bottom
 */
function sidebarTabled() {
  let sidebar = document.getElementById("sidebar");
  if (sidebar == null) {
    return;
  }

  sidebar.classList.remove("sidebar");
  sidebar.classList.add("tablet-sidebar");
}

/**
 * set the sidebar to the left
 */
function sidebarDesktop() {
  let sidebar = document.getElementById("sidebar");
  if (sidebar == null) {
    return;
  }

  sidebar.classList.add("sidebar");
  sidebar.classList.remove("tablet-sidebar");
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

function renderAddTask(section) {
  let addTask = document.getElementById("add_task");
  addTask.innerHTML = renderAddTaskHTML(section);
}

function checkFille() {
  allFieldsFilled();
  setTimeout(checkFille, 250);
}

/**
 * open addTask and remove the d-none class from the div with id add-task
 */
function openAddTask(section) {
  let addTask = document.getElementById("add_task");
  let list = document.getElementsByTagName("html");
  let html = list[0];
  if (section == undefined) {
    section = todosMap;
  }

  addTask.classList.toggle("d-none");
  window.scrollTo(0, 0);
  setTimeout(renderContactsAddTask, 250);
  html.classList.toggle("hide-overflow-y");
  renderAddTask(section);
  dateFutureTask();
  subtasks = [];
}

/**
 * close the addTask div and add the d-none class from the div with id add-task
 */
function closeAddTask() {
  let addBoard = document.getElementById("add-board");
  let contactAdd = document.getElementById("new_contact").childNodes;

  addBoard.classList.remove("slide-left");
  addBoard.classList.add("slide-right");
  setTimeout(openAddTask, 350);
  subtasks = [];
  subCounterAdd = 0;
  if (contactAdd.length == 1) {
    newContactAddTaskReturn();
  }
  filled = false;
  setTimeout(activateDragAndDrop, 50);
}

/**
 * get the json data
 */

function getFirstLetter(contacts, idCounter) {
  let namesSplit = new Map();
  let nameList = [];
  let letterList = [];
  let firstLetters;

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let name = element.split(" ");
    let justName = `${name[0]} ${name[1]}`;
    let firstLetter = name[0].split("");
    if (name[1] == undefined) {
      firstLetters = firstLetter[0];
      firstLetters = firstLetters.toUpperCase();
      letterList.push(firstLetters);
    } else {
      let secondLetter = name[1].split("");
      firstLetters = firstLetter[0] + secondLetter[0];
      firstLetters = firstLetters.toUpperCase();
      letterList.push(firstLetters);
    }

    nameList.push(justName);
  }
  namesSplit.set(`${idCounter}`, {
    contacts: `${nameList}`,
    letters: `${letterList}`,
  });
  return namesSplit;
}

function getNewColorContact() {
  let symbols, color;
  symbols = "0123456789ABCDEF";
  color = "#";

  for (let f = 0; f < 6; f++) {
    color = color + symbols[Math.floor(Math.random() * 16)];
  }
  return color;
}

function checkIdCounter() {
  loadCounter();
  if (idCounter == "leer") {
    idCounter = 0;
  }
}

async function checkContactsColor(contacts) {
  let contactsBackend = await JSON.parse(backend.getItem("contacts"));
  let contactData = [];

  for (let j = 0; j < contacts.length; j++) {
    const contact = contacts[j];
    for (let i = 0; i < contactsBackend.length; i++) {
      const element = contactsBackend[i];
      if (element["name"].includes(contact)) {
        if (element["color"] == undefined) {
          contactData.push(element["colors"]);
        } else {
          contactData.push(element["color"]);
        }
      }
    }
  }
  return contactData;
}
function generateCards() {
  setTasks("todo");

  setCards("progress");
  setCards("feedback");
  setCards("done");
  return;
}

async function setTasks(section) {
  let map = checkWichMap(section);
  let tasks = (await JSON.parse(backend.getItem("tasks"))) || [];
  let doneCoordinates = [];
  let colors = [];

  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      checkIdCounter();
      key = tasks[i];

      await creatNewCard(map, key, colors, doneCoordinates);
    }
  }
  await saveAndResetCounterAndTask();

  setCards(todo);
  setCards(progress);
  setCards(feedback);
  setCards(done);
}

async function saveAndResetCounterAndTask() {
  await backend.deleteItem("tasks");
  tasks = [];
  await saveMaps();
  currentId = idCounter;
}

async function creatNewCard(map, key, colors, doneCoordinates) {
  let namesSplit = splitName(key);
  colors = await defineColors(key);
  setNewCard(map, key, colors, namesSplit, doneCoordinates);
  subtask = map.get(`${idCounter}`)["substack"];
  idCounter++;
  idCounterToBackend();
}

async function defineColors(key) {
  if (key[`colors`] == undefined) {
    return (colors = await checkContactsColor(key["contacts"]));
  } else {
    return (colors = key[`colors`]);
  }
}

function splitName(key) {
  let subtaskLength = key["subtasks"].length;
  if (key["letters"] == null || key["letters"][0] == null) {
    let contactsLetter = key["contacts"];
    contactsLetter = checkIfString(contactsLetter);
    namesSplit = getFirstLetter(contactsLetter, idCounter);
  } else {
    namesSplit = new Map();
    namesSplit.set(`${idCounter}`, { letters: `${key["letters"]}` });
  }
  if (subtaskLength > 0) {
    for (let j = 0; j < subtaskLength; j++) {
      doneCoordinates.push(`cancel_sub${j}`);
    }
  }
  if (namesSplit.get(`${idCounter}`) == undefined) {
    location.reload();
  }
  return namesSplit;
}

function setNewCard(map, key, colors, namesSplit, doneCoordinates) {
  map.set(`${idCounter}`, {
    category: key["category"],
    categorycolor: key["categorycolor"],
    contacts: key["contacts"],
    colors: colors,
    letters: namesSplit.get(`${idCounter}`)["letters"],
    date: key["date"],
    description: key["description"],
    importance: key["importance"],
    subtask: key["subtasks"],
    subtaskStatus: doneCoordinates,
    title: key["title"],
    progressStatus: key[0],
  });
}

function setCards(section) {
  if (section === "todo") {
    let todo = document.getElementById("todo-board");
    todo.innerHTML = "";
    for (const [key, value] of todosMap) {
      if (!(key === "x")) {
        cardContent(section, key);

        checkSubtasks(key, todosMap);

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
        checkSubtasks(key, progressesMap);
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
        checkSubtasks(key, feedbacksMap);
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
        checkSubtasks(key, donesMap);
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
  let doneSum = document.getElementById(`subtask_done${id}`);
  let importance = map.get(`${id}`)["importance"];

  if (!Array.isArray(totalSub) && totalSub.length > 0) {
    totalSub = totalSub.split(",");
  }

  if (totalSub == "") {
    document.getElementById(`${section}-board`).innerHTML += setCardHTML(
      mapCategory,
      mapCatColor,
      mapTitle,
      mapDescription,
      undefined,
      undefined,
      id,
      importance
    );
  } else {
    totalSub = checkIfString(totalSub);
    totalSub = totalSub.length;
    let progressStatus = map.get(`${id}`)["subtaskStatus"];
    progressStatus = checkIfString(progressStatus);

    for (let i = 0; i < progressStatus.length; i++) {
      const element = progressStatus[i];
      if (element == `add_sub${i}` && !(doneSum == null)) {
        doneSum = parseInt(doneSum.innerHTML);
        doneSum++;
      }
    }
    document.getElementById(`${section}-board`).innerHTML += setCardHTML(
      mapCategory,
      mapCatColor,
      mapTitle,
      mapDescription,
      totalSub,
      doneSum,
      id,
      importance
    );
  }
}

function checkSubtasks(id, map) {
  let currentMap = new Map(map);
  let progressId = document.getElementById(`progress_box${id}`);
  let counter = 0;
  if (currentMap.get(`${id}`)["subtask"] == "") {
    progressId.classList.add("d-none");
    addHeight(id);
  } else {
    let subtaskCards = currentMap.get(`${id}`)["subtaskStatus"];
    subtaskCards = checkIfString(subtaskCards);

    for (let i = 0; i < subtaskCards.length; i++) {
      const element = subtaskCards[i];
      if (element.includes("add")) {
        counter++;
      }
    }
    let cardProgress = counter * (100 / subtaskCards.length);
    addProgressCard(cardProgress, id, counter);
  }
}

function addHeight(id) {
  let list = document.getElementById(`footer${id}`);
  list.style.height = "55px";
}

function renderContacts(section, id) {
  if (section === "todo") {
    renderContactsCard(id);
  } else if (section === "progress") {
    renderContactsCard(id);
  } else if (section === "feedback") {
    renderContactsCard(id);
  } else if (section === "done") {
    renderContactsCard(id);
  }
}

function checkIfString(element) {
  if (typeof element === "string") {
    element = element.split(",");
  }
  return element;
}

/* async function contactsStillEqual(contacts, colors, map) {
  actualContacts = (await JSON.parse(backend.getItem("contacts"))) || [];
  let newContacts = [];
  console.log("von der Map : " + contacts);

  for (let i = 0; i < contacts.length; i++) {
    console.log(contacts[i]);
  }
     console.log('task :' + color + ' ' + i );
    actualContacts.forEach((contact, i) => {
      console.log(contact.name);
      if (color == contact.color) {
        newContacts.push(contact.name);
        if (newContacts == undefined || newContacts.length == undefined) {
        } 
        console.log(newContacts);
      } else {
        console.log("y");

        
        Erstmal ertsehen warum überhaupt die tasks nicht richtig gelden werden unddann das da oben versuchen
      
    }); 
}
 */
async function renderContactsCard(id) {
  let map = wichSection(id);
  let contactsMap = map.get(`${id}`)["contacts"];
  let colors = map.get(`${id}`)["colors"];
  let contactsNew;
  //colors = checkIfString(colors);
  contactsMap = checkIfString(contactsMap);

  contactsNew = contactsMap;

  if (contactsNew.length === 0) {
    let contactsSection = document.getElementById(`contacts_card${id}`);
    contactsSection.classList.add("d-none");
  }

  let contactColor = map.get(`${id}`)["colors"];
  contactColor = checkIfString(contactColor);

  let letters = map.get(`${id}`)["letters"];
  if (letters.length == 1) {
    letters = [letters[0]];
  } else {
    letters = String(letters).split(",");
  }
  let contactsSection = document.getElementById(`contacts_card${id}`);
  checkForContactNumber(contactsNew, letters, contactsSection, contactColor);
}

function checkForContactNumber(contacts, letters, contactsSection, colors) {
  let changedColorForDots = [];

  if (contacts.length > 2) {
    for (let i = 0; i < 2; i++) {
      element = colors[i];

      contactsSection.innerHTML += `<p class="invate font" style="background-color: ${colors[i]};">${letters[i]}</p>`;
    }
    changedColorForDots = "#FFAA00";
    contactsSection.innerHTML += `<p class="invate font" style="background-color: ${changedColorForDots};">...</p>`;
  } else if (contacts.length == 2) {
    for (let i = 0; i < contacts.length; i++) {
      const element = colors[i];

      contactsSection.innerHTML += `<p class="invate font" style="background-color: ${colors[i]};">${letters[i]}</p>`;
    }
  } else {
    for (let i = 0; i < contacts.length; i++) {
      const element = colors[i];

      contactsSection.innerHTML += `<p class="invate font" style="background-color: ${colors};">${letters[i]}</p>`;
    }
  }
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
  let done = document.getElementById(`done_status_popup${id}`);

  if (!Array.isArray(totalSub) && totalSub.length > 0) {
    totalSub = totalSub.split(",");
  }
  totalSub = totalSub.length;
  done.innerHTML = `<span id="subtask_done${id}">0</span>/${totalSub} Done`;
  renderPopupProgressStatus(id);
}

function renderPopupProgressStatus(id) {
  let counter = 0;
  let currentMap = wichSection(id);
  let subtaskCards = currentMap.get(`${id}`)["subtaskStatus"];
  let sub_done = document.getElementById(`subtask_done${id}`);
  let progressEdit = document.getElementById("progress_edit");
  let subtaskMap = currentMap.get(`${id}`)["subtask"];
  subtaskMap = checkIfString(subtaskMap);
  subtaskCards = checkIfString(subtaskCards);

  for (let i = 0; i < subtaskCards.length; i++) {
    const element = subtaskCards[i];
    if (element.includes("add")) {
      let subtaskRenderList = document.getElementById(`sub_p${i}`);
      counter++;
    }
  }
  let cardProgress = counter * (100 / subtaskMap.length);
  sub_done.innerHTML = counter;
  progressEdit.style = `width: ${cardProgress}%;`;
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
  let contacts = selectedContacts; //  document.querySelectorAll(".contactsDiv");

  if (colors[0] == "" && colors.length == 1) {
    for (let i = 0; i < contacts.length; i++) {
      const element = contacts[i];
      element.innerHTML = "";
      selectedContacts = [];
    }
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
  let contactsSplit = section.get(`${id}`)["contacts"];
  let letters = String(section.get(`${id}`)["letters"]);

  colors = colors.split(",");
  letters = letters.split(",");
  contactsSplit = checkIfString(contactsSplit);

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
  let taskArray = section.get(`${id}`)[`subtask`];
  let taskLength;

  taskArray = checkIfString(taskArray);

  taskLength = taskArray.length;
  for (let i = 0; i < taskLength; i++) {
    const element = taskArray[i];
    let pText = document.getElementById(`progress_text${id}`);
    pText.innerHTML += `
      <div id='subtask_checking${i}'>
        <p class="subtext" id="sub_p${i}">${element}</p>
        <div  class="sub-checkmark d-none">
          <img class="sub-img-setup d-none" id="cancel_sub${i}" src="../add_task/img-add_task/x_blue.png" onclick="removeProgress(${i}, ${id})">
          <span id="span${i}">|</span>
          <img  class="sub-img-setup" id="add_sub${i}" src="../add_task/img-add_task/check_blue.png" onclick="addProgress(${i}, ${id})">
        </div>
      </div>`; // beim checken hacken entfernen und das P element mit text-decoration: line-through; durchstreichen
  }
  taskLength = section.get(`${id}`)[`subtask`].length;
  let tasks = section.get(`${id}`)[`subtask`];
  let map = wichSection(id);
  let progressesPopup = map.get(`${id}`)["subtaskStatus"];
  let currentArray = [];
  progressesPopup = checkIfString(progressesPopup);

  for (let i = 0; i < progressesPopup.length; i++) {
    const element = progressesPopup[i];
    if (element.includes("add")) {
      currentArray.push(1);
    } else {
      currentArray.push(0);
    }
  }
  for (let i = 0; i < currentArray.length; i++) {
    const element = currentArray[i];
    if (element == 1) {
      toggleSelecter(i);
    }
  }
}

function toggleSelecter(i) {
  let cancel = document.getElementById(`cancel_sub${i}`);
  let add = document.getElementById(`add_sub${i}`);
  let span = document.getElementById(`span${i}`);

  cancel.classList.toggle("d-none");
  add.classList.toggle("d-none");
  span.classList.toggle("mr15");
}

function removeProgress(i, id) {
  let doneSum = document.getElementById(`subtask_done${id}`).innerHTML;
  let subSum = document.getElementsByClassName("subtext");
  let pct = 100 / subSum.length;
  let progressPct = document.getElementById("progress_edit");
  let map = wichSection(id);
  let doneCoordinates = map.get(`${id}`)["subtaskStatus"];
  doneCoordinates = checkIfString(doneCoordinates);

  if (progressPct.style.width == "0%") {
    return;
  }

  let progressCut = document.getElementById("progress_edit").style.width;
  let cutted = parseInt(progressCut.split("%"));
  currentProgress = parseInt(cutted) - parseInt(pct);
  progressPct.style = `width: ${parseInt(currentProgress)}%;`;
  doneSum--;
  addProgressCard(currentProgress, id, doneSum);
  doneCoordinates.splice(i, 1, `cancel_sub${i}`);
  toggleSelecter(i);
  renderSubtaskStatus(id, doneSum);
  globalProgress = doneCoordinates;
  qickSaveMap(id);
}

function addProgress(i, id) {
  let doneSum = document.getElementById(`subtask_done${id}`).innerHTML;
  let subSum = document.getElementsByClassName("subtext");
  let pct = 100 / subSum.length;
  let progressPct = document.getElementById("progress_edit");
  let map = wichSection(id);
  let counter = 0;

  doneCoordinates = map.get(`${id}`)["subtaskStatus"];
  if (typeof doneCoordinates == "string") {
    doneCoordinates = doneCoordinates.split(",");
    currentProgress = counter * pct;
  }
  for (let i = 0; i < doneCoordinates.length; i++) {
    const element = doneCoordinates[i];
    if (element.includes("add")) {
      counter++;
    }
  }
  if (progressPct.style.width == "0%") {
    progressPct.style = `width: ${pct}%;`;
    addProgressCard(pct, id, doneSum);
    currentProgress = pct;
    toggleSelecter(i);
    doneSum++;

    doneCoordinates.splice(i, 1, `add_sub${i}`);
    renderSubtaskStatus(id, doneSum);
  } else if (
    !(progressPct.style.width == "100%") &&
    !(progressPct.style.width == "0%")
  ) {
    doneSum = parseInt(document.getElementById(`subtask_done${id}`).innerHTML);
    let theProgress = document.getElementById("progress_edit").style.width;

    theProgress = theProgress.split("%");
    currentProgress = parseInt(theProgress) + parseInt(pct);
    progressPct.style = `width: ${currentProgress}%;`;
    toggleSelecter(i);
    doneSum++;
    addProgressCard(currentProgress, id, doneSum);
    doneCoordinates.splice(i, 1, `add_sub${i}`);
    renderSubtaskStatus(id, doneSum);
  }
  globalProgress = doneCoordinates;
  qickSaveMap(id);
}

function renderSubtaskStatus(id, doneSum) {
  document.getElementById(`subtask_done${id}`).innerHTML = doneSum;
}

function addProgressCard(number, id, doneSum) {
  let progressStatusCard = document.getElementById(`progress_card_done${id}`);
  let bar = document.getElementById(`progress_card${id}`);

  progressStatusCard.innerHTML = doneSum;
  bar.style = `width: ${number}%;`;
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

async function editContactsPopup(id) {
  let map = await JSON.parse(backend.getItem("contacts"));
  if (map == undefined || map == null) {
    return;
  }
  if (typeof map === "string") {
    map = map.split(",");
  }
  let contactsInPopup = [];
  for (let i = 0; i < map.length; i++) {
    const element = map[i]["name"];
    let dok = document.getElementById(`contacts-checkbox${i}`);
    if (dok == null || dok == undefined) {
      return;
    }
    if (contactsInPopup.indexOf(element) < 0) {
      contactsInPopup.push(element);
    }
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

function setSelecdetContacts(id) {
  let dropDown = document.getElementById("contacts-drop-down-edit");

  if (dropDown.classList.contains("d-none")) {
    return;
  }
  let map = wichSection(id);
  let contacts = map.get(`${id}`)["contacts"];
  contacts = checkIfString(contacts);
  if (contacts[0] == "") {
    contacts.splice(0, 1);
  } else {
    selectedContacts = contacts;
  }
}

function edit(id) {
  addEditClasses();
  let currentMap = new Map(checkMap(id));
  let popTop = document.getElementById("popup_card");
  let title = currentMap.get(`${id}`)["title"];
  let description = currentMap.get(`${id}`)["description"];
  let names = document.getElementsByClassName("fullName");
  let contactsInEdit = [];

  for (let i = 0; i < names.length; i++) {
    const element = names[i];
    element.classList.add("d-none");
    let contact = element.innerHTML;
    contactsInEdit.push(contact);
  }
  setTimeout(renderContactsSelection, 150, contactsInEdit);

  showEdit(title, description, id);
  dateFuture();
  setSubtasksLayout(id);
  toggleEditTitle();
  checkExistContact(id);
  /*   openEditContactsToSelect(id);
  openEditContactsToSelect(id); */
  setTimeout(checkExistContact, 100, id);
  editDnone();
  setTimeout(ContactsDivDisplay, 100, contactsInEdit);
  setEditPrio(id);
}

function getContactsForCheckbox(id) {
  let map = wichSection(id);
  let contacts = map.get(`${id}`)["contacts"];
  contacts = checkIfString(contacts);

  for (let j = 0; j < contacts.length; j++) {
    const newElement = contacts[j];
    document.getElementById(newElement).checked = true;
  }
}

function toggleEditTitle() {
  let titleEdit = document.getElementById("popup-card-title");
  titleEdit.classList.toggle("popup-title-for_edit");
}

function dateFuture() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("select-date").setAttribute("min", today);
}

function dateFutureTask() {
  const today = new Date().toISOString().split("T")[0];
  let dateId = document.getElementById("select-date-task");
  if (dateId == null) {
    return;
  }
  dateId.setAttribute("min", today);
}

function showEdit(title, description, id) {
  let colors = document.getElementById(`c-color`);
  let popupTitle = document.getElementById("popup_title");
  let cardConten = document.getElementById("card_content");
  let popupDescription = document.getElementById("popup_description");
  let date = document.getElementById("date_box");
  let prio = document.getElementById("edit_priority");
  let assing = document.getElementById("edit-assigned");
  let contact = document.getElementById("contact");
  let editBox = document.getElementById("edit_box");

  colors.classList.add("d-none");
  popupTitle.innerHTML = `<input type="text" class="popup-title-edit" id="popup_title_edit" placeholder="${title}">`;
  popupTitle.classList.add("set-title");
  cardConten.classList.add("set-content");
  popupDescription.innerHTML = descriptionHTML(description);
  date.innerHTML = dateHTML();
  prio.classList.add("correctPrio");
  prio.innerHTML = priorityHTML();
  assing.innerHTML += assignedHTML(id);
  contact.classList.add("flex-contact");
  editBox.innerHTML += `<button class="ok-text ok" id="ok" onclick="editDone(${id})">Done</button>
                        <button class="ok-text ok ok-delete" id="ok" onclick="deleteTask(${id})">Delete</button>`;
}

function deleteTask(id) {
  let map = wichSection(id);
  map.delete(`${id}`);
  generateCards();
  popup();
  saveMaps();
}

function qickSaveMap(id) {
  let titleEdit = document.getElementById("popup_title_edit").value;
  let descriptionEdit = document.getElementById("popup_description_edit").value;
  let dateEdit = document.getElementById("select-date").value;
  let contactsEdit = selectedContacts;
  let button = checkPrioBtn(id);
  let section = wichSection(id);

  let category = section.get(`${id}`)["category"];
  let categorycolor = section.get(`${id}`)["categorycolor"];
  let colors = section.get(`${id}`)["colors"];
  let letters = section.get(`${id}`)["letters"];
  let subtask = section.get(`${id}`)["subtask"];
  let subtaskStatus = globalProgress;
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
}

function checkContacts(id) {
  let newContacts = selectedContacts;
  let map = wichSection(id);
  let currentContacts = map.get(`${id}`)["contacts"];

  selectedContacts = checkIfString(selectedContacts);
  currentContacts = checkIfString(currentContacts);

  if (currentContacts == selectedContacts) {
    return currentContacts;
  }
  if (selectedContacts.length > 0) {
    for (let i = 0; i < selectedContacts.length; i++) {
      const element = selectedContacts[i];
      if (currentContacts.indexOf(element) == -1) {
        currentContacts.push(element);
      }
    }
  }

  return currentContacts;
}

async function setColorsExist() {
  let contacts = await JSON.parse(backend.getItem("contacts"));
  let colorList = [];
  for (let i = 0; i < selectedContacts.length; i++) {
    const taskName = selectedContacts[i];
    for (let j = 0; j < contacts.length; j++) {
      const contactsName = contacts[j]["name"];
      if (contactsName.includes(taskName)) {
        colorList.push(contacts[j]["color"]);
      }
    }
  }
  return colorList;
}

async function editDone(id) {
  addEditClasses();
  toggleEditTitle();
  checkExistContact(id);
  let titleEdit = document.getElementById("popup_title_edit").value;
  let descriptionEdit = document.getElementById("popup_description_edit").value;
  let dateEdit = document.getElementById("select-date").value;
  let button = checkPrioBtn(id);
  let section = wichSection(id);
  let contactsEdit = selectedContacts;

  let category = section.get(`${id}`)["category"];
  let categorycolor = section.get(`${id}`)["categorycolor"];
  let colors = await contactToSave(selectedContacts);
  let letters = getFirstLetter(selectedContacts, id);
  letters = letters.get(`${id}`)["letters"];
  let subtask = section.get(`${id}`)["subtask"];
  let subtaskStatus = globalProgress;
  if (titleEdit.length == 0) {
    titleEdit = section.get(`${id}`)["title"];
  }
  if (descriptionEdit.length == 0) {
    descriptionEdit = section.get(`${id}`)["description"];
  }
  if (dateEdit.length == 0) {
    dateEdit = section.get(`${id}`)["date"];
  }

  if (button == undefined) {
    button = section.get(`${id}`)["importance"];
  }

  colors = colors[1];

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

  generatePopup(id);
  doneSum = 0;
  currentProgress = 0;
  selectedContacts = [];
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

function checkPrioBtn(id) {
  let map = wichSection(id);
  let currentPrio = map.get(`${id}`)["importance"];
  let urgent = document.getElementById("importance-button1-colored");
  let medium;
  let low;
  let result;

  if (urgent == null) {
    result = checkPrioBtnEdit(id);
    return result;
  } else {
    urgent = document.getElementById("importance-button1-colored").style
      .cssText;
    medium = document.getElementById("importance-button2-colored").style
      .cssText;
    low = document.getElementById("importance-button3-colored").style.cssText;
  }

  if (urgent.includes("flex")) {
    result = "urgent";
  } else if (medium.includes("flex")) {
    result = "medium";
  } else if (low.includes("flex")) {
    result = "low";
  } else {
    result = currentPrio;
  }
  return result;
}

function checkPrioBtnEdit(id) {
  let result;
  let map = wichSection(id);
  let currentPrio = map.get(`${id}`)["importance"];
  let urgent = document.getElementById(
    "importance-button-colored-edit-4"
  ).classList;
  let medium = document.getElementById(
    "importance-button-colored-edit-5"
  ).classList;
  let low = document.getElementById(
    "importance-button-colored-edit-6"
  ).classList;

  if (urgent[1] == undefined) {
    result = "urgent";
  } else if (medium[1] == undefined) {
    result = "medium";
  } else if (low[1] == undefined) {
    result = "low";
  } else {
    result = currentPrio;
  }
  return result;
}

function setPriority(importance, id, section) {
  if (importance === "urgent") {
    priority.innerHTML = buttonURGENT();
  } else if (importance === "medium") {
    priority.innerHTML = buttonMEDIUM();
  } else if (importance === "low") {
    priority.innerHTML = buttonLOW();
  }
}
// EDIT END ____________________________________________________________________________________|

function checkCards() {
  let idCard = draggedItem.id.slice(-2);
  if (!(idCard == +idCard)) {
    idCard = draggedItem.id.slice(-1);
  }
  let start = comeFrom.id.split("-")[0];
  let end = comeTo.childNodes[1].id.split("-")[0];
  if (start === "todo") {
    setFromTodo(end, idCard);
  } else if (start === "progress") {
    setFromProgress(end, idCard);
  } else if (start === "feedback") {
    setFromFeedback(end, idCard);
  } else if (start === "done") {
    setFromDone(end, idCard);
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

async function idCounterToBackend() {
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

function addEditClasses() {
  if (screen.width < 500) {
    let editPopup = document.getElementById("popup_card");
    editPopup.classList.toggle("editRespons");
  }
}

function editDnone() {
  let editButton = document.getElementById("edit-none");
  editButton.classList.add("d-none");
}

let globalId;
function setId(id) {
  globalId = id;
}

function turnLeft(id) {
  let parent = document.getElementById(`card${id}`);
  if (parent.parentNode.id.includes("todo")) {
    return;
  } else if (parent.parentNode.id.includes("progress")) {
    progressTodo(id);
  } else if (parent.parentNode.id.includes("feedback")) {
    feedbackProgress(id);
  } else if (parent.parentNode.id.includes("done")) {
    doneFeedback(id);
  }
  openPopup(id);
  if (window.innerWidth > 1024) {
    setTimeout(activateDragAndDrop, 50);
  }
  setTimeout(toggleArrows, 75);
}

function progressTodo(id) {
  todosMap.set(`${id}`, progressesMap.get(`${id}`));
  progressesMap.delete(`${id}`);
}

function feedbackProgress(id) {
  progressesMap.set(`${id}`, feedbacksMap.get(`${id}`));
  feedbacksMap.delete(`${id}`);
}

function doneFeedback(id) {
  feedbacksMap.set(`${id}`, donesMap.get(`${id}`));
  donesMap.delete(`${id}`);
}

function turnRight(id) {
  let parent = document.getElementById(`card${id}`);
  if (parent.parentNode.id.includes("done")) {
    return;
  } else if (parent.parentNode.id.includes("feedback")) {
    feedbackDone(id);
  } else if (parent.parentNode.id.includes("progress")) {
    progressFeedback(id);
  } else if (parent.parentNode.id.includes("todo")) {
    todoProgress(id);
  }
  openPopup(id);
  if (window.innerWidth > 1024) {
    setTimeout(activateDragAndDrop, 50);
  }
  setTimeout(toggleArrows, 75);
}

function todoProgress(id) {
  progressesMap.set(`${id}`, todosMap.get(`${id}`));
  todosMap.delete(`${id}`);
}

function progressFeedback(id) {
  feedbacksMap.set(`${id}`, progressesMap.get(`${id}`));
  progressesMap.delete(`${id}`);
}

function feedbackDone(id) {
  donesMap.set(`${id}`, feedbacksMap.get(`${id}`));
  feedbacksMap.delete(`${id}`);
}

function toggleArrows() {
  for (let i = 0; i < idCounter; i++) {
    const arrows = document.getElementById(`arrows_card${i}`);
    if (arrows == null) {
      return;
    }
    if (window.innerWidth > 1024) {
      arrows.classList.add("d-none");
    } else {
      arrows.classList.remove("d-none");
    }
  }
}

function load() {
  let loader = document.getElementById("loader");
  loader.classList.toggle("d-none");
}
