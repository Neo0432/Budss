"use strict";

const hamburgerButton = document.querySelector(".header__button--hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");

let isBurgerOpen = hamburgerMenu.getAttribute("data-is-open") === "true";

hamburgerButton.addEventListener("click", () => {
  if (!isBurgerOpen) {
    hamburgerMenu.setAttribute("data-is-open", "true");
    isBurgerOpen = true;
    body.style.overflow = "hidden";
  }
});

const menuCloseButton = () => {
  if (isBurgerOpen) {
    hamburgerMenu.setAttribute("data-is-open", "false");
    isBurgerOpen = false;
    body.style.overflow = "";
  }
};
