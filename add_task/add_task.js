let tasks = [];
// setURL("https://gruppe-417.developerakademie.net/smallest_backend_ever");

function addToTasks() {
  let title = document.getElementById("title-input");
  let date = document.getElementById("select-date");
  let category = document.getElementById("select-category");
  let description = document.getElementById("description-input");

  let task = {
    'title': title.value,
    'date': date.value,
    'category': category.innerText,
    'decription': description.value,
  };

  tasks.push(task);
  console.log(tasks);
  title.value = "";
  date.value = "";
  description.value = "";
}


async function init() {
  await includeHTML();
  checkSize();
  renderContacts();

  // await downloadFromServer();
  // tasks = JSON.parse(backend.getItem('tasks')) || [];
}

function checkSize() {
  let size = window.innerWidth;
  if (size < 1024) {
    sidebarTabled();
  } else if (size > 1024) {
    enableSidebar();
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
  let url = "../contacts.json";
  let response = await fetch(url);
  let contacts = await response.json();

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    document.getElementById("contacts-drop-down").innerHTML += generateHTMLcontacts(element);
  }
}


function fillCategory(category) {
  let categoryField = document.getElementById("select-category");

  if (category == "sales") {
    categoryField.innerHTML = "";
    categoryField.innerHTML += setCategoryToSales();
    document.getElementById("categories-drop-down").classList.add("d-none");
  } else if (category == "backoffice") {
    categoryField.innerHTML = "";
    categoryField.innerHTML += setCategoryToBackoffice();
  }
  document.getElementById("categories-drop-down").classList.add("d-none");
}


function createNewCategory() {
  document.getElementById("categories-drop-down").classList.add("d-none");
  document.getElementById("new-category-input").classList.remove("d-none");
  document.getElementById("new-category-content").classList.remove("d-none");
  document.getElementById("drop-down-arrow-categories").classList.add("d-none");
  document.getElementById("new-category-accept").classList.remove("d-none");
}

function goBackToSelectCategory() {
  document.getElementById("new-category-input").classList.add("d-none");
  document.getElementById("new-category-content").classList.add("d-none");
  document.getElementById("drop-down-arrow-categories").classList.remove("d-none");
  document.getElementById("new-category-accept").classList.add("d-none");
  document.getElementById("select-category").innerHTML = "Select task category";
}

function addNewCategory() {
  let newCategory = document.getElementById("new-category-input");
  document.getElementById("new-category-input").classList.add("d-none");
  document.getElementById("new-category-content").classList.add("d-none");
  document.getElementById("drop-down-arrow-categories").classList.remove("d-none");
  document.getElementById("new-category-accept").classList.add("d-none");
  document.getElementById("select-category").innerHTML = "";
  document.getElementById("select-category").innerHTML = newCategory.value;
}


function createNewSubtask() {
  document.getElementById('plus-icon').classList.add('d-none');
  document.getElementById('new-subtask-accept').classList.remove('d-none');
}

function addSubtask() {
  let newSubtask = document.getElementById('add-subtask').value;
  if (newSubtask == '') {
    return false;
  } else {
    document.getElementById('subtask-content').innerHTML += generateHTMLsubtask(newSubtask);
  }
  document.getElementById('add-subtask').value = '';
  document.getElementById('plus-icon').classList.remove('d-none');
  document.getElementById('new-subtask-accept').classList.add('d-none');
}


function backToSubtasks() {
  document.getElementById('plus-icon').classList.remove('d-none');
  document.getElementById('new-subtask-accept').classList.add('d-none');
}


function fillImportanceButton1() {
  document.getElementById("importance-button1").style = "display: none;";
  document.getElementById("importance-button1-colored").style = "display: flex; cursor: pointer;";
  document.getElementById("importance-button2").style = "display: flex;";
  document.getElementById("importance-button2-colored").style = "display: none;";
  document.getElementById("importance-button3").style = "display: flex;";
  document.getElementById("importance-button3-colored").style = "display: none;";
}

function emptyImportanceButton1() {
  document.getElementById("importance-button1").style = "display: flex;";
  document.getElementById("importance-button1-colored").style = "display: none;";
}

function fillImportanceButton2() {
  document.getElementById("importance-button2").style = "display: none;";
  document.getElementById("importance-button2-colored").style = "display: flex; cursor: pointer;";
  document.getElementById("importance-button1").style = "display: flex;";
  document.getElementById("importance-button1-colored").style = "display: none;";
  document.getElementById("importance-button3").style = "display: flex;";
  document.getElementById("importance-button3-colored").style = "display: none;";
}

function emptyImportanceButton2() {
  document.getElementById("importance-button2").style = "display: flex;";
  document.getElementById("importance-button2-colored").style = "display: none;";
}

function fillImportanceButton3() {
  document.getElementById("importance-button3").style = "display: none;";
  document.getElementById("importance-button3-colored").style = "display: flex; cursor: pointer;";
  document.getElementById("importance-button1").style = "display: flex;";
  document.getElementById("importance-button1-colored").style = "display: none;";
  document.getElementById("importance-button2").style = "display: flex;";
  document.getElementById("importance-button2-colored").style = "display: none;";
}

function emptyImportanceButton3() {
  document.getElementById("importance-button3").style = "display: flex;";
  document.getElementById("importance-button3-colored").style = "display: none;";
}

function openContactsToSelect() {
  document.getElementById("categories-drop-down").classList.add("d-none");
  var element = document.getElementById("contacts-drop-down");
  element.classList.toggle("d-none");
}

function openCategoriesToSelect() {
  document.getElementById("contacts-drop-down").classList.add("d-none");
  var element = document.getElementById("categories-drop-down");
  element.classList.toggle("d-none");
}

// async function contactAsJson() {
//   let path = "../cards.json";
//   let response = await fetch(path);
//   let responseAsJson = await response.json();

//   console.log(responseAsJson);
// }