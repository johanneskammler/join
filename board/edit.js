async function openEditContactsToSelect(id) {
  let element = document.getElementById("contacts-drop-down-edit");
  let doneButton = document.getElementById("ok");

  if (doneButton.disabled == false) {
    doneButton.disabled = true;
  } else if (doneButton.disabled == true) {
    doneButton.disabled = false;
  }
  element.classList.toggle("d-none");

  renderContactsEdit();
  setTimeout(checkExistContact, 100, id);
  setSelecdetContacts(id);
}

function checkExistContact(id) {
  let element = document.getElementById("contacts-drop-down-edit");
  /* if (element.classList.contains("d-none")) {
    return;
  } */
  let map = wichSection(id);
  let contactOnCard = map.get(`${id}`)["contacts"];

  contactOnCard = checkIfString(contactOnCard);
  selectedContacts = contactOnCard;
  for (let i = 0; i < selectedContacts.length; i++) {
    const name = selectedContacts[i];
    if (selectedContacts.indexOf(name) == -1) {
      selectedContacts.push(name);
    }
    let nameId = name + "edit";
    let docElement = document.getElementById(nameId);
    if (docElement == undefined) {
      return;
    }
    docElement.childNodes[3].checked = true;
  }
}

async function renderContactsEdit() {
  let contactsEditRender =
    (await JSON.parse(backend.getItem("contacts"))) || [];
  /*   let contactsSafe = selectedContacts;
   */ let dropdown = document.getElementById("add_task_new_render_container");
  dropdown.innerHTML = "";
  /*   selectedContacts = contactsSafe;
   */
  contactsEditRender.sort((a, b) => (a.name > b.name ? 1 : -1));
  for (let i = 0; i < contactsEditRender.length; i++) {
    const element = contactsEditRender[i];
    dropdown.innerHTML += generateHTMLcontacts(element, i);
  }
}

async function contactsCheckboxUpdate(id) {
  let contacts = await editContactsPopup(id);
  let docIndex = contacts.length - 1;
  let name = contacts[docIndex];
  let docElement = document.getElementById(name);
  docElement.childNodes[3].checked = true;
  addContactToTask(docIndex, id);
}

async function addContactToTask(element, id) {
  let contact = document.getElementById(`contacts-checkbox${element}`).value;

  if (selectedContacts.indexOf(contact) == -1) {
    selectedContacts.push(contact);
  } else {
    let pos = selectedContacts.indexOf(contact);
    selectedContacts.splice(pos, 1);
  }
  await safeEdit(id, selectedContacts);
}

async function safeEdit(id, selectedContacts) {
  if (id == undefined) {
    id = globalId;
  }
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
}

function setEditPrio(id) {
  let map = wichSection(id);
  let prio = map.get(`${id}`)["importance"];
  let nr;
  if (prio.includes("urgent")) {
    nr = 4;
  } else if (prio.includes("medium")) {
    nr = 5;
  } else if (prio.includes("low")) {
    nr = 6;
  }

  let pushed = document.getElementById(`importance-button-edit-${nr}`);
  let pushedColored = document.getElementById(
    `importance-button-colored-edit-${nr}`
  );
  pushed.classList.toggle("d-none");
  pushedColored.classList.toggle("d-none");
}

function resetImportanceEdit() {
  let pushed;
  let pushedColored;
  let index = [4, 5, 6];

  for (let i = 0; i < index.length; i++) {
    const element = index[i];
    pushed = document.getElementById(`importance-button-edit-${element}`);
    pushedColored = document.getElementById(
      `importance-button-colored-edit-${element}`
    );
    pushed.classList.remove("d-none");
    pushedColored.classList.add("d-none");
  }
}
