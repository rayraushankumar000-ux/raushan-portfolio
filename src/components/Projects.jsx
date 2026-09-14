import { useState } from "react";

const projects = [
  {
    title: "Lost & Found Management System",
    tag: "FULL STACK",
    tech: [
      "MongoDB",
      "Express",
      "React",
      "Node",
    ],
    description:
      "A responsive platform for reporting, searching and tracking lost or found items with secure authentication.",
    number: "01",
  },

  {
    title: "Healthcare Management System",
    tag: "FULL STACK",
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "REST API",
    ],
    description:
      "A role-based healthcare application for patient records, appointments, CRUD operations and dashboard workflows.",
    number: "02",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("ALL");

  const visibleProjects =
    filter === "ALL"
      ? projects
      : projects.filter((project) =>
          project.tech.some((tech) =>
            tech.toUpperCase().includes(filter)
          )
        );

  return (
    <section className="section" id="projects">

      <div className="section-heading reveal">

        <span className="section-number">
          03
        </span>

        <div>
          <p className="eyebrow">
            SELECTED WORK
          </p>

          <h2>
            Projects with a{" "}
            <span>purpose.</span>
          </h2>
        </div>

      </div>

      <div className="project-toolbar reveal">

        <p>
          Two representative products from my
          development journey.
        </p>

        <div className="filter-buttons">

          {["ALL", "REACT", "MONGODB"].map((item) => (
            <button
              key={item}
              className={
                filter === item ? "selected" : ""
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      <div className="projects-grid">

        {visibleProjects.map((project, index) => (

          <article
            className="project-card reveal"
            key={project.title}
          >

            <div className="project-top">
              <span>{project.number}</span>
              <span>{project.tag}</span>
            </div>

            <div className="project-preview">

              <div className="mock-window">

                <div className="mock-nav">

                  <b>●</b>
                  <b>●</b>
                  <b>●</b>

                  <span>
                    {index === 0
                      ? "items / dashboard"
                      : "health / dashboard"}
                  </span>

                </div>

                <div className="mock-body">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

              </div>

            </div>

            <h3>
              {project.title}
            </h3>

            <p>
              {project.description}
            </p>

            <div className="tech-list">

              {project.tech.map((tech) => (
                <span key={tech}>
                  {tech}
                </span>
              ))}

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}