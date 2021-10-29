// Functions

// Add error message to edit input.
function showInputError (editEl, inputEl, errorMessage, settings) {
  const errorEl = editEl.querySelector("."+settings.errorClass+"_"+inputEl.id);
  inputEl.classList.add(settings.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(settings.errorClass+"_active");
}

// Remove error message from edit input.
function hideInputError (editEl, inputEl, settings) {
  const errorEl = editEl.querySelector("."+settings.errorClass+"_"+inputEl.id);
  inputEl.classList.remove(settings.inputErrorClass);
  errorEl.textContent = "";
  errorEl.classList.remove(settings.errorClass+"_active");
}

//  Check input validity and toggle error message.
function checkInputValidity (editEl, inputEl, settings) {
  if (!inputEl.validity.valid) {
    showInputError(editEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(editEl, inputEl, settings);
  }
}

// Return true if inputs have invalid text. Used to toggle button state.
function hasInvalidInput (inputList) {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}

// Activate or deactivate button element based on input validity.
function toggleButtonState (inputList, buttonEl, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add(inactiveButtonClass);
    buttonEl.setAttribute("disabled", "");
  } else {
    buttonEl.classList.remove(inactiveButtonClass);
    buttonEl.removeAttribute("disabled", "");
  }
}

// Add error message events to inputs of modal.
function setEventListeners (formEl, settings) {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList,  buttonEl, settings.inactiveButtonClass);

  inputList.forEach( (inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, settings);
      toggleButtonState(inputList, buttonEl, settings.inactiveButtonClass);
    });
  });
}

function enableValidation(settings) {
  // find all forms using formSelector in settings object
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  // for each form, add validation listeners to inputs
  formList.forEach( (form) => {
    setEventListeners(form, settings);
  });
}

export function resetValidation(edit, settings = {
  formSelector: ".edit__form",
  inputSelector: ".edit__input",
  submitButtonSelector: ".edit__save",
  inactiveButtonClass: "edit__save_inactive",
  inputErrorClass: "edit__input_type_error",
  errorClass: "edit__input-error"
}) {
  const inputs = edit.querySelectorAll(settings.inputSelector);

  inputs.forEach( (input) => {
    hideInputError(edit, input, settings);
  });
}

// Scripts

//Form Validation
enableValidation({
  formSelector: ".edit__form",
  inputSelector: ".edit__input",
  submitButtonSelector: ".edit__save",
  inactiveButtonClass: "edit__save_inactive",
  inputErrorClass: "edit__input_type_error",
  errorClass: "edit__input-error"
});