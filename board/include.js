async function init() {
  await includeHTML();
  /*renderHeader();
  renderSidebar();*/
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function renderHeader() {
  document.getElementById(
    "header"
  ).innerHTML = `<img src="img-main_page/logo_white.png" class="main-logo" />
        <div class="header-right">
          <div>
            <span>Kanban Project Management Tool</span>
          </div>
          <div>
            <img src="img-main_page/Vector.png" />
          </div>
          <div class="profile-box">
            <img
              src="/main_page/img-main_page/placeholder.jpg"
              class="profile-picture"
            />
          </div>
        </div>`;
}

function renderSidebar() {
  document.getElementById("main").innerHTML = `<div class="sidebar">
        <div class="sidebar-top">
          <a href="#">
            <button class="font-family">
              <img src="img-main_page/summary.png" />
              <span>Summary</span>
            </button>
          </a>

          <a href="#">
            <button class="font-family">
              <img src="img-main_page/board.png" />
              <span>Board</span>
            </button>
          </a>

          <a href="#">
            <button class="font-family">
              <img src="img-main_page/add_task.png" />
              <span>Add task</span>
            </button>
          </a>

          <a href="#">
            <button class="font-family">
              <img src="img-main_page/contacts.png" />
              <span>Contacts</span>
            </button>
          </a>
        </div>

        <div class="sidebar-bottom">
          <a href="#">
            <button class="font-family">
              <img src="img-main_page/legal_notice.png" />
              <span>Legal notice</span>
            </button>
          </a>

          <a href="#">
            <button class="font-family">
              <img src="img-main_page/padlock.png" />
              <span>Datenschutz</span>
            </button>
          </a>
        </div>
      </div>`;
}
