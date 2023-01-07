function fillImportanceButton1() {
    document.getElementById('importance-button1').style = 'display: none;';
    document.getElementById('importance-button1-colored').style = 'display: flex; cursor: pointer;';
    document.getElementById('importance-button2').style = 'display: flex;';
    document.getElementById('importance-button2-colored').style = 'display: none;';
    document.getElementById('importance-button3').style = 'display: flex;';
    document.getElementById('importance-button3-colored').style = 'display: none;';
}

function emptyImportanceButton1() {
    document.getElementById('importance-button1').style = 'display: flex;';
    document.getElementById('importance-button1-colored').style = 'display: none;';
}

function fillImportanceButton2() {
    document.getElementById('importance-button2').style = 'display: none;';
    document.getElementById('importance-button2-colored').style = 'display: flex; cursor: pointer;';
    document.getElementById('importance-button1').style = 'display: flex;';
    document.getElementById('importance-button1-colored').style = 'display: none;';
    document.getElementById('importance-button3').style = 'display: flex;';
    document.getElementById('importance-button3-colored').style = 'display: none;';
}

function emptyImportanceButton2() {
    document.getElementById('importance-button2').style = 'display: flex;';
    document.getElementById('importance-button2-colored').style = 'display: none;';
}

function fillImportanceButton3() {
    document.getElementById('importance-button3').style = 'display: none;';
    document.getElementById('importance-button3-colored').style = 'display: flex; cursor: pointer;';
    document.getElementById('importance-button1').style = 'display: flex;';
    document.getElementById('importance-button1-colored').style = 'display: none;';
    document.getElementById('importance-button2').style = 'display: flex;';
    document.getElementById('importance-button2-colored').style = 'display: none;';
}

function emptyImportanceButton3() {
    document.getElementById('importance-button3').style = 'display: flex;';
    document.getElementById('importance-button3-colored').style = 'display: none;';
}


function openContactsToSelect() {
    document.getElementById('contacts-drop-down').classList.remove('d-none');
}


function openCategoriesToSelect() {
    document.getElementById('categories-drop-down').classList.remove('d-none');
}