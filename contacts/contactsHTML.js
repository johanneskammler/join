function openContactsOnContactsHtml() {
  renderContactsAddTask();
  openContactsToSelect();
}

function renderContactsRasterHTML() {
  return `
            <div id="contact-list-id" class="contact-list-inner-container">
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

function showNoContacts() {
  document.getElementById("contact_list_container").innerHTML = `
        <div class="no-contacts">
        <h4>No contacts yet. <br> Please add a new contact!</h4>
    </div>
        `;
}

function ContactListHTML(i, fullName, email, firstLetters, firstLetter, color) {
  if (firstLetter == "A") {
    document.getElementById("a").innerHTML += `
        <div class="contact"  id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "B") {
    document.getElementById("b").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "C") {
    document.getElementById("c").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "D") {
    document.getElementById("d").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "E") {
    document.getElementById("e").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "F") {
    document.getElementById("f").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "G") {
    document.getElementById("g").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "H") {
    document.getElementById("h").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "I") {
    document.getElementById("i").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "J") {
    document.getElementById("j").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "K") {
    document.getElementById("k").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "L") {
    document.getElementById("l").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "M") {
    document.getElementById("m").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "N") {
    document.getElementById("n").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "O") {
    document.getElementById("o").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "P") {
    document.getElementById("p").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "Q") {
    document.getElementById("q").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "R") {
    document.getElementById("r").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "S") {
    document.getElementById("s").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "T") {
    document.getElementById("t").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "U") {
    document.getElementById("u").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "V") {
    document.getElementById("v").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "W") {
    document.getElementById("w").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "X") {
    document.getElementById("x").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "Y") {
    document.getElementById("y").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
  if (firstLetter == "Z") {
    document.getElementById("z").innerHTML += `
        <div class="contact" id="contact${i}" onclick="openContactDetail(${i})">
            <div style="background-color:${color};" id="circle_contacts${i}" class="circle">${firstLetters}</div>
            <div class="contact-info-container">
                <span class="contact-name">${fullName}</span>
                <span id="contact-email-${i}" class="contact-email">${email}</span>
            </div>
        </div>
    `;
  }
}

function renderOpenDetail(i) {
  document.getElementById("contact_right").innerHTML = `
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
        <img onclick="openEditContact(${i})" src="img/edit-contact.png" id="edit_contact" class="d-none" alt="" />
    `;
}

function renderDetailHTML(name, email, phone, acronym, color) {
  document.getElementById("contact_right").classList.remove("d-none");
  document.getElementById("name_right").innerHTML = name;
  document.getElementById("mail_right").innerHTML = email;

  if (phone == undefined) {
    document.getElementById("mobil_right").innerHTML = "";
  } else {
    document.getElementById("mobil_right").innerHTML = `${phone}`;
  }
  document.getElementById("circle_right").innerHTML = acronym.toUpperCase();
  document.getElementById("circle_right").style.background = color;
}

// function renderDetailHTMLRespons() {
//   document.getElementById("new_contact_btn").classList.add("d-none");
//   document.getElementById("contact_list_container").classList.add("d-none");
//   document.getElementById("edit_contact_pencil").classList.add("d-none");
//   document.getElementById("backarrow").classList.remove("d-none");
//   document.getElementById("edit_contact").classList.remove("d-none");
//   document.getElementById("contact_right").classList.remove("d-none");
// }
