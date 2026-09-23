import Image from "next/image";
import { about } from "@/lib/content";
import { Arrow } from "./ui";
import styles from "./Redesign.module.css";
export default function About() {
  return (
    <section id="about" className={`${styles.section} ${styles.about}`}>
      <div className={`${styles.container} ${styles.aboutGrid}`}>
        <div className={styles.aboutImage}><Image src="/images/camb2-2048x1357.jpeg" alt="Cambridge, home of MatriQx" fill sizes="(min-width: 900px) 45vw, 100vw" className="object-cover" /><span>CAMBRIDGE, UK / GLOBAL AMBITION</span></div>
        <div><p className={styles.eyebrow}>03 / THE HUMAN SIDE OF INTELLIGENCE</p><h2>Powered by AI.<br /><span>Driven by people.</span></h2><p className={styles.aboutLead}>The most powerful connection?<br />Technology and human insight.</p><p className={styles.body}>{about.body2}</p><a href={about.cta.href} className={styles.textLink}>{about.cta.label}<Arrow /></a></div>
      </div>
    </section>
  );
}
