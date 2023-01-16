function setCardHTML(
  category,
  color,
  title,
  description,
  totalSubtasks,
  progressStatus
) {
  return `<div onmousedown="return false" draggable="true" class="card" onclick="popup(${idCounter})" id="card${idCounter}">
                    
                      
                      <div class="card-head">
                        <div class="category-overlay" id="c-color${idCounter}" style="background-color: ${color}">
                          <p id="c_overlay${idCounter}">${category}</p>
                        </div>
                      </div>

                      <div class="card-title">
                        <h1 class="title-text font" id="title${idCounter}">${title}</h1>
                      </div>

                      <div class="card-content">
                        <p class="inter gray" id="description${idCounter}">
                          ${description}
                        </p>
                      </div>

                      <div class="progress-box" id="progress_box${idCounter}">
                        <div class="progressbar">
                          <div class="progress" id="progress-nr${idCounter}"></div>
                        </div>
                          <p class="done-p" id="done_status font">${progressStatus}/${totalSubtasks} Done</p>
                      </div>

                      <div class="card-footer">
                        <div class="card-invite" id="contacts_card${idCounter}"></div>
                        <button class="btn-footer">
                          <img class="img-position" src="img-board/footer-button-green.png">
                          <img src="img-board/footer-button-green.png">
                        </button>
                      <div>
                    </div>
      `;
}

function renderAddTaskHTML() {
  return `
    
  
      <div class="for-close" onclick="closeAddTask()"></div>  


      <div class="add-task-content slide-left" id="add-board">
      <div class="header ">
        <img src="../templates/img/logo_blue.png" class="logo" />
      </div>
      <div class="add-task-content-overlay">
        <div class="add-tasks-board-head" id="add-board">
          <h1 class="add-title">Add Task</h1>
          <button class="add-card btn-create" onclick="saveTask()">Creat Task <img src="img-board/checkmark.png"></button>
          <div class="close-add-task-board" onclick="closeAddTask()">
            <img class="close-img" src="img-board/line.png">
            <img src="img-board/line.png">
          </div>
        </div>
        <span id="header-name-resp" class="d-none">Kanban Project Management Tool</span>
        <input type="text" placeholder="Enter a title" class="title-input" />

        <div class="contacts-box">
          <div style="position: relative">
            <div class="contacts-dropdown">
              <p onclick="openContactsToSelect()" class="select-contacts">
                Select contacts to assign
              </p>
              <img
                onclick="openContactsToSelect()"
                src="../add_task/img-add_task/dropdown_blue.png"
                class="drop-down-arrow"
                id="contacts-drop-down-arrow"
              />
              <div
                id="contacts-drop-down"
                class="contacts-dropdown-content d-none"
              >
                <div class="contacts-list-elem">
                  <label class="control control-checkbox">
                    You
                    <input type="checkbox" />
                    <div class="control_indicator"></div>
                  </label>
                </div>
                <div class="contacts-list-elem">
                  <label class="control control-checkbox">
                    Maximilian Vogel
                    <input type="checkbox" />
                    <div class="control_indicator"></div>
                  </label>
                </div>
                <div class="contacts-list-elem">Invite new contact</div>
              </div>
            </div>
          </div>
        </div>

        <div class="date-box">
          <span class="due-date-text">Due date</span>
          <input type="date" placeholder="dd/mm/yyyy" class="select-date" />
        </div>

        <div class="category-box">
          <span class="category-text">Category</span>
          <div style="position: relative">
            <div class="category-dropdown">
              <p onclick="openCategoriesToSelect()" class="select-category">
                Select task category
              </p>
              <img
                onclick="openCategoriesToSelect()"
                src="../add_task/img-add_task/dropdown_blue.png"
                class="drop-down-arrow"
              />
              <div
                id="categories-drop-down"
                class="categories-dropdown-content d-none"
              >
                <div class="categories-list-elem">New category</div>
                <div class="categories-list-elem">
                  Sales
                  <img src="../add_task/img-add_task/circle_pink.png" />
                </div>
                <div class="categories-list-elem">
                  Backoffice
                  <img src="../add_task/img-add_task/circle_turquois.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="importance-buttons">
          <button
            onclick="fillImportanceButton1()"
            class="importance-button1"
            id="importance-button1"
          >
            <span>Urgent</span>
            <img src="../add_task/img-add_task/urgent.png" />
          </button>
          <button
            onclick="emptyImportanceButton1()"
            class="importance-button1-colored"
            id="importance-button1-colored"
            style="display: none"
          >
            <span>Urgent</span>
            <img src="../add_task/img-add_task/urgent.png" />
          </button>

          <button
            onclick="fillImportanceButton2()"
            class="importance-button2"
            id="importance-button2"
          >
            <span>Medium</span>
            <img src="../add_task/img-add_task/medium.png" />
          </button>
          <button
            onclick="emptyImportanceButton2()"
            class="importance-button2-colored"
            id="importance-button2-colored"
            style="display: none"
          >
            <span>Medium</span>
            <img src="../add_task/img-add_task/medium.png" />
          </button>

          <button
            onclick="fillImportanceButton3()"
            class="importance-button3"
            id="importance-button3"
          >
            <span>Low</span>
            <img src="../add_task/img-add_task/low.png" />
          </button>
          <button
            onclick="emptyImportanceButton3()"
            class="importance-button3-colored"
            id="importance-button3-colored"
            style="display: none"
          >
            <span>Low</span>
            <img src="../add_task/img-add_task/low.png" />
          </button>
        </div>

        <div class="description-box">
          <span class="description-text">Description</span>
          <textarea
            name="description"
            id="description-input"
            class="description-input"
            cols="30"
            rows="10"
            placeholder="Enter a description"
          ></textarea>
        </div>

        <div class="subtask-box">
          <span class="subtask-text">Subtasks</span>
          <div style="position: relative">
            <input
              type="text"
              placeholder="Add new subtask"
              class="add-subtask"
            />
            <img
              src="../add_task/img-add_task/plus_blue.png"
              class="plus-icon"
            />
          </div>
        </div>
        </div>

        <div class="main-buttons">
          <div class="add-task-buttons">
            <button class="clear-task-btn" id="clear-task-btn">
              <span>Clear</span>
              <img src="../add_task/img-add_task/x.png" />
            </button>
            <button class="create-task-btn" id="create-task-btn">
              <span id="create-task-btn-span">Create Task</span>
              <img src="../add_task/img-add_task/check.png" />
            </button>
            <div
              id="create-btn-responsive"
              class="create-btn-responsive d-none"
            >
              <button class="create-task-btn-resp" id="create-task-btn-resp">
                <span id="create-task-btn-span">Create</span>
                <img src="../add_task/img-add_task/check.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
`;
}
