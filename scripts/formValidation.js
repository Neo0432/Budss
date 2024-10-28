"use strict";

const inputs = document.forms["modalForm"].getElementsByTagName("input");
const submitButton = document.getElementById("formModal-submit-button");

const checkInputsForNull = (e) => {
  const input = e.target;
  const classes = input.classList;
  console.log(input.value);
  if (input.value == "") {
    classes.add("input-div__form-input--invalid");
    input.addEventListener("focus", toggleInvalid);
  } else {
    input.removeEventListener("focus", toggleInvalid);
  }

  isReadyForSubmit(inputs);
};

const toggleInvalid = (e) => {
  e.target.classList.toggle("input-div__form-input--invalid");
};

function isReadyForSubmit(inputsArray) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "" && inputs[i].required) {
      submitButton.disabled = true;
      return;
    }
  }
  console.log(submitButton.disabled);
  submitButton.disabled = false;
}

for (let i = 0; i < inputs.length; i++) {
  if (inputs[i].required) {
    inputs[i].addEventListener("blur", checkInputsForNull);
  }
}
