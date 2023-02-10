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
