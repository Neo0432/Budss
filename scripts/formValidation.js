"use strict";

const inputs = document.forms["modalForm"].getElementsByTagName("input");
const submitButton = document.getElementById("formModal-submit-button");

const checkInputsForNull = (e) => {
  const input = e.target;
  const classes = input.classList;
  const parent = input.closest(".input-div");
  if (input.value == "" || input.value == "+7 ") {
    classes.add("input-div__form-input--invalid");
    parent.setAttribute("data-after", "This field is required.");

    input.addEventListener("focus", (e) => toggleInvalid(e, parent));
  } else {
    input.removeEventListener("focus", toggleInvalid);
  }
  isReadyForSubmit(inputs);
};

const toggleInvalid = (e, parent) => {
  e.target.classList.remove("input-div__form-input--invalid");
  parent.setAttribute("data-after", "");
};

function isReadyForSubmit(inputsArr) {
  const inputsArea = document.getElementById("contact-inputs");
  for (const input of inputsArr) {
    if (
      ((input.value == "" || input.value == "+7 ") && input.required) ||
      input.classList.contains("input-div__form-input--invalid")
    ) {
      if (
        (input.value == "" || input.value == "+7 ") &&
        input.classList.contains("input-div__form-input--invalid")
      ) {
        submitButton.disabled = true;

        inputsArea.setAttribute(
          "data-after",
          "Please fill in all required fields"
        );
      }
      return;
    }
  }

  inputsArea.setAttribute("data-after", "");
  submitButton.disabled = false;
}

for (const input of inputs) {
  if (input.required) {
    input.addEventListener("blur", checkInputsForNull);
    input.addEventListener("blur", () => isReadyForSubmit(inputs));
    input.addEventListener("input", () => isReadyForSubmit(inputs));
  }
}
