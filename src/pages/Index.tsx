import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FeaturedChallenges } from "@/components/FeaturedChallenges";
import { TopCourses } from "@/components/TopCourses";
import { Leaderboard } from "@/components/Leaderboard";
import { CallToAction } from "@/components/CallToAction";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <FeaturedChallenges />
        <TopCourses />
        <Leaderboard />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
