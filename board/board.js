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
let mapsList = ["todosMap", "progressesMap", "feedbacksMap", "donesMap"];
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

/**
 * This function Initialized some functions that need to run with onload of the body
 *
 */

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
}

/*  
/**
 * check size by onload and on resize window too and start the function
 * to set the sidebar and deactivate the dragAndDrop
 */
function checkSize() {
  let size = window.innerWidth;

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

function renderAddTask() {
  let addTask = document.getElementById("add_task");
  addTask.innerHTML = renderAddTaskHTML();
}

/**
 * open addTask and remove the d-none class from the div with id add-task
 */
function openAddTask() {
  let addTask = document.getElementById("add_task");
  let list = document.getElementsByTagName("html");
  let html = list[0];

  addTask.classList.toggle("d-none");
  window.scrollTo(0, 0);
  setTimeout(renderContactsAddTask, 250);
  html.classList.toggle("hide-overflow-y");
  renderAddTask();
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
  setTimeout(activateDragAndDrop, 350);
  subtasks = [];
  subCounterAdd = 0;
  if (contactAdd.length == 1) {
    newContactAddTaskReturn();
  }
}

/**
 * get the json data
 */

async function getFirstLetter(contacts, idCounter) {
  let namesSplit = new Map();
  let nameList = [];
  let letterList = [];

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let name = element.split(" ");
    let justName = `${name[0]} ${name[1]}`;
    let firstLetter = name[0].split("");
    if (!(name[1] == undefined)) {
      let secondLetter = name[1].split("");
      let firstLetters = firstLetter[0] + secondLetter[0];
      letterList.push(firstLetters);
    } else {
      let firstLetters = firstLetter[0];
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

async function setTasks() {
  let tasks = (await JSON.parse(backend.getItem("tasks"))) || [];
  let doneCoordinates = [];
  let colors = [];

  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      checkIdCounter();
      key = tasks[i];
      let subtaskLength = tasks[i]["subtasks"].length;

      if (tasks[i]["letters"] == null || tasks[i]["letters"][0] == null) {
        let contactsLetter = tasks[i]["contacts"];
        contactsLetter = checkIfString(contactsLetter);
        namesSplit = await getFirstLetter(contactsLetter, idCounter);
      } else {
        namesSplit = new Map();
        namesSplit.set(`${idCounter}`, { letters: `${tasks[i]["letters"]}` });
      }
      if (key[`colors`] == undefined) {
        colors = await checkContactsColor(key["contacts"]);
      } else {
        colors = key[`colors`];
      }

      if (subtaskLength > 0) {
        for (let j = 0; j < subtaskLength; j++) {
          doneCoordinates.push(`cancel_sub${j}`);
        }
      }

      todosMap.set(`${idCounter}`, {
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

function renderContactsCard(id) {
  let map = wichSection(id);
  let contacts = map.get(`${id}`)["contacts"];

  contacts = checkIfString(contacts);

  if (contacts.length === 0) {
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
  checkForContactNumber(contacts, letters, contactsSection, contactColor);
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
  let map = wichSection(id);
  let contacts = map.get(`${id}`)["contacts"];
  contacts = checkIfString(contacts);

  selectedContacts = contacts;
}

function edit(id) {
  addEditClasses();
  let currentMap = new Map(checkMap(id));
  let popTop = document.getElementById("popup_card");
  let title = currentMap.get(`${id}`)["title"];
  let description = currentMap.get(`${id}`)["description"];
  let names = document.getElementsByClassName("fullName");
  setSelecdetContacts(id);

  for (let i = 0; i < names.length; i++) {
    const element = names[i];
    element.classList.add("d-none");
  }

  showEdit(title, description, id);
  dateFuture();
  setSubtasksLayout(id);
  toggleEditTitle();
  setTimeout(checkExistContact, 100, id);
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

function qickSaveMap(id) {
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
  let titleEdit = document.getElementById("popup_title_edit").value;
  let descriptionEdit = document.getElementById("popup_description_edit").value;
  let dateEdit = document.getElementById("select-date").value;
  let contactsEdit = selectedContacts;
  let button = checkPrioBtn(id);
  let section = wichSection(id);

  let category = section.get(`${id}`)["category"];
  let categorycolor = section.get(`${id}`)["categorycolor"];
  let colors = await contactToSave(selectedContacts);
  let letters = getFirstLetterInvate(selectedContacts);
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

// EDIT END ____________________________________________________________________________________|
function checkPrioBtn(id) {
  let map = wichSection(id);
  let currentPrio = map.get(`${id}`)["importance"];
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
  } else {
    result = currentPrio;
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
  let idCard = draggedItem.id.slice(-1);
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
