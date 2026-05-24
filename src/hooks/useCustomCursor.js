import { useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '../data/content';

export function useCustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');

    if (!cursor || !cursorRing) {
      return;
    }

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frameId = 0;
    let isActive = false;

    const setCursorVisible = (visible) => {
      cursor.style.opacity = visible ? '1' : '0';
      cursorRing.style.opacity = visible ? '1' : '0';
    };

    const handleMouseMove = (event) => {
      mx = event.clientX;
      my = event.clientY;

      if (!isActive) {
        isActive = true;
        setCursorVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isActive = false;
      setCursorVisible(false);
    };

    const renderCursor = () => {
      cursor.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      cursorRing.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

      frameId = requestAnimationFrame(renderCursor);
    };

    const enableCursor = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setCursorVisible(false);
        return false;
      }

      setCursorVisible(false);
      document.body.style.cursor = 'none';
      return true;
    };

    if (!enableCursor()) {
      return undefined;
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    frameId = requestAnimationFrame(renderCursor);

    const handleResize = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setCursorVisible(false);
        document.body.style.cursor = '';
      } else {
        document.body.style.cursor = 'none';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      document.body.style.cursor = '';
    };
  }, []);
}
