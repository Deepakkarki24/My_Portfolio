import { SKILL_GROUPS } from '../data/content';
import { SectionHeader } from './SectionHeader';

export function SkillsSection() {
  return (
    <section className="page3 skills_section">
      <div className="container">
        <SectionHeader
          boldTitle={
            <>
              Things I&apos;m <span className="highlighter">good</span> at
            </>
          }
          lightTitle="skills, interests, passion and hobbies"
        />
        <div className="skill_box">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="title_box">
                <h4>{group.title}</h4>
              </div>
              <div className="img_box">
                {group.icons.map((icon) => (
                  <img
                    key={icon.alt}
                    src={icon.src}
                    alt={icon.alt}
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
