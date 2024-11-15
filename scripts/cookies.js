"use strict";

const cookies = document.querySelector(".cookies");
const newFocusElement = document.querySelectorAll(".primary_button")[0];

function closeCookiesDialog() {
  cookies.style.bottom = "-100%";
  const timeId = setTimeout(() => {
    cookies.classList.add("visibilityHidden");
    newFocusElement.focus();
    cookies.ariaHidden = "true";
  }, 500);
}

const acceptCookies = () => {
  document.cookie = "";
  closeCookiesDialog();
};

const diclineCookies = () => {
  closeCookiesDialog();
};
