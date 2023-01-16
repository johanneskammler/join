function generateHTMLcontacts(element) {
    return `
    <div class="contacts-list-elem">
      <label class="control control-checkbox" id="selected-contact">
        <div class="contacts-list-elem-box">
          <span class="rendered-contact-name">${element["name"]}</span>
          <input type="checkbox" />
          <div class="control-indicator"></div>
        </div>
      </label>
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


function setCategoryToNewSubtask(newCategory) {
  return `
  <div class="selected-category">
    ${newCategory}
    <img src="../add_task/img-add_task/circle_green.png" />
  </div>
  `;
}


function generateHTMLsubtask(newSubtask) {
    return `
    <div class="subtask-list-elem">
      <label class="control control-checkbox" id="selected-subtask">
        <div class="subtask-list-elem-box">
          <input type="checkbox" />
          <span class="rendered-subtask-name">${newSubtask}</span>
          <div class="control-indicator-subtask"></div>
        </div>
      </label>
    </div>
    `;
  }