contacts = [];
let color;
let firstLetters;
let selectedColor;
let selectedLetter;
let selectedContact;
4
setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function init() {
    await downloadFromServer();
    await includeHTML();
    checkSize();
    await renderContactList();
}

function hoverContactsHtml() {
    document.getElementById("contacts-html").classList.add("section-background-normal");
    document.getElementById("contacts_bg").classList.remove("section-background");
}

function hoverContactsRespons() {
    document.getElementById("contacts-html").classList.remove("section-background");
    document.getElementById("contacts_bg").classList.add("section-background");
}

function checkSize() {
    let size = window.innerWidth;
    console.log(size);
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

// Contact JS

async function createNewContact() {
    let name = document.getElementById("input-name");
    let mail = document.getElementById("input-mail");
    let mobil = document.getElementById("input-phone"); // Bitte die FirstLetters im Backend speichern
    firstLetters = name.value.split(/\s+/).map((word) => word[0]);
    firstLetters = firstLetters.join("");
    getNewColor();
    let contact = {
        name: name.value,
        mail: mail.value,
        mobil: mobil.value,
        color: color,
        firstLetters: firstLetters,
    };

    // if anweisung mit indexOf
    contacts.push(contact);
    await backend.setItem("contacts", JSON.stringify(contacts));
    renderContactList();
    closeBlurScreen();

    name.value = "";
    mail.value = "";
    mobil.value = "";
}

function renderContactsRaster() {
    let raster = document.getElementById("contact_list_container");
    raster.innerHTML = renderContactsRasterHTML();
}

function renderContactsRasterHTML() {
    return `
            <div class="contact-list-inner-container">
                <div id="a_container">
                    <div class="contact-char">A</div>
                    <hr class="underline" />
                </div>
                <div id="a"></div>

                <div id="b_container">
                    <div class="contact-char">B</div>
                    <hr class="underline" />
                </div>
                <div id="b"></div>

                <div id="c_container">
                    <div>
                        <div class="contact-char">C</div>
                        <hr class="underline" />
                    </div>
                    <div id="c"></div>
                </div>

                <div id="d_container">
                    <div class="contact-char">D</div>
                    <hr class="underline" />
                </div>
                <div id="d"></div>

                <div id="e_container">
                    <div class="contact-char">E</div>
                    <hr class="underline" />
                </div>
                <div id="e"></div>

                <div id="f_container">
                    <div class="contact-char">F</div>
                    <hr class="underline" />
                </div>
                <div id="f"></div>

                <div id="g_container">
                    <div class="contact-char">G</div>
                    <hr class="underline" />
                </div>
                <div id="g"></div>

                <div id="h_container">
                    <div class="contact-char">H</div>
                    <hr class="underline" />
                </div>
                <div id="h"></div>

                <div id="i_container">
                    <div class="contact-char">I</div>
                    <hr class="underline" />
                </div>
                <div id="i"></div>

                <div id="j_container">
                    <div class="contact-char">J</div>
                    <hr class="underline" />
                </div>
                <div id="j"></div>

                <div id="k_container">
                    <div class="contact-char">K</div>
                    <hr class="underline" />
                </div>
                <div id="k"></div>

                <div id="l_container">
                    <div class="contact-char">L</div>
                    <hr class="underline" />
                </div>
                <div id="l"></div>

                <div id="m_container">
                    <div class="contact-char">M</div>
                    <hr class="underline" />
                </div>
                <div id="m"></div>

                <div id="n_container">
                    <div class="contact-char">N</div>
                    <hr class="underline" />
                </div>
                <div id="n"></div>

                <div id="o_container">
                    <div class="contact-char">O</div>
                    <hr class="underline" />
                </div>
                <div id="o"></div>

                <div id="p_container">
                    <div class="contact-char">P</div>
                    <hr class="underline" />
                </div>
                <div id="p"></div>

                <div id="q_container">
                    <div class="contact-char">Q</div>
                    <hr class="underline" />
                </div>
                <div id="q"></div>

                <div id="r_container">
                    <div class="contact-char">R</div>
                    <hr class="underline" />
                </div>
                <div id="r"></div>

                <div id="s_container">
                    <div class="contact-char">S</div>
                    <hr class="underline" />
                </div>
                <div id="s"></div>

                <div id="t_container">
                    <div class="contact-char">T</div>
                    <hr class="underline" />
                </div>
                <div id="t"></div>

                <div id="u_container">
                    <div class="contact-char">U</div>
                    <hr class="underline" />
                </div>
                <div id="u"></div>

                <div id="v_container">
                    <div class="contact-char">V</div>
                    <hr class="underline" />
                </div>
                <div id="v"></div>

                <div id="w_container">
                    <div class="contact-char">W</div>
                    <hr class="underline" />
                </div>
                <div id="w"></div>

                <div id="x_container">
                    <div class="contact-char">X</div>
                    <hr class="underline" />
                </div>
                <div id="x"></div>

                <div id="y_container">
                    <div class="contact-char">Y</div>
                    <hr class="underline" />
                </div>
                <div id="y"></div>

                <div id="z_container">
                    <div class="contact-char">Z</div>
                    <hr class="underline" />
                </div>
                <div id="z"></div>
              </div>
            `;
}

async function renderContactList() {
    let a = document.getElementById("contact_list_container");
    a.innerHTML = "";
    renderContactsRaster();
    contacts = (await JSON.parse(backend.getItem("contacts"))) || [];
    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];
        let firstLetters = element["name"].split(/\s+/).map((word) => word[0]);
        let acronym = firstLetters.join("");
        renderContactListHTML(element, acronym, i);
        setColorOnRendering(i);
        disableContactContainer();
    }
}

function renderContactListHTML(element, acronym, i) {
    let firstLetter = element["name"] ? element["name"][0] : "";
    if (!firstLetter) {
        console.error("First letter is undefined");
        return;
    }
    let id = firstLetter.toLowerCase();
    /*  document.getElementById(id).innerHTML = ""; */
    document.getElementById(id).innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div id="circle_contacts${i}" class="circle">${acronym.toUpperCase()}</div>
            <div class="contact-info-container">
                <span class="contact-name">${element["name"]}</span>
                <span class="contact-email">${element["mail"]}</span>
            </div>
        </div>
    `;
}

async function openContactDetail(i) {
    contacts = JSON.parse(backend.getItem("contacts"));
    let contact = contacts[i];
    let name = contact["name"];
    let email = contact["mail"];
    let phone = contact["mobil"];
    let acronym = contact['firstLetters'];
    let color = contact['color'];
    renderOpenDetail(i);

    const body = document.body;
    const bodyWidth = body.offsetWidth;
    if (bodyWidth < 1280) {
        document.getElementById("new_contact_btn").classList.add("d-none");
        document.getElementById("contact_list_container").classList.add("d-none");
        document.getElementById("edit_contact_pencil").classList.add("d-none");
        document.getElementById("backarrow").classList.remove("d-none");
        document.getElementById("edit_contact").classList.remove("d-none");
        document.getElementById("contact_right").classList.remove("d-none");
        document.getElementById("name_right").innerHTML = name;
        document.getElementById("mail_right").innerHTML = email;
        document.getElementById("mobil_right").innerHTML = `${phone}`;
        document.getElementById("circle_right").innerHTML = acronym;
        document.getElementById("circle_right").style.background = color;

    } else {
        document.getElementById("contact_right").classList.remove("d-none");
        document.getElementById("name_right").innerHTML = name;
        document.getElementById("mail_right").innerHTML = email;
        document.getElementById("mobil_right").innerHTML = `${phone}`;
        document.getElementById("circle_right").innerHTML = acronym;
        document.getElementById("circle_right").style.background = color;
        gsap.from("#contact_right", {
            x: 150,
            opacity: 0,
            duration: 0.33,
            ease: 'back.out(0.7)'
        });
    }
}

function renderOpenDetail(i) {
    document.getElementById('contact_right').innerHTML = `
    <img onclick="closeDetail()" class="d-none" id="backarrow" src="img/backarrow.png" alt="" />
        <div class="name-container">
            <div class="circle-right" id="circle_right"></div>
            <div class="name">
                <h1 id="name_right"></h1>
                <div onclick="openAddTask()" class="name-addTask">
                    <img class="cross" src="img/cross.png" alt="" />
                    <p>Add Task</p>
                </div>
            </div>
        </div>

        <div class="contact-information-container">
            <div class="contact-information">
                <h2>Contact Information</h2>
                <div class="info-email">
                    <p>Email</p>
                    <span id="mail_right"></span>
                </div>
                <div class="info-mobil">
                    <p>Mobil</p>
                    <span id="mobil_right"></span>
                </div>
            </div>
            <div onclick="openEditContact(${i})" id="edit_contact_pencil" class="edit-contact">
                <img src="img/pencil.png" alt="" />
                <p>Edit Contact</p>
            </div>
        </div>
        <img src="img/edit-contact.png" id="edit_contact" class="d-none" alt="" />
    `;
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
        gsap.from("#add_contact_container", {
            width: 1200,
            x: -1000,
            duration: 0.55,
            ease: "back.out(0.35)",
        });
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
    renderContactsAddTask();
    html.classList.toggle("hide-overflow-y");
    renderAddTask();

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
    symbols = "0123456789ABCDEF";
    color = "#";

    for (let f = 0; f < 6; f++) {
        color = color + symbols[Math.floor(Math.random() * 16)];
    }
}

function setColorOnRendering(i) {
    document.getElementById(`circle_contacts${i}`).style.background = contacts[i]['color'];
}

function clickDialog(e) {
    e.stopPropagation();
}

async function openEditContact(i) {
    let contacts = await JSON.parse(backend.getItem("contacts"));
    selectedContact = contacts[i];
    selectedColor = selectedContact['color'];
    selectedLetter = selectedContact['firstLetters'];

    let nameInput = document.getElementById("input-name-edit");
    let mailInput = document.getElementById("input-mail-edit");
    let phoneInput = document.getElementById("input-phone-edit");

    nameInput.value = selectedContact.name;
    mailInput.value = selectedContact.mail;
    phoneInput.value = selectedContact.mobil;

    document.getElementById("blur_screen-edit").classList.remove("d-none");

    gsap.from(".edit-contact-inner-container", {
        x: -400,
        duration: 0.55,
        ease: "back.out(0.35)",
    });
}


async function saveEditContact() {
    let contacts = await JSON.parse(backend.getItem("contacts"));
    let name_input = document.getElementById("input-name-edit");
    let mail_input = document.getElementById("input-mail-edit");
    let phone_input = document.getElementById("input-phone-edit");
    const ind = contacts.indexOf(selectedContact);
    if (ind > -1) {
        contacts.splice(ind, 1);
    }

    let contact = {
        name: name_input.value,
        mail: mail_input.value,
        mobil: phone_input.value,
        color: selectedColor,
        firstLetters: selectedLetter
    };

    console.log(selectedContact);
    contacts.push(contact);
    await backend.setItem("contacts", JSON.stringify(contacts));

    selectedContact = null;
    renderContactList();
    closeBlurScreen();
}

function dateFuture() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("select-date-task").setAttribute("min", today);
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