import Hero from "./components/Hero";
import NavItems from "./components/NavItems";
import About from "./components/About";
import Services from "./components/Services";

export default function Home() {
  return (
    <div>
      <NavItems />
      <Hero />
      <About />
      <Services />
    </div>
  );
}
