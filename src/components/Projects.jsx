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

    // Real project screenshot
    image: "/lost-found-project.png",

    // Live website
    liveLink: "https://lostfoundg47.netlify.app/",
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

    // Project image
    image: "/hospital-management-project.webp",

    // Add live link later when available
    liveLink: "",
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

      {/* SECTION HEADING */}
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


      {/* TOOLBAR */}
      <div className="project-toolbar reveal">

        <p>
          Two representative products from my
          development journey.
        </p>

        <div className="filter-buttons">

          {["ALL", "REACT", "MONGODB"].map(
            (item) => (
              <button
                key={item}
                className={
                  filter === item
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>
            )
          )}

        </div>

      </div>


      {/* PROJECTS */}
      <div className="projects-grid">

        {visibleProjects.map((project) => (

          <article
            className="project-card reveal"
            key={project.title}
          >

            {/* NUMBER + TYPE */}
            <div className="project-top">

              <span>
                {project.number}
              </span>

              <span>
                {project.tag}
              </span>

            </div>


            {/* REAL PROJECT IMAGE */}
            <div className="project-preview">

              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="project-image"
              />

              {/* IMAGE OVERLAY */}
              <div className="project-image-overlay">

                {project.liveLink ? (

                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-view-button"
                  >
                    View Live ↗
                  </a>

                ) : (

                  <span className="project-coming">
                    Project Preview
                  </span>

                )}

              </div>

            </div>


            {/* PROJECT TITLE */}
            <h3>
              {project.title}
            </h3>


            {/* DESCRIPTION */}
            <p>
              {project.description}
            </p>


            {/* TECHNOLOGIES */}
            <div className="tech-list">

              {project.tech.map((tech) => (

                <span key={tech}>
                  {tech}
                </span>

              ))}

            </div>


            {/* LIVE PROJECT LINK */}
            {project.liveLink && (

              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-live-link"
              >
                Visit Live Project
                <span>↗</span>
              </a>

            )}

          </article>

        ))}

      </div>

    </section>
  );
}