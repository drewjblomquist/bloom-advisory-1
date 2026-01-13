/**
 * Header Component (V2)
 * 
 * Implementation Summary:
 * - Sticky header that remains visible at all times
 * - Full-bleed glass background with container-aligned inner content
 * - Left cluster: logo slot (to be implemented separately)
 * - Right cluster: nav items slot (to be implemented separately)
 * - Bottom edge: short gradient fade (~12-24px) to transparent
 * - Medium header height with responsive horizontal padding
 * - No layout shift on load or scroll
 */

import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftCluster}>
          {/* Logo slot - to be implemented separately */}
        </div>
        <div className={styles.rightCluster}>
          {/* Nav items slot - to be implemented separately */}
        </div>
      </div>
      {/* Bottom edge fade gradient */}
      <div className={styles.bottomFade}></div>
    </header>
  )
}
