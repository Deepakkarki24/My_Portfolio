import {
  HeroCodeFloatPrimary,
  HeroCodeFloatSecondary,
} from './HeroCodeFloat';
import { NAME_LETTERS, PROFILE_IMAGE } from '../data/content';

export function HeroSection() {
  return (
    <section className="page1">
      <HeroCodeFloatPrimary />
      <HeroCodeFloatSecondary />

      <div className="profile my-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="user-img-box text-center">
                <img src={PROFILE_IMAGE} alt="user image" />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="profile_txt_area">
                <h2>Hello</h2>
                <h3>My Name is</h3>
                {NAME_LETTERS.map((letter, index) => (
                  <span key={`${letter}-${index}`}>{letter}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
