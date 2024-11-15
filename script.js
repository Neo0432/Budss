"use strict";

const slidesBlock = document.querySelector(".slides");
const prevButton = document.querySelector(".button--prev");
const nextButton = document.querySelector(".button--next");
let slides = Array.from(slidesBlock.children);
const dots = document.querySelector(".dots");

//whether the transition animation is being played
let isAnimationPlaying = false;

//checking for class. If doesen't have class - add class
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

//set initial position for elements
moveToSlide(null, document.querySelector('[data-slide-index="0"]'), false);

prevButton.addEventListener("click", () => prevSlide());
nextButton.addEventListener("click", () => nextSlide());

//forward button
function nextSlide() {
  if (isAnimationPlaying) return;
  const OldCurrentSlide = document.querySelector(".slide-current");
  let newCurrentSlide = document.querySelector(
    `[data-slide-index="${
      +OldCurrentSlide.getAttribute("data-slide-index") + 1
    }"]`
  );
  moveToSlide(OldCurrentSlide, newCurrentSlide);
  chandeActiveDot();
}

//backward button
function prevSlide() {
  if (isAnimationPlaying) return;
  const OldCurrentSlide = document.querySelector(".slide-current");
  let newCurrentSlide = document.querySelector(
    `[data-slide-index="${
      OldCurrentSlide.getAttribute("data-slide-index") - 1
    }"]`
  );
  moveToSlide(OldCurrentSlide, newCurrentSlide);
  chandeActiveDot(null, false);
}

//assigning indexes to each element
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

function chandeActiveDot(dot = null, forward = true) {
  let activeDot = document.querySelector(".active-dot");

  //if func was called from left or right controls
  if (dot == null) {
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

  //if current slide
  if (activeDot == dot.target) return;

  const startSlide = document.querySelector(
    `[data-slide-index = '${activeDot.getAttribute("data-dot-index")}']`
  );

  const endSlide = () => {
    if (dot != null)
      return document.querySelector(
        `[data-slide-index = '${dot.target.getAttribute("data-dot-index")}' `
      );
  };

  activeDot.classList.remove("active-dot");
  activeDot = dot.target;
  activeDot.classList.add("active-dot");

  moveToSlide(startSlide, endSlide());
}

//computing how much the block needs to be shifted
function moveToSlide(oldSlide, slide, isAnimated = true) {
  if (oldSlide != null && slide != null) {
    oldSlide.classList.remove("slide-current");
    slide.classList.add("slide-current");
  }

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

//move to last or firts element, if index equial -1 or last
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

function easyInOutQuad(t) {
  return t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t;
}

//computing non-linaar function for posititon
function getSmootherTransition(
  startPosition,
  newPosition,
  duration,
  element,
  oldSlide,
  newSlide
) {
  const startTime = performance.now();
  let currentTime = startTime;

  const distance = newPosition - startPosition;

  isAnimationPlaying = true;

  function animate() {
    currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easyProgress = easyInOutQuad(progress);
    element.style.left = `${startPosition + distance * easyProgress}px`;

    return progress;
  }

  const intervalID = setInterval(() => {
    const progress = animate();

    if (progress == 1) {
      isLastSlide(oldSlide, newSlide);
      isAnimationPlaying = false;
      clearInterval(intervalID);
    }
  });
}
