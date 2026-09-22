"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { scaling } from "@/lib/content";
import { Arrow, Badge, Words } from "./ui";

export default function Scaling() {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Drag-to-scroll with the mouse; touch keeps native momentum.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false;
    let x0 = 0;
    let s0 = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      x0 = e.clientX;
      s0 = el.scrollLeft;
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = s0 - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.style.scrollSnapType = "";
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 20), behavior: "smooth" });
  };

  return (
    <section id="platform" className="px-3 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[16px] bg-ink py-24 text-white lg:py-32">
        <Image src="/images/bg-overlay.png" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_10%_0%,rgba(8,106,216,0.45),transparent_70%)]" />
        <div className="grid-lines pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge dark plain>
                {scaling.eyebrow}
              </Badge>
              <h2
                data-split
                className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
              >
                <Words text="Scaling Science with" /> <Words text="Intelligence and Automation" className="text-sky" />
              </h2>
            </div>
            <div data-reveal className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={edges.start}
                aria-label="Previous slide"
                className="grid size-14 place-items-center rounded-[10px] border border-white/20 transition-all duration-500 hover:border-white hover:bg-white hover:text-ink disabled:pointer-events-none disabled:opacity-30"
              >
                <Arrow size={16} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={edges.end}
                aria-label="Next slide"
                className="grid size-14 place-items-center rounded-[10px] bg-white text-ink transition-all duration-500 hover:bg-sky hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <Arrow size={16} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={track}
          data-stagger
          className="no-scrollbar mt-14 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-5 active:cursor-grabbing sm:px-8 xl:px-[max(2rem,calc((100vw-1280px)/2+2rem))]"
        >
          {scaling.slides.map((s, i) => (
            <a
              key={s.sub}
              href={s.href}
              data-slide
              data-reveal
              draggable={false}
              className="group relative isolate flex w-[82vw] max-w-[440px] shrink-0 snap-start flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm transition-[border-color,transform] duration-700 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:border-transparent sm:w-[440px]"
            >
              {/* Solid brand fill wipes up from the base on hover */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-(image:--gradient-brand) transition-transform duration-[900ms] ease-(--ease-out-expo) group-hover:scale-y-100"
              />
              <div className="relative aspect-[16/11] overflow-hidden rounded-[12px]">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  draggable={false}
                  sizes="440px"
                  className="object-cover transition-transform duration-[1400ms] ease-(--ease-out-expo) group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-md bg-ink/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ice backdrop-blur-md">
                  {s.sub}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 pt-7">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.025em]">
                    {s.title[0]}
                    <br />
                    <span className="text-white/50 transition-colors duration-700 group-hover:text-white/80">{s.title[1]}</span>
                  </h3>
                  <span className="mt-1 font-display text-sm text-white/40 transition-colors duration-700 group-hover:text-white/70">0{i + 1}</span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-white/65 transition-colors duration-700 group-hover:text-white/90">{s.text}</p>
                <span className="mt-auto flex items-center justify-end pt-8">
                  <span className="grid size-11 place-items-center rounded-[10px] border border-white/20 transition-all duration-700 ease-(--ease-out-expo) group-hover:border-white group-hover:bg-white group-hover:text-brand">
                    <Arrow className="transition-transform duration-700 ease-(--ease-out-expo) group-hover:-rotate-45" />
                  </span>
                </span>
              </div>
            </a>
          ))}
          <div aria-hidden className="w-px shrink-0" />
        </div>

        <div className="mx-auto mt-12 max-w-[1280px] px-5 sm:px-8">
          <div className="h-px w-full bg-white/15">
            <div
              className="h-px origin-left bg-sky transition-transform duration-300"
              style={{ transform: `scaleX(${0.2 + progress * 0.8})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
