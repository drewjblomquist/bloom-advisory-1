import styles from "./Hero.module.css";
export default function Hero() {
  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div>
          <p className="eyebrow">Practical AI. Real business impact.</p>
          <h1 id="hero-title" className={styles.title}>
            Less busywork.
            <br />
            <span>More possibility.</span>
          </h1>
          <p className={styles.subtitle}>
            Your business has better things to do. We help you find the right
            technology, simplify the everyday, and make room for what comes
            next.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#questionnaire">
              Find your starting point <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondary} href="#services">
              Explore what we do <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <aside className={styles.aside} aria-label="Our approach">
          <p className={styles.asideLabel}>FROM FRICTION TO FORWARD</p>
          <ol className={styles.steps}>
            <li>
              <span className={styles.number}>01</span>
              <div>
                <h2>Find the friction.</h2>
                <p>Start with the work that slows you down.</p>
              </div>
            </li>
            <li>
              <span className={styles.number}>02</span>
              <div>
                <h2>Make a clear plan.</h2>
                <p>The right tools, built around your business.</p>
              </div>
            </li>
            <li>
              <span className={styles.number}>03</span>
              <div>
                <h2>Put it into practice.</h2>
                <p>Hands-on help, all the way through.</p>
              </div>
            </li>
          </ol>
          <p className={styles.asideFoot}>
            A thoughtful approach to working smarter.
          </p>
        </aside>
      </div>
      <div className={styles.foot}>
        <span>Built for small &amp; mid-sized businesses</span>
        <span>Discovery · Automation · Integration · Analytics</span>
      </div>
    </section>
  );
}
