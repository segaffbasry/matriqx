import { hero, solutions } from "@/lib/content";
import { Arrow, Button, Rich } from "./ui";
import styles from "./Redesign.module.css";
import DiscoveryNetwork from "./DiscoveryNetwork";

export default function Hero() {
  return (
    <section id="top" data-hero className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.statusDot} />{hero.eyebrow}</p>
          <h1>{hero.titleLead}<span>{hero.titleTail}</span></h1>
          <p className={styles.heroDescription}><Rich parts={hero.body} /></p>
          <div className={styles.actions}><Button href="#solutions" reveal={false}>{hero.primary.label}</Button><a href={hero.secondary.href} className={styles.textLink}>{hero.secondary.label}<Arrow /></a></div>
        </div>
        <DiscoveryNetwork />
      </div>
      <div className={`${styles.container} ${styles.heroBottom}`}><span>{solutions.eyebrow}</span><a href="#solutions">{solutions.title}<Arrow className="rotate-90" /></a></div>
    </section>
  );
}
