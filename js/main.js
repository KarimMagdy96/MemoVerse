var takeNoteTitle = document.getElementById("takeNoteTitle");
var takeNoteText = document.getElementById("takeNoteText");
var addNoteBtn = document.getElementById("addNoteBtn");
var noteContainer = document.getElementById("noteContainer");
var mainTitle = document.getElementById("mainTitle");
var mainBody = document.getElementById("mainBody");
var mainNoteContainer = document.getElementById("mainNoteContainer");
var addNoteRevelbtn = document.getElementById("addNoteRevelbtn");
var addnoteHeader = document.getElementById("addnoteHeader");
var takeNoteLayer = document.getElementById("takeNoteLayer");
var closeToggle = document.getElementById("closeToggle");
var searchNote = document.getElementById("searchNote");
var noteIndex = 0;
if (localStorage.getItem("notes") != null) {
  var notes = JSON.parse(localStorage.getItem("notes"));
  displayNotes();
} else {
  notes = [];
}
addNoteRevelbtn.onclick = function () {
  takeNoteLayer.classList.toggle("d-none");
};
closeToggle.onclick = function () {
  takeNoteLayer.classList.toggle("d-none");
  addNoteBtn.classList.replace("bg-warning", "bg-success");
  document.getElementById("takeNoteTitle").value = "";
  document.getElementById("takeNoteText").value = "";
  addnoteHeader.innerHTML = "ADD NEW NOTE";
  document.getElementById("addNoteBtn").innerHTML = "Add Note";
};

addNoteBtn.onclick = function () {
  if (addNoteBtn.classList.contains("bg-warning")) {
    updateNote(noteIndex);
    takeNoteLayer.classList.toggle("d-none");
  } else {
    var note = {
      title: takeNoteTitle.value,
      text: takeNoteText.value,
    };
    notes.push(note);
    displayNotes();
    localStorage.setItem("notes", JSON.stringify(notes));
    takeNoteLayer.classList.toggle("d-none");
    document.getElementById("takeNoteTitle").value = "";
    document.getElementById("takeNoteText").value = "";
  }
};

function displayNotes() {
  var container = "";
  for (var i = 0; i < notes.length; i++) {
    container += `
    <div class=" mt-4 col-lg-3 col-md-6  ">
    <div class="p-2 bg-white  border-bottom border-success border-2 rounded-3 shadow ">
        <div class="title_container d-flex flex-column">
          <h3 id="mainTitle">${notes[i].title}</h3>
        </div>
        <div class="noteBody mt-3 mb-2">
          <p id="mainBody" class='overflow-auto'>${notes[i].text}</p>
        </div>
       <div class="d-flex justify-content-end">
       <button onclick="editNote(${i})" class="btn" id="addNoteBtn"><i class="fa-regular fa-pen-to-square"></i></button>
       <button onclick="deleteNote(${i})" class="btn" id="addNoteBtn"><i class="fa-regular fa-trash-can"></i></button>
       </div>
       </div>
      </div>
    `;
  }

  document.getElementById("noteContainer").innerHTML = container;
}

function deleteNote(note) {
  notes.splice(note, 1);
  displayNotes();
  localStorage.setItem("notes", JSON.stringify(notes));
  document.getElementById("addNoteBtn").innerHTML = "Add Note";
  addNoteBtn.classList.replace("bg-warning", "bg-success");
  document.getElementById("takeNoteTitle").value = "";
  document.getElementById("takeNoteText").value = "";
}

function editNote(index) {
  document.getElementById("takeNoteTitle").value = notes[index].title;
  document.getElementById("takeNoteText").value = notes[index].text;
  noteIndex = index;
  addNoteBtn.innerHTML = "Update Note";
  addNoteBtn.classList.replace("bg-success", "bg-warning");
  takeNoteLayer.classList.toggle("d-none");
  addnoteHeader.innerHTML = "Update Note";
}

function updateNote(noteIndex) {
  notes[noteIndex].title = document.getElementById("takeNoteTitle").value;
  notes[noteIndex].text = document.getElementById("takeNoteText").value;
  displayNotes();
  localStorage.setItem("notes", JSON.stringify(notes));
  document.getElementById("addNoteBtn").innerHTML = "Add Note";
  addNoteBtn.classList.replace("bg-warning", "bg-success");
  document.getElementById("takeNoteTitle").value = "";
  document.getElementById("takeNoteText").value = "";
  addnoteHeader.innerHTML = "ADD NEW NOTE";
}

searchNote.onkeyup = function () {
  var container = "";
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].title.toLowerCase().includes(searchNote.value.toLowerCase())) {
      container += `
    <div class=" mt-4 col-lg-3 col-md-6  ">
    <div class="p-2 bg-white  border-bottom border-success border-2 rounded-3 shadow ">
        <div class="title_container d-flex flex-column">
          <h3 id="mainTitle">${notes[i].title}</h3>
        </div>
        <div class="noteBody mt-3 mb-2">
          <p id="mainBody" class='overflow-auto'>${notes[i].text}</p>
        </div>
       <div class="d-flex justify-content-end">
       <button onclick="editNote(${i})" class="btn" id="addNoteBtn"><i class="fa-regular fa-pen-to-square"></i></button>
       <button onclick="deleteNote(${i})" class="btn" id="addNoteBtn"><i class="fa-regular fa-trash-can"></i></button>
       </div>
       </div>
      </div>
    `;
    }

    document.getElementById("noteContainer").innerHTML = container;
  }
};
