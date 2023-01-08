function init() {}

function popup() {
  let background = document.getElementById("popup");
  let card = document.getElementById("popup_card");
  let list = document.getElementsByTagName("body");
  let body = list[0];

  window.scrollTo(0, 0);
  body.classList.toggle("hide-overflow-y");
  background.classList.toggle("d-none");
  card.classList.toggle("d-none");
}

function checkSize() {
  let size = window.innerWidth;
  console.log(size);
  if (size < 1280) {
    document.getElementById("card").setAttribute("draggable", false);
  } else if (size > 1280) {
    document.getElementById("card").setAttribute("draggable", true);
  }
}

function ScrollbarExist() {
  let div = document.getElementsByClassName("choice");
  let counter;
  for (let i = 0; i < div.length; i++) {
    console.log(div[i]);
    let answer = div[i].scrollHeight > div[i].clientHeight;
    console.log(answer);
    if (answer == true) {
      addHeigth();
    } else if (answer == false) {
      counter++;
      if (counter == 4) {
        removeHeigth();
        counter = 0;
      }
    }
  }
}

function removeHeigth() {
  let divs = document.getElementsByClassName("choice");
  for (let i = 0; i < divs.length; i++) {
    const element = divs[i];
    element.classList.remove("more-heigth");
  }
}

function addHeigth() {
  let divs = document.getElementsByClassName("choice");
  for (let i = 0; i < divs.length; i++) {
    const element = divs[i];
    element.classList.add("more-heigth");
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

function addTask() {
  document.getElementById("add_task").classList.toggle("d-none");
  renderAddTask();
}

function closeAddTask() {
  document.getElementById("add-board").classList.remove("slide-left");
  document.getElementById("add-board").classList.add("slide-right");
  setTimeout(addTask, 350);
}
