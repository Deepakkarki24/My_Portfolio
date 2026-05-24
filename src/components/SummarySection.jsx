import { SOCIAL_LINKS, SUMMARY_WORDS } from '../data/content';

export function SummarySection() {
  return (
    <section className="page2 summary_txt_page">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="summary_txt">
              <p>
                {SUMMARY_WORDS.map((word, index) => (
                  <span key={`${word.trim()}-${index}`}>{word}</span>
                ))}
              </p>
              <div className="links">
                <ul>
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-light text-center">
                        <i className={link.iconClass} /> {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
