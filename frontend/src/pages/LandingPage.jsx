import HeroSection from "../components/HeroSection";
import WelcomeSection from "../components/home/WelcomeSection";
import ChooseReasonSection from "../components/home/ChooseReasonSection";
import AchievementsSection from "../components/home/AchievementSection";
import AboutSection from "../components/home/About";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <AboutSection />
      <AchievementsSection />
      <ChooseReasonSection />
    </>
  );
}
