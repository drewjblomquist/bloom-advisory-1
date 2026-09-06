import styles from "./Services.module.css";
const SERVICES = [
  {
    title: "Discovery",
    description:
      "Cut through the options. Find the software and opportunities that actually fit your goals.",
    detail: "A clearer starting point",
  },
  {
    title: "Automation",
    description:
      "Give repetitive tasks a better home, so your team can focus on the work that needs them.",
    detail: "Less manual work",
  },
  {
    title: "Integration",
    description:
      "Connect the systems you already use. Keep information moving without the copy and paste.",
    detail: "Tools that work together",
  },
  {
    title: "Analytics",
    description:
      "Turn scattered data into a clearer picture of your business and the decisions ahead.",
    detail: "More useful visibility",
  },
];
export default function Services() {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-title"
    >
      <p className="eyebrow">02 / Where we can help</p>
      <div className={styles.header}>
        <h2 id="services-title">
          Better systems.
          <br />A better day at work.
        </h2>
        <p>
          Focused improvements.
          <br />
          Built around the way you work.
        </p>
      </div>
      <div className={styles.grid}>
        {SERVICES.map((service, index) => (
          <article key={service.title} className={styles.service}>
            <span className={styles.number}>0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className={styles.detail}>{service.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
