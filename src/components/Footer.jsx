export default function Footer() {
  return (
    <footer className="footer">

      <div>
        <span className="brand-mark">
          R
        </span>

        <strong>
          Raushan.
        </strong>
      </div>

      <p>
        Designed & built with React · MERN
      </p>

      <div className="footer-links">

        <a href="#home">
          Back to top ↑
        </a>

        <a href="#vault">
          Private Vault
        </a>

      </div>

      <small>
        © {new Date().getFullYear()} Raushan Kumar Ray
      </small>

    </footer>
  );
}