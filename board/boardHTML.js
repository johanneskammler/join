/* onmousedown = "return false"; */

function setCardHTML(
  category,
  color,
  title,
  description,
  totalSubtasks,
  progressStatus,
  id
) {
  return `
                    <div draggable="true" class="card" onclick="openPopup(${id})" id="card${id}">
                      <div class="card-head">
                        <div class="category-overlay" id="c-color${id}" style="background-color: ${color}">
                          <p id="c_overlay${id}">${category}</p>
                        </div>
                      </div>

                      <div class="card-title">
                        <h1 class="title-text font" id="title${id}">${title}</h1>
                      </div>

                      <div class="card-content">
                        <p class="inter gray" id="description${id}">
                          ${description}
                        </p>
                      </div>

                      <div class="progress-box" id="progress_box${id}">
                        <div class="progressbar">
                          <div class="progress" id="progress-nr${id}"></div>
                        </div>
                          <p class="done-p" id="done_status font">${progressStatus}/${totalSubtasks} Done</p>
                      </div>

                      <div class="card-footer" id="footer${id}">
                        <div class="card-invite" id="contacts_card${id}"></div>
                        <div class="btn-footer" id="importance_footer${id}">
                          <img class="img-position" src="img-board/low.png">
                          <img src="img-board/low.png">
                        </div>
                      <div>
                    </div>`;
}

function renderAddTaskHTML() {
  return `
    
  <div class="test">
  
  
  </div>
  <div class="for-close" onclick="closeAddTask()"></div>  


  <div class="add-task-content slide-left" id="add-board">
  <div class="header ">
    <img src="../templates/img/logo_blue.png" class="logo" />
  </div>
  <div class="add-task-content-overlay" onkeyup="allFieldsFilled()"  >
    <div class="add-tasks-board-head" id="add-board">
      <h1 class="add-title">Add Task</h1>
      <button id="submit-btn" class="add-card btn-create opacity" >Creat Task <img src="img-board/checkmark.png"></button>
      <div class="close-add-task-board" onclick="closeAddTask()">
        <img class="close-img" src="img-board/line.png">
        <img src="img-board/line.png">
      </div>
    </div>
    <input  type="text" placeholder="Enter a title" id="title-input" class="title-input" required />

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
        onclick="allFieldsFilled()"
          id="contacts-drop-down"
          class="contacts-dropdown-content d-none"
        >
          <div class="contacts-list-elem">
            <label class="control control-checkbox">
              <div class="contacts-list-elem-box">
                <span class="rendered-contact-name">You</span>
                <input type="checkbox"/>
                <div class="control-indicator"></div>
              </div>
            </label>
          </div>
          <div class="contacts-list-elem new-contact">
            Invite new contact
            <img src="../add_task/img-add_task/contact_blue.png" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="date-box">
  <span class="due-date-text">Due date</span>
  <input
    
    type="date"
    placeholder="dd/mm/yyyy"
    id="select-date"
    class="select-date"
    required
  />
</div>

<div class="category-box">
<span class="category-text">Category</span>
<div style="position: relative">
  <div class="category-dropdown">
    <p
      onclick="openCategoriesToSelect()"
      id="select-category"
      class="select-category"
    >
      Select task category
    </p>
    <img
      onclick="openCategoriesToSelect()"
      src="../add_task/img-add_task/dropdown_blue.png"
      class="drop-down-arrow"
      id="drop-down-arrow-categories"
    />
    <input
      
      type="text"
      placeholder="New category name"
      id="new-category-input"
      class="new-category-input d-none"
    />
    <div id="new-category-accept" class="new-category-accept d-none">
      <img
        onclick="goBackToSelectCategory()"
        src="../add_task/img-add_task/x_blue.png"
      />
      <span>|</span>
      <img
        onclick="addNewCategory()"
        src="../add_task/img-add_task/check_blue.png"
      />
    </div>
    <div
      id="categories-drop-down"
      class="categories-dropdown-content d-none"
    >
      <div onclick="createNewCategory()" class="categories-list-elem">
        New category
      </div>
      <div
        onclick="fillCategory('sales')"
        class="categories-list-elem"
      >
        Sales
        <img src="../add_task/img-add_task/circle_pink.png" />
      </div>
      <div
        onclick="fillCategory('backoffice')"
        class="categories-list-elem"
      >
        Backoffice
        <img src="../add_task/img-add_task/circle_turquois.png" />
      </div>
    </div>
    <div
      id="new-category-content"
      class="new-category-content d-none"
    >
      <img
        onclick="selectCategoryColor('turquois')"
        src="../add_task/img-add_task/circle_turquois.png"
        id="category-color-turquois"
      />
      <img
        onclick="selectCategoryColor('red')"
        src="../add_task/img-add_task/circle_red.png"
        id="category-color-red"
      />
      <img
        onclick="selectCategoryColor('green')"
        src="../add_task/img-add_task/circle_green.png"
        id="category-color-green"
      />
      <img
        onclick="selectCategoryColor('orange')"
        src="../add_task/img-add_task/circle_orange.png"
        id="category-color-orange"
      />
      <img
        onclick="selectCategoryColor('pink')"
        src="../add_task/img-add_task/circle_pink.png"
        id="category-color-pink"
      />
      <img
        onclick="selectCategoryColor('blue')"
        src="../add_task/img-add_task/circle_blue.png"
        id="category-color-blue"
      />
    </div>
  </div>
</div>
</div>

<div class="importance-buttons" onclick="allFieldsFilled()">
<button
  onclick="fillImportanceButton1()"
  class="importance-button1"
  id="importance-button1"
  type="button"
>
  <span>Urgent</span>
  <img src="../add_task/img-add_task/urgent.png" />
</button>
<button
  onclick="emptyImportanceButton1()"
  class="importance-button1-colored"
  id="importance-button1-colored"
  style="display: none"
  type="button"
>
  <span>Urgent</span>
  <img src="../add_task/img-add_task/urgent_white.png" />
</button>

<button
  onclick="fillImportanceButton2()"
  class="importance-button2"
  id="importance-button2"
  type="button"
>
  <span>Medium</span>
  <img src="../add_task/img-add_task/medium.png" />
</button>
<button
  onclick="emptyImportanceButton2()"
  class="importance-button2-colored"
  id="importance-button2-colored"
  style="display: none"
  type="button"
>
  <span>Medium</span>
  <img src="../add_task/img-add_task/medium_white.png" />
</button>

<button
  onclick="fillImportanceButton3()"
  class="importance-button3"
  id="importance-button3"
  type="button"
>
  <span>Low</span>
  <img src="../add_task/img-add_task/low.png" />
</button>
<button
  onclick="emptyImportanceButton3()"
  class="importance-button3-colored"
  id="importance-button3-colored"
  style="display: none"
  type="button"
>
  <span>Low</span>
  <img src="../add_task/img-add_task/low_white.png" />
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
<img src="../add_task/img-add_task/input_icon.png" />
</div>

<div class="subtask-box">
<div style="position: relative">
  <input onkeyup="createNewSubtask()"
    type="text"
    placeholder="Add new subtask"
    class="add-subtask"
    id="add-subtask"
    name="add-subtask"
  />
  <img
    src="../add_task/img-add_task/plus_blue.png"
    class="plus-icon"
    id="plus-icon"
  />
  <div id="new-subtask-accept" class="new-subtask-accept d-none">
    <img
      onclick="backToSubtasks()"
      src="../add_task/img-add_task/x_blue.png"
    />
    <span>|</span>
    <img
      onclick="addSubtask()"
      src="../add_task/img-add_task/check_blue.png"
    />
  </div>
</div>
</div>
<div id="subtask-content" class="subtask-content"></div>


  </div>
`;
}

function descriptionHTML(description) {
  return `<div class="edit-title">
                  <h4>Description<h4>
                  <textarea cols="36" rows="5" charswidth="500" name="text_body"id="popup_description_edit" placeholder="${description}"></textarea>
                </div>`;
}

function dateHTML() {
  return `<div class="correctDate">
      <h4 class="due-date-text">Due date</h4>
      <input type="date" placeholder="dd/mm/yyyy" id="select-date" class="select-date" required />
    </div>`;
}
function priorityHTML() {
  return `
              <div class="importance-buttons">
                <button onclick="fillImportanceButton1()" class="importance-button1" id="importance-button1"
                    type="button">
                    <span>Urgent</span>
                    <img src="../add_task/img-add_task/urgent.png" />
                </button>
                <button onclick="emptyImportanceButton1()" class="importance-button1-colored"
                    id="importance-button1-colored" style="display: none" type="button">
                    <span>Urgent</span>
                    <img src="../add_task/img-add_task/urgent_white.png" />
                </button>

                <button onclick="fillImportanceButton2()" class="importance-button2" id="importance-button2"
                    type="button">
                    <span>Medium</span>
                    <img src="../add_task/img-add_task/medium.png" />
                </button>
                <button onclick="emptyImportanceButton2()" class="importance-button2-colored"
                    id="importance-button2-colored" style="display: none" type="button">
                    <span>Medium</span>
                    <img src="../add_task/img-add_task/medium_white.png" />
                </button>

                <button onclick="fillImportanceButton3()" class="importance-button3" id="importance-button3"
                    type="button">
                    <span>Low</span>
                    <img src="../add_task/img-add_task/low.png" />
                </button>
                <button onclick="emptyImportanceButton3()" class="importance-button3-colored"
                    id="importance-button3-colored" style="display: none" type="button">
                    <span>Low</span>
                    <img src="../add_task/img-add_task/low_white.png" />
                </button>
            </div>`;
}

function assignedHTML() {
  return `
              <div class="contacts-box">
                <div style="position: relative">
                    <div class="contacts-dropdown">
                        <p onclick="openContactsToSelect()" class="select-contacts">
                            Select contacts to assign
                        </p>
                        <img onclick="openContactsToSelect()" src="../add_task/img-add_task/dropdown_blue.png"
                            class="drop-down-arrow" id="contacts-drop-down-arrow" />
                        <div id="contacts-drop-down" class="contacts-dropdown-content d-none set-contact-popup">
                            <div class="contacts-list-elem">
                                <label class="control control-checkbox">
                                    <div class="contacts-list-elem-box">
                                        <span class="rendered-contact-name">You</span>
                                        <input type="checkbox" />
                                        <div class="control-indicator"></div>
                                    </div>
                                </label>
                            </div>
                            <div class="contacts-list-elem new-contact">
                                Invite new contact
                                <img src="../add_task/img-add_task/contact_blue.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div`;
}

function popupCardHTML(
  category,
  color,
  title,
  description,
  subtask,
  progressStatus,
  id,
  colors,
  contactsSplit,
  letters
) {
  return `
    <div class="card-head relative" id="popup_head">
      <div class="category-overlay" id="c-color" style="background-color: ${color}">
        <p id="c_overlay${id}">${category}</p>
      </div>
      <div onclick="popup()" class="close-box">
      
        <img src="img-board/line.png" class="close-img">
        <img src="img-board/line.png" >
      </div>
    </div>
  
    <div class="popup-card-title">
      <h1 class="popup-title font" id="popup_title">${title}</h1>
    </div>

    <div class="card-content-popup" id="card_content">
      <p class="popup-text font" id="popup_description">
        ${description}
      </p>
      
      <div class="date-box-popup" id="date_box">
        <p class="due-date" >Due date:</p>
        <p id="date">16-01-2023</p>
      </div>
      
      <div class="priority-box" id="edit_priority">
        <p class="priority">Priority:</p>
        <p id="priority"> urgent</p>
      </div>
      
      <div class="progress-box-popup" id="progress_box_popup${id}">
        <div class="progess-text">
        
        <h3 class="subtask">Subtask's:</h3><p class="tasks">${subtask}</p>
        </div>
        <div class="progress-box-2">
          <div class="progressbar">
            <div class="progress" id="progress-nr0"></div>
          </div>
          <p class="done-p" id="done_status font">0/1 Done</p>
        </div>
      </div>
      
      <div class="assigned" >
        <p class="assigned-to" id="edit-assigned">Assigned To:</p>
        <div id="assigned_contacts">
          <div id="contact"></div>
        </div>
      </div>
      
      <div class="edit-box" id="edit_box">
        <img src="img-board/edit-button.png" class="pointer" onclick="edit(${id})">
      </div>
    </div>`;
}
