let selectedColor;
let selectedLetter;
let selectedContact;

let contacts = [];
let user = [];
let sortetContacts = [];

async function init() {
  await includeHTML();
  if (contacts.length === 0) {
    await loadData();
  } else {
    console.log("Benutzerdaten sind bereits im Array vorhanden:", contacts);
  }

  await renderContactList();
}

async function loadData() {
  let currentUserID = JSON.parse(await getItem("currentUserID"));
  let data = await getItem("contact");
  if (data) {
    contacts = JSON.parse(data);
    console.log("Benutzerdaten geladen:", contacts);

    let filteredObjects = await filterObjectById(contacts, currentUserID);
    sortetContacts.push(filteredObjects);
    console.log(sortetContacts);
  } else {
    console.log("Keine Benutzerdaten gefunden.");
  }
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

async function createNewContact() {
  let name = document.getElementById("input-name");
  let mail = document.getElementById("input-mail");
  let mobil = document.getElementById("input-phone");
  let color = getRandomHexColor();
  let id = JSON.parse(await getItem("currentUserID"));

  contacts.push({
    fullName: name.value,
    email: mail.value,
    mobil: mobil.value,
    color: color,
    id: id,
  });

  await setItem("contact", JSON.stringify(contacts));

  await renderContactList();
  closeBlurScreen();
  succesImg();
  resetValue(name, mail, mobil);
  window.location.reload();
}

async function renderContactList() {
  let a = document.getElementById("contact_list_container");
  let sortetContactsLenght = sortetContacts[0].length;
  a.innerHTML = "";

  if (sortetContactsLenght < 1) {
    showNoContacts();
  } else {
    renderContactsRaster();

    for (let i = 0; i < sortetContacts[0].length; i++) {
      const element = sortetContacts[0][i];

      let fullName = element["fullName"];
      let email = element["email"];
      let firstLetters = getInitials(fullName);
      let firstLetter = getFirstLetter(fullName);
      let color = element["color"];

      ContactListHTML(i, fullName, email, firstLetters, firstLetter, color);
    }
  }
}

function getRandomHexColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getFirstLetter(str) {
  if (str && typeof str === "string") {
    return str.charAt(0);
  } else {
    return "";
  }
}

function getInitials(fullName) {
  const names = fullName.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  return initials.join("");
}

function resetValue(name, mail, mobil) {
  name.value = "";
  mail.value = "";
  mobil.value = "";
}

function succesImg() {
  document.getElementById("succes_img").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("succes_img").classList.add("d-none");
  }, 1500);
}

function hoverContactsHtml() {
  document
    .getElementById("contacts-html")
    .classList.add("section-background-normal");
  document.getElementById("contacts_bg").classList.remove("section-background");
}

function hoverContactsRespons() {
  document
    .getElementById("contacts-html")
    .classList.remove("section-background");
  document.getElementById("contacts_bg").classList.add("section-background");
}

function checkSize() {
  let size = window.innerWidth;
  if (size < 1024) {
    sidebarTabled();
    hoverContactsRespons();
  } else if (size > 1024) {
    enableSidebar();
    hoverContactsHtml();
  }
}

function sidebarTabled() {
  document.getElementById("sidebar").classList.remove("sidebar");
  document.getElementById("sidebar").classList.add("tablet-sidebar");
  document.getElementById("help-section-btn").classList.add("d-none");
  // document.getElementById("create-btn-responsive").classList.remove("d-none");

  let response = document.getElementById("header-name-resp");
  if (!(response == null)) {
    response.classList.remove("d-none");
  }
}

function enableSidebar() {
  document.getElementById("sidebar").classList.add("sidebar");
  document.getElementById("sidebar").classList.remove("tablet-sidebar");
}

function renderContactsRaster() {
  let raster = document.getElementById("contact_list_container");
  raster.innerHTML = renderContactsRasterHTML();
}

async function renderContactListHTML(element, acronym, i) {
  ContactListHTML(id, acronym, i, element);
}

async function openContactDetail(i) {
  let contact = sortetContacts[0][i];
  let name = contact["fullName"];
  let email = contact["email"];
  let phone = contact["mobil"];
  let color = contact["color"];
  let firstLetters = contact["fullName"].split(/\s+/).map((word) => word[0]);
  let acronym = firstLetters.join("");
  renderOpenDetail(i);

  const body = document.body;
  const bodyWidth = body.offsetWidth;
  if (bodyWidth < 800) {
    renderDetailHTMLRespons();
    renderDetailHTML(name, email, phone, acronym, color);
  } else {
    renderDetailHTML(name, email, phone, acronym, color);
    animateDetail();
  }
  openContactDetailHover(i);
}

function closeContactRight() {
  document.getElementById("contact_right").classList.add("slide-bottom");

  setTimeout(() => {
    document.getElementById("contact_right").classList.add("d-none");
    document.getElementById("contact_right").classList.remove("slide-bottom");
  }, 300);
}

function closeDetail() {
  document.getElementById("edit_contact_pencil").classList.remove("d-none");
  document.getElementById("edit_contact").classList.add("d-none");
  document.getElementById("contact_list_container").classList.remove("d-none");
  document.getElementById("new_contact_btn").classList.remove("d-none");
  document.getElementById("contact_right").classList.add("d-none");
  document.getElementById("backarrow").classList.add("d-none");
}

function addNewContact() {
  const addContactContainer = document.getElementById("add_contact_container");
  const blurScreen = document.getElementById("blur_screen");
  if (addContactContainer.classList.contains("d-none")) {
    addContactContainer.classList.remove("d-none");
    blurScreen.classList.remove("d-none");
    animateAddContact();
  } else {
    addContactContainer.classList.add("d-none");
    blurScreen.classList.add("d-none");
  }
}

function closeBlurScreen() {
  const addContactContainer = document.getElementById("add_contact_container");
  const blurScreen = document.getElementById("blur_screen");
  const editBlurscreen = document.getElementById("blur_screen-edit");
  addContactContainer.classList.add("d-none");
  blurScreen.classList.add("d-none");
  editBlurscreen.classList.add("d-none");
}

function openAddTask() {
  document.getElementById("add_task").classList.toggle("d-none");
  window.scrollTo(0, 0);
  let list = document.getElementsByTagName("html");
  let html = list[0];
  html.classList.toggle("hide-overflow-y");

  renderAddTask();
  renderContactsAddTask();
  dateFuture();
}

function renderAddTask() {
  document.getElementById("add_task").innerHTML = renderAddTaskHTML();
}

function closeAddTask() {
  document.getElementById("add-board").classList.remove("slide-left");
  document.getElementById("add-board").classList.add("slide-right");
  setTimeout(openAddTask, 350);
}

function getNewColor() {
  let symbols;
  symbols = "0123456789ABCDEFabcdef";
  color = "#";

  for (let f = 0; f < 6; f++) {
    color = color + symbols[Math.floor(Math.random() * 21)];
    console.log(color);
  }
}

// function setColorOnRendering(i) {
//   document.getElementById(`circle_contacts${i}`).style.background =
//     contacts[i]["color"];
// }

function clickDialog(e) {
  e.stopPropagation();
}

async function openEditContact(i) {
  let contact = sortetContacts[0][i];
  let nameInput = document.getElementById("input-name-edit");
  let mailInput = document.getElementById("input-mail-edit");
  let phoneInput = document.getElementById("input-phone-edit");
  selectedContact = i;

  console.log(selectedContact);

  nameInput.value = contact["fullName"];
  mailInput.value = contact["email"];
  phoneInput.value = contact["mobil"];

  removeBlurscreen();
  animateEditContact();
}

async function saveEditContact() {
  let i = selectedContact;
  let contact = sortetContacts[0][i];
  let name_input = document.getElementById("input-name-edit");
  let mail_input = document.getElementById("input-mail-edit");
  let phone_input = document.getElementById("input-phone-edit");
  let color = contact["color"];
  let id = contact["id"];

  contacts.push({
    fullName: name_input.value,
    email: mail_input.value,
    mobil: phone_input.value,
    color: color,
    id: id,
  });

  await deleteSelectedContact(i);
  selectedContact = null;
  closeBlurScreen();
  closeContactRight();
  window.location.reload();
}

async function deleteSelectedContact(i) {
  let index = contacts.indexOf(sortetContacts[0][i]);
  contacts.splice(index, 1);

  await setItem("contact", JSON.stringify(contacts));
}

async function getMaps() {
  let todos = (await JSON.parse(backend.getItem("todoJson"))) || [];
  if (todos.length > 1) {
    todosMap = new Map(Object.entries(JSON.parse(todos)));
  }

  let progresses = (await JSON.parse(backend.getItem("progressJson"))) || [];
  if (progresses.length > 1) {
    progressesMap = new Map(Object.entries(JSON.parse(progresses)));
  }

  let feedbacks = (await JSON.parse(backend.getItem("feedbackJson"))) || [];
  if (feedbacks.length > 1) {
    feedbacksMap = new Map(Object.entries(JSON.parse(feedbacks)));
  }

  let dones = (await JSON.parse(backend.getItem("doneJson"))) || [];
  if (dones.length > 1) {
    donesMap = new Map(Object.entries(JSON.parse(dones)));
  }
  maps = [todosMap, progressesMap, feedbacksMap, donesMap];
}

function setContactListByResponsive() {
  const bodyWidth = document.body.offsetWidth;

  if (bodyWidth <= 800) {
    setTimeout(() => {
      document
        .getElementById("contact_list_container")
        .classList.remove("d-none");
      document.getElementById("new_contact_btn").classList.remove("d-none");
    }, 400);
  }
}

function dateFuture() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("select-date-task").setAttribute("min", today);
}

function removeBlurscreen() {
  document.getElementById("blur_screen-edit").classList.remove("d-none");
}

function addBlurscreen() {
  document.getElementById("blur_screen-edit").classList.add("d-none");
}

//  Render HMTL
function disableContactContainer() {
  if (document.getElementById("a").innerHTML < 1) {
    document.getElementById("a_container").classList.add("d-none");
  } else {
    document.getElementById("a_container").classList.remove("d-none");
  }
  if (document.getElementById("b").innerHTML < 1) {
    document.getElementById("b_container").classList.add("d-none");
  } else {
    document.getElementById("b_container").classList.remove("d-none");
  }
  if (document.getElementById("c").innerHTML < 1) {
    document.getElementById("c_container").classList.add("d-none");
  } else {
    document.getElementById("c_container").classList.remove("d-none");
  }
  if (document.getElementById("d").innerHTML < 1) {
    document.getElementById("d_container").classList.add("d-none");
  } else {
    document.getElementById("d_container").classList.remove("d-none");
  }
  if (document.getElementById("e").innerHTML < 1) {
    document.getElementById("e_container").classList.add("d-none");
  } else {
    document.getElementById("e_container").classList.remove("d-none");
  }
  if (document.getElementById("f").innerHTML < 1) {
    document.getElementById("f_container").classList.add("d-none");
  } else {
    document.getElementById("f_container").classList.remove("d-none");
  }
  if (document.getElementById("g").innerHTML < 1) {
    document.getElementById("g_container").classList.add("d-none");
  } else {
    document.getElementById("g_container").classList.remove("d-none");
  }
  if (document.getElementById("h").innerHTML < 1) {
    document.getElementById("h_container").classList.add("d-none");
  } else {
    document.getElementById("h_container").classList.remove("d-none");
  }
  if (document.getElementById("i").innerHTML < 1) {
    document.getElementById("i_container").classList.add("d-none");
  } else {
    document.getElementById("i_container").classList.remove("d-none");
  }
  if (document.getElementById("j").innerHTML < 1) {
    document.getElementById("j_container").classList.add("d-none");
  } else {
    document.getElementById("j_container").classList.remove("d-none");
  }
  if (document.getElementById("k").innerHTML < 1) {
    document.getElementById("k_container").classList.add("d-none");
  } else {
    document.getElementById("k_container").classList.remove("d-none");
  }
  if (document.getElementById("l").innerHTML < 1) {
    document.getElementById("l_container").classList.add("d-none");
  } else {
    document.getElementById("l_container").classList.remove("d-none");
  }
  if (document.getElementById("m").innerHTML < 1) {
    document.getElementById("m_container").classList.add("d-none");
  } else {
    document.getElementById("m_container").classList.remove("d-none");
  }
  if (document.getElementById("n").innerHTML < 1) {
    document.getElementById("n_container").classList.add("d-none");
  } else {
    document.getElementById("n_container").classList.remove("d-none");
  }
  if (document.getElementById("o").innerHTML < 1) {
    document.getElementById("o_container").classList.add("d-none");
  } else {
    document.getElementById("o_container").classList.remove("d-none");
  }
  if (document.getElementById("p").innerHTML < 1) {
    document.getElementById("p_container").classList.add("d-none");
  } else {
    document.getElementById("p_container").classList.remove("d-none");
  }
  if (document.getElementById("q").innerHTML < 1) {
    document.getElementById("q_container").classList.add("d-none");
  } else {
    document.getElementById("q_container").classList.remove("d-none");
  }
  if (document.getElementById("r").innerHTML < 1) {
    document.getElementById("r_container").classList.add("d-none");
  } else {
    document.getElementById("r_container").classList.remove("d-none");
  }
  if (document.getElementById("s").innerHTML < 1) {
    document.getElementById("s_container").classList.add("d-none");
  } else {
    document.getElementById("s_container").classList.remove("d-none");
  }
  if (document.getElementById("t").innerHTML < 1) {
    document.getElementById("t_container").classList.add("d-none");
  } else {
    document.getElementById("t_container").classList.remove("d-none");
  }
  if (document.getElementById("u").innerHTML < 1) {
    document.getElementById("u_container").classList.add("d-none");
  } else {
    document.getElementById("u_container").classList.remove("d-none");
  }
  if (document.getElementById("v").innerHTML < 1) {
    document.getElementById("v_container").classList.add("d-none");
  } else {
    document.getElementById("v_container").classList.remove("d-none");
  }
  if (document.getElementById("w").innerHTML < 1) {
    document.getElementById("w_container").classList.add("d-none");
  } else {
    document.getElementById("w_container").classList.remove("d-none");
  }
  if (document.getElementById("x").innerHTML < 1) {
    document.getElementById("x_container").classList.add("d-none");
  } else {
    document.getElementById("x_container").classList.remove("d-none");
  }
  if (document.getElementById("y").innerHTML < 1) {
    document.getElementById("y_container").classList.add("d-none");
  } else {
    document.getElementById("y_container").classList.remove("d-none");
  }
  if (document.getElementById("z").innerHTML < 1) {
    document.getElementById("z_container").classList.add("d-none");
  } else {
    document.getElementById("z_container").classList.remove("d-none");
  }
}

function openContactDetailHover(i) {
  // Zunächst entfernen Sie alle vorhandenen ‘selected’ Klassen von allen Kontakten.
  const contacts = document.getElementsByClassName("contact");
  for (let j = 0; j < contacts.length; j++) {
    contacts[j].classList.remove("contact-selected");
    document
      .getElementById(`contact-email-${j}`)
      .classList.remove("color-white");
  }
  // Fügen Sie die ‘selected’ Klasse nur zum angeklickten Kontakt hinzu.
  const selectedContact = document.getElementById(`contact${i}`);
  selectedContact.classList.add("contact-selected");
  document.getElementById(`contact-email-${i}`).classList.add("color-white");
}

function checkIfString(element) {
  if (typeof element === "string") {
    element = element.split(",");
  }
  return element;
}
