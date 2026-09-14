const achievements = [
  ["170+", "LeetCode problems solved"],
  ["250+", "CodeChef problems solved"],
  ["30+", "GeeksforGeeks problems solved"],
  ["Silver Elite", "NPTEL HR Analytics"],
  ["25%", "Academic scholarship"],
  ["Hackathon", "MERN Healthcare project"],
];

export default function Achievements() {
  return (
    <section
      className="section section-narrow"
      id="achievements"
    >

      <div className="section-heading reveal">

        <span className="section-number">
          05
        </span>

        <div>

          <p className="eyebrow">
            MILESTONES
          </p>

          <h2>
            Small wins,{" "}
            <span>consistent progress.</span>
          </h2>

        </div>

      </div>

      <div className="achievement-grid">

        {achievements.map(
          ([big, text], index) => (

            <div
              className="achievement reveal"
              key={text}
            >

              <span className="achievement-index">
                0{index + 1}
              </span>

              <strong>
                {big}
              </strong>

              <p>
                {text}
              </p>

            </div>

          )
        )}

      </div>

    </section>
  );
}