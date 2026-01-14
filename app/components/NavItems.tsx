import styles from "./NavItems.module.css";

const NAV_ITEMS = [
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "questionnaire", label: "Questionnaire", href: "#questionnaire" },
  { id: "contact", label: "Contact Us", href: "#contact" },
];

type NavItemsProps = {
  activeId?: string;
};

export default function NavItems({ activeId }: NavItemsProps) {
  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Primary">
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id} className={styles.item}>
                <a
                  className={`${styles.link} ${isActive ? styles.active : ""}`}
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
