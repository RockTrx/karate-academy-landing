"use strict";

const menuButton = document.querySelector(".menu-toggle");
let click = 0;
const links = document.querySelectorAll(".nav-links a");
const menuSpans = document.querySelectorAll(".menu-span");
const left = document.querySelector(".fa-arrow-left");
const right = document.querySelector(".fa-arrow-right");

// Mobile menu animation
//----------------------------------------------
var hamAnimation = gsap.timeline({
  paused: true,
  onReverseComplete: function () {
    gsap.set(".nav-links a", { clearProps: "all" });
    gsap.set(".nav-links", { clearProps: "all" });
  },
});
hamAnimation
  .to(".menu-toggle span", { margin: 0, ease: "linear", duration: 0.3 }, "init")
  .to(".menu-toggle span:nth-child(2)", { alpha: 0 }, "init")
  .to(
    ".menu-toggle span:nth-child(1)",
    { rotation: 45, transformOrigin: "center", duration: 0.3 },
    "rot"
  )
  .to(
    ".menu-toggle span:nth-child(3)",
    {
      rotation: -45,
      transformOrigin: "center",
      duration: 0.3,
    },
    "rot"
  )
  .to(".nav-links", { transformOrigin: "top", scaleY: 1 })
  .to(".nav-links a", { alpha: 1, stagger: 0.1 }, "+=0.1");

menuButton.addEventListener("click", () => {
  click += 1;
  if (click % 2 != 0) hamAnimation.play();
  else hamAnimation.reverse();
});

window.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target != menuButton) {
    let count = 0;
    menuSpans.forEach((span) => {
      if (e.target != span) {
        count += 1;
      }
    });
    if (count == 3) {
      hamAnimation.reverse();
    }
  }
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    hamAnimation.reverse();
  });
});

// ---------------------------------------------

// Slider
let translate = {
  count: 0,
};

const btnVisibilty = function () {
  if (translate.count == 0) {
    gsap.set(left, { opacity: 0.2 });
  } else {
    gsap.set(left, { opacity: 1 });
  }

  if (translate.count == 2) {
    gsap.set(right, { opacity: 0.2 });
  } else {
    gsap.set(right, { opacity: 1 });
  }
};

btnVisibilty();
if (right) {
  right.addEventListener("click", () => {
    if (translate.count < 2) {
      gsap.to(".container", { x: "+=-50%", duration: 0.3 });
      translate.count += 1;
      btnVisibilty();
    }
  });
}
if (left) {
  left.addEventListener("click", function () {
    if (translate.count != 0) {
      gsap.to(".container", { x: "+=50%", duration: 0.3 });
      translate.count -= 1;
      btnVisibilty();
    }
  });
}

// 404 Animation
gsap
  .timeline({})
  .to(
    ".cap",
    {
      rotation: 360,
      duration: 50,
      repeat: -1,
      // yoyo: true,
      repeatDelay: 0,
      transformOrigin: "center",
      ease: Power0.easeNone,
    },
    "rot"
  )
  .to(
    "#capsule-2 ,#capsule-3",
    {
      x: -20,
      y: -20,
      duration: 20,
      repeat: -1,
      yoyo: true,
      repeatDelay: 0,
      transformOrigin: "center",
      ease: Power0.easeNone,
    },
    "rot"
  );

console.timeEnd("Code Run Time");
