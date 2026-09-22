import Image from "next/image";
import { solutions } from "@/lib/content";
import { Arrow, Badge, Button, Words } from "./ui";

export default function Solutions() {
  return (
    <section id="solutions" className="px-5 pb-28 sm:px-8 lg:pb-36">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>{solutions.eyebrow}</Badge>
          <h2
            data-split
            className="mt-6 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            <Words text="Our" /> <Words text="Solutions" className="text-brand" />
          </h2>
        </div>

        <div data-stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {solutions.items.map((s, i) => (
            <a
              key={s.href}
              href={s.href}
              data-reveal
              className="group relative isolate flex aspect-[3/4] min-h-[460px] flex-col justify-end overflow-hidden rounded-[18px] bg-ink p-7 text-white md:aspect-auto md:h-[560px]"
            >
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(min-width:768px) 33vw, 100vw"
                className="-z-10 object-cover transition-transform duration-[1400ms] ease-(--ease-out-expo) group-hover:scale-110"
              />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,15,49,0)_25%,rgba(1,15,49,0.92)_100%)] transition-opacity duration-700" />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(195deg,rgba(8,106,216,0.75),rgba(1,15,49,0.95))] opacity-0 transition-opacity duration-700 ease-(--ease-out-expo) group-hover:opacity-100" />

              <span className="absolute left-7 top-7 rounded-md border border-white/25 bg-white/10 px-3 py-1 font-display text-xs font-medium backdrop-blur-md">
                0{i + 1}
              </span>
              <span className="absolute right-7 top-7 grid size-12 place-items-center rounded-[10px] bg-white text-ink transition-colors duration-700 ease-(--ease-out-expo) group-hover:bg-sky group-hover:text-white">
                <Arrow size={16} className="-rotate-45 transition-transform duration-700 ease-(--ease-out-expo) group-hover:rotate-0" />
              </span>

              <h3 className="font-display text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.03em]">
                {s.title[0]}
                <br />
                <span className="text-ice">{s.title[1]}</span>
              </h3>
              {/* Description rises into place on hover */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-(--ease-out-expo) group-hover:grid-rows-[1fr] max-md:grid-rows-[1fr]">
                <p className="overflow-hidden text-[15px] leading-relaxed text-white/80">
                  <span className="block pt-4">{s.text}</span>
                </p>
              </div>
            </a>
          ))}
        </div>

        <div data-reveal className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="text-[1.05rem] text-muted">{solutions.moreLead}</span>
          <Button href={solutions.more.href} reveal={false}>
            {solutions.more.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
