"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Button, Icon } from "./ui";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div
        className={`mx-auto hidden max-w-[1320px] items-center justify-between px-8 text-[12px] text-white/75 transition-all duration-700 ease-(--ease-out-expo) lg:flex ${
          scrolled ? "h-0 opacity-0" : "h-11 opacity-100"
        }`}
      >
        <div className="flex items-center gap-7">
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
            {Icon.mail}
            <span className="ulink">{site.email}</span>
          </a>
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white"
          >
            {Icon.pin}
            <span className="ulink">{site.address}</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:-translate-y-0.5 hover:text-white">
            {Icon.linkedin}
          </a>
          <a href={site.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="transition hover:-translate-y-0.5 hover:text-white">
            {Icon.youtube}
          </a>
        </div>
      </div>

      {/* Floating nav pill */}
      <div
        className={`px-4 transition-transform duration-700 ease-(--ease-out-expo) sm:px-6 ${
          hidden && !open ? "-translate-y-[140%]" : "translate-y-0"
        } ${scrolled ? "pt-3" : "pt-3 lg:pt-0"}`}
      >
        <nav
          className={`mx-auto flex h-[68px] max-w-[1280px] items-center justify-between rounded-[12px] border pl-5 pr-2.5 transition-all duration-700 ease-(--ease-out-expo) ${
            scrolled
              ? "border-line/80 bg-white/85 shadow-[0_20px_50px_-30px_rgba(1,15,49,0.35)] backdrop-blur-xl"
              : "border-white/60 bg-white shadow-[0_20px_60px_-30px_rgba(1,15,49,0.5)]"
          }`}
          aria-label="Main"
        >
          <a href="#top" className="flex items-center" aria-label="MatriQx home">
            <Image src="/brand/logo1.png" alt="MatriQx" width={432} height={85} priority className="h-[30px] w-auto" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.label} className="group relative">
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 rounded-md px-4 py-2.5 text-[14px] font-medium text-ink/80 transition-colors hover:bg-mist hover:text-ink"
                >
                  {item.label}
                  {item.children && (
                    <span className="transition-transform duration-500 ease-(--ease-out-expo) group-hover:rotate-180">
                      {Icon.chevron}
                    </span>
                  )}
                </a>
                {item.children && (
                  <div className="pointer-events-none absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-500 ease-(--ease-out-expo) group-hover:pointer-events-auto group-hover:opacity-100">
                    <ul className="translate-y-2 rounded-xl border border-line bg-white p-2 shadow-[0_30px_60px_-30px_rgba(1,15,49,0.35)] transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-y-0">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <a
                            href={c.href}
                            className="group/i flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[14px] text-ink/75 transition-colors hover:bg-mist hover:text-brand"
                          >
                            {c.label}
                            <span className="-translate-x-2 opacity-0 transition-all duration-500 ease-(--ease-out-expo) group-hover/i:translate-x-0 group-hover/i:opacity-100">
                              →
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button href={site.contact} size="sm" reveal={false} className="hidden sm:inline-flex">
              Contact us
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-[10px] bg-mist lg:hidden"
            >
              <span className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <div
          className={`mx-auto mt-2 max-w-[1280px] overflow-hidden rounded-[12px] border border-line bg-white transition-all duration-700 ease-(--ease-out-expo) lg:hidden ${
            open ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <ul className="max-h-[calc(80vh-2px)] overflow-y-auto p-3">
            {nav.map((item) => (
              <li key={item.label} className="border-b border-line/70 last:border-0">
                <a href={item.href} className="block px-3 py-3.5 font-display text-lg font-medium">
                  {item.label}
                </a>
                {item.children && (
                  <ul className="pb-3 pl-3">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <a href={c.href} className="block px-3 py-1.5 text-[15px] text-muted">
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="p-3 pt-4">
              <Button href={site.contact} reveal={false} className="w-full justify-between">
                Contact us
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
