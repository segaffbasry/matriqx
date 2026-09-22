import Image from "next/image";
import { hero, services } from "@/lib/content";
import { Arrow, Badge, Button, Rich, Words } from "./ui";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <>
      <section id="top" data-hero className="relative isolate overflow-hidden bg-ink text-white">
        <div data-hero-media className="absolute inset-0 -z-10">
          <Image
            src="/images/bg-overlay.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
          <HeroVideo id={hero.video} />
        </div>
        {/* Legibility wash + brand glow */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,15,49,0.55)_0%,rgba(1,15,49,0.25)_40%,rgba(1,15,49,0.9)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_20%,rgba(8,106,216,0.35),transparent_70%)]" />
        <div className="grid-lines pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto flex min-h-[100svh] max-w-[1280px] flex-col justify-center px-5 pb-56 pt-40 sm:px-8 lg:pb-64 lg:pt-48">
          <div data-stagger data-delay="0.1">
            <Badge dark>{hero.eyebrow}</Badge>
          </div>

          <h1
            data-split
            className="mt-7 max-w-[1080px] font-display text-[clamp(2.5rem,6.4vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            <Words text={hero.titleLead} />
            <Words text={hero.titleTail} className="text-white/45" />
          </h1>

          <div data-stagger data-delay="0.9" className="mt-9 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <p data-reveal className="max-w-[560px] text-[1.075rem] leading-relaxed text-white/70 [&_strong]:text-white">
              <Rich parts={hero.body} />
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={hero.primary.href} variant="light">
                {hero.primary.label}
              </Button>
              <Button href={hero.secondary.href} variant="ghost">
                {hero.secondary.label}
              </Button>
            </div>
          </div>
        </div>

        <a
          href="#services"
          aria-label="Scroll to content"
          className="absolute bottom-40 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <span className="mouse block" />
        </a>
      </section>

      {/* Service cards overlap the hero's lower edge */}
      <section id="services" className="relative z-10 -mt-32 px-5 sm:px-8 lg:-mt-36">
        <div data-stagger className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <a
              key={s.cta + i}
              href={s.href}
              data-reveal
              className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[18px] border border-line/70 bg-white p-7 shadow-(--shadow-card) transition-[transform,box-shadow] duration-700 ease-(--ease-out-expo) hover:-translate-y-2 hover:shadow-(--shadow-lift)"
            >
              {/* Brand fill blooms from the icon on hover */}
              <span
                aria-hidden
                className="absolute left-7 top-7 -z-0 size-14 scale-0 rounded-full bg-(image:--gradient-brand) transition-transform duration-[900ms] ease-(--ease-out-expo) group-hover:scale-[16]"
              />
              <span className="relative flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-xl bg-mist transition-colors duration-700 group-hover:bg-white/15">
                  <Image
                    src={s.icon}
                    alt=""
                    width={50}
                    height={50}
                    className="size-8 transition-[transform,filter] duration-700 ease-(--ease-out-expo) group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                  />
                </span>
                <span className="font-display text-sm font-medium text-soft transition-colors duration-700 group-hover:text-white/60">
                  0{i + 1}
                </span>
              </span>
              <h3 className="relative mt-12 font-display text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.02em] transition-colors duration-700 group-hover:text-white">
                {s.title.join(" ")}
              </h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-muted transition-colors duration-700 group-hover:text-white/80">
                {s.text}
              </p>
              <span className="relative mt-auto flex items-center gap-2 pt-7 text-[14px] font-semibold text-brand transition-colors duration-700 group-hover:text-white">
                <span className="ulink">{s.cta}</span>
                <Arrow className="transition-transform duration-700 ease-(--ease-out-expo) group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
