export default function Hero() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        "rayraushankumar000@gmail.com"
      );

      alert("Email copied!");
    } catch {
      console.log("Clipboard unavailable");
    }
  };

  return (
    <section className="hero section" id="home">
      <div className="hero-grid">

        <div className="hero-copy reveal">

          <div className="eyebrow">
            <span className="pulse-dot"></span>

            Available for software engineering opportunities
          </div>

          <p className="hero-kicker">
            HELLO, I'M
          </p>

          <h1>
            Raushan Kumar <span>Ray.</span>
          </h1>

          <p className="hero-role">
            Computer Science Student
            <b>·</b>
            MERN Stack Developer
          </p>

          <p className="hero-description">
            I build clean, scalable web experiences and practical
            full-stack products using Java, JavaScript, React,
            Node.js and MongoDB.
          </p>

          <div className="hero-buttons">
            <a
              className="button primary"
              href="#projects"
            >
              Explore my work
              <span>↓</span>
            </a>

            <a
              className="button secondary"
              href="#contact"
            >
              Let's connect
              <span>↗</span>
            </a>
          </div>

          <div className="hero-meta">

            <button
              className="email-copy"
              onClick={copyEmail}
            >
              rayraushankumar000@gmail.com
              <span>⧉</span>
            </button>

            <div className="socials">
              <a
                href="https://github.com/rayraushankumar000-ux"
                target="_blank"
                rel="noreferrer"
              >
                GH
              </a>

              <a
                href="https://www.linkedin.com/in/raushan-kumar-ray-0a912932a/"
                target="_blank"
                rel="noreferrer"
              >
                in
              </a>

              <a
                href="https://leetcode.com/u/raushan_rai2742/"
                target="_blank"
                rel="noreferrer"
              >
                LC
              </a>
            </div>

          </div>
        </div>

        <div className="hero-visual reveal delay-1">

          <div className="orb orb-a"></div>
          <div className="orb orb-b"></div>

          <div className="code-card">

            <div className="window-bar">
              <span></span>
              <span></span>
              <span></span>

              <small>
                raushan.js
              </small>
            </div>

            <pre>
{`const developer = {
  name: "Raushan",
  stack: ["React", "Node", "MongoDB"],
  language: "Java",
  focus: "DSA + Full Stack",
  status: "building 🚀"
};

developer.create();
developer.learn();
developer.repeat();`}
            </pre>

            <div className="code-footer">
              <span>● 170+ LeetCode</span>
              <span>● MERN</span>
            </div>

          </div>

          <div className="floating-card float-one">
            <strong>7.24</strong>
            <span>Current CGPA</span>
          </div>

          <div className="floating-card float-two">
            <strong>450+</strong>
            <span>Coding problems</span>
          </div>

        </div>

      </div>

      <div className="scroll-cue">
        SCROLL TO EXPLORE
        <span>↓</span>
      </div>
    </section>
  );
}