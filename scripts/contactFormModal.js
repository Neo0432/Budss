"use strict";
const dialog = document.getElementById("dialog-contact-form");
const dialogForm = document.forms["modalForm"];
const successSubmitAlert = document.querySelector(".dialog-success-submit");
const closeButton = document.getElementById("dialog-close-button");

function ScrollWidth() {
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
const scrollWidth = ScrollWidth();

const openDialog = () => {
  dialog.showModal();
  body.style.paddingRight = +body.style.paddingRight + scrollWidth + "px";
  body.style.overflow = "hidden";
};

const closeDialog = (e) => {
  const dialog = e.target.closest("dialog");
  dialog.close();
};

dialog.addEventListener("close", (e) => {
  body.style.overflow = "";
  body.style.paddingRight = "";
  console.log(2);
});

window.addEventListener("keydown", (e) => {
  if (e.code == "Escape") {
    const openDialog = document.querySelector("dialog[open]");
    if (openDialog) {
      openDialog.close();
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
  const timeId = setTimeout(showSuccessAlert, 100); //duct-tape solution
  successSubmitAlert.addEventListener("close", (e) => {
    body.style.paddingRight = +body.style.paddingRight - scrollWidth + "px";
    body.style.overflow = "";
    clearTimeout(timeId);
  });
});
