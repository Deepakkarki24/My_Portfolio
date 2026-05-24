import { PROJECTS } from '../data/content';

export function ProjectsSection() {
  return (
    <section className="page4 project_showcase">
      <div className="container">
        <div id="page4">
          <div className="bold_title">
            <h2>
              crafted with <span className="highlighter">love</span> &amp;{' '}
              <span className="highlighter">passion</span>
            </h2>
          </div>
          <div className="light_title">
            <h3>these are few of my recent works</h3>
          </div>
          <div id="work-sample">
            {PROJECTS.map((project) => (
              <div key={project.code} className="project_box">
                <img src={project.image} alt="Image" />
                <div className="links">
                  <ul>
                    <li className={project.demoClassName}>
                      <a href={project.demo} className="text-light text-center">
                        Demo
                      </a>
                    </li>
                    <li className={project.codeClassName}>
                      <a href={project.code} className="text-light text-center">
                        Code
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
