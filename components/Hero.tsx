import { Arrow, Button } from "./ui";
import styles from "./Redesign.module.css";

// A deterministic scientific network illustration, rendered without WebGL or video.
function DiscoveryNetwork() {
  const points = Array.from({ length: 140 }, (_, i) => {
    const y = 1 - (i / 139) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = i * 2.39996323;
    const z = Math.sin(angle) * radius;
    return { x: 300 + Math.cos(angle) * radius * 208, y: 280 + y * 208, z };
  });
  return (
    <div className={styles.network}>
      <span className={styles.visualLabel}>THE CONNECTED SCIENCE ECOSYSTEM</span>
      <svg viewBox="0 0 600 560" aria-hidden="true" className={styles.networkSvg}>
        <defs>
          <radialGradient id="network-glow"><stop stopColor="#2698ff" stopOpacity=".22"/><stop offset="1" stopColor="#086ad8" stopOpacity="0"/></radialGradient>
        </defs>
        <circle cx="300" cy="280" r="265" fill="url(#network-glow)" />
        <g className={styles.orbits}>
          <ellipse cx="300" cy="280" rx="274" ry="104" fill="none" stroke="#086ad8" strokeOpacity=".22" transform="rotate(-32 300 280)" />
          <ellipse cx="300" cy="280" rx="254" ry="122" fill="none" stroke="#086ad8" strokeOpacity=".15" transform="rotate(48 300 280)" />
        </g>
        {points.flatMap((p, i) => points.slice(i + 1).map((q, j) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          return d < 65 && Math.abs(p.z - q.z) < .65 ? <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#086ad8" strokeOpacity={.1 + (p.z + 1) * .13} /> : null;
        }))}
        {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.z > .4 ? 3.8 : 2} fill={p.z > .4 ? "#086ad8" : "#80b9ee"} opacity={.4 + (p.z + 1) * .3} />)}
        <circle cx="300" cy="280" r="46" fill="#086ad8" />
        <path d="M280 262h12l8 12 8-12h12l-14 19 15 20h-13l-8-12-8 12h-13l15-20z" fill="white" />
      </svg>
      <span className={`${styles.networkTag} ${styles.tagOne}`}>01 / Scientific data</span>
      <span className={`${styles.networkTag} ${styles.tagTwo}`}>02 / AI + human insight</span>
      <span className={`${styles.networkTag} ${styles.tagThree}`}>03 / Discovery</span>
      <div className={styles.visualCaption}><span className={styles.statusDot} /> Connected intelligence. Shared possibility.</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" data-hero className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.statusDot} /> AI-NATIVE. HUMAN-DRIVEN.</p>
          <h1>Science.<br />Connected.<br /><span>Accelerated.</span></h1>
          <p className={styles.heroDescription}>Unlock the full value of scientific data with AI, automation, and federated intelligence.</p>
          <div className={styles.actions}><Button href="#solutions" reveal={false}>Explore our solutions</Button><a href="#contact" className={styles.textLink}>Talk to our experts <Arrow /></a></div>
          <p className={styles.heroNote}>Advancing drug discovery, life sciences & materials innovation.</p>
        </div>
        <DiscoveryNetwork />
      </div>
      <div className={`${styles.container} ${styles.heroBottom}`}><span>COMPLEX DATA. MEANINGFUL INSIGHTS.</span><a href="#solutions">Discover the possibilities <Arrow className="rotate-90" /></a></div>
    </section>
  );
}
