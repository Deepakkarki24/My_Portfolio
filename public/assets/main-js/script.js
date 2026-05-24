gsap.registerPlugin(ScrollTrigger);

let locoScroll = null;
let scroller = ".main";

// ==========================
// Smooth Scrolling
// ==========================
function smoothScrolling() {
  const main = document.querySelector(".main");
  const isMobile = window.innerWidth <= 768;

  // Destroy existing locomotive on resize
  if (locoScroll) {
    locoScroll.destroy();
    locoScroll = null;
  }

  // MOBILE -> native scroll
  if (isMobile) {
    scroller = window;
    document.documentElement.style.scrollBehavior = "smooth";
    return;
  }

  // DESKTOP -> Locomotive
  locoScroll = new LocomotiveScroll({
    el: main,
    smooth: true,
    lerp: 0.08,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(main, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, {
          duration: 0,
          disableLerp: true,
        })
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

  scroller = ".main";
}

// ==========================
// Loading Animation
// ==========================
function loadingAnimation() {
  const tl = gsap.timeline();

  tl.from(".left h1", {
    x: -60,
    duration: 0.8,
    opacity: 0,
  })
    .from(
      ".right a",
      {
        x: 40,
        duration: 0.6,
        opacity: 0,
        stagger: 0.1,
      },
      "-=0.4"
    )
    .from(
      ".profile_txt_area h2",
      {
        x: -60,
        rotate: 180,
        duration: 0.8,
        opacity: 0,
      },
      "-=0.4"
    )
    .from(
      ".profile_txt_area h3",
      {
        y: -40,
        duration: 0.7,
        opacity: 0,
      },
      "-=0.5"
    )
    .from(
      ".profile_txt_area > span",
      {
        opacity: 0,
        stagger: 0.08,
      },
      "-=0.4"
    )
    .from(
      ".user-img-box > img",
      {
        y: 60,
        duration: 0.8,
        opacity: 0,
      },
      "-=0.5"
    )
    .from(
      ".hero-code-float",
      {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
      },
      "-=0.4"
    );
}

// ==========================
// Scroll Animations
// ==========================
function ScrollTriggerAnimation() {
  // kill previous triggers on resize
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // ----------------
  // Summary text
  // ----------------
  gsap.set(".summary_txt p span", {
    opacity: 0,
    y: 20,
  });

  gsap.to(".summary_txt p span", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: "power2.out",

    scrollTrigger: {
      trigger: ".summary_txt",
      scroller: scroller,
      start: "top 85%",
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
      once: false,
    },
  });

  // ----------------
  // Skills animation
  // ----------------
  gsap.set(".skills_section img", {
    opacity: 0,
    y: 30,
    scale: 0.85,
  });

  gsap.to(".skills_section img", {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    stagger: 0.05,
    ease: "back.out(1.4)",

    scrollTrigger: {
      trigger: ".skills_section",
      scroller: scroller,
      start: "top 85%",
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
    },
  });

  // ----------------
  // Experience Cards
  // ----------------
  gsap.utils.toArray(".exp-item").forEach((card) => {
    gsap.set(card, {
      opacity: 0,
      y: 50,
    });

    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",

      scrollTrigger: {
        trigger: card,
        scroller: scroller,
        start: "top 88%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });
  });

  ScrollTrigger.refresh();
}

// ==========================
// Custom Cursor
// ==========================
function customCursor() {
  if (window.innerWidth <= 768) return;

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

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    cursorRing.style.left = rx + "px";
    cursorRing.style.top = ry + "px";

    requestAnimationFrame(animateRing);
  }

  animateRing();
}

// ==========================
// Init
// ==========================
function init() {
  smoothScrolling();
  loadingAnimation();
  ScrollTriggerAnimation();
  customCursor();

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();

    if (locoScroll) {
      locoScroll.update();
    }
  });
}

init();

// ==========================
// Resize Fix (debounced)
// ==========================
let resizeTimeout;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    smoothScrolling();
    ScrollTriggerAnimation();

    ScrollTrigger.refresh();

    if (locoScroll) {
      locoScroll.update();
    }
  }, 250);
});