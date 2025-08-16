import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Features from "./components/features/Features";
import Team from "./components/team/Team";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <h2>Velocity Club</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Team />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
