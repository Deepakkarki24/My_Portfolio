import { EXPERIENCE_ITEMS } from '../data/content';
import { SectionHeader } from './SectionHeader';

export function ExperienceSection() {
  return (
    <section id="experience">
      <div className="section-header reveal">
        <SectionHeader
          boldTitle={
            <>
              My <span className="highlighter">Journey</span>
            </>
          }
          lightTitle="Experience & Education"
        />
      </div>
      <div className="exp-timeline">
        {EXPERIENCE_ITEMS.map((item) => (
          <div key={item.period} className="exp-item reveal">
            <div className="exp-dot" />
            <div className="exp-card">
              <div className="exp-period">{item.period}</div>
              <div className="exp-role">{item.role}</div>
              <div className="exp-company">{item.company}</div>
              <div className="exp-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
