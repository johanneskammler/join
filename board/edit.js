let task = JSON.parse(backend.getItem("tasks")) || [];

let selectedContacts = [];
let importance;
let subtasksEdit = []; // subtask is not defined <<<----   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let selectedSubtasks = [];
let newCategories = [];
let categoryName;
let categoryColor;

function openContactsToSelect() {
  var element = document.getElementById("contacts-drop-down");
  element.classList.toggle("d-none");
  renderContactsEdit();
}

async function renderContactsEdit() {
  let url = "../contacts.json";
  let response = await fetch(url);
  let contacts = await response.json();

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    document.getElementById("contacts-drop-down").innerHTML +=
      generateHTMLcontacts(element, i);
  }
}

function generateHTMLcontacts(element, i) {
  return `
    <div class="contacts-list-elem">
      <label class="control control-checkbox" id="selected-contact">
        <div class="contacts-list-elem-box">
          <span class="rendered-contact-name">${element["name"]}</span>
          <input onclick="addContactToTask(${i})" id="contacts-checkbox-${i}" type="checkbox" value="${element["name"]}" />
          <div id="control-indicator" class="control-indicator"></div>
        </div>
      </label>
    </div>
    `;
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