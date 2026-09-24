import Image from "next/image";
import { about } from "@/lib/content";
import { Arrow, Rich } from "./ui";
import styles from "./Redesign.module.css";
export default function About() {
  return (
    <section id="about" className={`${styles.section} ${styles.about}`}>
      <div className={`${styles.container} ${styles.aboutGrid}`}>
        <div className={styles.aboutImage}><Image src="/images/camb2-2048x1357.jpeg" alt="Cambridge, home of MatriQx" fill sizes="(min-width: 900px) 45vw, 100vw" className="object-cover" /></div>
        <div><p className={styles.eyebrow}>{about.eyebrow}</p><h2>{about.titleLead}<span>{about.titleAccent}</span>{about.titleTail}</h2><p className={styles.body}><Rich parts={about.body1} /></p><p className={styles.body}>{about.body2}</p><a href={about.cta.href} className={styles.textLink}>{about.cta.label}<Arrow /></a></div>
      </div>
    </section>
  );
}
