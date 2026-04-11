import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Problema from "@/components/Problema";
import Promessa from "@/components/Promessa";
import Impatto from "@/components/Impatto";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <Problema />
      <Promessa />
      <Impatto />
      <CtaSection />
      <Footer />
    </>
  );
}
