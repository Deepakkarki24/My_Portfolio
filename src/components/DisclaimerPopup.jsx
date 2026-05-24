import { useEffect, useState } from 'react';
import { POPUP_STORAGE_KEY } from '../data/content';

export function DisclaimerPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const popupSeen = localStorage.getItem(POPUP_STORAGE_KEY);
    setIsVisible(!popupSeen);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(POPUP_STORAGE_KEY, 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div id="portfolio-popup" className="popup-overlay" style={{ display: 'flex' }}>
      <div className="popup-box">
        <h2>Small Disclaimer</h2>
        <p>
          This portfolio is intentionally kept simple. The UI might not win
          awards yet :), but the skills, logic, and code are where the real
          story is.
        </p>
        <button id="closePopup" type="button" onClick={handleClose}>
          Continue
        </button>
      </div>
    </div>
  );
}
