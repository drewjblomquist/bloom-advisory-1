import styles from "./About.module.css";
export default function About() {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-title"
    >
      <p className="eyebrow">01 / A little clarity goes a long way</p>
      <div className={styles.grid}>
        <h2 id="about-title" className={styles.title}>
          Technology should
          <br />
          give you time back.
        </h2>
        <div className={styles.copy}>
          <p>
            More software isn’t always the answer. Better-connected tools,
            simpler processes, and a clear plan can make all the difference.
          </p>
          <p>
            Bloom Advisory helps small and mid-sized businesses untangle the
            work behind the work. We identify your biggest pain points, build a
            practical roadmap, and stay with you through implementation.
          </p>
          <a href="#questionnaire">
            Let’s start with your business <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
