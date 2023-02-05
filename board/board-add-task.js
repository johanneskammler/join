let tasks = [];
let selectedContacts = [];
let subtasks = [];
let selectedSubtasks = [];
let newCategories = [];
let categoryName;
let categoryColor;
let importance;
console.log(subtasks);
setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function addToTasks() {
  let title = document.getElementById("title-input");
  let category = document.getElementById("select-category");
  let date = document.getElementById("select-date-task");
  let description = document.getElementById("description-input");

  let task = {
    title: title.value,
    contacts: selectedContacts,
    date: date.value,
    category: category.innerText,
    categorycolor: categoryColor,
    importance: importance,
    decription: description.value,
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
  tasks = [];
  closeAddTask();
  setTasks();
  setTimeout(activateDragAndDrop, 300); /* setCards(); */
}

function allFieldsFilled() {
  let title = document.getElementById("title-input");
  let description = document.getElementById("description-input");
  let category = document.getElementById("select-category"); // .innerHTML.includes('Select')
  let date = document.getElementById("select-date-task"); // value
  let contacts = selectedContacts; // length

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
    btn.onclick = function () {
      console.log("");
    };
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
    btn.onclick = function () {
      addToTasks();
    };
  } else {
    let btn = document.getElementById("submit-btn");
    btn.classList.add("opacity");
    btn.onclick = function () {
      console.log("");
    };
  }

  // buttonUrgent.classList.contains("d-none") ||
  // buttonMedium.classList.contains("d-none") ||
  // buttonLow.classList.contains("d-none")
}

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

async function renderContactsAddTask() {
  let url = "../contacts.json";
  let response = await fetch(url);
  let contacts = await response.json();

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

  // if (newSubtask == "") {
  //   let inputField = document.getElementsByName("add-subtask")[0];
  //   inputField.placeholder = "ERROR PLEASE FILL THE FIELD !";
  //   inputField.placeholder.style = "color: red;";
  //   // inputField.style = "color: red;";
  // } else {
  subtasks.push(newSubtask);
  // }
  document.getElementById("add-subtask").value = "";
  document.getElementById("plus-icon").classList.remove("d-none");
  document.getElementById("new-subtask-accept").classList.add("d-none");
  renderSubtasks();
}

function subtaskReturn() {
  return false;
}

// function checkSubInp() {
//   let inp = document.getElementById("add-subtask");
//   if (inp.value.length > 0) {
//     document.getElementsByName("add-subtask")[0].placeholder = "Add new subtask";
//   }
// }

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

function setImportanceBoard(pushed) {
  if (pushed.innerHTML.includes("Ur")) {
    importance = "Urgent";
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
