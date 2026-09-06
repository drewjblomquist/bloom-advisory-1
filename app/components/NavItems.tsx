import Image from "next/image";
import styles from "./NavItems.module.css";

const NAV_ITEMS = [
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "questionnaire", label: "Assessment", href: "#questionnaire" },
  { id: "contact", label: "Contact Us", href: "#contact" },
];

type NavItemsProps = {
  activeId?: string;
  onContactClick?: () => void;
};

export default function NavItems({ activeId, onContactClick }: NavItemsProps) {
  return (
    <header className={styles.shell}>
      <a className={styles.logoLink} href="/" aria-label="Bloom Advisory home">
        <Image
          className={styles.logo}
          src="/images/brand/Bloom%20Advisory.svg"
          alt="Bloom Advisory"
          width={465}
          height={62}
          priority
        />
      </a>
      <nav className={styles.nav} aria-label="Primary">
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            const className = `${styles.link} ${isActive ? styles.active : ""}`;

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
    </header>
  );
}
