import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.section} aria-label="Bloom Advisory">
      <div className={styles.container}>
        <Image
          className={styles.logo}
          src="/images/brand/bloom-advisory.png"
          alt="Bloom Advisory"
          width={980}
          height={420}
          priority
          sizes="(max-width: 767px) 86vw, 48vw"
        />
        <h1 className={styles.headline}>Better ways to work.</h1>
        <p className={styles.supportingCopy}>
          We help businesses improve inefficient processes and implement
          practical automation that saves their teams time.
        </p>
      </div>
    </section>
  );
}
