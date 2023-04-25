let tasks = [];
let selectedContacts = [];
let importance;
let subtasks = [];
let selectedSubtasks = [];
let newCategories = [];
let categoryName;
let categoryColor;
let categoryColorTrue;
let contacts;
let newContactAddTaskActive = true;
let urgentCounter;

setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function getUrgentCounter() {
  urgentCounter = (await backend.getItem("urgentCounter")) || 0;
  urgentCounter = parseInt(urgentCounter);
}

async function addToTasks() {
  let contactsSmalView = document.getElementById("contacts_box");
  if (selectedContacts.length == 0) {
    alert("Please select at least one contact!");
  } else if (
    document.getElementById("select-category").innerHTML.includes("Select")
  ) {
    alert("Please select category!");
  } else {
    triggerAddedToBoardButton();
    checkImportance();

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
    selectedContacts = [];
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
    clearSubtasksAddTask();
    contactsSmalView.innerHTML = "";

    await backend.setItem("tasks", JSON.stringify(tasks));
    await backend.setItem("urgentCounter", JSON.stringify(urgentCounter));
  }
}

function clearSubtasksAddTask() {
  let subs = document.getElementById("subtask-content");
  if (subs == undefined) {
    return;
  } else {
    subs.innerHTML = "";
  }
}

function checkImportance() {
  if (importance == "urgent") {
    urgentCounter++;
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
  categoryColorTrue = "";
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
  getUrgentCounter();
}

function hoverAddTaskHtml() {
  document.getElementById("add-task-html").classList.add("add_task_html");
}

function checkSize() {
  let size = window.innerWidth;
  if (size <= 1024) {
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
  document.getElementById("header-name-resp").classList.remove("d-none");
  if (document.getElementById("create-btn-responsive") == null) {
    return;
  } else {
    document.getElementById("create-btn-responsive").classList.remove("d-none");
  }
}

function enableSidebar() {
  document.getElementById("sidebar").classList.add("sidebar");
  document.getElementById("sidebar").classList.remove("tablet-sidebar");
  document.getElementById("help-section-btn").classList.remove("d-none");
  document.getElementById("header-name-resp").classList.add("d-none");
  if (document.getElementById("create-btn-responsive") == null) {
    return;
  } else {
    document.getElementById("create-btn-responsive").classList.add("d-none");
  }
}

async function renderContacts() {
  contacts = (await JSON.parse(backend.getItem("contacts"))) || [];

  // list contacts in alphabetical order
  contacts.sort((a, b) => (a.name > b.name ? 1 : -1));

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    document.getElementById("contacts-drop-down").innerHTML +=
      generateHTMLcontacts(element, i);
  }
}

function clearContactsBeforeRendering() {
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    document.getElementById(`selected-contact-${i}`).parentElement.remove();
  }
}

function addContactToTask(i) {
  let contact = document.getElementById("contacts-checkbox-" + i).value;

  if (selectedContacts.indexOf(contact) > -1) {
    let index = selectedContacts.indexOf(contact);
    selectedContacts.splice(index, 1);
  } else {
    selectedContacts.push(contact);
  }
  renderContactsSelection(contacts);
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
      categoryColorTrue
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
  categoryColorTrue = "";
  categorySelectReset();
}

function addNewCategory() {
  if (document.getElementById("new-category-input").value == "") {
    alert("Please select a new category name!");
    document.getElementById("create-task-btn").disabled = true;
  } else if (categoryColor == undefined) {
    alert("Please select a new category color!");
    document.getElementById("create-task-btn").disabled = true;
  } else {
    document.getElementById("create-task-btn").disabled = false;
    categoryName = document.getElementById("new-category-input").value;
    document.getElementById("new-category-input").classList.add("d-none");
    document.getElementById("new-category-content").classList.add("d-none");
    document
      .getElementById("drop-down-arrow-categories")
      .classList.remove("d-none");
    document.getElementById("new-category-accept").classList.add("d-none");
    document.getElementById("select-category").innerHTML = "";
    document.getElementById("select-category").innerHTML =
      generateHTMLnewCategoryNameAndColor(
        categoryName,
        categoryColor,
        categoryColorTrue
      );
    newCategories.push(categoryName, categoryColor, categoryColorTrue);
    renderNewCategories(categoryName, categoryColor, categoryColorTrue);
  }
  categorySelectReset();
}

function selectCategoryColor(color) {
  categorySelectReset();
  document
    .getElementById("category-color-" + color)
    .classList.toggle("select-new-category-color");
  if (
    document
      .getElementById("category-color-" + color)
      .classList.contains("select-new-category-color")
  ) {
    categoryColor = color;
    categoryColorTrue = color;
  } else {
    categoryColor = "";
    categoryColorTrue = "";
  }
}

function categorySelectReset() {
  let categoryColorsList = [
    "turquois",
    "red",
    "green",
    "orange",
    "pink",
    "blue",
  ];

  for (let i = 0; i < categoryColorsList.length; i++) {
    const element = categoryColorsList[i];
    let categoryColorId = document.getElementById(`category-color-${element}`);
    categoryColorId.classList.remove("select-new-category-color");
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
  if (selectedSubtasks.indexOf(newSubtask) == -1) {
    selectedSubtasks.push(newSubtask);
  }
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
  } else {
    selectedSubtasks.push(subtask);
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
  let contacts = document.getElementById("contacts_box");
  document.getElementById("title-input").value = "";
  document.getElementById("select-date").value = "";
  document.getElementById("description-input").value = "";
  document.getElementById("add-subtask").value = "";
  document.getElementById("new-subtask-accept").classList.add("d-none");
  document.getElementById("plus-icon").classList.remove("d-none");
  resetImportanceButtons();
  selectedContacts = [];
  categoryColor = "";
  categoryColorTrue = "";
  selectedSubtasks = [];
  document.getElementById("select-category").innerHTML = resetCategory();
  resetCheckboxes();
  contacts.innerHTML = "";
}

function newContactAddTask() {
  if (newContactAddTaskActive) {
    let invateContact = document.getElementById("new_contact");
    invateContact.innerHTML = generateHTMLinviteNewContactEmail();
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
  invateContact.innerHTML = generateHTMLinviteNewContactName();
}

async function createNewContactAddTask() {
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
    firstLetters: firstletter,
    color: color,
  };
  let exist = (await JSON.parse(backend.getItem("contacts"))) || [];
  // if anweisung mit indexOf
  exist.push(contact);
  await backend.setItem("contacts", JSON.stringify(exist));
  newContactAddTaskReturn();
  clearContactsBeforeRendering();
  renderContacts();
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
  }
  return color;
}

async function renderContactsSelection(contacts, letters, colors) {
  let changedColorForDots = [];
  let cBox = document.getElementById("contacts_box");
  let currentContacts = contacts;
  let conatctsShow = [];

  for (let i = 0; i < selectedContacts.length; i++) {
    const current = selectedContacts[i];
    for (let j = 0; j < currentContacts.length; j++) {
      const contactData = currentContacts[j]["name"];
      if (contactData == current) {
        conatctsShow.push(currentContacts[j]);
      }
    }
  }
  if (selectedContacts == "") {
    cBox.innerHTML = "";
    return;
  }
  cBox.innerHTML = "";
  if (conatctsShow.length > 2) {
    for (let i = 0; i < 2; i++) {
      cBox.innerHTML += `<p class="invate-contact font-contact" style="background-color: ${conatctsShow[i]["color"]};">${conatctsShow[i]["firstLetters"]}</p>`;
    }
    changedColorForDots = "#FFAA00";
    cBox.innerHTML += `<p class="invate-contact font-contact" style="background-color: ${changedColorForDots};">...</p>`;
  } else if (conatctsShow.length == 2) {
    for (let i = 0; i < conatctsShow.length; i++) {
      cBox.innerHTML += `<p class="invate-contact font-contact" style="background-color: ${conatctsShow[i]["color"]};">${conatctsShow[i]["firstLetters"]}</p>`;
    }
  } else {
    for (let i = 0; i < conatctsShow.length; i++) {
      cBox.innerHTML += `<p class="invate-contact font-contact" style="background-color: ${conatctsShow[i]["color"]};">${conatctsShow[i]["firstLetters"]}</p>`;
    }
  }
}
