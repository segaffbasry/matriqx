"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { Arrow } from "./ui";
import styles from "./Redesign.module.css";

const links = [{ label: "Solutions", href: "#solutions" }, { label: "Professional Services", href: "#approach" }, { label: "About Us", href: "#about" }, { label: "News & Insights", href: "#insights" }];
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    desktop.addEventListener("change", resize);
    return () => { document.removeEventListener("keydown", close); desktop.removeEventListener("change", resize); };
  }, []);
  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main">Skip to content</a>
      <nav className={`${styles.container} ${styles.nav}`} aria-label="Main">
        <a href="#top" aria-label="MatriQx home"><Image src="/brand/logo1.png" alt="MatriQx" width={432} height={85} preload className={styles.logo} /></a>
        <div className={styles.desktopLinks}>{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
        <a className={styles.navContact} href={site.contact}><span className={styles.navContactLabel}>Contact Us</span><span className={styles.navContactArrow} aria-hidden><Arrow /><Arrow /></span></a>
        <button ref={toggle} type="button" className={styles.menuToggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}>{open ? "Close −" : "Menu +"}</button>
      </nav>
      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className={styles.mobileNav}>{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<Arrow /></a>)}<a href={site.contact}>Contact Us <Arrow /></a></nav>
    </header>
  );
}
