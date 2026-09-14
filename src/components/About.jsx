export default function About() {
  return (
    <section className="section section-narrow" id="about">

      <div className="section-heading reveal">

        <span className="section-number">
          01
        </span>

        <div>
          <p className="eyebrow">
            ABOUT ME
          </p>

          <h2>
            Turning curiosity into{" "}
            <span>working software.</span>
          </h2>
        </div>

      </div>

      <div className="about-grid">

        <div className="about-lead reveal">

          <p className="large-copy">
            I'm a Computer Science undergraduate focused
            on becoming a strong software engineer through
            consistent coding, product building and
            hands-on learning.
          </p>

          <p>
            I enjoy taking an idea from a rough requirement
            to a usable interface and a working backend.
            My current toolkit is centered around the MERN
            stack, Java and Data Structures & Algorithms.
          </p>

        </div>

        <div className="stats-grid reveal delay-1">

          <div className="stat">
            <strong>2027</strong>
            <span>Graduation target</span>
          </div>

          <div className="stat">
            <strong>2</strong>
            <span>Full-stack projects</span>
          </div>

          <div className="stat">
            <strong>25%</strong>
            <span>Scholarship</span>
          </div>

          <div className="stat">
            <strong>450+</strong>
            <span>Coding problems</span>
          </div>

        </div>

      </div>

    </section>
  );
}