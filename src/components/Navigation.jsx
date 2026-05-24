import { CV_PATH, NAV_BADGE_TEXT } from '../data/content';

export function Navigation() {
  return (
    <nav>
      <div className="left">
        <h1>
          <a href="#">
            <i>Portfolio</i>
          </a>
        </h1>
      </div>
      <div className="center">
        <div className="hero-badge">
          <div className="dot" />
          <span className="badge-text">{NAV_BADGE_TEXT}</span>
        </div>
      </div>
      <div className="right">
        <a
          href={CV_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="cv-btn"
        >
          View CV
        </a>
      </div>
    </nav>
  );
}
