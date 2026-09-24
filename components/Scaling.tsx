import { scaling, solutions } from "@/lib/content";
import { Arrow, Button } from "./ui";
import styles from "./Redesign.module.css";

export default function Scaling() {
  const platform = scaling.slides[0];
  return (
    <section id="approach" className={`${styles.section} ${styles.approach}`}>
      <div className={styles.container}>
        <div className={styles.approachIntro}><div><p className={styles.eyebrow}>02 / {scaling.slides[3].sub}</p><h2>{scaling.title}</h2></div><p>{scaling.eyebrow}</p></div>
        <div className={styles.steps}>{scaling.slides.slice(1).map((step, i) => <article key={step.sub} className={styles.step}><div className={styles.stepTop}><span>0{i + 1}</span><Arrow size={24} /></div><h3><a href={step.href}>{step.title.join(" ")}</a></h3><p>{step.text}</p><small>{step.sub}</small></article>)}</div>
        <div className={styles.platform}><div><span className={styles.platformMark} aria-hidden>Qx</span><div><p className={styles.eyebrow}>{platform.sub}</p><h3>{platform.title.join(" ")}</h3><p className={styles.platformDescription}>{platform.text}</p></div></div><Button href={platform.href} variant="light" reveal={false}>{solutions.title}</Button></div>
      </div>
    </section>
  );
}
