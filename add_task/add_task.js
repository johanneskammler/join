let tasks = [];


function addToTasks() {
  let title = document.getElementById('title-input');
  let date = document.getElementById('select-date');
  let description = document.getElementById('description-input');

  let task = {
    "title": title.value,
    "date": date.value,
    "decription": description.value
  }

  tasks.push(task);
  console.log(tasks);
  title.value = '';
  date.value = '';
  description.value = '';
}


async function init() {
  await includeHTML();
  checkSize();
  renderContacts();
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
  let url = '../contacts.json';
  let response = await fetch(url);
  let contacts = await response.json();

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];

    document.getElementById('contacts-drop-down').innerHTML += `
    <div class="contacts-list-elem">
      <label class="control control-checkbox">
        <div class="contacts-list-elem-box">
          <span class="rendered-contact-name">${element['name']}</span>
          <input type="checkbox" />
          <div class="control_indicator"></div>
        </div>
      </label>
    </div>
        `;
  }
}


function fillCategory(category) {
  let categoryField = document.getElementById('select-category');

  if (category == 'sales') {
    categoryField.innerHTML = '';
    categoryField.innerHTML += `
    <div class="selected-category">
      Sales
      <img src="../add_task/img-add_task/circle_pink.png" />
    </div>
    `;
    document.getElementById('categories-drop-down').classList.add('d-none');
  } else if (category == 'backoffice') {
    categoryField.innerHTML = '';
    categoryField.innerHTML += `
    <div class="selected-category">
      Backoffice
      <img src="../add_task/img-add_task/circle_turquois.png" />
    </div>
    `;
  }
  document.getElementById('categories-drop-down').classList.add('d-none');
}


function fillImportanceButton1() {
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
  document.getElementById("importance-button1").style = "display: flex;";
  document.getElementById("importance-button1-colored").style =
    "display: none;";
}


function fillImportanceButton2() {
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
  document.getElementById("importance-button2").style = "display: flex;";
  document.getElementById("importance-button2-colored").style =
    "display: none;";
}


function fillImportanceButton3() {
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
  document.getElementById("importance-button3").style = "display: flex;";
  document.getElementById("importance-button3-colored").style =
    "display: none;";
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


async function contactAsJson() {
  let path = "../cards.json";
  let respons = await fetch(path);
  let responsAsJson = await respons.json();

  console.log(responsAsJson);
}