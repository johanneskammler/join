/* onmousedown = "return false"; */

function setCardHTML(
  category,
  color,
  title,
  description,
  totalSubtasks,
  progressStatus,
  id,
  importance
) {
  return `
                    <div draggable="true" class="card" onclick="openPopup(${id})" id="card${id}">
                      <div class="card-head">
                        <div class="category-overlay" id="c-color${id}" style="background-color: ${color}">
                          <p id="c_overlay${id}">${category}</p>
                        </div>
                      <div class="arrows-card d-none" id="arrows_card${id}">
                        <img src="img-board/arrow-left.png" class="arrow" onclick="turnLeft(${id})">
                        <img src="img-board/arrow-right.png" class="arrow arrow-rigth" onclick="turnRight(${id})">
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
                          <div class="progress" id="progress_card${id}" style="width:0;" ></div>
                        </div>
                          <p class="done-p" id="done_status${id}"><span id="progress_card_done${id}">${progressStatus}</span>/${totalSubtasks} Done</p>
                      </div>

                      <div class="card-footer" id="footer${id}">
                        <div class="card-invite" id="contacts_card${id}"></div>
                        <div class="btn-footer" id="importance_footer${id}">
                          <img class="img-position" src="img-board/${importance}.png">
                          <img src="img-board/${importance}.png">
                        </div>
                      <div>
                    </div>`;
}

function renderAddTaskHTML(section) {
  let map = section;
  return `
    
  <div class="test">
  
  
  </div>
  <div class="for-close" onclick="closeAddTask()"></div>  


  <div class="add-task-content slide-left" id="add-board">

  <div class="add-task-content-overlay" onclick="allFieldsFilled()">
    <div class="add-tasks-board-head" id="add-board">
      <h1 class="add-title">Add Task</h1>
      <button id="submit-btn" class="add-card btn-create opacity"  onclick="addToTasks(${map})"   >Create Task <img src="img-board/checkmark.png" ></button>
      <div class="close-add-task-board" onclick="closeAddTask()">
        <img class="close-img" src="img-board/line.png">
        <img src="img-board/line.png">
      </div>
    </div>
    <input  type="text" placeholder="Enter a title" id="title-input" class="title-input input-correction" required onkeyup="allFieldsFilled()" />

    <div class="contacts-box">
    <div style="position: relative">
      <div class="contacts-dropdown" onmouseup="allFieldsFilled()">
        <p onclick="openContactsToSelect()" class="select-contacts">
          Select contacts to assign
        </p>
        <img
          onclick="openContactsToSelect()"
          src="../add_task/img-add_task/dropdown_blue.png"
          class="drop-down-arrow"
          id=""
        />
        <div
        onclick="allFieldsFilled()"
          id="contacts-drop-down"
          class="contacts-dropdown-content d-none"
        >







          <div class="contacts-list-elem new-contact" onmousedown="newContactAddTask(1)" id="new_contact">
            <span class="rendered-contact-name">Invite new contact</span>
            <img class="contact-list-element-img" src="../add_task/img-add_task/contact_blue.png"/>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="invite font" id="invite_contacts_select"></div>

  <div class="date-box">
  <span class="due-date-text">Due date</span>
  <input
    
    onmouseup="allFieldsFilled()"
    type="date"
    placeholder="dd/mm/yyyy"
    id="select-date-task"
    class="select-date"
  />
</div>

<div class="category-box">
<span class="category-text">Category</span>
<div style="position: relative">
  <div class="category-dropdown" onmouseup="allFieldsFilled()">
    <span class="error-message d-none" id="error_value_cat">Please enter a category name</span>
    <span class="error-message d-none" id="error_value_col">Please enter a color</span>


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
  onclick="fillImportanceButton(1)"
  class="importance-button1"
  id="importance-button1"
  type="button"
>
  <span>Urgent</span>
  <img src="../add_task/img-add_task/urgent.png" />
</button>
<button
  onclick="fillImportanceButton(1)"
  class="importance-button1-colored  d-none"
  id="importance-button1-colored"
  
  type="button"
>
  <span>Urgent</span>
  <img src="../add_task/img-add_task/urgent_white.png" />
</button>

<button
  onclick="fillImportanceButton(2)"
  class="importance-button2"
  id="importance-button2"
  type="button"
>
  <span>Medium</span>
  <img src="../add_task/img-add_task/medium.png" />
</button>
<button
  onclick="fillImportanceButton(2)"
  class="importance-button2-colored d-none"
  id="importance-button2-colored"
  
  type="button"
>
  <span>Medium</span>
  <img src="../add_task/img-add_task/medium_white.png" />
</button>

<button
  onclick="fillImportanceButton(3)"
  class="importance-button3"
  id="importance-button3"
  type="button"
>
  <span>Low</span>
  <img src="../add_task/img-add_task/low.png" />
</button>
<button
  onclick="fillImportanceButton(3)"
  class="importance-button3-colored d-none"
  id="importance-button3-colored"
  type="button"
>
  <span>Low</span>
  <img src="../add_task/img-add_task/low_white.png" />
</button>
</div>

<div class="description-box" onkeyup="allFieldsFilled()">
<span class="description-text">Description</span>
<textarea

  name="description"
  id="description-input"
  class="description-input add-task-descript-input"
  cols="30"
  max-rows="10"
  style="max-height: 70px"
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

/* <div class="contacts-list-elem">
<label class="control control-checkbox">
  <div class="contacts-list-elem-box">
    <span class="rendered-contact-name">You</span>
    <input type="checkbox">
    <div class="control-indicator-add-task"></div>
  </div>
</label>
</div> */

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
                <button onclick="fillImportanceButton(${4})" class="importance-button1" id="importance-button-edit-4"
                    type="button">
                    <span>Urgent</span>
                    <img src="../add_task/img-add_task/urgent.png" />
                </button>
                <button onclick="fillImportanceButton(${4})" class="importance-button1-colored d-none"
                    id="importance-button-colored-edit-4" type="button">
                    <span>Urgent</span>
                    <img src="../add_task/img-add_task/urgent_white.png" />
                </button>

                <button onclick="fillImportanceButton(${5})" class="importance-button2" id="importance-button-edit-5"
                    type="button">
                    <span>Medium</span>
                    <img src="../add_task/img-add_task/medium.png" />
                </button>
                <button onclick="fillImportanceButton(${5})" class="importance-button2-colored d-none"
                    id="importance-button-colored-edit-5" type="button">
                    <span>Medium</span>
                    <img src="../add_task/img-add_task/medium_white.png" />
                </button>

                <button onclick="fillImportanceButton(${6})" class="importance-button3" id="importance-button-edit-6"
                    type="button">
                    <span>Low</span>
                    <img src="../add_task/img-add_task/low.png" />
                </button>
                <button onclick="fillImportanceButton(${6})" class="importance-button3-colored d-none"
                    id="importance-button-colored-edit-6"  type="button">
                    <span>Low</span>
                    <img src="../add_task/img-add_task/low_white.png" />
                </button>
            </div>`;
}

function assignedHTML(id) {
  return `
              <div class="contacts-box" onclick="getCheckboxValue()">
                <div style="position: relative">
                    <div class="contacts-dropdown">
                        <p onclick="openEditContactsToSelect(${id})" class="select-contacts">
                            Select contacts to assign
                        </p>
                        <img onclick="openEditContactsToSelect(${id})" src="../add_task/img-add_task/dropdown_blue.png"
                            class="drop-down-arrow" />
                        <div id="contacts-drop-down-edit" class="contacts-dropdown-content d-none set-contact-popup">





                            <div onclick="newContactEdit(0)" class="contacts-list-elem new-contact" id="new_contact-edit">
                                 <span class="rendered-contact-name">Invite new contact</span>
                                <img class="contact-list-element-img" src="../add_task/img-add_task/contact_blue.png" />
                            </div>
                            <div class="add-task-new-render-container" id="add_task_new_render_container"></div>
                        </div>
                    </div>
                </div>
                <div class="font invate" id="invite_contacts_select_edit"></div>
            </div`;
}

/* <div class="contacts-list-elem">
<label class="control control-checkbox" onmousedown="loadAtStartTask()">
    <div class="contacts-list-elem-box">
        <span class="rendered-contact-name">You</span>
        <input type="checkbox" />
        <div class="control-indicator"></div>
    </div>
</label>
</div> */

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
      
      <div class="progress-box-popup" >
        <div class="progess-text">
        <h3 class="subtask">Subtasks:</h3><p class="tasks">${subtask}</p>
          <div class="p-overlay" id="progress_box_popup${id}">
          
          
          </div>
        
        </div>
        <div class="progress-box-2">
          <div class="progressbar">
            <div class="progress" id="progress_popup" style="width:0;"></div>
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

function buttonURGENT() {
  return `<button class="importance-popup button1-colored" type="button">
            <span>Urgent</span>
            <img src="../add_task/img-add_task/urgent.png">
          </button>`;
}

function buttonMEDIUM() {
  return `<button  class="importance-popup button2-colored" type="button">
            <span>Medium</span>
            <img src="../add_task/img-add_task/medium.png">
          </button>`;
}

function buttonLOW() {
  return `<button  class="importance-popup button3-colored" type="button">
            <span>Low</span>
            <img src="../add_task/img-add_task/low.png">
          </button>`;
}

function renderPopupHTML(
  category,
  color,
  title,
  description,
  progressStatus,
  id,
  colors,
  contactsSplit,
  letters,
  section,
  importance
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
  
    <div class="popup-card-title" id="popup-card-title">
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
        <p id="priority"></p>
      </div>
      
      <div class="progress-box-popup" id="progress_box_popup${id}">
        <div class="progess-text" id="progress_text${id}">
        
        <h3 class="subtask" id="subtask_id">Subtasks:
        </div>
        <div class="progress-box-2">
          <div class="progressbar">
            <div class="progress" id="progress_edit" style="width: 0;" ></div>
          </div>
          <p class="done-p" id="done_status_popup${id}">0/1 Done</p>
        </div>
      </div>
      
      <div class="assigned" id="assigned">
        <p class="assigned-to" id="edit-assigned">Assigned To:</p>
        <div id="assigned_contacts">
          <div id="contact"></div>
        </div>
      </div>
      
      <div class="edit-box" id="edit_box">
        <img src="img-board/edit-button.png" id="edit-none" class="pointer" onclick="edit(${id})">
      </div>
    </div>`;
}

function renderPopupContactsHTML(colors, element, i, letters) {
  return `
        <div class="contactsDiv" id="contactsDiv${i}">
          <p class="invate font" style="background-color: ${colors[i]};">${letters[i]}</p>
          <p class="font fullName">${element}</p>
        </div>`;
}

function generateHTMLcontacts(element, i) {
  return `
    <div class="contacts-list-elem" >
      <label class="control control-checkbox" id="selected-contact${i}" onmouseup="addContactToTaskBoard(${i})">
        <div class="contacts-list-elem-box" id="${element["name"]}edit">
          <span id="name${i}" class="rendered-contact-name">${element["name"]}</span>
          <input id="contacts-checkbox${i}" type="checkbox" value="${element["name"]}" />
          <div id="control-indicator${i}" class="control-indicator control-setup"></div>
        </div>
      </label>
    </div>
    `;
}
