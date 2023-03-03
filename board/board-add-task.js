let tasks = [];
let selectedContacts = [];
let subtasks = [];
let selectedSubtasks = [];
let newCategories = [];
let categoryName;
let categoryColor;
let importance;
let newContactAddTaskActive = true;
let showCurrentUserNameForSummery;
let urgentCounter;
let contacts;
let exist;
let currentContacts = [];
let filled = false;
let checkedEdit = [];
setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function getUrgentCounter() {
  urgentCounter = (await backend.getItem("urgentCounter")) || 0;
  urgentCounter = parseInt(urgentCounter);
}

async function getCurrentContacts() {
  currentContacts = await JSON.parse(backend.getItem("contacts"));
}

async function addToTasks() {
  if (filled == false) {
    return;
  }
  let btn = document.getElementById("submit-btn");
  btn.classList.remove("opacity");

  let title = document.getElementById("title-input");
  let category = document.getElementById("select-category");
  let date = document.getElementById("select-date-task");
  let description = document.getElementById("description-input");
  let contactsData = contactToSave(selectedContacts);
  selectedSubtasks = subtasks;

  let task = {
    title: title.value,
    contacts: contactsData[0],
    letters: contactsData[2],
    colors: contactsData[1],
    date: date.value,
    category: category.innerText,
    categorycolor: categoryColor,
    importance: importance,
    description: description.value,
    subtasks: selectedSubtasks,
  };
  selectedContacts = []; // Du hast es in resetTasksInput drin aber es hat es nicht geleert, bei mir sind 2 tasks mit den Selben Kontackten erschienen jedesmal, weil er bsw erte task leer also ohne kontackte gespeichert zweite task mit und komischerweise hat er den ersten task auch dann selben kontackt reingeschrieben, wahrscheinlich weil des array selectedContacts nicht leer war. Logisch ist es nicht aber jetzt gehts wieder
  tasks.push(task);
  resetTasksInputs(
    title,
    selectedContacts,
    date,
    categoryColor,
    description,
    selectedSubtasks
  );
  resetImportanceButtons();

  await backend.setItem("urgentCounter", JSON.stringify(urgentCounter));
  await backend.setItem("tasks", JSON.stringify(tasks));
  tasks = [];
  closeAddTask();
  setTasks();
  setTimeout(activateDragAndDrop, 200); /* setCards(); */
}

function contactToSave(selectedContacts) {
  let names = [];
  let colors = [];
  let letters = [];
  let list = JSON.parse(backend.getItem("contacts"));
  for (let j = 0; j < selectedContacts.length; j++) {
    const selected = selectedContacts[j];
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element["name"] == selected) {
        names.push(element["name"]);
        colors.push(element["color"]);
        letters.push(element["firstLetters"]);
      }
    }
  }
  let data = [names, colors, letters];
  return data;
}

function allFieldsFilled() {
  let title = document.getElementById("title-input");
  let description = document.getElementById("description-input");
  let category = document.getElementById("select-category"); // .innerHTML.includes('Select')
  let date = document.getElementById("select-date-task"); // value
  contacts = selectedContacts; // length

  let result = "";

  if (
    title.value.length > 0 &&
    description.value.length > 0 &&
    !category.innerHTML.includes("Select") &&
    date.value.length > 0 &&
    contacts.length >= 1
  ) {
    buttonImportanceCheck();
  } else {
    let btn = document.getElementById("submit-btn");
    btn.classList.add("opacity");
  }
}

async function buttonImportanceCheck() {
  let buttonUrgent = document.getElementById("importance-button1"); // classList
  let buttonMedium = document.getElementById("importance-button2");
  let buttonLow = document.getElementById("importance-button3");
  let result;

  if (
    buttonUrgent.classList.contains("d-none") ||
    buttonMedium.classList.contains("d-none") ||
    buttonLow.classList.contains("d-none")
  ) {
    let btn = document.getElementById("submit-btn");
    btn.classList.remove("opacity");
    filled = true;
  } else {
    let btn = document.getElementById("submit-btn");
    btn.classList.add("opacity");
  }
}

// buttonUrgent.classList.contains("d-none") ||
// buttonMedium.classList.contains("d-none") ||
// buttonLow.classList.contains("d-none")

function resetAddedButton() {
  let result = allFieldsFilled();
  if (result) {
    document.getElementById("task-added-to-board").classList.add("d-none");
  }
}

function resetTasksInputs(
  title,
  selectedContacts,
  date,
  categoryColor,

  description,
  selectedSubtasks
) {
  title.value = "";
  selectedContacts = [];
  date.value = "";
  categoryColor = "";
  description.value = "";
  selectedSubtasks = [];
  document.getElementById("select-category").innerHTML = resetCategory();
}

function resetImportanceButtons() {
  document.getElementById("importance-button1").classList.remove("d-none");
  document.getElementById("importance-button1-colored").classList.add("d-none");
  document.getElementById("importance-button2").classList.remove("d-none");
  document.getElementById("importance-button2-colored").classList.add("d-none");
  document.getElementById("importance-button3").classList.remove("d-none");
  document.getElementById("importance-button3-colored").classList.add("d-none");
}

async function renderContactsAddTask(invateNewContactName) {
  let dropdown = document.getElementById("contacts-drop-down");
  contacts = (await JSON.parse(backend.getItem("contacts"))) || [];
  contacts.sort((a, b) => (a.name > b.name ? 1 : -1));

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    if (dropdown == null) {
      dropdown = document.getElementById("contacts-drop-down-edit");
    }
    dropdown.innerHTML += generateHTMLcontactsBoard(element, i);
  }

  checkedSetting(invateNewContactName);
}

function addContactToTaskBoard(i) {
  let contact = document.getElementById("contacts-checkbox" + i).value;
  getCheckboxValue();

  if (selectedContacts.includes(contact)) {
    selectedContacts.splice(i, 1);
  } else {
    selectedContacts.push(contact);
  }
}

function fillCategory(category) {
  let categoryField = document.getElementById("select-category");

  if (category == "sales") {
    categoryField.innerHTML = "";
    categoryField.innerHTML += setCategoryToSales();
    document.getElementById("categories-drop-down").classList.add("d-none");
    categoryColor = "#df1c9f";
  } else if (category == "backoffice") {
    categoryField.innerHTML = "";
    categoryField.innerHTML += setCategoryToBackoffice();
    document.getElementById("categories-drop-down").classList.add("d-none");
    categoryColor = "#22bfc7";
  } else {
    categoryField.innerHTML = "";
    categoryField.innerHTML += setCategoryToNewCategory(
      categoryName,
      categoryColor,
      newCategories
    );
    document.getElementById("categories-drop-down").classList.add("d-none");
  }
  document.getElementById("categories-drop-down").classList.add("d-none");
}

function createNewCategory() {
  document.getElementById("new-category-input").value = "";
  document.getElementById("categories-drop-down").classList.add("d-none");
  document.getElementById("new-category-input").classList.remove("d-none");
  document.getElementById("new-category-content").classList.remove("d-none");
  document.getElementById("drop-down-arrow-categories").classList.add("d-none");
  document.getElementById("new-category-accept").classList.remove("d-none");
}

function goBackToSelectCategory() {
  document.getElementById("new-category-input").classList.add("d-none");
  document.getElementById("new-category-content").classList.add("d-none");
  document
    .getElementById("drop-down-arrow-categories")
    .classList.remove("d-none");
  document.getElementById("new-category-accept").classList.add("d-none");
  document.getElementById("select-category").innerHTML = "Select task category";
  categoryColor = "";
}

function addNewCategory() {
  categoryName = document.getElementById("new-category-input").value;
  document.getElementById("new-category-input").classList.add("d-none");
  document.getElementById("new-category-content").classList.add("d-none");
  document
    .getElementById("drop-down-arrow-categories")
    .classList.remove("d-none");
  document.getElementById("new-category-accept").classList.add("d-none");
  document.getElementById("select-category").innerHTML = "";
  document.getElementById("select-category").innerHTML = categoryName;
  newCategories.push(categoryName, categoryColor);
  renderNewCategories(categoryName, categoryColor);
}

function selectCategoryColor(color) {
  document
    .getElementById("category-color-" + color)
    .classList.toggle("select-new-category-color");
  if (
    document
      .getElementById("category-color-" + color)
      .classList.contains("select-new-category-color")
  ) {
    categoryColor = color;
  } else {
    categoryColor = "";
  }
}

function renderNewCategories(categoryName, categoryColor) {
  document.getElementById("categories-drop-down").innerHTML +=
    generateHTMLcategory(categoryName, categoryColor);
  // categoryName = '';
  // categoryColor = '';
}

function createNewSubtask() {
  document.getElementById("plus-icon").classList.add("d-none");
  document.getElementById("new-subtask-accept").classList.remove("d-none");
}

function addSubtask() {
  let newSubtask = document.getElementById("add-subtask").value;
  subtasks.push(newSubtask);
  renderSubtasks();
  document.getElementById("add-subtask").value = "";
  document.getElementById("plus-icon").classList.remove("d-none");
  document.getElementById("new-subtask-accept").classList.add("d-none");
}

function subtaskReturn() {
  return false;
}

function backToSubtasks() {
  document.getElementById("plus-icon").classList.remove("d-none");
  document.getElementById("new-subtask-accept").classList.add("d-none");
  document.getElementById("add-subtask").value = "";
}
let subCounterAdd = 0;

function renderSubtasks() {
  /*   document.getElementById("subtask-content").innerHTML = "";
   */
  if (subtasks.length > 0) {
    for (let i = 0; i < 1; i++) {
      const subtask = subtasks[subCounterAdd];
      document.getElementById("subtask-content").innerHTML +=
        generateHTMLsubtask(subtask, i);
      subCounterAdd++;
    }
  } else {
    for (let i = 0; i < 1; i++) {
      const subtask = subtasks[subCounterAdd++];
      document.getElementById("subtask-content").innerHTML +=
        generateHTMLsubtask(subtask, i);
      subCounterAdd++;
    }
  }
}

function addSubtaskToTask(i) {
  let subtask = document.getElementById("subtasks-checkbox-" + i).value;

  if (selectedSubtasks.includes(subtask)) {
    selectedSubtasks.splice(i, 1);
  } else {
    selectedSubtasks.push(subtask);
  }
}

function setImportanceBoard(pushed) {
  if (pushed.innerHTML.includes("Ur")) {
    importance = "Urgent";
    urgentCounter++;
  } else if (pushed.innerHTML.includes("Me")) {
    importance = "Medium";
  } else if (pushed.innerHTML.includes("Lo")) {
    importance = "Low";
  }
}

function fillImportanceButton(nr) {
  let pushed = document.getElementById(`importance-button${nr}`);
  let pushedColored = document.getElementById(`importance-button${nr}-colored`);
  setImportanceBoard(pushed);
  pushed.classList.toggle("d-none");
  pushedColored.classList.toggle("d-none");

  if (nr === 1) {
    toggleBtn2();
    toggleBtn3();
  } else if (nr === 2) {
    toggleBtn3();
    toggleBtn1();
  } else {
    toggleBtn2();
    toggleBtn1();
  }
}

function toggleBtn1() {
  let btn1 = document.getElementById("importance-button1");
  let btn1Colored = document.getElementById("importance-button1-colored");
  btn1.classList.remove("d-none");
  btn1Colored.classList.add("d-none");
}

function toggleBtn3() {
  let btn3 = document.getElementById("importance-button3");
  let btn3Colored = document.getElementById("importance-button3-colored");

  btn3.classList.remove("d-none");
  btn3Colored.classList.add("d-none");
}

function toggleBtn2() {
  let button2 = document.getElementById("importance-button2");
  let btn2Colored = document.getElementById("importance-button2-colored");

  button2.classList.remove("d-none");
  btn2Colored.classList.add("d-none");
}

function openContactsToSelect() {
  document.getElementById("categories-drop-down").classList.add("d-none");
  var element = document.getElementById("contacts-drop-down");
  element.classList.toggle("d-none");
  allFieldsFilled();
}

function openCategoriesToSelect() {
  document.getElementById("contacts-drop-down").classList.add("d-none");
  var element = document.getElementById("categories-drop-down");
  element.classList.toggle("d-none");
}

function generateHTMLcontactsBoard(element, i) {
  return `
      <div class="contacts-list-elem">
        <label class="control control-checkbox" id="selected-contact${i}">
          <div class="contacts-list-elem-box" id="${element["name"]}">
            <span class="rendered-contact-name">${element["name"]}</span>
            <input onclick="addContactToTaskBoard(${i})" id="contacts-checkbox${i}" type="checkbox" value="${element["name"]}" />
            <div id="control-indicator-${i}" class="control-indicator"></div>
          </div>
        </label>
      </div>
      `;
}

function generateHTMLcategory(categoryName, categoryColor) {
  return `
    <div onclick="fillCategory('${categoryName}')" class="categories-list-elem">
      ${categoryName}
      <img src="../add_task/img-add_task/circle_${categoryColor}.png" />
    </div>
    `;
}

function setCategoryToSales() {
  return `
      <div class="selected-category">
        Sales
        <img src="../add_task/img-add_task/circle_pink.png" />
      </div>
      `;
}

function setCategoryToBackoffice() {
  return `
      <div class="selected-category">
        Backoffice
        <img src="../add_task/img-add_task/circle_turquois.png" />
      </div>
      `;
}

function setCategoryToNewCategory(categoryName, categoryColor, newCategories) {
  return `
      <div class="selected-category">
        ${categoryName}
        <img src="../add_task/img-add_task/circle_${newCategories[1]}.png" />
      </div>
      `;
}

function resetCategory() {
  return `
    <div class="selected-category">
      Select task category
    </div>
    `;
}

function generateHTMLsubtask(subtask, i) {
  return `
      <div class="subtask-list-elem">
        <label class="control control-checkbox" id="selected-subtask">
          <div class="subtask-list-elem-box">
            <input onclick="addSubtaskToTask(${i})" id="subtasks-checkbox-${i}" type="checkbox" value="${subtask}" />
            <span class="rendered-subtask-name">${subtask}</span>
            <div class="control-indicator-subtask"></div>
          </div>
        </label>
      </div>
      `;
}

function newContactAddTask(index) {
  if (newContactAddTaskActive == true) {
    let invateContact;
    if (index == 1) {
      invateContact = document.getElementById("new_contact");
    } else if (index == 0) {
      invateContact = document.getElementById("new_contact-edit");
    }
    invateContact.innerHTML = `<div class="new-contact-add-task">
                                    <input onkeyup="" type="email" placeholder="Add Contact Email" class="add-subtask correct-width" id="add_task_email"> 
                                      <div id="new-subtask-accept" class="new-subtask-accept m-i-e">
                                        <img onmouseup="newContactAddTaskReturn()" src="../add_task/img-add_task/x_blue.png">
                                        <span>|</span>
                                        <img onclick="addNameNewContact()" src="../add_task/img-add_task/check_blue.png">
                                     </div>
                                  </div>`;
    invateContact.classList.remove("contacts-list-elem");
    invateContact.classList.remove("new-contact");
    invateContact.classList.add("invate-class");

    newContactAddTaskActive = false;
  }
}

function newContactEdit(index) {
  if (newContactAddTaskActive == true) {
    let invateContact;
    if (index == 1) {
      invateContact = document.getElementById("new_contact");
    } else if (index == 0) {
      invateContact = document.getElementById("new_contact-edit");
    }
    invateContact.innerHTML = `<div class="new-contact-add-task">
                                    <input onkeyup="" type="email" placeholder="Add Contact Email" class="add-subtask correct-width" id="add_task_email"> 
                                      <div id="new-subtask-accept" class="new-subtask-accept m-i-e">
                                        <img onmouseup="newContactAddTaskReturn()" src="../add_task/img-add_task/x_blue.png">
                                        <span>|</span>
                                        <img onclick="addNameNewContactEdit(${index})" src="../add_task/img-add_task/check_blue.png">
                                     </div>
                                  </div>`;
    invateContact.classList.remove("contacts-list-elem");
    invateContact.classList.remove("new-contact");
    invateContact.classList.add("invate-class");

    newContactAddTaskActive = false;
  }
}

function newContactAddTaskReturn() {
  let invateContact = document.getElementById("new_contact");
  let addTask = document.getElementById("add_task");

  if (addTask == null || addTask.classList.contains("d-none")) {
    invateContact = document.getElementById("new_contact-edit");
  }
  invateContact.classList.add("contacts-list-elem");
  invateContact.classList.add("new-contact");
  invateContact.classList.remove("invate-class");
  invateContact.innerHTML = `
  <span class="rendered-contact-name">Invite new contact</span>
    <img src="../add_task/img-add_task/contact_blue.png" />`;
  newContactAddTaskActive = true;
}

let email;

function addNameNewContact() {
  let emailInput = document.getElementById("add_task_email").value;
  if (!emailInput.includes(".")) {
    return;
  }
  let invateNewContactEmail = document.getElementById("add_task_email").value;
  email = [String(invateNewContactEmail)];
  let invateContact = document.getElementById("new_contact");
  if (invateContact == null) {
    invateContact = document.getElementById("new_contact-edit");
  }
  invateContact.innerHTML = `<div class="new-contact-add-task">
                                  <input onkeyup="" type="text" placeholder="First and Lastname" class="add-subtask correct-width" id="add_task_name"> 
                                    <div id="new-subtask-accept" class="new-subtask-accept m-i-e">
                                      <img onmouseup="newContactAddTaskReturn()" src="../add_task/img-add_task/x_blue.png">
                                      <span>|</span>
                                      <img onmouseup="creatNewContactAddTask()" src="../add_task/img-add_task/check_blue.png">
                                   </div>
                                </div>`;
}

function addNameNewContactEdit(index) {
  let emailInput = document.getElementById("add_task_email").value;
  if (!emailInput.includes(".")) {
    return;
  }
  let invateNewContactEmail = document.getElementById("add_task_email").value;
  email = [String(invateNewContactEmail)];
  let invateContact = document.getElementById("new_contact-edit");

  invateContact.innerHTML = `<div class="new-contact-add-task">
                                  <input onkeyup="" type="text" placeholder="First and Lastname" class="add-subtask correct-width" id="add_task_name"> 
                                    <div id="new-subtask-accept" class="new-subtask-accept m-i-e">
                                      <img onmouseup="newContactAddTaskReturn()" src="../add_task/img-add_task/x_blue.png">
                                      <span>|</span>
                                      <img onmouseup="creatNewContactEdit(${index})" src="../add_task/img-add_task/check_blue.png">
                                   </div>
                                </div>`;
}

let checkedIndex = [];
async function creatNewContactAddTask() {
  let invateNewContactName = document.getElementById("add_task_name").value;
  if (invateNewContactName == "") {
    return;
  }
  await invateCreateNewContact(invateNewContactName, email);
  getCheckboxValue(invateNewContactName);
}

async function creatNewContactEdit(id) {
  let invateNewContactName = document.getElementById("add_task_name").value;
  selectedContacts.push(invateNewContactName);
  await invateCreateNewContact(invateNewContactName, email, id);
  setTimeout(contactsCheckboxUpdate, 400, id);

  getCheckboxValue(invateNewContactName);
}

async function invateCreateNewContact(invateNewContactName, email, id) {
  let invateContacts = [];
  let firstletter = getFirstLetterInvate(invateNewContactName);
  let color = getNewColorContacts();
  let contact = {
    name: invateNewContactName,
    mail: email,
    firstletter: firstletter,
    color: color,
  };
  exist = (await JSON.parse(backend.getItem("contacts"))) || [];
  exist.push(contact);
  await backend.setItem("contacts", JSON.stringify(exist));
  let indexLength;

  if (exist.length > 0) {
    indexLength = exist.length;
  }
  // contacts = exist;

  // if anweisung mit indexOf
  newContactAddTaskReturn();
  clearContactsBeforeRendering(indexLength);
  renderContactsAddTask(invateNewContactName);
}

async function getCheckboxValue(invateNewContactName) {
  if (!invateNewContactName == undefined) {
    selectedContacts.push(invateNewContactName);
  }
  checkedIndex = [];
  if (currentContacts == null) {
    checkedIndex.push(0);
  } else {
    for (let i = 0; i < currentContacts.length; i++) {
      const element = document.getElementById(`contacts-checkbox${i}`);
      if (element == null) {
        continue;
      }
      if (element.checked === true) {
        checkedIndex.push(i);
      }
      if (checkedEdit.indexOf(checkedIndex) < 0) {
        checkedEdit.push(checkedIndex);
      }
    }
  }
}

async function checkedSetting(invateNewContactName) {
  if (invateNewContactName == undefined) {
    return;
  }
  selectedContacts.push(invateNewContactName);
  if (selectedContacts.length > 1) {
    for (let i = 0; i < selectedContacts.length; i++) {
      const names = selectedContacts[i];
      let docElement = document.getElementById(names);
      docElement.childNodes[3].checked = true;
    }
  } else {
    let docElement = document.getElementById(invateNewContactName);
    docElement.childNodes[3].checked = true;
  }
}

function clearContactsBeforeRendering(indexLength) {
  if (exist.length > 0) {
    for (let i = 0; i < indexLength - 1; i++) {
      // const element = contacts[i];
      let contact = document.getElementById(`selected-contact${i}`);
      if (contact == null) {
        continue;
      }
      contact.parentElement.remove();
    }
  }
}

function getFirstLetterInvate(contact) {
  let contacts = contact;
  let letterList = [];
  if (contacts.length == 0) {
    return;
  }
  if (typeof contacts == "string") {
    contacts = contacts.split(",");
  }
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let name = element.split(" ");
    let firstLetter = name[0].split("");
    let secondLetter = name[1].split("");
    let firstLetters = firstLetter[0] + secondLetter[0];
    letterList.push(firstLetters);
  }
  return letterList;
}

function getNewColorContacts() {
  let color = "#";
  const symbols = "0123456789ABCDEF";
  for (let f = 0; f < 6; f++) {
    color += symbols[Math.floor(Math.random() * 16)];
  }
  return color;
}

function loadAtStartTask() {
  let nameTest = JSON.parse(backend.getItem("currentUser")) || [];
  if (nameTest.length < 2) {
    showCurrentUserNameForSummery = "Max Kebabman";
  } else {
    showCurrentUserNameForSummery = nameTest;
  }
  return showCurrentUserNameForSummery;
}

//  Von board-add-task den ablauf von Checked und  addContactToTaskBoard(i) zuweisung von der Variable selectedContacts  addContactToTaskBoard(i) -->  getCheckboxValue()
