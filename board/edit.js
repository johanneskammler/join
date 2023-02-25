function openEditContactsToSelect(id) {
  let element = document.getElementById("contacts-drop-down-edit");
  element.classList.toggle("d-none");
  renderContactsEdit();
  setTimeout(contactsCheckboxUpdate, 200, id);
  checkedSettingEdit(checkedEdit);
}

async function renderContactsEdit() {
  let contacts = (await JSON.parse(backend.getItem("contacts"))) || [];
  let dropdown = document.getElementById("add_task_new_render_container");
  dropdown.innerHTML = "";
  /*   let contactsDiv = document.getElementById("contacts_div");
    contactsDiv.innerHTML = ""; */

  contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    dropdown.innerHTML += generateHTMLcontacts(element, i);
  }
}

async function contactsCheckboxUpdate(id) {
  let contacts = await editContactsPopup(id);
  if (contacts == undefined) {
    return;
  }
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    if (contacts.indexOf(element) < 0) {
      let id = document.getElementById(`contacts-checkbox${element}`);
      id.checked = true;
      addContactToTask(element, id);
    }
  }
}

async function addContactToTask(element, id) {
  let contact = document.getElementById("contacts-checkbox" + element).value;

  if (selectedContacts.indexOf(contact) == -1) {
    selectedContacts.push(contact);
  } else {
    let pos = selectedContacts.indexOf(contact);
    selectedContacts.splice(pos, 1);
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
  let map = wichSection(id);
  let category = map.get(`${id}`)["category"];
  let categorycolor = map.get(`${id}`)["categorycolor"];
  let colors = map.get(`${id}`)["colors"];
  let contacts = selectedContacts;
  let date = map.get(`${id}`)["date"];
  let description = map.get(`${id}`)["description"];
  let importance = map.get(`${id}`)["importance"];
  let letters = map.get(`${id}`)["letters"];
  let subtask = map.get(`${id}`)["subtask"];
  let subtaskStatus = map.get(`${id}`)["subtaskStatus"];
  let title = map.get(`${id}`)["title"];

  map.set(`${id}`, {
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

async function checkedSettingEdit(array) {
  let people = await JSON.parse(backend.getItem("contacts"));
  if (people.length > 1) {
    people = people.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  if (people.length > 0) {
    for (let i = 0; i < people.length; i++) {
      const element = people[i]["name"];
      if (`${array}`.indexOf(element) > -1) {
        let lastContactId = document.getElementById(`contacts-checkbox${i}`);
        lastContactId.checked = true;
        checkedIndex.push(array);
      }
    }
  }
  /* 
  for (let i = 0; i < people.length; i++) {
    let theName = people[i]["name"];
    for (let j = 0; j < selectedContacts.length; j++) {
      const selected = selectedContacts[j];
      if (theName.indexOf(selected) > -1) {
        let theIndex = i;
        document.getElementById(`contacts-checkbox-${theIndex}`).checked = true;
      }
    }
  } */
}
