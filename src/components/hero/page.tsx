import Link from 'next/link';
import styles from './page.module.css';
import { useI18n } from '../../contexts/I18nContext';

export interface HeroData {
  headline1: string;
  headline2: string;
  subtitle: string;
  badge: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
}
const Hero: React.FC = () => {
  const { texts } = useI18n();
  const hero: HeroData | undefined = texts?.pages?.home?.hero;

  if (!hero) {
    return (
      <section className={styles.section}>
        <div
          className={styles.skeleton}
          style={{ width: '100%', height: 504, background: '#eee' }}
        />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <div className={styles.div}>
            <h1 className={styles.h1}>{hero.headline1}</h1>
            <h1 className={styles.h1}>{hero.headline2}</h1>
          </div>
          <p className={styles.p}>&</p>
        </aside>
        <p className={styles.description}>{hero.subtitle}</p>
        <Link href={hero.cta.href} className="button">
          {hero.cta.label}
        </Link>
      </main>
    </section>
  );
};

export default Hero;
