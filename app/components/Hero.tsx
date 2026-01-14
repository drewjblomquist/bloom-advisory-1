import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h1 id="hero-title" className={styles.title}>
            Don’t know where to start with AI?
          </h1>
          <p className={styles.subtitle}>Welcome to Bloom Advisory.</p>
        </div>
      </div>
    </section>
  );
}
