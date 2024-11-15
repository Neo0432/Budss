"use strict";
const dialog = document.getElementById("dialog-contact-form");
const dialogForm = document.forms["modalForm"];
const firsInput = document.querySelector(".input-div").children[0];
const successSubmitAlert = document.querySelector(".dialog-success-submit");
const closeButton = document.getElementById("dialog-close-button");

function getScrollWidth() {
  let div = document.createElement("div");
  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

const body = document.body;
const scrollWidth = getScrollWidth();

const openDialog = () => {
  dialog.showModal();
  body.style.paddingRight = +body.style.paddingRight + scrollWidth + "px";
  body.style.overflow = "hidden";
  firsInput.focus();
};

const closeDialog = (e, dialog = null) => {
  if (dialog === null) {
    dialog = e.target.closest("dialog");
  }

  const inputs = document.forms["modalForm"].getElementsByTagName("input");
  const inputsArea = document.getElementById("contact-inputs");
  for (const input of inputs) {
    const parent = input.closest(".input-div");
    input.classList.remove("input-div__form-input--invalid");
    parent.setAttribute("data-after", "");
    inputsArea.setAttribute("data-after", "");
  }
  dialog.close();
};

dialog.addEventListener("close", (e) => {
  dialogForm.reset();
  body.style.overflow = "";
  body.style.paddingRight = "";
});

window.addEventListener("keydown", (e) => {
  if (e.code == "Escape") {
    const openDialog = document.querySelector("dialog[open]");
    if (openDialog) {
      closeButton.focus();
      closeDialog(null, openDialog);
    }
  }
});

dialogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closeDialog(e);

  //Collecting data from form to FormData
  //Sending to server
  //await response
  const showSuccessAlert = () => {
    successSubmitAlert.showModal();
    body.style.paddingRight = +body.style.paddingRight + scrollWidth + "px";
    body.style.overflow = "hidden";
  };
  const timeId = setTimeout(showSuccessAlert, 100); //workaround
  successSubmitAlert.addEventListener("close", (e) => {
    body.style.paddingRight = +body.style.paddingRight - scrollWidth + "px";
    body.style.overflow = "";
    clearTimeout(timeId);
  });
});
