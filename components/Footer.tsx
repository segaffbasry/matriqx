import Image from "next/image";
import { footer, site } from "@/lib/content";
import { Arrow, Icon } from "./ui";

export default function Footer() {
  return (
    <footer className="bg-white px-5 pt-24 sm:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div data-stagger className="grid gap-14 border-b border-line pb-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div data-reveal>
            <Image src="/brand/logo1.png" alt="MatriQx" width={432} height={85} className="h-9 w-auto" />
            <p className="mt-6 max-w-sm leading-relaxed text-muted">{footer.blurb}</p>
            <a href={footer.learnMore.href} className="group mt-6 inline-flex items-center gap-2 font-semibold text-brand">
              <span className="ulink">{footer.learnMore.label}</span>
              <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>

          {footer.columns.map((c) => (
            <div key={c.title} data-reveal>
              <h4 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-soft">{c.title}</h4>
              <ul className="mt-6 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group inline-flex items-center text-[15px] text-ink/80 transition-colors hover:text-brand">
                      <span className="h-px w-0 bg-brand transition-all duration-500 ease-(--ease-out-expo) group-hover:mr-2 group-hover:w-3" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div data-reveal>
            <h4 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-soft">{footer.contactTitle}</h4>
            <ul className="mt-6 space-y-4 text-[15px] text-ink/80">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-brand">
                  <span className="grid size-9 flex-none place-items-center rounded-[10px] bg-mist text-brand">{Icon.mail}</span>
                  <span className="ulink">{site.email}</span>
                </a>
              </li>
              <li>
                <a href={site.mapUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 transition-colors hover:text-brand">
                  <span className="grid size-9 flex-none place-items-center rounded-[10px] bg-mist text-brand">{Icon.pin}</span>
                  <span className="pt-1.5 leading-relaxed">{site.address}</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {[
                { href: site.linkedin, label: "LinkedIn", icon: Icon.linkedin },
                { href: site.youtube, label: "YouTube", icon: Icon.youtube },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-[10px] border border-line text-ink transition-all duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 pb-10 text-[14px] text-muted sm:flex-row">
          <p>{footer.copyright}</p>
          <a href="#top" aria-label="Back to top" className="group">
            <span className="grid size-10 place-items-center rounded-[10px] bg-ink text-white transition-transform duration-500 ease-(--ease-out-expo) group-hover:-translate-y-1">
              <Arrow className="-rotate-90" />
            </span>
          </a>
        </div>
      </div>

    </footer>
  );
}
