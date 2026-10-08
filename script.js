const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];

function render(notesToShow = notes) {
  notesList.textContent = "";

  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }

  if (notesToShow.length === 0 && searchInput.value.trim() !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
    return;
  }

  notesToShow.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note-card");
    li.classList.add(`category-${note.category.toLowerCase()}`);

    const text = document.createElement("p");
    text.textContent = note.text;

    const category = document.createElement("small");
    category.textContent = note.category;

    const date = document.createElement("small");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      notes = notes.filter((item) => item.id !== note.id);
      localStorage.setItem("quickNotes", JSON.stringify(notes));
      render();
    });

    li.appendChild(text);
    li.appendChild(category);
    li.appendChild(document.createElement("br"));
    li.appendChild(date);
    li.appendChild(document.createElement("br"));
    li.appendChild(deleteButton);

    notesList.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  localStorage.setItem("quickNotes", JSON.stringify(notes));

  render();
  noteInput.value = "";
});

searchInput.addEventListener("input", () => {
  const searchWords = searchInput.value.trim().toLowerCase();

  if (searchWords === "") {
    render();
    return;
  }

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchWords)
  );

  render(filteredNotes);
});

render();