import Hero from "./components/Hero";
import NavItems from "./components/NavItems";
import About from "./components/About";

export default function Home() {
  return (
    <div>
      <NavItems />
      <Hero />
      <About />
    </div>
  );
}
