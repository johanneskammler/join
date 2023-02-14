let tasks = [];
let selectedContacts = [];
let importance;
let subtasks = [];
let selectedSubtasks = [];
let newCategories = [];
let categoryName;
let categoryColor;
let contacts;
let newContactAddTaskActive = true;

setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function addToTasks() {
  if (selectedContacts.length == 0) {
    alert("Please select at least one contact!");
  } else {
    triggerAddedToBoardButton();

    let title = document.getElementById("title-input");
    let date = document.getElementById("select-date");
    let category = document.getElementById("select-category");
    let description = document.getElementById("description-input");

    let task = {
      title: title.value,
      contacts: selectedContacts,
      date: date.value,
      category: category.innerText,
      categorycolor: categoryColor,
      importance: importance,
      description: description.value,
      subtasks: selectedSubtasks,
    };
    selectedContacts = []; // Du hast es in resetTasksInput drin aber es hat es nicht geleert, bei mir sind 2 tasks mit den Selben Kontackten erschienen jedesmal, weil er bsw erte task leer also ohne kontackte gespeichert zweite task mit und komischerweise hat er den ersten task auch dann selben kontackt reingeschrieben, wahrscheinlich weil des array selectedContacts nicht leer war. Logisch ist es nicht aber jetzt gehts wieder
    tasks.push(task);
    console.log(tasks);
    resetTasksInputs(
      title,
      selectedContacts,
      date,
      categoryColor,
      description,
      selectedSubtasks
    );
    resetImportanceButtons();

    await backend.setItem("tasks", JSON.stringify(tasks));
  }
}

function hoverAddtaskHtml() {
  document
    .getElementById("add-task-html")
    .classList.add("section-background-normal");
  document.getElementById("addtask_bg").classList.remove("section-background");
}

function hoverAddtaskRespons() {
  document
    .getElementById("board_bg")
    .classList.remove("section-background-normal");
  document.getElementById("addtask_bg").classList.add("section-background");
}

function triggerAddedToBoardButton() {
  document.getElementById("task-added-to-board").classList.remove("d-none");
  setTimeout(resetAddedButton, 3000);
}

function resetAddedButton() {
  document.getElementById("task-added-to-board").classList.add("d-none");
}

function resetTasksInputs(
  title,
  selectedContacts,
  date,

  selectedSubtasks
) {
  title.value = "";
  selectedContacts = [];
  date.value = "";
  categoryColor = "";
  document.getElementById("description-input").value = "";
  selectedSubtasks = [];
  document.getElementById("select-category").innerHTML = resetCategory();
  resetCheckboxes();
}

function resetImportanceButtons() {
  document.getElementById("importance-button1").style = "display: flex;";
  document.getElementById("importance-button1-colored").style =
    "display: none;";
  document.getElementById("importance-button2").style = "display: flex;";
  document.getElementById("importance-button2-colored").style =
    "display: none;";
  document.getElementById("importance-button3").style = "display: flex;";
  document.getElementById("importance-button3-colored").style =
    "display: none;";
}

async function init() {
  await includeHTML();
  checkSize();
  await renderContacts();
  hoverAddTaskHtml();
  await downloadFromServer();
  tasks = (await JSON.parse(backend.getItem("tasks"))) || [];
  contacts = (await JSON.parse(backend.getItem("contacts"))) || [];
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("select-date").setAttribute("min", today);
}

function hoverAddTaskHtml() {
  document.getElementById("add-task-html").classList.add("add_task_html");
}

function checkSize() {
  let size = window.innerWidth;
  if (size < 1024) {
    sidebarTabled();
    hoverAddtaskRespons();
  } else if (size > 1024) {
    enableSidebar();
    hoverAddtaskHtml();
  }
}

function sidebarTabled() {
  document.getElementById("sidebar").classList.remove("sidebar");
  document.getElementById("sidebar").classList.add("tablet-sidebar");
  document.getElementById("help-section-btn").classList.add("d-none");
  document.getElementById("create-btn-responsive").classList.remove("d-none");
  document.getElementById("header-name-resp").classList.remove("d-none");
}

function enableSidebar() {
  document.getElementById("sidebar").classList.add("sidebar");
  document.getElementById("sidebar").classList.remove("tablet-sidebar");
  document.getElementById("help-section-btn").classList.remove("d-none");
  document.getElementById("create-btn-responsive").classList.add("d-none");
  document.getElementById("header-name-resp").classList.add("d-none");
}

async function renderContacts() {
  contacts = (await JSON.parse(backend.getItem("contacts"))) || [];

  // list contacts in slphabetical order
  contacts.sort((a, b) => (a.name > b.name ? 1 : -1));

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    document.getElementById("contacts-drop-down").innerHTML +=
      generateHTMLcontacts(element, i);
  }
}

function addContactToTask(i) {
  let contact = document.getElementById("contacts-checkbox-" + i).value;

  if (selectedContacts.includes(contact)) {
    selectedContacts.splice(i, 1);
    console.log(selectedContacts);
  } else {
    selectedContacts.push(contact);
    console.log(selectedContacts);
  }
}

function fillCategory(category) {
  let categoryField = document.getElementById("select-category");

  if (category == "sales") {
    categoryField.innerHTML = "";
    categoryField.innerHTML += setCategoryToSales();
    openCategoriesToSelect();
    categoryColor = "#df1c9f";
  } else if (category == "backoffice") {
    categoryField.innerHTML = "";
    categoryField.innerHTML += setCategoryToBackoffice();
    openCategoriesToSelect();
    categoryColor = "#22bfc7";
  } else {
    categoryField.innerHTML = "";
    categoryField.innerHTML += setCategoryToNewCategory(
      categoryName,
      categoryColor,
      newCategories
    );
    openCategoriesToSelect();
  }
}

function createNewCategory() {
  document.getElementById("new-category-input").value = "";
  openCategoriesToSelect();
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
}

function createNewSubtask() {
  document.getElementById("plus-icon").classList.add("d-none");
  document.getElementById("new-subtask-accept").classList.remove("d-none");
}

function addSubtask() {
  let newSubtask = document.getElementById("add-subtask").value;
  subtasks.push(newSubtask);
  document.getElementById("add-subtask").value = "";
  document.getElementById("plus-icon").classList.remove("d-none");
  document.getElementById("new-subtask-accept").classList.add("d-none");
  renderSubtasks();
}

function backToSubtasks() {
  document.getElementById("plus-icon").classList.remove("d-none");
  document.getElementById("new-subtask-accept").classList.add("d-none");
  document.getElementById("add-subtask").value = "";
}

function renderSubtasks() {
  document.getElementById("subtask-content").innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    document.getElementById("subtask-content").innerHTML += generateHTMLsubtask(
      subtask,
      i
    );
  }
}

function addSubtaskToTask(i) {
  let subtask = document.getElementById("subtasks-checkbox-" + i).value;

  if (selectedSubtasks.includes(subtask)) {
    selectedSubtasks.splice(i, 1);
    console.log(selectedSubtasks);
  } else {
    selectedSubtasks.push(subtask);
    console.log(selectedSubtasks);
  }
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

let contactsRendered = false;
function openContactsToSelect() {
  if (!contactsRendered) {
    renderContacts();
    contactsRendered = true;
  }
  let ddContacts = document.getElementById("contacts-drop-down");
  let overlay = document.getElementById("overlay-contacts");
  ddContacts.classList.toggle("d-none");
  ddContacts.classList.toggle("contacts-z");
  overlay.classList.toggle("overlay-z");
}

function openCategoriesToSelect() {
  let ddCategories = document.getElementById("categories-drop-down");
  let overlay = document.getElementById("overlay-categories");
  ddCategories.classList.toggle("d-none");
  ddCategories.classList.toggle("contacts-z");
  overlay.classList.toggle("overlay-z");
}

function resetCheckboxes() {
  for (let i = 0; i < contacts.length; i++) {
    document.getElementById(`contacts-checkbox-${i}`).checked = false;
  }
}

function clearAllInputFields() {
  document.getElementById("title-input").value = "";
  document.getElementById("select-date").value = "";
  document.getElementById("description-input").value = "";
  document.getElementById("add-subtask").value = "";
  document.getElementById("new-subtask-accept").classList.add("d-none");
  document.getElementById("plus-icon").classList.remove("d-none");
  resetImportanceButtons();
  selectedContacts = [];
  categoryColor = "";
  selectedSubtasks = [];
  document.getElementById("select-category").innerHTML = resetCategory();
  resetCheckboxes();
}

function newContactAddTask() {
  if (newContactAddTaskActive) {
    let invateContact = document.getElementById("new_contact");
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

function newContactAddTaskReturn() {
  let invateContact = document.getElementById("new_contact");
  invateContact.classList.add("contacts-list-elem");
  invateContact.classList.add("new-contact");
  invateContact.classList.remove("invate-class");
  invateContact.innerHTML = `
  <span class="rendered-contact-name"
  >Invite new contact</span
    >
    <img src="../add_task/img-add_task/contact_blue.png" />`;
  newContactAddTaskActive = true;
}

let email;
function addNameNewContact() {
  let invateNewContactEmail = document.getElementById("add_task_email").value;
  email = [String(invateNewContactEmail)];
  let invateContact = document.getElementById("new_contact");
  invateContact.innerHTML = `<div class="new-contact-add-task">
                                  <input onkeyup="" type="text" placeholder="First and Lastname" class="add-subtask correct-width" id="add_task_name"> 
                                    <div id="new-subtask-accept" class="new-subtask-accept m-i-e">
                                      <img onmouseup="newContactAddTaskReturn()" src="../add_task/img-add_task/x_blue.png">
                                      <span>|</span>
                                      <img onmouseup="creatNewContactAddTask()" src="../add_task/img-add_task/check_blue.png">
                                   </div>
                                </div>`;
}

async function creatNewContactAddTask() {
  let invateNewContactName = document.getElementById("add_task_name").value;
  await invateCreateNewContact(invateNewContactName, email);
}

async function invateCreateNewContact(invateNewContactName, email) {
  let invateContacts = [];
  let firstletter = getFirstLetterInvate(invateNewContactName);
  let color = getNewColorContact();
  let contact = {
    name: invateNewContactName,
    mail: email,
    firstletter: firstletter,
    color: color,
  };

  // if anweisung mit indexOf
  invateContacts.push(contact);
  await backend.setItem("contacts", JSON.stringify(invateContacts));
  newContactAddTaskReturn();
  openContactsToSelect();
}

function getFirstLetterInvate(contact) {
  let contacts = [contact];
  let letterList;

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let name = element.split(" ");
    let firstLetter = name[0].split("");
    let secondLetter = name[1].split("");
    let firstLetters = firstLetter[0] + secondLetter[0];

    letterList = firstLetters;
  }

  return letterList;
}

function getNewColorContact() {
  let symbols, color;
  symbols = "0123456789ABCDEF";
  color = "#";

  for (let f = 0; f < 6; f++) {
    color = color + symbols[Math.floor(Math.random() * 16)];
    return color;
  }
}
