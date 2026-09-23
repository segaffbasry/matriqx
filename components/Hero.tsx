import { Arrow, Button } from "./ui";
import styles from "./Redesign.module.css";

import DiscoveryNetwork from "./DiscoveryNetwork";

export default function Hero() {
  return (
    <section id="top" data-hero className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.statusDot} /> AI-NATIVE. HUMAN-DRIVEN.</p>
          <h1>Science.<br />Connected.<br /><span>Accelerated.</span></h1>
          <p className={styles.heroDescription}>Unlock the full value of scientific data with AI, automation, and federated intelligence.</p>
          <div className={styles.actions}><Button href="#solutions" reveal={false}>Explore our solutions</Button><a href="#contact" className={styles.textLink}>Talk to our experts <Arrow /></a></div>
          <p className={styles.heroNote}>Advancing drug discovery, life sciences & materials innovation.</p>
        </div>
        <DiscoveryNetwork />
      </div>
      <div className={`${styles.container} ${styles.heroBottom}`}><span>COMPLEX DATA. MEANINGFUL INSIGHTS.</span><a href="#solutions">Discover the possibilities <Arrow className="rotate-90" /></a></div>
    </section>
  );
}
