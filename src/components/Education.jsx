const education = [
  {
    year: "2023 — 2027",
    title: "B.Tech — Computer Science & Engineering",
    place:
      "Vignan Foundation for Science, Technology and Research",
    score: "CGPA 7.34",
  },

  {
    year: "2022 — 2023",
    title: "Class XII",
    place: "Gurukul Vidyapeeth, Bihar",
    score: "71.2%",
  },

  {
    year: "2020 — 2021",
    title: "Class X",
    place:
      "St. John's Academy, Hajipur, Bihar",
    score: "73.8%",
  },
];

export default function Education() {
  return (
    <section
      className="section section-dark"
      id="education"
    >

      <div className="section-heading reveal">

        <span className="section-number">
          04
        </span>

        <div>
          <p className="eyebrow">
            EDUCATION
          </p>

          <h2>
            The foundation behind{" "}
            <span>the work.</span>
          </h2>
        </div>

      </div>

      <div className="timeline">

        {education.map((item) => (

          <article
            className="timeline-item reveal"
            key={item.title}
          >

            <div className="timeline-year">
              {item.year}
            </div>

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <div>
                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.place}
                </p>
              </div>

              <strong>
                {item.score}
              </strong>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}