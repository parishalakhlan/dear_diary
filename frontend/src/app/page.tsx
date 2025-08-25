"use client";
import { Navbar } from "@/components/NavbarForBoard";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/MainSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/**<JournalLogic /> */}

      <Footer />
    </>
  );
}
