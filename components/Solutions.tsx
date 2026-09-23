"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { services, solutions } from "@/lib/content";
import { Arrow } from "./ui";
import styles from "./Redesign.module.css";

const options = [
  { ...solutions.items[0], outcome: "From hypothesis to insight.", label: "Discovery science" },
  { ...solutions.items[1], outcome: "Explore the next material breakthrough.", label: "Materials science" },
  { ...solutions.items[2], outcome: "Make your data work together.", label: "Data engineering" },
  { title: services[0].title, text: services[0].text, href: services[0].href, image: "/images/materials-science.png", outcome: "Move innovation beyond the pilot.", label: "Digital transformation" },
];
export default function Solutions() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = options[active];
  return (
    <section id="solutions" className={`${styles.section} ${styles.solutions}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / POSSIBILITIES, UNLOCKED</p><h2>Where will your<br /><span>next breakthrough begin?</span></h2></div>
        <div className={styles.solutionLayout}>
          <div className={styles.solutionTabs} role="tablist" aria-label="Explore solutions">
            {options.map((item, i) => <button key={item.label} ref={el => { tabs.current[i] = el; }} type="button" role="tab" id={`solution-tab-${i}`} aria-selected={active === i} aria-controls="solution-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => {
              let next = i;
              if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % options.length;
              else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i + options.length - 1) % options.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = options.length - 1;
              else return;
              e.preventDefault(); setActive(next); tabs.current[next]?.focus();
            }} className={active === i ? styles.activeTab : undefined}><span className={styles.tabNumber}>0{i + 1}</span><span>{item.label}</span><Arrow /></button>)}
            <p className={styles.solutionAside}>Different disciplines.<br />One connected approach to science.</p>
          </div>
          <div id="solution-panel" role="tabpanel" aria-labelledby={`solution-tab-${active}`} tabIndex={0} className={styles.solutionPanel}>
            <div className={styles.solutionImage}><Image key={selected.image} src={selected.image} alt={`${selected.label} at MatriQx`} fill sizes="(min-width: 900px) 60vw, 100vw" className="object-cover" /><span className={styles.imageCaption}>MATRIQX / {selected.label.toUpperCase()}</span></div>
            <div className={styles.solutionDetail}><div><h3>{selected.outcome}</h3><p>{selected.text}</p></div><a href={selected.href} className={styles.roundLink} aria-label={`Explore ${selected.label}`}><Arrow size={23} className="-rotate-45" /></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
