import Hero from "@/components/sections/Hero";
import Collections from "@/components/sections/Collections";
import Narrative from "@/components/sections/Narrative";
import Trending from "@/components/sections/Trending";
import Journal from "@/components/sections/Journal";
import Testimonials from "@/components/sections/Testimonials";
import Marquee from "@/components/sections/Marquee";
import BrandStats from "@/components/sections/BrandStats";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Marquee />
      <Narrative />
      <Process />
      <Collections />
      <Trending />
      <BrandStats />
      <Testimonials />
      <Journal />
      <Footer />
    </div>
  );
}
