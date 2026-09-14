const groups = [
  {
    title: "Languages",
    icon: "</>",
    items: [
      "Java",
      "C",
      "Python Basics",
      "JavaScript",
      "SQL",
    ],
  },

  {
    title: "Frontend",
    icon: "◈",
    items: [
      "HTML5",
      "CSS3",
      "React.js",
      "Tailwind CSS",
    ],
  },

  {
    title: "Backend & Data",
    icon: "⌘",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
    ],
  },

  {
    title: "Tools",
    icon: "⚙",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "REST APIs",
    ],
  },
];

export default function Skills() {
  return (
    <section
      className="section section-dark"
      id="skills"
    >

      <div className="section-heading reveal">

        <span className="section-number">
          02
        </span>

        <div>
          <p className="eyebrow">
            TECH STACK
          </p>

          <h2>
            Tools I use to{" "}
            <span>build.</span>
          </h2>
        </div>

      </div>

      <div className="skills-grid">

        {groups.map((group, index) => (
          <article
            className={`skill-card reveal delay-${Math.min(
              index + 1,
              3
            )}`}
            key={group.title}
          >

            <div className="skill-icon">
              {group.icon}
            </div>

            <h3>
              {group.title}
            </h3>

            <div className="chip-list">
              {group.items.map((item) => (
                <span key={item}>
                  {item}
                </span>
              ))}
            </div>

          </article>
        ))}

      </div>

    </section>
  );
}