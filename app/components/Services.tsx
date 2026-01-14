import styles from "./Services.module.css";

const SERVICES = [
  {
    id: "discovery",
    title: "Discovery",
    description: "Find where time and money leak",
  },
  {
    id: "automation",
    title: "Automation",
    description: "Eliminate manual, repetitive work",
  },
  {
    id: "integration",
    title: "Integration",
    description: "Connect systems that don't talk",
  },
  {
    id: "visibility",
    title: "Visibility",
    description: "Track performance in real time",
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <div key={service.id} className={styles.bubble}>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
