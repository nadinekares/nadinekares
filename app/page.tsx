import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Cta />
      <Footer />
    </main>
  );
}
