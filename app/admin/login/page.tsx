import styles from "./AdminLogin.module.css";

export default function AdminLoginPlaceholder() {
  return (
    <section
      className={styles.section}
      aria-labelledby="admin-login-title"
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h1 id="admin-login-title" className={styles.title}>
              Admin Login
            </h1>
          </header>
          <form className={styles.form} aria-label="Admin login form">
            <div className={styles.field}>
              <label className={styles.label} htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                className={styles.input}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
