var today = new Date();
  document.write(today.toDateString());

  let borderContainer = document.getElementsByClassName('task-urgent');
  let borderLine = document.getElementsByClassName('border-line');
  
  if (borderLine.style.backgroundColor === 'white') {
    borderLine.style.borderLeft = '3px solid #4589ff';
  } else {
    borderLine.style.borderLeft = '3px solid white';
  }
  

  function checkSize() {
    let size = window.innerWidth;
    console.log(size);
    if (size <= 1024) {
      console.log("smaller than 1024");
      sidebarTabled();
      draggableFalse();
    } else if (size > 1024) {
      console.log("bigger than 1024");
      draggableTrue();
      sidebarDesktop();
    }
  }
  
  function sidebarTabled() {
    document.getElementById("sidebar").classList.remove("sidebar");
    document.getElementById("sidebar").classList.add("tablet-sidebar");
  }
  function sidebarDesktop() {
    document.getElementById("sidebar").classList.add("sidebar");
    document.getElementById("sidebar").classList.remove("tablet-sidebar");
  }
  
  function draggableFalse() {
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      card.setAttribute("draggable", false);
    }
  }
  
  function draggableTrue() {
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      card.setAttribute("draggable", true);
      card.onmousedown = "";
    }
  }