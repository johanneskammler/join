async function init() {
    await includeHTML();
    await renderContactList();

    checkMainSize();
}

function checkSize() {
    let size = window.innerWidth;
    console.log(size);
    if (size < 1024) {
        sidebarTabled();
    } else if (size > 1024) {
        enableSidebar();
    }
}

function sidebarTabled() {
    document.getElementById("sidebar").classList.remove("sidebar");
    document.getElementById("sidebar").classList.add("tablet-sidebar");
    document.getElementById("help-section-btn").classList.add("d-none");
    document.getElementById("create-btn-responsive").classList.remove("d-none");
    document.getElementById("header-name-resp").classList.remove("d-none");
}

function enableSidebar() {
    document.getElementById("sidebar").classList.add("sidebar");
    document.getElementById("sidebar").classList.remove("tablet-sidebar");
    // document.getElementById("help-section-btn").classList.remove("d-none");
    // document.getElementById("create-btn-responsive").classList.add("d-none");
    // document.getElementById("header-name-resp").classList.add("d-none");
}

async function renderContactList() {
    let url = '../contacts.json';
    let response = await fetch(url);
    let contacts = await response.json();

    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];

        document.getElementById('content').innerHTML += `
        <div class="contact">
                <div class="circle">AM</div>
                <div class="contact-info-container">
                     <span class="contact-name">${element['name']}</span>
                    <span class="contact-email">${element['mail']}</span>
                </div>
        </div>
        `;
    }

    console.log(contacts)
}