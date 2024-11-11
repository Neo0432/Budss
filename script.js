"use strict";

const slidesBlock = document.querySelector(".slides");
let slides = Array.from(slidesBlock.children);
const prevButton = document.querySelector(".button--prev");
const nextButton = document.querySelector(".button--next");
const dots = document.querySelector(".dots");
let isAnimationPlaying = false; // whether the transition animation is being played

// checking for class. If doesen't have class - add class
for (let slide of slides) {
  if (!slide.classList.contains("slides__slide"))
    slide.classList.add("slides__slide");
}

//Add clones of first and last slides for inconspicuous transition
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);
slides.push(firstSlide);
slides.unshift(lastSlide);

slidesBlock.insertBefore(lastSlide, slidesBlock.firstChild);
slidesBlock.appendChild(firstSlide);

//set data-attr (indexes) for each element
setIndexes(slides);
setDots(slides);

// set initial position for elements
moveToSlide(null, document.querySelector('[data-slide-index="0"]'), false);

prevButton.addEventListener("click", () => prevSlide());
nextButton.addEventListener("click", () => nextSlide());

// forward button
function nextSlide() {
  if (isAnimationPlaying) return;
  const OldCurrentSlide = document.querySelector(".slide-current");
  let newCurrentSlide = document.querySelector(
    `[data-slide-index="${
      +OldCurrentSlide.getAttribute("data-slide-index") + 1
    }"]`
  );
  OldCurrentSlide.classList.remove("slide-current");
  newCurrentSlide.classList.add("slide-current");
  moveToSlide(OldCurrentSlide, newCurrentSlide);
  chandeActiveDot();
}

// backward button
function prevSlide() {
  if (isAnimationPlaying) return;
  const OldCurrentSlide = document.querySelector(".slide-current");
  let newCurrentSlide = document.querySelector(
    `[data-slide-index="${
      OldCurrentSlide.getAttribute("data-slide-index") - 1
    }"]`
  );
  OldCurrentSlide.classList.remove("slide-current");
  newCurrentSlide.classList.add("slide-current");
  moveToSlide(OldCurrentSlide, newCurrentSlide);
  chandeActiveDot(null, false);
}

// assigning indexes to each element
function setIndexes(slidesArr) {
  for (let i = 0; i < slidesArr.length; i++) {
    slidesArr[i].setAttribute("data-slide-index", `${i - 1}`);
    if (i - 1 == 0) slidesArr[i].classList.add("slide-current");
  }
}

function setDots(slideArr) {
  if (!slideArr) return;
  let dotsCount = slideArr.length - 2;
  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement("div");
    dot.setAttribute("data-dot-index", i);
    dots.append(dot);
    dot.addEventListener("click", (e) => chandeActiveDot(e));
  }
  dots.firstChild.classList.add("active-dot");
}

function chandeActiveDot(e = null, forward = true) {
  let activeDot = document.querySelector(".active-dot");

  // if func was called from left or right button
  if (e == null) {
    activeDot.classList.remove("active-dot");
    let newDotIndex;
    if (forward) newDotIndex = +activeDot.getAttribute("data-dot-index") + 1;
    else newDotIndex = +activeDot.getAttribute("data-dot-index") - 1;
    if (newDotIndex > dots.children.length - 1) newDotIndex = 0;
    else if (newDotIndex < 0) newDotIndex = dots.children.length - 1;
    activeDot = document.querySelector(`[data-dot-index = '${newDotIndex}']`);
    activeDot.classList.add("active-dot");
    return;
  }

  if (activeDot == e.target) return;

  const startSlide = document.querySelector(
    `[data-slide-index = '${activeDot.getAttribute("data-dot-index")}']`
  );

  const endSlide = () => {
    if (e != null)
      return document.querySelector(
        `[data-slide-index = '${e.target.getAttribute("data-dot-index")}' `
      );
  };
  console.log(endSlide().getAttribute("data-slide-index"));

  activeDot.classList.remove("active-dot");
  activeDot = e.target;
  activeDot.classList.add("active-dot");

  moveToSlide(startSlide, endSlide());
}

// computing how much the block needs to be shifted
function moveToSlide(oldSlide, slide, isAnimated = true) {
  const blockSize = slide.offsetWidth;
  const blockIndex = +slide.getAttribute("data-slide-index") + 1;
  const blockGap =
    parseInt(getComputedStyle(slide).marginInline.match(/\d+/)) * 2;
  const position = (blockSize + blockGap) * blockIndex;

  //if block need animation for transition
  if (isAnimated) {
    const oldBlockIndex = +oldSlide.getAttribute("data-slide-index") + 1;
    const oldPosition = (blockSize + blockGap) * oldBlockIndex;
    getSmootherTransition(
      -oldPosition,
      -position,
      blockSize + blockGap,
      slidesBlock,
      oldSlide,
      slide
    );
  } else slidesBlock.style.left = `${-position}px`;
}

// move to last or firts element, if index equial -1 or last
function isLastSlide(oldSlide, slide) {
  if (+slide.getAttribute("data-slide-index") == -1) {
    slide.classList.remove("slide-current");
    slide = document.querySelector(`[data-slide-index="${slides.length - 3}"]`);
    slide.classList.add("slide-current");

    moveToSlide(oldSlide, slide, false);
  } else if (+slide.getAttribute("data-slide-index") == slides.length - 2) {
    slide.classList.remove("slide-current");
    slide = document.querySelector("[data-slide-index='0']");
    slide.classList.add("slide-current");

    moveToSlide(oldSlide, slide, false);
  }
}

// computing non-linaar function for posititon
function getSmootherTransition(
  startPosition,
  newPosition,
  blockSize,
  Element,
  oldSlide,
  newSlide
) {
  let moveSpeed = 0;
  let leftPos = startPosition;
  let currentPosition = startPosition;

  isAnimationPlaying = true;

  // speed multiplier
  const a = 120 / Math.pow(startPosition, 2);

  // function's vertex == 0
  const xVertex = startPosition + blockSize * 0.5;

  // if moving backward
  if (newPosition > startPosition) {
    const intervalID = setInterval(() => {
      // computing how much an element will be displaced
      moveSpeed = a * (-currentPosition + xVertex) ** 2;

      // set min-seed
      if (moveSpeed < 10) moveSpeed = 10;
      // set max-speed
      if (moveSpeed > 30) moveSpeed = 30;

      currentPosition = currentPosition + moveSpeed;

      // computing new element position
      leftPos = leftPos + moveSpeed;

      // rewriting position of element
      Element.style.left = leftPos + "px";

      // last step of moving
      if (newPosition - 30 <= leftPos) {
        Element.style.left = newPosition + "px";
        clearInterval(intervalID);

        // if slide was last or first
        isLastSlide(oldSlide, newSlide);

        // buttons enabled
        isAnimationPlaying = false;
      }
    }, 2);
  } else {
    // if moving forward
    const intervalID = setInterval(() => {
      moveSpeed = a * (-currentPosition + xVertex) ** 2;
      if (moveSpeed < 10) moveSpeed = 10;
      if (moveSpeed > 30) moveSpeed = 30;

      currentPosition = currentPosition + moveSpeed;

      leftPos = leftPos - moveSpeed;

      Element.style.left = leftPos + "px";

      if (newPosition + 30 >= leftPos) {
        Element.style.left = newPosition + "px";
        clearInterval(intervalID);

        isLastSlide(oldSlide, newSlide);

        isAnimationPlaying = false;
      }
    }, 2);
  }
}
