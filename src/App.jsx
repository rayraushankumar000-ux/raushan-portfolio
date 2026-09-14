import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Vault from "./components/Vault";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("portfolio-theme") || "dark"
  );

  const [page, setPage] = useState(
    window.location.hash === "#vault" ? "vault" : "home"
  );

  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleHash = () => {
      setPage(window.location.hash === "#vault" ? "vault" : "home");
    };

    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  const notify = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    clearTimeout(window.portfolioToast);

    window.portfolioToast = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        page={page}
      />

      {page === "vault" ? (
        <Vault notify={notify} />
      ) : (
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Achievements />
          <Contact notify={notify} />
        </main>
      )}

      <Footer />

      {toast && <Toast {...toast} />}
    </>
  );
}

export default App;