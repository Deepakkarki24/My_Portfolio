// smoothscrolling effect on scroll

function smoothScrolling() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
smoothScrolling();

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
      start: "top 60%",
      end: "top 5%",
      // markers: true,
      scrub: 2,
    },
  });

  gsap.from(".skills_section img", {
    opacity: 0,
    y: -20,
    x: -20,
    duration: 1.3,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".skills_section",
      scroller: ".main",
      start: "top 50%",
      end: "top 5%",
      // markers: true,
      scrub: 2,
    },
  });
}

ScrollTriggerAnimation();
