import Hero from "@/components/sections/Hero";
import VideoDemo from "@/components/sections/VideoDemo";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import GettingStarted from "@/components/sections/GettingStarted";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <VideoDemo />
      <HowItWorks />
      <GettingStarted />
      <Benefits />
      <Pricing />
      <FAQ />
    </main>
  );
}
