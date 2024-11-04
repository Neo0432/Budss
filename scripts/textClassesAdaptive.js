"use strict";

const mainHeader = document.querySelector("h1");
const secondaryHeader = document.querySelectorAll("h2");
const tertiaryHeader = document.querySelectorAll("h3");
const sloganBlockDesctiption = document.querySelector(".slogan-block__textarea")
  .children[1];
const aboutBlockDescription =
  document.querySelector(".about__body").children[0];
const aboutItems = document.querySelectorAll(".about__item-textarea");
const worksBlock = document.querySelectorAll(".works-rows__row");
const metricsBlockRows = document.querySelectorAll(".metrics__item");
const featuresHeaderBlockDescription = document.querySelector(
  ".features__textarea"
);
const featuresItems = document.querySelectorAll(".features__item");
let isSmallScreen = false;

function handleResizeTextSmallScreen() {
  if (isSmallScreen) return;
  console.log(isSmallScreen);
  //h1 header
  mainHeader.setAttribute("data-text-class-bigScreen", "T2_Bold_96");
  mainHeader.classList.remove("T2_Bold_96");
  mainHeader.classList.add("T6_Bold_40");

  //h2 headers
  for (const header of secondaryHeader) {
    const classes = header.classList;
    // console.log(classes);
    header.setAttribute("data-text-class-bigScreen", classes);
    classes.remove("T2_Bold_96", "T3_Bold_64", "S1_SemiBold_36");
    classes.add("T6_Bold_40");
  }

  //h3 headers
  for (const header of tertiaryHeader) {
    const classes = header.classList;
    header.setAttribute("data-text-class-bigScreen", classes);
    classes.remove("T3_Bold_64", "T4_Bold_48", "T5_SemiBold_48");
    const newFontSize =
      header.getAttribute("data-text-class-smallscreen") || "T7_Bold_32";
    classes.add(newFontSize);
  }

  //slogan description
  sloganBlockDesctiption.setAttribute(
    "data-text-class-bigScreen",
    sloganBlockDesctiption.classList
  );
  sloganBlockDesctiption.classList.remove("S6_Regular_20");
  sloganBlockDesctiption.classList.add("B2_Regular_16");

  //about description
  aboutBlockDescription.setAttribute(
    "data-text-class-bigScreen",
    aboutBlockDescription.classList
  );
  aboutBlockDescription.classList.remove("S1_SemiBold_36");
  aboutBlockDescription.classList.add("S2_SemiBold_24");

  //about-cards description
  for (const item of aboutItems) {
    const classes = item.children[1].classList;
    item.children[1].setAttribute("data-text-class-bigScreen", classes);
    classes.remove("S3_Regular_24");
    classes.add("B2_Regular_16");
  }

  //HOW BUDDS WORKS background animation
  for (const row of worksBlock) {
    for (const item of row.children) {
      const classes = item.classList;
      item.setAttribute("data-text-class-bigScreen", classes);
      classes.remove("T1_Bold_128");
      classes.add("T4_Bold_48");
    }
  }

  //metrics
  for (const row of metricsBlockRows) {
    for (let i = 0; i < row.children.length; i++) {
      const classes = row.children[i].classList;
      row.children[i].setAttribute("data-text-class-bigScreen", classes);
      classes.remove("T3_Bold_64", "S2_SemiBold_24");
      if (i == 0) classes.add("T6_Bold_40");
      else classes.add("S4_SemiBold_20");
    }
  }

  //WhyBuds description
  featuresHeaderBlockDescription.children[1].setAttribute(
    "data-text-class-bigScreen",
    featuresHeaderBlockDescription.children[1].classList
  );
  featuresHeaderBlockDescription.children[1].classList.remove("S1_SemiBold_36");
  featuresHeaderBlockDescription.children[1].classList.add("S2_SemiBold_24");

  //WhyBuds cards description
  for (const card of featuresItems) {
    const item = card.children[0].children[1];
    item.setAttribute("data-text-class-bigScreen", item.classList);
    item.classList.remove("S6_Regular_20");
    item.classList.add("B2_Regular_16");
  }
  isSmallScreen = true;
}

function handleResizeTextBigScreen() {
  if (!isSmallScreen) return;

  //h1 header
  const mainHeaderNewClass = mainHeader.getAttribute(
    "data-text-class-bigScreen"
  );
  if (mainHeaderNewClass) {
    mainHeader.classList.remove("T6_Bold_40");
    mainHeader.classList.add(mainHeaderNewClass);
  }

  //h2 headers
  for (const header of secondaryHeader) {
    const classes = header.classList;
    const newClass = header.getAttribute("data-text-class-bigScreen");
    if (newClass) {
      console.log(newClass);
      classes.remove("T6_Bold_40");
      classes.add(newClass);
    }
  }

  //h3 headers
  for (const header of tertiaryHeader) {
    const classes = header.classList;
    const newClass = header.getAttribute("data-text-class-bigScreen");
    const oldFontSize = header.getAttribute("data-text-class-smallscreen");
    if (newClass) {
      classes.remove("T7_Bold_32", oldFontSize);
      classes.add(newClass);
    }
  }

  //slogan description
  const sloganBlockDescriptionNewClass = sloganBlockDesctiption.getAttribute(
    "data-text-class-bigScreen"
  );
  if (sloganBlockDescriptionNewClass) {
    sloganBlockDesctiption.classList.remove("B2_Regular_16");
    sloganBlockDesctiption.classList.add(sloganBlockDescriptionNewClass);
  }

  //about description
  const aboutBlockDescriptionNewClass = aboutBlockDescription.getAttribute(
    "data-text-class-bigScreen"
  );
  if (aboutBlockDescriptionNewClass) {
    aboutBlockDescription.classList.remove("S2_SemiBold_24");
    aboutBlockDescription.classList.add(aboutBlockDescriptionNewClass);
  }

  //about-cards description
  for (const item of aboutItems) {
    const newClass = item.children[1].getAttribute("data-text-class-bigScreen");
    const classes = item.children[1].classList;
    if (newClass) {
      classes.remove("B2_Regular_16");
      classes.add(newClass);
    }
  }

  //HOW BUDDS WORKS background animation
  for (const row of worksBlock) {
    for (const item of row.children) {
      const newClass = item.getAttribute("data-text-class-bigScreen");
      const classes = item.classList;
      if (newClass) {
        classes.remove("T4_Bold_48");
        classes.add(newClass);
      }
    }
  }

  //metrics
  for (const row of metricsBlockRows) {
    for (let i = 0; i < row.children.length; i++) {
      const newClass = row.children[i].getAttribute(
        "data-text-class-bigScreen"
      );
      const classes = row.children[i].classList;
      if (newClass) {
        classes.remove("T6_Bold_40", "S4_SemiBold_20");
        classes.add(newClass);
      }
    }
  }

  //WhyBuds description
  const featiresHeaderBlockDescriptionNewClass =
    featuresHeaderBlockDescription.children[1].getAttribute(
      "data-text-class-bigScreen"
    );
  if (featiresHeaderBlockDescriptionNewClass) {
    featuresHeaderBlockDescription.children[1].classList.remove(
      "S2_SemiBold_24"
    );
    featuresHeaderBlockDescription.children[1].classList.add(
      featiresHeaderBlockDescriptionNewClass
    );
  }

  //WhyBuds cards description
  for (const card of featuresItems) {
    const item = card.children[0].children[1];
    const newClass = item.getAttribute("data-text-class-bigScreen");
    if (newClass) {
      item.classList.remove("B2_Regular_16");
      item.classList.add(newClass);
    }
  }

  isSmallScreen = false;
}

if (window.innerWidth <= 640) handleResizeTextSmallScreen();

window.addEventListener("resize", () => {
  if (window.innerWidth <= 640) handleResizeTextSmallScreen();
  else handleResizeTextBigScreen();
});
