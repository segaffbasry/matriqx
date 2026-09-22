import Image from "next/image";
import { cta, insights } from "@/lib/content";
import { Arrow, Badge, Button, Words } from "./ui";
import WaveField from "./WaveField";

export default function Insights() {
  return (
    <>
      <section id="insights" className="px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <Badge plain>{insights.eyebrow}</Badge>
              <h2
                data-split
                className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
              >
                <Words text="Innovation Powered by" /> <Words text="Intelligence" className="text-brand" />
              </h2>
            </div>
          </div>

          <div data-stagger className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {insights.posts.map((p) => (
              <a key={p.href} href={p.href} data-reveal className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-mist">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-(--ease-out-expo) group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-brand/0 transition-colors duration-700 group-hover:bg-brand/20" />
                  <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-[10px] bg-white text-ink opacity-0 transition-all duration-700 ease-(--ease-out-expo) group-hover:translate-y-0 group-hover:opacity-100">
                    <Arrow />
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.015em]">
                  <span className="ulink bg-bottom pb-0.5">{p.title}</span>
                </h3>
                <span className="mt-auto flex items-center gap-2 pt-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {insights.cta}
                  <Arrow className="transition-transform duration-700 ease-(--ease-out-expo) group-hover:translate-x-1.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="relative isolate overflow-hidden rounded-[24px] bg-[linear-gradient(100deg,#63b6f7_0%,#3d8ce2_42%,#1d5cb4_78%,#0f3f86_100%)] px-6 py-20 text-white sm:px-12 lg:px-20 lg:py-28">
          <WaveField className="-z-10" />
          {/* Keep the copy legible over the brightest crests */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_30%_50%,rgba(15,63,134,0.35),transparent_70%)]" />
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[auto_1fr_auto] lg:gap-14">
            <div data-reveal className="relative grid size-28 place-items-center rounded-[18px] bg-ink shadow-[0_30px_60px_-20px_rgba(1,15,49,0.6)] lg:size-36">
              <Image
                src={cta.image}
                alt="mail call to action"
                width={1024}
                height={1024}
                sizes="144px"
                className="float h-auto w-[78%]"
              />
            </div>
            <h2
              data-split
              className="font-display text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[1] tracking-[-0.04em]"
            >
              <Words text="Start a Conversation" /> <Words text="Today." className="text-ink" />
            </h2>
            <div>
              <Button href={cta.button.href} variant="light" className="[--btn-fill:var(--color-ink)]">
                {cta.button.label}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
