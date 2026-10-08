const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
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

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  render();

  noteInput.value = "";
});