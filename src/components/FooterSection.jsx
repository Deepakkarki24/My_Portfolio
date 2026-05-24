import { FOOTER_CONTACTS } from '../data/content';

export function FooterSection() {
  return (
    <section className="page5">
      <h1>
        you can get in touch <br />
        with me via{' '}
        <span className={FOOTER_CONTACTS[0].className}>
          <a target="_blank" href={FOOTER_CONTACTS[0].href} rel="noreferrer">
            {FOOTER_CONTACTS[0].label}
          </a>
        </span>{' '}
        or{' '}
        <span className={FOOTER_CONTACTS[1].className}>
          <a target="_blank" href={FOOTER_CONTACTS[1].href} rel="noreferrer">
            {FOOTER_CONTACTS[1].label}
          </a>
        </span>{' '}
        or{' '}
        <span className={FOOTER_CONTACTS[2].className}>
          <a target="_blank" href={FOOTER_CONTACTS[2].href} rel="noreferrer">
            {FOOTER_CONTACTS[2].label}
          </a>
        </span>
        .
      </h1>
      <footer>created with ❤️ by me</footer>
    </section>
  );
}
