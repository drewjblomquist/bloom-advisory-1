"use client";

import { useState } from "react";
import NavItems from "./NavItems";
import Contact from "./Contact";

export default function ContactController() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <NavItems onContactClick={() => setIsContactOpen(true)} />
      <Contact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
