import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Tagline from "@/components/sections/Tagline";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Tagline />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
