import styles from "./Footer.module.css";

const SOCIAL_LINKS = [
  {
    id: "x",
    label: "X",
    href: "https://x.com/bloomadvisoryai?s=21",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className={styles.icon}
      >
        <path
          d="M17.45 3h3.05l-6.68 7.64L21 21h-5.65l-4.42-5.78L5.76 21H2.7l7.15-8.18L3 3h5.8l4 5.18L17.45 3zm-1.06 16.3h1.69L7.64 4.58H5.82l10.57 14.72z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/bloomadvisory.ai/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className={styles.icon}
      >
        <path
          d="M7 3h10c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4H7c-2.21 0-4-1.79-4-4V7c0-2.21 1.79-4 4-4zm10 2H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-5 3.5c1.93 0 3.5 1.57 3.5 3.5S13.93 15.5 12 15.5 8.5 13.93 8.5 12 10.07 8.5 12 8.5zm0 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm4.25-2.5a.75.75 0 110 1.5.75.75 0 010-1.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "substack",
    label: "Substack",
    href: "https://substack.com/@drewblomquist?utm_campaign=profile&utm_medium=profile-page",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className={styles.icon}
      >
        <path
          d="M5 4h14v2H5V4zm0 4h14v2H5V8zm0 4h14v8l-7-3.5L5 20v-8z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Social media">
      <div className={styles.container}>
        <div className={styles.row}>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              className={styles.link}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
