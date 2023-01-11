async function init() {
    await includeHTML();
    checkSize();
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
    document.getElementById("create-task-btn-span").innerHTML = 'Create';
    document.getElementById("create-task-btn").style = 'width: 113px';
}

function enableSidebar() {
    document.getElementById("sidebar").classList.add("sidebar");
    document.getElementById("sidebar").classList.remove("tablet-sidebar");
    document.getElementById("help-section-btn").classList.remove("d-none");
    document.getElementById("create-task-btn-span").innerHTML = 'Create Task';
    document.getElementById("create-task-btn").style = '';
}


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
    document.getElementById('categories-drop-down').classList.add('d-none');
    var element = document.getElementById('contacts-drop-down');
    element.classList.toggle('d-none');
}


function openCategoriesToSelect() {
    document.getElementById('contacts-drop-down').classList.add('d-none');
    var element = document.getElementById('categories-drop-down');
    element.classList.toggle('d-none');
}