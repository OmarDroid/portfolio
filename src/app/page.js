import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import BlogPosts from "./components/BlogPosts";
import ScrollToTop from "./components/ScrollToTop";
import ParticleBackground from "./components/ParticleBackground";
import DistributedTechBackground from "./components/DistributedTechBackground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] relative overflow-hidden w-screen m-0 p-0">
      <DistributedTechBackground />
      <ParticleBackground />
      <Navbar />
      <div className="container mt-24 mx-auto px-6 sm:px-12 py-4 relative z-20">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogPosts />
        <EmailSection />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
