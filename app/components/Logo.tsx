import { Rubik_One } from 'next/font/google'
import styles from './Logo.module.css'

const rubikOne = Rubik_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Logo() {
  return <p className={`${styles.logo} ${rubikOne.className}`}>Bloom Advisory</p>
}
