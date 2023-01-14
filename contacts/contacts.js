import contacts from '../contacts.json';

function renderContactList() {
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
}