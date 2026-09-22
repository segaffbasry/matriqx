"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * One place for every scroll/appear animation. Markup opts in with data attributes:
 *  data-split            words (.w > .w-i) rise out of their masks
 *  data-reveal           fade + lift + unblur (siblings inside [data-stagger] cascade)
 *  data-clip             image frame wipes open while the image settles from 1.25x
 *  data-parallax="0.2"   drifts on scroll (fraction of the element's height)
 *  data-scrub-words      words brighten one by one as the block scrolls through
 */
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = reduce ? null : new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    const raf = (t: number) => lenis?.raf(t * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id === "#" || id === "#top" ? document.body : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.4 });
      else el.scrollIntoView();
    };
    document.addEventListener("click", onAnchor);


    // Buttons: fill blooms from the entry point, retracts toward the exit, and
    // the button leans toward the cursor (label a touch further, for depth).
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const btnCleanups: (() => void)[] = [];
    if (fine) {
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        const inner = btn.querySelector<HTMLElement>(".btn-inner");
        const bx = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3.out" });
        const by = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3.out" });
        const ix = inner && gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3.out" });
        const iy = inner && gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" });
        const setOrigin = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          btn.style.setProperty("--fx", `${e.clientX - r.left}px`);
          btn.style.setProperty("--fy", `${e.clientY - r.top}px`);
          btn.style.setProperty("--fs", `${Math.hypot(r.width, r.height) * 2.2}px`);
          return r;
        };
        const enter = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          setOrigin(e);
        };
        const move = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          bx(dx * 0.22);
          by(dy * 0.32);
          ix?.(dx * 0.1);
          iy?.(dy * 0.14);
        };
        const leave = (e: PointerEvent) => {
          setOrigin(e);
          gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
          if (inner) gsap.to(inner, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
        };
        btn.addEventListener("pointerenter", enter);
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        btnCleanups.push(() => {
          btn.removeEventListener("pointerenter", enter);
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });
    }

    // Each pass only claims elements it hasn't animated yet, so nodes that
    // mount later (client re-renders, hot reload) still get their reveal
    // instead of staying stuck at the hidden initial state.
    const claimed = new WeakSet<Element>();
    const fresh = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
      gsap.utils.toArray<T>(root.querySelectorAll(sel)).filter((n) => {
        if (claimed.has(n)) return false;
        claimed.add(n);
        return true;
      });

    const build = () => gsap.context(() => {
      if (reduce) {
        gsap.set(fresh("[data-reveal]"), { opacity: 1 });
        fresh("[data-split]").forEach((el) => gsap.set(el.querySelectorAll(".w-i"), { yPercent: 0, y: 0 }));
        return;
      }

      const ease = "expo.out";

      // Hero plays on load; everything else waits for the viewport.
      fresh("[data-split]").forEach((el) => {
        const words = el.querySelectorAll(".w-i");
        const hero = el.closest("[data-hero]");
        gsap.fromTo(
          words,
          { y: 0, yPercent: 110, rotate: 3 },
          {
            y: 0,
            yPercent: 0,
            rotate: 0,
            duration: 1.3,
            ease,
            stagger: 0.045,
            delay: hero ? 0.25 : 0,
            scrollTrigger: hero ? undefined : { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      const staggered = new Set<HTMLElement>();
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = gsap.utils
          .toArray<HTMLElement>(group.querySelectorAll("[data-reveal]"))
          .filter((n) => n.closest("[data-stagger]") === group && !claimed.has(n));
        if (!items.length) return;
        items.forEach((n) => {
          staggered.add(n);
          claimed.add(n);
        });
        const hero = group.closest("[data-hero]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease,
            stagger: 0.09,
            delay: hero ? Number(group.dataset.delay ?? 0.6) : 0,
            clearProps: "filter",
            scrollTrigger: hero ? undefined : { trigger: group, start: "top 85%", once: true },
          },
        );
      });

      fresh("[data-reveal]").forEach((el) => {
        if (staggered.has(el)) return;
        const hero = el.closest("[data-hero]");
        gsap.fromTo(
          el,
          { opacity: 0, y: 32, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease,
            delay: hero ? 0.5 : Number(el.dataset.delay ?? 0),
            clearProps: "filter",
            scrollTrigger: hero ? undefined : { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      fresh("[data-clip]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          delay: Number(el.dataset.delay ?? 0),
        });
        tl.fromTo(
          el,
          { clipPath: "inset(18% 12% 18% 12% round 18px)" },
          { clipPath: "inset(0% 0% 0% 0% round 18px)", duration: 1.6, ease },
        );
        if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease }, 0);
      });

      fresh("[data-parallax]").forEach((el) => {
        const amt = Number(el.dataset.parallax || 0.15);
        gsap.fromTo(
          el,
          { yPercent: -amt * 50 },
          {
            yPercent: amt * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      fresh("[data-scrub-words]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".sw"),
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      });

      // Hero media eases back as the page scrolls away.
      const [heroMedia] = fresh("[data-hero-media]");
      if (heroMedia) {
        gsap.to(heroMedia, {
          yPercent: 18,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
    const contexts = [build()];

    let pending = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => {
        const sel = "[data-reveal],[data-split],[data-clip],[data-parallax],[data-scrub-words]";
        const hasNew = [...document.querySelectorAll(sel)].some((n) => !claimed.has(n));
        if (!hasNew) return;
        contexts.push(build());
        ScrollTrigger.refresh();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Fonts and images shift layout; recompute trigger positions once they settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      mo.disconnect();
      cancelAnimationFrame(pending);
      contexts.forEach((c) => c.revert());
      document.removeEventListener("click", onAnchor);
      btnCleanups.forEach((f) => f());
      window.removeEventListener("load", refresh);
      if (lenis) {
        gsap.ticker.remove(raf);
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
