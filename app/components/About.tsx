import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.textBlock}>
            <h2 id="about-title" className={styles.title}>
              About Us
            </h2>
            <p className={styles.body}>
              Bloom Advisors helps small and mid-sized businesses simplify
              complex operations and make smarter decisions with AI. We start by
              identifying where time, money, and clarity break down, then design
              practical automations built for day-to-day operations. The result
              is clarity, efficiency, and systems that scale with your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
