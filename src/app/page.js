import Navbar from "@/components/Navbar";
import Category from "./categorys/page";
import HeroCarousel from "@/components/heroCarusel";
export default function Home() {
  return (
    <div className=" min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        <HeroCarousel/>
        <Category/>
      </main>
    </div>
  );
}
