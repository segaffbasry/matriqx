"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { BRAND_PATHS } from "@/lib/brand";
import styles from "./DiscoveryNetwork.module.css";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export default function DiscoveryNetwork() {
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const clock = useRef(0);

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
    const moving = !reduced;
    const draw = (now: number) => {
      frame = 0;
      if (last && moving) clock.current += Math.min((now - last) / 1000, .05);
      last = now;
      const t = clock.current;
      const cycle = t % 18;
      // The logo stays legible while breathing gently, then flows into a rotating cloud.
      const blend = reduced ? 1 : cycle < 3 ? 1 : cycle < 8 ? 1 - (cycle - 3) / 5 : cycle < 11 ? 0 : cycle < 16 ? (cycle - 11) / 5 : 1;
      const morph = blend * blend * (3 - 2 * blend);
      ctx.clearRect(0, 0, 600, 520);
      const angle = t * .18;
      const tilt = Math.sin(t * .22) * .2;
      const breath = moving ? 1 + Math.sin(t * .85) * .018 : 1;
      const float = moving ? Math.sin(t * .65) * 5 : 0;
      const flow = Math.sin(morph * Math.PI);
      for (const p of particles) {
        const x = p.x * Math.cos(angle) + p.z * Math.sin(angle);
        const z = p.z * Math.cos(angle) - p.x * Math.sin(angle);
        const perspective = 1 + z * .12;
        const sx = 300 + x * 202 * perspective;
        const sy = 255 + (p.y * Math.cos(tilt) - z * Math.sin(tilt)) * 202 * perspective;
        let px = sx * (1 - morph) + p.target.x * morph;
        let py = sy * (1 - morph) + p.target.y * morph;
        if (moving) {
          // Curved paths avoid a mechanical straight-line dissolve.
          px += Math.sin(p.seed * Math.PI * 2 + t * .4) * flow * 24;
          py += Math.cos(p.seed * Math.PI * 2 + t * .4) * flow * 18;
          px = 300 + (px - 300) * breath;
          py = 255 + (py - 255) * breath + float;
          px += Math.sin(t * 1.1 + p.target.y * .035) * 1.5;
          py += Math.cos(t * .9 + p.target.x * .025) * 1.5;
        }
        const depth = (z + 1) / 2;
        const shimmer = moving ? .06 * Math.sin(t * 1.2 + p.seed * 12) : 0;
        const alpha = (.2 + depth * .65) * (1 - morph) + (.8 + shimmer) * morph;
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
  }, [reduced]);

  return (
    <div ref={root} className={styles.network}>
      <div className={styles.topline}><span>MATRIQX</span><span>AI · AUTOMATION · FEDERATED INTELLIGENCE</span></div>
      <div className={styles.scene}>
        <svg viewBox="0 0 156 88" aria-hidden="true" className={styles.fallback}>{BRAND_PATHS.map(d => <path key={d} d={d} fill="currentColor" />)}</svg>
        <canvas ref={canvas} aria-hidden="true" className={styles.canvas} />
        <span className={`${styles.cross} ${styles.crossOne}`} aria-hidden>+</span><span className={`${styles.cross} ${styles.crossTwo}`} aria-hidden>+</span>
      </div>
    </div>
  );
}
