"use strict";

function handleResizeText() {
  const mainHeader = document.querySelector("h1");
  const secondaryHeader = document.querySelectorAll("h2");
  const tertiaryHeader = document.querySelectorAll("h3");
  const sloganBlockDesctiption = document.querySelector(
    ".slogan-block__textarea"
  ).children[1];
  const aboutBlockDescription =
    document.querySelector(".about__body").children[0];
  const aboutItems = document.querySelectorAll(".about__item-textarea");
  const worksBlock = document.querySelectorAll(".works-rows__row");
  const metricsBlockRows = document.querySelectorAll(".metrics__item");
  const featuresHeaderBlockDescription = document.querySelector(
    ".features__textarea"
  );
  const featuresItems = document.querySelectorAll(".features__item");

  //h1 header
  mainHeader.classList.remove("T2_Bold_96");
  mainHeader.classList.add("T6_Bold_40");

  //h2 headers
  for (const header of secondaryHeader) {
    const classes = header.classList;
    classes.remove("T2_Bold_96", "T3_Bold_64", "S1_SemiBold_36");
    classes.add("T6_Bold_40");
  }

  //h3 headers
  for (const header of tertiaryHeader) {
    const classes = header.classList;
    classes.remove("T3_Bold_64", "T4_Bold_48", "T5_SemiBold_48");
    const newFontSize =
      header.getAttribute("data-text-class-smallscreen") || "T7_Bold_32";
    classes.add(newFontSize);
  }

  //slogan description
  sloganBlockDesctiption.classList.remove("S6_Regular_20");
  sloganBlockDesctiption.classList.add("B2_Regular_16");

  //about description
  aboutBlockDescription.classList.remove("S1_SemiBold_36");
  aboutBlockDescription.classList.add("S2_SemiBold_24");

  //about description
  for (const item of aboutItems) {
    const classes = item.children[1].classList;
    classes.remove("S3_Regular_24");
    classes.add("B2_Regular_16");
  }

  //HOW BUDDS WORKS background animation
  for (const row of worksBlock) {
    for (const item of row.children) {
      const classes = item.classList;
      classes.remove("T1_Bold_128");
      classes.add("T4_Bold_48");
    }
  }

  //metrics
  for (const row of metricsBlockRows) {
    for (let i = 0; i < row.children.length; i++) {
      row.children[i].classList.remove("T3_Bold_64", "S2_SemiBold_24");
      if (i == 0) row.children[i].classList.add("T4_Bold_48");
      else row.children[i].classList.add("S4_SemiBold_20");
    }
  }

  //WhyBuds description
  featuresHeaderBlockDescription.children[1].classList.remove("S1_SemiBold_36");
  featuresHeaderBlockDescription.children[1].classList.add("S2_SemiBold_24");

  //WhyBuds cards description
  for (const card of featuresItems) {
    const item = card.children[0].children[1];
    item.classList.remove("S6_Regular_20");
    item.classList.add("B2_Regular_16");
  }
}

if (window.innerWidth <= 640) handleResizeText();
