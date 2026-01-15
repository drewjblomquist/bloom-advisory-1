import styles from "./NavItems.module.css";

const NAV_ITEMS = [
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "questionnaire", label: "Questionnaire", href: "#questionnaire" },
  { id: "contact", label: "Contact Us", href: "#contact" },
];

type NavItemsProps = {
  activeId?: string;
  onContactClick?: () => void;
};

export default function NavItems({ activeId, onContactClick }: NavItemsProps) {
  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Primary">
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            const className = `${styles.link} ${
              isActive ? styles.active : ""
            }`;

            if (item.id === "contact" && onContactClick) {
              return (
                <li key={item.id} className={styles.item}>
                  <button
                    type="button"
                    className={`${styles.button} ${
                      isActive ? styles.active : ""
                    }`}
                    onClick={onContactClick}
                  >
                    {item.label}
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id} className={styles.item}>
                <a className={className} href={item.href}>
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
