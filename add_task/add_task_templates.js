function generateHTMLcontacts(element, i) {
  return `
    <div class="contacts-list-elem">
      <label class="control control-checkbox" id="selected-contact-${i}">
        <div class="contacts-list-elem-box">
          <span class="rendered-contact-name">${element["name"]}</span>
          <input onclick="addContactToTask(${i})" id="contacts-checkbox-${i}" type="checkbox" value="${element["name"]}" />
          <div id="control-indicator-${i}" class="control-indicator"></div>
        </div>
      </label>
    </div>
    `;
}


function generateHTMLcategory(categoryName, categoryColorTrue) {
  return `
  <div onclick="fillCategory('${categoryName}')" class="categories-list-elem">
    ${categoryName}
    <img src="../add_task/img-add_task/circle_${categoryColorTrue}.png" />
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


function setCategoryToNewCategory(categoryName, categoryColorTrue) {
  return `
    <div class="selected-category">
      ${categoryName}
      <img src="../add_task/img-add_task/circle_${categoryColorTrue}.png" />
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
      <label class="control control-checkbox" id="selected-subtask-${i}">
        <div class="subtask-list-elem-box">
          <input onclick="addSubtaskToTask(${i})" id="subtasks-checkbox-${i}" type="checkbox" value="${subtask}" checked/>
          <span class="rendered-subtask-name">${subtask}</span>
          <div class="control-indicator-subtask"></div>
        </div>
      </label>
    </div>
    `;
}


function generateHTMLinviteNewContactEmail() {
  return `
    <div class="new-contact-add-task">
      <input onkeyup="" type="email" placeholder="Add Contact Email" class="add-subtask correct-width" id="add_task_email"> 
        <div id="new-subtask-accept" class="new-subtask-accept m-i-e">
          <img onmouseup="newContactAddTaskReturn()" src="../add_task/img-add_task/x_blue.png">
          <span>|</span>
          <img onclick="addNameNewContact()" src="../add_task/img-add_task/check_blue.png">
      </div>
    </div>
    `;
}


function generateHTMLinviteNewContactName() {
  return `
    <div class="new-contact-add-task">
      <input onkeyup="" type="text" placeholder="First and Lastname" class="add-subtask correct-width" id="add_task_name"> 
        <div id="new-subtask-accept" class="new-subtask-accept m-i-e">
          <img onmouseup="newContactAddTaskReturn()" src="../add_task/img-add_task/x_blue.png">
          <span>|</span>
          <img onmouseup="createNewContactAddTask()" src="../add_task/img-add_task/check_blue.png">
      </div>
    </div>
    `;
}


function generateHTMLnewCategoryNameAndColor(categoryName, categoryColorTrue) {
  return `
  <div class="selected-category">
    ${categoryName}
    <img src="../add_task/img-add_task/circle_${categoryColorTrue}.png" />
  </div>
  `;
}