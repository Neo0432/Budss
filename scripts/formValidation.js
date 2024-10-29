"use strict";

const inputs = document.forms["modalForm"].getElementsByTagName("input");
const submitButton = document.getElementById("formModal-submit-button");

const checkInputsForNull = (e) => {
  const input = e.target;
  const classes = input.classList;
  const parent = input.closest(".input-div");
  // console.log(parent.closest(".inputs-area"));
  if (input.value == "") {
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
  for (let i = 0; i < inputsArr.length; i++) {
    if (inputsArr[i].value == "" && inputsArr[i].required) {
      submitButton.disabled = true;
      if (inputsArr[i].classList.contains("input-div__form-input--invalid")) {
        inputsArea.setAttribute(
          "data-after",
          "Please fill in all required fields"
        );
      }
      return;
    }
  }
  inputsArea.setAttribute("data-after", "");
  console.log(submitButton.disabled);
  submitButton.disabled = false;
}

for (let i = 0; i < inputs.length; i++) {
  if (inputs[i].required) {
    inputs[i].addEventListener("blur", checkInputsForNull);
  }
}
