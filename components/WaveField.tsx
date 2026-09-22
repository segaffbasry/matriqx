"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uPixelRatio;
  uniform float uSize;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float t = uTime * 0.35;

    // Layered swells give the fabric-like folds of the original artwork.
    float h = sin(p.x * 0.14 + t * 1.3) * 2.2;
    h += sin(p.z * 0.2 + t) * 1.8;
    h += sin((p.x + p.z) * 0.08 - t * 0.8) * 3.2;
    h += sin(length(p.xz - vec2(-18.0, 6.0)) * 0.18 - t * 1.6) * 0.9;

    // Soft ripple lifting out from the cursor.
    float d = distance(p.xz, uMouse);
    h += uMouseStrength * 2.4 * exp(-d * d * 0.012) * sin(d * 0.55 - uTime * 3.0);

    p.y += h;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (24.0 / -mv.z);

    // Crests catch the light; distance and the edges fade out.
    float crest = smoothstep(-6.0, 6.0, h);
    float depth = smoothstep(90.0, 14.0, -mv.z);
    vAlpha = (0.28 + crest * 0.62) * depth;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    // Rounded rectangle "dash", like the printed dot screen in the brand art.
    vec2 uv = gl_PointCoord - 0.5;
    vec2 q = abs(uv) - vec2(0.34, 0.2);
    float r = length(max(q, 0.0)) - 0.08;
    float a = 1.0 - smoothstep(-0.02, 0.03, r);
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a * vAlpha);
  }
`;

/**
 * Animated dot-screen wave field (Three.js points + shader). Pauses offscreen,
 * renders a single still frame for reduced motion.
 */
export default function WaveField({
  className = "",
  color = "#ffffff",
  density = 1,
}: {
  className?: string;
  color?: string;
  density?: number;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the section's gradient still stands on its own.
    }
    const pr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pr);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    camera.position.set(0, 11, 28);
    camera.lookAt(0, -1, -10);

    const cols = Math.round(104 * density);
    const rows = Math.round(52 * density);
    const w = 120;
    const d = 70;
    const pos = new Float32Array(cols * rows * 3);
    let k = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        pos[k++] = (i / (cols - 1) - 0.5) * w;
        pos[k++] = 0;
        pos[k++] = (j / (rows - 1) - 0.8) * d;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uMouseStrength: { value: 0 },
      uPixelRatio: { value: pr },
      uSize: { value: 9 / density },
      uColor: { value: new THREE.Color(color) },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    points.rotation.y = -0.18;
    scene.add(points);

    const resize = () => {
      const { clientWidth: cw, clientHeight: ch } = el;
      renderer.setSize(cw, ch, false);
      camera.aspect = cw / Math.max(ch, 1);
      // Keep the field filling wide, short bands.
      camera.fov = camera.aspect > 2.4 ? 32 : 45;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Cursor → point on the wave plane, eased so the ripple glides.
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const target = new THREE.Vector2(999, 999);
    let strengthTarget = 0;
    const section = el.parentElement ?? el;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) {
        // Undo the field's own rotation to land in its local space.
        hit.applyAxisAngle(new THREE.Vector3(0, 1, 0), -points.rotation.y);
        target.set(hit.x, hit.z);
        strengthTarget = 1;
      }
    };
    const onLeave = () => (strengthTarget = 0);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += dt;
      const m = uniforms.uMouse.value;
      if (m.x > 900) m.copy(target);
      m.lerp(target, 0.06);
      uniforms.uMouseStrength.value += (strengthTarget - uniforms.uMouseStrength.value) * 0.05;
      renderer.render(scene, camera);
    };
    if (reduce) {
      uniforms.uTime.value = 4;
      renderer.render(scene, camera);
    } else tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [color, density]);

  return <div ref={host} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
