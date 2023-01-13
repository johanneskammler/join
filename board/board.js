let responsAsJson;
/**
 * This function Initialized some functions that need to run with onload of the body
 *
 */
async function init() {
  await includeHTML();
  checkSize();
}

/**
 * Remove the display none from the div's and show the popup
 * scroll to the top for good view (Layout)
 * block scolling while view on popup
 */
function popup() {
  let background = document.getElementById("popup");
  let card = document.getElementById("popup_card");
  let list = document.getElementsByTagName("body");
  let body = list[0];

  window.scrollTo(0, 0);
  background.classList.toggle("d-none");
  card.classList.toggle("d-none");
  body.classList.toggle("hide-overflow-y");
}

/**
 * close the popup in the popup close div
 * maybe this i will delete
 */

function closePopup() {
  let background = document.getElementById("overlay");
  let card = document.getElementById("popup_card");
  let list = document.getElementsByTagName("body");

  let body = list[0];

  body.classList.remove("hide-overflow-y");
  background.classList.remove("d-none");
  card.classList.remove("d-none");
}

/**
 * check size by onload and on resize window too and start the function
 * to set the sidebar and deactivate the dragAndDrop
 */
function checkSize() {
  let size = window.innerWidth;
  console.log(size);
  if (size <= 1024) {
    console.log("smaller than 1024");
    sidebarTabled();
    draggableFalse();
  } else if (size > 1024) {
    console.log("bigger than 1024");
    draggableTrue();
    sidebarDesktop();
  }
}

/**
 * set The Sidebar to the Bottom
 */
function sidebarTabled() {
  document.getElementById("sidebar").classList.remove("sidebar");
  document.getElementById("sidebar").classList.add("tablet-sidebar");
}

/**
 * set the sidebar to the left
 */
function sidebarDesktop() {
  document.getElementById("sidebar").classList.add("sidebar");
  document.getElementById("sidebar").classList.remove("tablet-sidebar");
}

/**
 * disable the dragAndDrop function
 */
function draggableFalse() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.setAttribute("draggable", false);
  }
}

/**
 * abled the dragAndDrop
 */

function draggableTrue() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.setAttribute("draggable", true);
    card.onmousedown = "";
  }
}

function renderAddTask() {
  document.getElementById(
    "add_task"
  ).innerHTML = `    <div class="for-close" onclick="closeAddTask()"></div>
                     <div class="add-task-content slide-left" id="add-board">
                       <input type="text" placeholder="Enter a title" class="title-input">
                       <input type="text" placeholder="Select contacts to assign" class="select-contacts">
                     <div class="date-box">
                       <span class="due-date-text">Due date</span>
                       <input type="text" placeholder="dd/mm/yyyy" class="select-date">
                     </div>
                     <div class="category-box">
                       <span class="category-text">Category</span>
                        <input type="text" placeholder="Select task category" class="select-category">
                      </div>
                      <div class="importance-buttons">
                        <button onclick="fillImportanceButton1()" class="importance-button1" id="importance-button1">
                        <span>Urgent</span>
                        <img src="../add_task/img-add_task/urgent.png">
                      </button>
                      <button onclick="emptyImportanceButton1()" class="importance-button1-colored" id="importance-button1-colored" style="display: none;">
                        <span>Urgent</span>
                        <img src="../add_task/img-add_task/urgent.png">
                      </button>


                      <button onclick="fillImportanceButton2()" class="importance-button2" id="importance-button2">
                           <span>Medium</span>
                           <img src="../add_task/img-add_task/medium.png">
                       </button>
                       <button onclick="emptyImportanceButton2()" class="importance-button2-colored" id="importance-button2-colored" style="display: none;">
                           <span>Medium</span>
                           <img src="../add_task/img-add_task/medium.png">
                       </button>



                      <button onclick="fillImportanceButton3()" class="importance-button3" id="importance-button3">
                           <span>Low</span>
                           <img src="../add_task/img-add_task/low.png">
                      </button>
                       <button onclick="emptyImportanceButton3()" class="importance-button3-colored" id="importance-button3-colored" style="display: none;">
                           <span>Low</span>
                           <img src="../add_task/img-add_task/low.png">
                       </button>




                  </div>
                  <div class="description-box">
                      <span class="description-text">Description</span>
                      <textarea name="description" id="description-input" class="description-input" cols="30" rows="10" placeholder="Enter a description"></textarea>
                  </div>
                    div class="subtask-box">
                        span class="subtask-text">Subtasks</span>
                        input type="text" placeholder="Add new subtask" class="add-subtask">
                  </div>
                  /div>
              </div>`;
}

/**
 * open addTask and remove the d-none class from the div with id add-task
 */
function openAddTask() {
  document.getElementById("add_task").classList.toggle("d-none");
  renderAddTask();
}
/**
 * close the addTask div and add the d-none class from the div with id add-task
 */
function closeAddTask() {
  document.getElementById("add-board").classList.remove("slide-left");
  document.getElementById("add-board").classList.add("slide-right");
  setTimeout(openAddTask, 350);
}

/**
 * get the json data
 */
async function contactAsJson() {
  let path = "../cards.json";
  let respons = await fetch(path);
  responsAsJson = await respons.json();
}

/**
 * check how the lenght is from responsAsJson['todo']
 */
function setVariable() {
  let object = Object.keys(responsAsJson["todo"]).length;
  for (let i = 0; i < object; i++) {
    const element = responsAsJson["todo"][i];
    console.log(element);
  }
}
