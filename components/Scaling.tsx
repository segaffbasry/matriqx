import { site } from "@/lib/content";
import { Arrow, Button } from "./ui";
import styles from "./Redesign.module.css";

const steps = [
  { title: "Connect your data", text: "Bring fragmented systems together with data engineering and FAIR data practices.", tags: "DATA FOUNDATIONS / FEDERATED COLLABORATION" },
  { title: "Reveal the possibilities", text: "Combine AI-driven platforms with human expertise for molecular design, predictive modelling, and hypothesis generation.", tags: "AI + HUMAN INSIGHT / PREDICTIVE MODELLING" },
  { title: "Scale your impact", text: "Move from exploration to enterprise with workflow automation and expert change support.", tags: "AUTOMATION / DIGITAL TRANSFORMATION" },
];
export default function Scaling() {
  return (
    <section id="approach" className={`${styles.section} ${styles.approach}`}>
      <div className={styles.container}>
        <div className={styles.approachIntro}><div><p className={styles.eyebrow}>02 / FROM COMPLEXITY TO CLARITY</p><h2>Better connected.<br /><span>Further together.</span></h2></div><p>Science doesn’t happen in silos.<br />Neither should your intelligence.</p></div>
        <div className={styles.steps}>{steps.map((step, i) => <article key={step.title} className={styles.step}><div className={styles.stepTop}><span>0{i + 1}</span><Arrow size={24} /></div><h3>{step.title}</h3><p>{step.text}</p><small>{step.tags}</small></article>)}</div>
        <div className={styles.platform}><div><span className={styles.platformMark} aria-hidden>Qx</span><div><p className={styles.eyebrow}>THE MATRIQX CORE PLATFORM</p><h3>Intelligence at the centre of your science.</h3></div></div><Button href={`${site.url}/products/`} variant="light" reveal={false}>Explore the platform</Button></div>
      </div>
    </section>
  );
}
