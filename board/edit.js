/*let selectedContacts = [];
let importance;
let subtasksEdit = []; // subtask is not defined <<<----   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let selectedSubtasks = [];
let newCategories = [];
let categoryName;
let categoryColor; */

function openEditContactsToSelect(id) {
  var element = document.getElementById("contacts-drop-down");
  element.classList.toggle("d-none");
  renderContactsEdit();
  setTimeout(contactsCheckboxUpdate, 200, id);
}

async function renderContactsEdit() {
  /*   let url = "../contacts.json";
  let response = await fetch(url); */
  let contacts = (await JSON.parse(backend.getItem("contacts"))) || [];
  contacts.sort((a, b) => (a.name > b.name ? 1 : -1));

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    document.getElementById("contacts-drop-down").innerHTML +=
      generateHTMLcontacts(element, i);
  }
}

function generateHTMLcontacts(element, i) {
  return `
    <div class="contacts-list-elem">
      <label class="control control-checkbox" id="selected-contact" onmouseup="addContactToTask(${i})">
        <div class="contacts-list-elem-box">
          <span id="name${i}" class="rendered-contact-name">${element["name"]}</span>
          <input id="contacts-checkbox-${i}" type="checkbox" value="${element["name"]}" />
          <div id="control-indicator${i}" class="control-indicator control-setup"></div>
        </div>
      </label>
    </div>
    `;
}

function contactsCheckboxUpdate(id) {
  let contacts = editContactsPopup(id);
  if (contacts == undefined) {
    return;
  }
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let id = document.getElementById(`contacts-checkbox-${element}`);
    id.checked = true;
    addContactToTask(element, id);
  }
}

async function addContactToTask(element, id) {
  let contact = document.getElementById("contacts-checkbox-" + element).value;

  if (selectedContacts.indexOf(contact) == -1) {
    selectedContacts.push(contact);
    console.log(selectedContacts);
  } else {
    let pos = selectedContacts.indexOf(contact);
    selectedContacts.splice(pos, 1);
    console.log(selectedContacts);
  }
  await safeEdit(id, selectedContacts);
}

async function safeEdit(id, selectedContacts) {
  let map = wichSection(id);
  if (map == todosMap) {
    setupTodosMap(id, selectedContacts);
  } else if (map == progressesMap) {
    setupTodosMap(id, selectedContacts);
  } else if (map == feedbacksMap) {
    setupTodosMap(id, selectedContacts);
  } else if (map == donesMap) {
    setupTodosMap(id, selectedContacts);
  }
  await saveMaps();
}

function setupTodosMap(id, selectedContacts) {
  let category = todosMap.get(`${id}`)["category"];
  let categorycolor = todosMap.get(`${id}`)["categorycolor"];
  let colors = todosMap.get(`${id}`)["colors"];
  let contacts = selectedContacts;
  let date = todosMap.get(`${id}`)["date"];
  let description = todosMap.get(`${id}`)["description"];
  let importance = todosMap.get(`${id}`)["importance"];
  let letters = todosMap.get(`${id}`)["letters"];
  let subtask = todosMap.get(`${id}`)["subtask"];
  let subtaskStatus = todosMap.get(`${id}`)["subtaskStatus"];
  let title = todosMap.get(`${id}`)["title"];

  todosMap.set(`${id}`, {
    category: `${category}`,
    categorycolor: `${categorycolor}`,
    colors: `${colors}`,
    contacts: `${contacts}`,
    date: `${date}`,
    description: `${description}`,
    importance: `${importance}`,
    letters: `${letters}`,
    subtask: `${subtask}`,
    subtaskStatus: `${subtaskStatus}`,
    title: `${title}`,
  });
}

function setupFeedbacksMap(id, selectedContacts) {
  let category = feedbacksMap.get(`${id}`)["category"];
  let categorycolor = feedbacksMap.get(`${id}`)["categorycolor"];
  let colors = feedbacksMap.get(`${id}`)["colors"];
  let contacts = selectedContacts;
  let date = feedbacksMap.get(`${id}`)["date"];
  let description = feedbacksMap.get(`${id}`)["description"];
  let importance = feedbacksMap.get(`${id}`)["importance"];
  let letters = feedbacksMap.get(`${id}`)["letters"];
  let subtask = feedbacksMap.get(`${id}`)["subtask"];
  let subtaskStatus = feedbacksMap.get(`${id}`)["subtaskStatus"];
  let title = feedbacksMap.get(`${id}`)["title"];

  feedbacksMap.set(`${id}`, {
    category: `${category}`,
    categorycolor: `${categorycolor}`,
    colors: `${colors}`,
    contacts: `${contacts}`,
    date: `${date}`,
    description: `${description}`,
    importance: `${importance}`,
    letters: `${letters}`,
    subtask: `${subtask}`,
    subtaskStatus: `${subtaskStatus}`,
    title: `${title}`,
  });
}

function setupDonesMap(id, selectedContacts) {
  let category = donesMap.get(`${id}`)["category"];
  let categorycolor = donesMap.get(`${id}`)["categorycolor"];
  let colors = donesMap.get(`${id}`)["colors"];
  let contacts = selectedContacts;
  let date = donesMap.get(`${id}`)["date"];
  let description = donesMap.get(`${id}`)["description"];
  let importance = donesMap.get(`${id}`)["importance"];
  let letters = donesMap.get(`${id}`)["letters"];
  let subtask = donesMap.get(`${id}`)["subtask"];
  let subtaskStatus = donesMap.get(`${id}`)["subtaskStatus"];
  let title = donesMap.get(`${id}`)["title"];

  donesMap.set(`${id}`, {
    category: `${category}`,
    categorycolor: `${categorycolor}`,
    colors: `${colors}`,
    contacts: `${contacts}`,
    date: `${date}`,
    description: `${description}`,
    importance: `${importance}`,
    letters: `${letters}`,
    subtask: `${subtask}`,
    subtaskStatus: `${subtaskStatus}`,
    title: `${title}`,
  });
}

function setupProgressesMap(id, selectedContacts) {
  let category = progressesMap.get(`${id}`)["category"];
  let categorycolor = progressesMap.get(`${id}`)["categorycolor"];
  let colors = progressesMap.get(`${id}`)["colors"];
  let contacts = selectedContacts;
  let date = progressesMap.get(`${id}`)["date"];
  let description = progressesMap.get(`${id}`)["description"];
  let importance = progressesMap.get(`${id}`)["importance"];
  let letters = progressesMap.get(`${id}`)["letters"];
  let subtask = progressesMap.get(`${id}`)["subtask"];
  let subtaskStatus = progressesMap.get(`${id}`)["subtaskStatus"];
  let title = progressesMap.get(`${id}`)["title"];

  progressesMap.set(`${id}`, {
    category: `${category}`,
    categorycolor: `${categorycolor}`,
    colors: `${colors}`,
    contacts: `${contacts}`,
    date: `${date}`,
    description: `${description}`,
    importance: `${importance}`,
    letters: `${letters}`,
    subtask: `${subtask}`,
    subtaskStatus: `${subtaskStatus}`,
    title: `${title}`,
  });
}

/* umschreiben für edit

function addToTasks() {
  triggerAddedToBoardButton();

  let title = document.getElementById("title-input");
  let date = document.getElementById("select-date");
  let category = document.getElementById("select-category");
  let description = document.getElementById("description-input");

  let task = {
    'title': title.value,
    'contacts': selectedContacts,
    'date': date.value,
    'category': category.innerText,
    'category-color': categoryColor,
    'importance': importance,
    'decription': description.value,
    'subtasks': selectedSubtasks
  };

  tasks.push(task);
  console.log(tasks);
  resetTasksInputs(title, selectedContacts, date, categoryColor, description, selectedSubtasks);
  resetImportanceButtons();

  backend.setItem("tasks", JSON.stringify(tasks));
} */

function fillImportanceButton1() {
  importance = "urgent";
  document.getElementById("importance-button1").style = "display: none;";
  document.getElementById("importance-button1-colored").style =
    "display: flex; cursor: pointer;";
  document.getElementById("importance-button2").style = "display: flex;";
  document.getElementById("importance-button2-colored").style =
    "display: none;";
  document.getElementById("importance-button3").style = "display: flex;";
  document.getElementById("importance-button3-colored").style =
    "display: none;";
}

function emptyImportanceButton1() {
  importance = "";
  document.getElementById("importance-button1").style = "display: flex;";
  document.getElementById("importance-button1-colored").style =
    "display: none;";
}

function fillImportanceButton2() {
  importance = "medium";
  document.getElementById("importance-button2").style = "display: none;";
  document.getElementById("importance-button2-colored").style =
    "display: flex; cursor: pointer;";
  document.getElementById("importance-button1").style = "display: flex;";
  document.getElementById("importance-button1-colored").style =
    "display: none;";
  document.getElementById("importance-button3").style = "display: flex;";
  document.getElementById("importance-button3-colored").style =
    "display: none;";
}

function emptyImportanceButton2() {
  importance = "";
  document.getElementById("importance-button2").style = "display: flex;";
  document.getElementById("importance-button2-colored").style =
    "display: none;";
}

function fillImportanceButton3() {
  importance = "low";
  document.getElementById("importance-button3").style = "display: none;";
  document.getElementById("importance-button3-colored").style =
    "display: flex; cursor: pointer;";
  document.getElementById("importance-button1").style = "display: flex;";
  document.getElementById("importance-button1-colored").style =
    "display: none;";
  document.getElementById("importance-button2").style = "display: flex;";
  document.getElementById("importance-button2-colored").style =
    "display: none;";
}

function emptyImportanceButton3() {
  importance = "";
  document.getElementById("importance-button3").style = "display: flex;";
  document.getElementById("importance-button3-colored").style =
    "display: none;";
}
