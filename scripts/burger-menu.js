"use strict";

const hamburgerButton = document.querySelector(".header__button--hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");

let isBurgerOpen = hamburgerMenu.getAttribute("isOpen") === "true";

hamburgerButton.addEventListener("click", () => {
  console.log(typeof isBurgerOpen);
  if (!isBurgerOpen) {
    console.log(1);
    hamburgerMenu.setAttribute("isOpen", "true");
    isBurgerOpen = true;
    body.style.overflow = "hidden";
  }
});

const menuCloseButton = () => {
  if (isBurgerOpen) {
    hamburgerMenu.setAttribute("isOpen", "false");
    isBurgerOpen = false;
    body.style.overflow = "";
  }
};
