import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Questionnaire from "./components/Questionnaire";
import Footer from "./components/Footer";
import ContactController from "./components/ContactController";

export default function Home() {
  return (
    <div>
      <ContactController />
      <Hero />
      <About />
      <Services />
      <Questionnaire />
      <Footer />
    </div>
  );
}
