import BrandIntro from "@/components/BrandIntro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import Scaling from "@/components/Scaling";
import Insights from "@/components/Insights";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <BrandIntro />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Solutions />
        <Scaling />
        <About />
        <Insights />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
