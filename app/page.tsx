import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Questionnaire from "./components/Questionnaire";
import Footer from "./components/Footer";
import ContactController from "./components/ContactController";

export default function Home() {
  return (
    <div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ContactController />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Questionnaire />
      </main>
      <Footer />
    </div>
  );
}
