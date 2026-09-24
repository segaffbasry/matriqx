"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BRAND_PATHS } from "@/lib/brand";
import styles from "./DiscoveryNetwork.module.css";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export default function DiscoveryNetwork() {
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const clock = useRef(0);
  const pointer = useRef({ x: 300, y: 270, active: false });

  useEffect(() => {
    const element = canvas.current;
    const container = root.current;
    const ctx = element?.getContext("2d");
    if (!element || !container || !ctx) return;
    ctx.resetTransform();
    // Sample the actual brand geometry, so the particles resolve into the mark.
    const paths = BRAND_PATHS.map(d => new Path2D(d));
    const targets: { x: number; y: number }[] = [];
    for (let y = 3; y < 78; y += 1.6) for (let x = 8; x < 148; x += 1.6) {
      if (paths.some(path => ctx.isPointInPath(path, x, y))) targets.push({ x: 300 + (x - 78) * 3.2, y: 255 + (y - 40) * 3.2 });
    }
    const particles = targets.map((target, i) => {
      // Keep vertical ordering consistent with the mark while it takes shape.
      const y = -1 + 2 * i / (targets.length - 1);
      const radius = Math.sqrt(1 - y * y);
      const angle = i * 2.39996323;
      return { target, x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius, seed: (i * .6180339) % 1 };
    });
    let frame = 0, last = 0, visible = true;
    const moving = !paused && !reduced;
    const draw = (now: number) => {
      frame = 0;
      if (last && moving) clock.current += Math.min((now - last) / 1000, .05);
      last = now;
      const t = clock.current;
      const cycle = t % 16;
      // Long holds make the mark readable between gentle particle transitions.
      const blend = reduced ? 1 : cycle < 4 ? 1 : cycle < 7 ? 1 - (cycle - 4) / 3 : cycle < 11 ? 0 : cycle < 14 ? (cycle - 11) / 3 : 1;
      const morph = blend * blend * (3 - 2 * blend);
      ctx.clearRect(0, 0, 600, 520);
      for (const p of particles) {
        const angle = t * .14;
        const x = p.x * Math.cos(angle) + p.z * Math.sin(angle);
        const z = p.z * Math.cos(angle) - p.x * Math.sin(angle);
        const perspective = 1 + z * .12;
        const sx = 300 + x * 202 * perspective;
        const sy = 255 + p.y * 202 * perspective;
        let px = sx * (1 - morph) + p.target.x * morph;
        let py = sy * (1 - morph) + p.target.y * morph;
        if (moving) {
          px += Math.sin(t * .6 + p.seed * 12) * (1 - morph) * 7;
          py += Math.cos(t * .5 + p.seed * 12) * (1 - morph) * 7;
          if (pointer.current.active) {
            const dx = px - pointer.current.x, dy = py - pointer.current.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 85 && distance > 0) { const force = (1 - distance / 85) ** 2 * 16; px += dx / distance * force; py += dy / distance * force; }
          }
        }
        const depth = (z + 1) / 2;
        const alpha = (.2 + depth * .65) * (1 - morph) + .85 * morph;
        ctx.fillStyle = `rgba(8,106,216,${alpha})`;
        ctx.beginPath(); ctx.arc(px, py, (1.1 + depth * 1.1) * (1 - morph) + 1.65 * morph, 0, Math.PI * 2); ctx.fill();
      }
      if (moving && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(container.clientWidth, 1);
      element.width = Math.round(width * ratio); element.height = Math.round(width * 520 / 600 * ratio);
      ctx.setTransform(element.width / 600, 0, 0, element.height / 520, 0, 0);
      if (!frame) draw(0);
    };
    const start = () => { if (!frame && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(draw); } };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; last = 0; };
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); }, { threshold: .05 });
    const size = new ResizeObserver(resize);
    const visibility = () => { if (document.hidden) stop(); else start(); };
    resize(); container.dataset.ready = "true";
    size.observe(container); intersection.observe(container);
    document.addEventListener("visibilitychange", visibility);
    return () => { stop(); size.disconnect(); intersection.disconnect(); document.removeEventListener("visibilitychange", visibility); delete container.dataset.ready; };
  }, [paused, reduced]);

  return (
    <div ref={root} className={styles.network}>
      <div className={styles.topline}><span>MATRIQX</span><span>AI · AUTOMATION · FEDERATED INTELLIGENCE</span></div>
      <div className={styles.scene} onPointerMove={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = { x: (event.clientX - rect.left) / rect.width * 600, y: (event.clientY - rect.top) / rect.height * 520, active: event.pointerType === "mouse" };
      }} onPointerLeave={() => { pointer.current.active = false; }}>
        <svg viewBox="0 0 156 88" aria-hidden="true" className={styles.fallback}>{BRAND_PATHS.map(d => <path key={d} d={d} fill="currentColor" />)}</svg>
        <canvas ref={canvas} aria-hidden="true" className={styles.canvas} />
        <span className={`${styles.cross} ${styles.crossOne}`} aria-hidden>+</span><span className={`${styles.cross} ${styles.crossTwo}`} aria-hidden>+</span>
      </div>
      <div className={styles.controls}><span>AI-Native Machine Learning</span><button type="button" disabled={reduced} onClick={() => setPaused(!paused)} aria-label={reduced ? "Animation disabled: reduced motion" : paused ? "Resume network animation" : "Pause network animation"}>{reduced ? "Reduced motion" : paused ? "Play motion ▷" : "Pause motion Ⅱ"}</button></div>
    </div>
  );
}
