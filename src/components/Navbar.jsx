import { useEffect, useState } from "react";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Education", "#education"],
  ["Achievements", "#achievements"],
  ["Contact", "#contact"],
];

export default function Navbar({ theme, setTheme, page }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("About");

  useEffect(() => {
    if (page === "vault") return;

    const sections = links
      .map(([, id]) => document.querySelector(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = links.find(
              ([, id]) => id === `#${entry.target.id}`
            );

            if (match) {
              setActive(match[0]);
            }
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [page]);

  const goHome = () => {
    setOpen(false);

    window.location.hash = "";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="navbar">
      <a
        className="brand"
        href="#home"
        onClick={goHome}
      >
        <span className="brand-mark">R</span>

        <span>
          Raushan<span className="brand-dot">.</span>
        </span>
      </a>

      {page === "home" && (
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={active === label ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}

          <a
            href="#vault"
            className="vault-link"
            onClick={() => setOpen(false)}
          >
            Private Vault
          </a>
        </nav>
      )}

      <div className="nav-actions">
        <button
          className="icon-button"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>

        <a
          className="nav-resume"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume ↗
        </a>

        <button
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "×" : "☰"}
        </button>
      </div>
    </header>
  );
}