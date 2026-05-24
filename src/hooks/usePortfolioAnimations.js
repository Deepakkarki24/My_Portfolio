import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { MOBILE_BREAKPOINT } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

function setupSmoothScroll(main, refreshHandlerRef) {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  if (refreshHandlerRef.current) {
    ScrollTrigger.removeEventListener("refresh", refreshHandlerRef.current);
    refreshHandlerRef.current = null;
  }

  if (isMobile) {
    document.documentElement.style.scrollBehavior = "smooth";
    return null;
  }

  document.documentElement.style.scrollBehavior = "auto";

  const locoScroll = new LocomotiveScroll({
    el: main,
    smooth: true,
    lerp: 0.08,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(main, {
    scrollTop(value) {
      if (arguments.length) {
        locoScroll.scrollTo(value, 0, 0);
        return value;
      }

      return locoScroll.scroll.instance.scroll.y;
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

  refreshHandlerRef.current = () => {
    locoScroll.update();
  };
  ScrollTrigger.addEventListener("refresh", refreshHandlerRef.current);

  return locoScroll;
}

function runLoadingAnimation() {
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
      },
      "-=0.4",
    )
    .from(
      ".profile_txt_area h2",
      {
        x: -60,
        rotate: 180,
        duration: 0.8,
        opacity: 0,
      },
      "-=0.4",
    )
    .from(
      ".profile_txt_area h3",
      {
        y: -40,
        duration: 0.7,
        opacity: 0,
      },
      "-=0.5",
    )
    .from(
      ".profile_txt_area > span",
      {
        opacity: 0,
        stagger: 0.08,
      },
      "-=0.4",
    )
    .from(
      ".user-img-box > img",
      {
        y: 60,
        duration: 0.8,
        opacity: 0,
      },
      "-=0.5",
    )
    .from(
      ".hero-code-float",
      {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
      },
      "-=0.4",
    );
}

function runScrollAnimations(main) {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  const scroller = isMobile ? window : main;

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

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
      scroller,
      start: "top 60%",
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
    },
  });

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
      scroller,
      start: "top 50%",
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
    },
  });

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
        scroller,
        start: "top 88%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });
  });

  ScrollTrigger.refresh();
}

export function usePortfolioAnimations() {
  const mainRef = useRef(null);
  const locoScrollRef = useRef(null);
  const refreshHandlerRef = useRef(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) {
      return;
    }

    let resizeTimeout;

    const initScrollSystem = (playIntro = false) => {
      if (locoScrollRef.current) {
        locoScrollRef.current.destroy();
        locoScrollRef.current = null;
      }

      locoScrollRef.current = setupSmoothScroll(main, refreshHandlerRef);

      if (playIntro) {
        runLoadingAnimation();
      }

      requestAnimationFrame(() => {
        locoScrollRef.current?.update();
        runScrollAnimations(main);
      });
    };

    initScrollSystem(true);

    const handleLoad = () => {
      if (hasLoadedRef.current) {
        return;
      }

      hasLoadedRef.current = true;
      locoScrollRef.current?.update();
      ScrollTrigger.refresh(true);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initScrollSystem(false);
      }, 250);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      if (refreshHandlerRef.current) {
        ScrollTrigger.removeEventListener("refresh", refreshHandlerRef.current);
        refreshHandlerRef.current = null;
      }

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      locoScrollRef.current?.destroy();
      locoScrollRef.current = null;
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return mainRef;
}
