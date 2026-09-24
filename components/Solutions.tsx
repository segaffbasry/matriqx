"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { services, solutions } from "@/lib/content";
import { Arrow } from "./ui";
import styles from "./Solutions.module.css";

const items = solutions.items.map((item, i) => ({ ...item, detail: services[i + 1].text, cta: services[i + 1].cta }));
export default function Solutions() {
  const [active, setActive] = useState<number | null>(0);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section id="solutions" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}><div><p className={styles.eyebrow}>01 / {solutions.title}</p><h2>Accelerate discovery.<br /><span>Scale innovation. Multiply impact.</span></h2></div><a href={solutions.more.href} className={styles.more}><span>{`${solutions.moreLead} ${solutions.more.label}`}</span><Arrow /></a></div>
        <div className={styles.accordion}>
          {items.map((item, i) => {
            const expanded = active === i;
            return <article key={item.href} className={styles.item} data-open={expanded}>
              <h3><button ref={el => { triggers.current[i] = el; }} id={`solution-trigger-${i}`} type="button" aria-expanded={expanded} aria-controls={`solution-content-${i}`} className={styles.trigger} onClick={() => setActive(expanded ? null : i)} onKeyDown={event => {
                let next = i;
                if (event.key === "ArrowDown") next = (i + 1) % items.length;
                else if (event.key === "ArrowUp") next = (i + items.length - 1) % items.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = items.length - 1;
                else return;
                event.preventDefault(); triggers.current[next]?.focus();
              }}><span className={styles.number}>0{i + 1}</span><span>{item.title.join(" ")}</span><span className={styles.indicator} aria-hidden>{expanded ? "−" : "+"}</span></button></h3>
              <div id={`solution-content-${i}`} role="region" aria-labelledby={`solution-trigger-${i}`} className={styles.panel} aria-hidden={!expanded} inert={!expanded}>
                <div className={styles.clip}><div className={styles.content}>
                  <div className={styles.copy}><p className={styles.lead}>{item.text}</p><p className={styles.body}>{item.detail}</p><a href={item.href} className={styles.cta}>{item.cta}<span><Arrow className="-rotate-45" /></span></a></div>
                  <div className={styles.image}><Image src={item.image} alt={item.title.join(" ")} fill sizes="(min-width: 900px) 45vw, 90vw" className="object-cover" /><span aria-hidden>MATRIQX / 0{i + 1}</span></div>
                </div></div>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
