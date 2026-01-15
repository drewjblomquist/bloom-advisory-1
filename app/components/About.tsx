import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.textBlock}>
            <h2 id="about-title" className={styles.title}>
              Our Mission
            </h2>
            <p className={styles.body}>
              Bloom Advisory is here to help small and mid-sized businesses simplify
              day-to-day processes and scale thier abilities, using new systems. We are here to identify 
              your biggest pain points, create a solution roadmap, and walk you all the way through implementation.
              The result is more money in your pocket and more time to focus on what truly
              delivers value to your customers. Our goal is to use this new wave of 
              technology to empower teams to do the work that actually matters to them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
