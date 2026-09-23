"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./DiscoveryNetwork.module.css";

const labels = ["Scientific data", "AI + human insight", "Discovery"];
const points = Array.from({ length: 110 }, (_, i) => {
  const y = 1 - (i / 109) * 2;
  const r = Math.sqrt(1 - y * y);
  return { x: Math.cos(i * 2.39996323) * r, y, z: Math.sin(i * 2.39996323) * r };
});
const edges = points.flatMap((a, i) => points.slice(i + 1).flatMap((b, j) =>
  Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < .43 ? [[i, i + j + 1] as const] : []
));
const fixed = (n: number) => Number(n.toFixed(3));
function project(angle: number, tilt: number, radius: number) {
  return points.map(p => {
    const x = p.x * Math.cos(angle) + p.z * Math.sin(angle);
    const z = p.z * Math.cos(angle) - p.x * Math.sin(angle);
    const y = p.y * Math.cos(tilt) - z * Math.sin(tilt);
    const depth = z * Math.cos(tilt) + p.y * Math.sin(tilt);
    const perspective = 820 / (820 - depth * 100);
    return { x: fixed(300 + x * radius * perspective), y: fixed(280 + y * radius * perspective), z: depth };
  });
}
const initial = project(0, -.14, 200);
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export default function DiscoveryNetwork() {
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const simulation = useRef({ angle: 0, tilt: -.14, time: 0, radius: 200, pointerX: 0, pointerY: 0 });

  useEffect(() => {
    const element = svg.current;
    const container = root.current;
    if (!element || !container) return;
    const nodes = [...element.querySelectorAll<SVGCircleElement>("[data-node]")];
    const lines = [...element.querySelectorAll<SVGLineElement>("[data-edge]")];
    const sparks = [...element.querySelectorAll<SVGCircleElement>("[data-spark]")];
    const orbit = element.querySelector<SVGGElement>("[data-orbits]")!;
    const state = simulation.current;
    let frame = 0;
    let last = 0;
    let visible = true;
    const moving = !paused && !reduced;

    const draw = (now: number) => {
      frame = 0;
      const dt = last ? Math.min((now - last) / 1000, .05) : 0;
      last = now;
      if (moving) {
        state.time += dt;
        state.angle += dt * (.12 + state.pointerX * .07);
        state.tilt += ((-.14 + state.pointerY * .25) - state.tilt) * (1 - Math.exp(-dt * 3));
        state.radius = 200 + Math.sin(state.time * .7) * 3;
      }
      const projected = project(state.angle, state.tilt, state.radius);
      projected.forEach((p, i) => {
        const front = (p.z + 1) / 2;
        nodes[i].setAttribute("cx", String(p.x));
        nodes[i].setAttribute("cy", String(p.y));
        nodes[i].setAttribute("r", String(1.6 + front * 2.6));
        nodes[i].setAttribute("opacity", String(.2 + front * .8));
      });
      edges.forEach(([a, b], i) => {
        const p = projected[a], q = projected[b];
        lines[i].setAttribute("x1", String(p.x)); lines[i].setAttribute("y1", String(p.y));
        lines[i].setAttribute("x2", String(q.x)); lines[i].setAttribute("y2", String(q.y));
        lines[i].setAttribute("opacity", String(.06 + ((p.z + q.z + 2) / 4) * .26));
      });
      sparks.forEach((spark, i) => {
        const [a, b] = edges[(i * 19) % edges.length];
        const p = projected[a], q = projected[b];
        const t = (state.time * .3 + i / sparks.length) % 1;
        spark.setAttribute("cx", String(p.x + (q.x - p.x) * t));
        spark.setAttribute("cy", String(p.y + (q.y - p.y) * t));
        spark.setAttribute("opacity", moving ? String(Math.sin(t * Math.PI) * .8) : "0");
      });
      orbit.setAttribute("transform", `rotate(${state.time * 3} 300 280)`);
      if (moving && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const start = () => { if (!frame && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(draw); } };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; last = 0; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); }, { threshold: .05 });
    observer.observe(container);
    const visibility = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", visibility);
    draw(0);
    return () => { stop(); observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, [paused, reduced]);

  return (
    <div ref={root} className={styles.network}>
      <div className={styles.topline}><span>THE CONNECTED SCIENCE ECOSYSTEM</span><span className={styles.liveDot} aria-hidden /></div>
      <div className={styles.scene} onPointerMove={event => {
        if (event.pointerType !== "mouse" || reduced || paused) return;
        const rect = event.currentTarget.getBoundingClientRect();
        simulation.current.pointerX = (event.clientX - rect.left) / rect.width - .5;
        simulation.current.pointerY = (event.clientY - rect.top) / rect.height - .5;
      }} onPointerLeave={() => { simulation.current.pointerX = 0; simulation.current.pointerY = 0; }}>
          <svg ref={svg} viewBox="0 0 600 560" aria-hidden="true" className={styles.svg}>
            <defs><radialGradient id="discovery-glow"><stop stopColor="currentColor" stopOpacity=".2" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient></defs>
            <circle cx="300" cy="280" r="265" fill="url(#discovery-glow)" />
            <g data-orbits fill="none" stroke="currentColor" strokeOpacity=".2">
              <ellipse cx="300" cy="280" rx="272" ry="100" transform="rotate(-32 300 280)" />
              <ellipse cx="300" cy="280" rx="259" ry="116" transform="rotate(48 300 280)" />
              <circle cx="71" cy="328" r="4" fill="currentColor" stroke="none" />
            </g>
            {edges.map(([a, b], i) => <line key={i} data-edge x1={initial[a].x} y1={initial[a].y} x2={initial[b].x} y2={initial[b].y} stroke="currentColor" opacity=".2" />)}
            {points.map((_, i) => <circle key={i} data-node cx={initial[i].x} cy={initial[i].y} r="2.8" fill="currentColor" opacity=".65" />)}
            {Array.from({length: 15}, (_, i) => <circle key={i} data-spark r="3" fill="currentColor" opacity="0" />)}
            <circle cx="300" cy="280" r="58" fill="none" stroke="currentColor" strokeOpacity=".18" />
            <circle cx="300" cy="280" r="46" fill="currentColor" />
            <path d="M280 262h12l8 12 8-12h12l-14 19 15 20h-13l-8-12-8 12h-13l15-20z" fill="white" />
          </svg>
        <div>{labels.map((label, i) => <span key={label} className={`${styles.tag} ${styles[`tag${i}`]}`}><span>0{i + 1}</span> / {label}</span>)}</div>
      </div>
      <div className={styles.details}><strong>Connected intelligence.</strong><p>Scientific data, AI and human insight. Shared possibility.</p></div>
      <div className={styles.controls}><button type="button" disabled={reduced} onClick={() => setPaused(!paused)} aria-label={reduced ? "Animation disabled: reduced motion" : paused ? "Resume network animation" : "Pause network animation"}>{reduced ? "Reduced motion" : paused ? "Play motion ▷" : "Pause motion Ⅱ"}</button></div>
    </div>
  );
}
