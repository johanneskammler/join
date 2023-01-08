function render() {
    let container = document.getElementById('contact_list');
    alphabet = "abcdefghijklmnopqrstuvwxyz".toCharArray();

    for (let i = 0; i < alphabet.length; i++) {
        const element = alphabet[i];
        container.innerHTML += `<div>${element}</div>`
    }
}