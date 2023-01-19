function generateHTMLcontacts(element, i) {
  return `
    <div class="contacts-list-elem">
      <label class="control control-checkbox" id="selected-contact">
        <div class="contacts-list-elem-box">
          <span class="rendered-contact-name">${element["name"]}</span>
          <input onclick="addContactToTask(${i})" id="contacts-checkbox-${i}" type="checkbox" value="${element['name']}" />
          <div id="control-indicator" class="control-indicator"></div>
        </div>
      </label>
    </div>
    `;
}


function generateHTMLcategory(newCategories) {
  return `
  <div onclick="fillCategory('${newCategories[0]}')" class="categories-list-elem">
    ${newCategories[0]}
    <img src="../add_task/img-add_task/circle_${newCategories[1]}.png" />
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


function setCategoryToNewSubtask(newCategories) {
  return `
  <div class="selected-category">
    ${newCategories[0]}
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