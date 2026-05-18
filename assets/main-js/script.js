gsap.registerPlugin(ScrollTrigger);

// ==========================
// Smooth Scrolling
// ==========================
function smoothScrolling() {
  const main = document.querySelector(".main");
  const isMobile = window.innerWidth <= 768;

  let locoScroll = null;

  // Only use Locomotive on desktop
  if (!isMobile) {
    locoScroll = new LocomotiveScroll({
      el: main,
      smooth: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(main, {
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

    ScrollTrigger.addEventListener("refresh", () => {
      locoScroll.update();
    });
  }

  ScrollTrigger.refresh();

  return locoScroll;
}

const locoScroll = smoothScrolling();

// ==========================
// Loading Animation
// ==========================
function loadingAnimation() {
  gsap.from(".left h1", {
    x: -60,
    duration: 1,
    opacity: 0,
  });

  gsap.from(".right a", {
    x: 40,
    duration: 0.8,
    opacity: 0,
  });

  gsap.from(".profile_txt_area h2", {
    x: -60,
    duration: 1,
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
    stagger: 0.08,
  });

  gsap.from(".user-img-box > img", {
    y: 70,
    duration: 1,
    opacity: 0,
  });

  gsap.from(".hero-code-float", {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1,
  });
}

loadingAnimation();

// ==========================
// Scroll Animations
// ==========================
function ScrollTriggerAnimation() {
  const isMobile = window.innerWidth <= 768;

  // Desktop -> .main
  // Mobile -> default browser scroll
  const scroller = isMobile ? window : ".main";

  // Summary text animation
  gsap.set(".summary_txt p span", {
    opacity: 0,
    y: 20,
  });

  gsap.to(".summary_txt p span", {
    opacity: 1,
    y: 0,
    duration: 1.3,
    stagger: 0.2,
    ease: "power2.out",

    scrollTrigger: {
      trigger: ".summary_txt",
      scroller: scroller,
      start: "top 80%",
      end: "top 10%",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  // Skills animation
  gsap.set(".skills_section img", {
    opacity: 0,
    y: 30,
    scale: 0.85,
  });

  gsap.to(".skills_section img", {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.08,
    ease: "back.out(1.4)",

    scrollTrigger: {
      trigger: ".skills_section",
      scroller: scroller,
      start: "top 80%",
      end: "bottom 70%",
      scrub: 1,
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
    },
  });

  // Experience Cards
  gsap.utils.toArray(".exp-item").forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power4.out",

      scrollTrigger: {
        trigger: card,
        scroller: scroller,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

ScrollTriggerAnimation();

// ==========================
// Custom Cursor
// ==========================
if (window.innerWidth > 768) {
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
}

// ==========================
// Refresh Fix
// ==========================
window.addEventListener("load", () => {
  ScrollTrigger.refresh();

  if (locoScroll) {
    locoScroll.update();
  }
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();

  if (locoScroll) {
    locoScroll.update();
  }
});
