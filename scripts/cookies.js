"use strict";

const cookies = document.querySelector(".cookies");
const diclineCookies = () => {
  cookies.style.bottom = "-100%";
  const timeId = setTimeout(() => {
    cookies.classList.add("visibilityHidden");
    cookies.ariaHidden = "true";
  }, 500);
};

const acceptCookies = () => {
  document.cookie = "";
  diclineCookies();
};
