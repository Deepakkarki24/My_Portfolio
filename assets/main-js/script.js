// smoothscrolling effect on scroll

function smoothScrolling() {
  gsap.registerPlugin(ScrollTrigger);

  const main = document.querySelector(".main");

  const locoScroll = new LocomotiveScroll({
    el: main,
    smooth: true,

    // disable smooth scrolling on mobile/tablet
    smartphone: {
      smooth: false,
    },

    tablet: {
      smooth: false,
    },
  });

  // sync ScrollTrigger with Locomotive
  locoScroll.on("scroll", ScrollTrigger.update);

  // ScrollTrigger proxy
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: main.style.transform ? "transform" : "fixed",
  });

  // refresh sync
  ScrollTrigger.addEventListener("refresh", () => {
    locoScroll.update();
  });

  // refresh after everything loads
  ScrollTrigger.refresh();

  // fix resize issues
  window.addEventListener("resize", () => {
    locoScroll.update();
    ScrollTrigger.refresh();
  });

  return locoScroll;
}

const locoScroll = smoothScrolling();

// smoothscrolling effect on scroll

// loading animation on page load

function loadingAnimation() {
  gsap.from(".left h1", {
    x: -60,
    duration: 1,
    opacity: 0,
  });

  gsap.from(".right button", {
    x: 40,
    duration: 0.5,
    opacity: 0,
  });

  gsap.from(".nav-items", {
    y: 20,
    duration: 1,
    opacity: 0,
    stagger: 0.2,
  });

  gsap.from(".profile_txt_area h2", {
    x: -60,
    duration: 2,
    opacity: 0,
    rotate: 360,
  });

  gsap.from(".profile_txt_area h3", {
    y: -60,
    duration: 1,
    opacity: 0,
  });

  gsap.from(".profile_txt_area > span", {
    duration: 1,
    opacity: 0,
    stagger: 0.1,
  });

  gsap.from(".user-img-box > img", {
    y: 70,
    duration: 1,
    opacity: 0,
  });

  gsap.from(".icon-imgs .icons img", {
    opacity: 0,
    duration: 10,
  });
}
loadingAnimation();

// loading animation on page load

// summary txt animation
function ScrollTriggerAnimation() {
  gsap.from(".summary_txt p span", {
    opacity: 0,
    duration: 1.3,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".summary_txt",
      scroller: ".main",
      start: "top 80%",
      end: "top 0%",
      // markers: true,
      scrub: 2,
    },
  });

  gsap.from(".skills_section img", {
    opacity: 0,
    y: 30,
    scale: 0.85,
    duration: 0.8,
    stagger: 0.08,
    ease: "back.out(1.4)",

    scrollTrigger: {
      trigger: ".skills_section",
      scroller: ".main",
      start: "top 40%",
      toggleActions: "play none none reverse",
    },
  });
}

ScrollTriggerAnimation();

// ── Cursor ──
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + "px";
  cursorRing.style.top = ry + "px";
  requestAnimationFrame(animRing);
}

animRing();

gsap.utils.toArray(".exp-item").forEach((card) => {
  gsap.from(card, {
    opacity: 0,
    x: 0,
    y: 40,
    duration: 1,
    ease: "power4.out",

    scrollTrigger: {
      trigger: card,
      scroller: ".main",
      start: "top 82%",
      toggleActions: "play none none reverse",
      // markers: true,
    },
  });
});
