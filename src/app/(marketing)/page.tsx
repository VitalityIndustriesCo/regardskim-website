import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Comparison from "@/components/sections/Comparison";
import GettingStarted from "@/components/sections/GettingStarted";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Comparison />
      <Pricing />
      <GettingStarted />
      <FAQ />
    </main>
  );
}
