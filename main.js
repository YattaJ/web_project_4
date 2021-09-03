// Variables

let profile = document.querySelector(".profile");
let edit = document.querySelector(".edit");
let formElement = edit.querySelector(".edit__form");
let closeBtn = edit.querySelector(".edit__close-btn");
let editBtn = profile.querySelector(".profile__edit-btn");

let nameInput = formElement.querySelector('input[name="name"]');
let jobInput = formElement.querySelector('input[name="career"]');
let nameField = profile.querySelector(".profile__name");
let jobField = profile.querySelector(".profile__career");
//

// Functions

function handleFormSubmit(evt) {
    evt.preventDefault();

    // Insert new values using the textContent property of the querySelector() method
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;

    // Close edit after saving
    edit.classList.toggle("edit_display");
}

function openForm(evt) {
    // Initialize form values
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;

    // Open edit
    edit.classList.add("edit_display");
}

function closeForm(evt) {
    // Close edit
    edit.classList.remove("edit_display");
}
//

// Scripts

formElement.addEventListener("submit", handleFormSubmit);
closeBtn.addEventListener("click", closeForm);
editBtn.addEventListener("click", openForm);
//
