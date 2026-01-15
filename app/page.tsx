"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import NavItems from "./components/NavItems";
import About from "./components/About";
import Services from "./components/Services";
import Questionnaire from "./components/Questionnaire";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div>
      <NavItems onContactClick={() => setIsContactOpen(true)} />
      <Hero />
      <About />
      <Services />
      <Questionnaire />
      <Contact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <Footer />
    </div>
  );
}
