"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BRAND_PATHS } from "@/lib/brand";
import styles from "./BrandIntro.module.css";

export default function BrandIntro() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dismiss = () => { element.hidden = true; };
    let seen = false;
    try { seen = sessionStorage.getItem("matriqx-intro-v2") === "seen"; } catch { /* Storage is optional. */ }
    if (seen || query.matches || window.location.hash) return;
    try { sessionStorage.setItem("matriqx-intro-v2", "seen"); } catch { /* Animation still works without storage. */ }
    element.hidden = false;
    const timer = window.setTimeout(dismiss, 2600);
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" || event.key === "Tab") dismiss(); };
    document.addEventListener("keydown", escape);
    query.addEventListener("change", dismiss);
    return () => { clearTimeout(timer); document.removeEventListener("keydown", escape); query.removeEventListener("change", dismiss); };
  }, []);
  return (
    <div ref={root} className={styles.intro} hidden aria-hidden="true">
      <div className={styles.content}>
        <svg viewBox="0 0 156 88" className={styles.mark}>
          <path className={styles.line} d="M9 44H147" pathLength="1" />
          {BRAND_PATHS.map((path, i) => <path key={path} className={styles.trace} d={path} pathLength="1" style={{animationDelay: `${.25 + i * .12}s`}} />)}
        </svg>
        <Image src="/brand/logo1.png" alt="" width={432} height={85} className={styles.wordmark} preload />
      </div>
      <span className={styles.rule} />
    </div>
  );
}
