import styles from "./About.module.css";
export default function About() {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-title"
    >
      <p className="eyebrow">01 / Why Bloom</p>
      <div className={styles.grid}>
        <h2 id="about-title" className={styles.title}>
          Technology should
          <br />
          give you time back.
        </h2>
        <div className={styles.copy}>
          <p>
            Technology is changing quickly, and so is what’s possible for your
            business. You shouldn’t have to spend your week keeping up with
            every new tool and trend. That’s where we come in.
          </p>
          <p>
            We learn how your business works, find the processes taking up your
            team’s time, and see where technology can help. Then we build it
            with you and make sure it keeps working as your business grows.
          </p>
        </div>
      </div>
    </section>
  );
}
