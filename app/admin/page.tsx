import styles from "./Admin.module.css";

export default function AdminPlaceholder() {
  return (
    <section className={styles.section} aria-labelledby="admin-title">
      <div className={styles.container}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h1 id="admin-title" className={styles.title}>
              Coming Soon
            </h1>
          </header>
        </div>
      </div>
    </section>
  );
}
