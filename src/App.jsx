import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { ExperienceSection } from './components/ExperienceSection';
import { FooterSection } from './components/FooterSection';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { SummarySection } from './components/SummarySection';
import { DisclaimerPopup } from './components/DisclaimerPopup';
import { useCustomCursor } from './hooks/useCustomCursor';
import { usePortfolioAnimations } from './hooks/usePortfolioAnimations';

function App() {
  const mainRef = usePortfolioAnimations();
  useCustomCursor();

  return (
    <>
      <CustomCursor />
      <Navigation />
      <div ref={mainRef} className="main" data-scroll-container>
        <HeroSection />
        <SummarySection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <FooterSection />
      </div>
      <DisclaimerPopup />
    </>
  );
}

export default App;
