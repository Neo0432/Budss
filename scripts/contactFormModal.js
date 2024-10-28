"use strict";
const dialog = document.getElementById("dialog-contact-form");
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

const openDialog = (e) => {
  dialog.showModal();
  body.style.paddingRight = +body.style.paddingRight + scrollWidth + "px";
  body.style.overflow = "hidden";
};

const closeDialog = (e) => {
  dialog.close();
  body.style.paddingRight = +body.style.paddingRight - scrollWidth + "px";
  body.style.overflowY = "auto";
};

window.addEventListener("keydown", (e) => {
  if (e.code == "Escape" && dialog.open) {
    closeDialog();
  }
});
