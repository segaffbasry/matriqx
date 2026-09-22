import Image from "next/image";
import { about, statement } from "@/lib/content";
import { Badge, Button, Rich, Words } from "./ui";

export default function About() {
  return (
    <>
      <section id="about" className="relative px-5 pb-24 pt-28 sm:px-8 lg:pb-32 lg:pt-40">
        <div className="mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Image composition */}
          <div className="relative order-2 lg:order-1">
            <Image
              src="/images/TECW0113.png"
              alt=""
              width={400}
              height={599}
              aria-hidden
              data-parallax="0.35"
              className="pointer-events-none absolute -left-16 -top-24 -z-10 w-72 opacity-70"
            />
            <div data-clip className="relative aspect-[4/4.4] overflow-hidden rounded-[18px] bg-ink">
              <Image
                src="/images/kCu0Ajr9iDMqtU6FJ0bwK.png"
                alt="Global network of scientific data"
                fill
                sizes="(min-width:1024px) 600px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(1,15,49,0.6))]" />
            </div>
            <div
              data-parallax="0.5"
              className="absolute -bottom-10 -right-4 w-[46%] sm:-right-10 lg:-right-14"
            >
              <div data-clip data-delay="0.25" className="float relative aspect-square overflow-hidden rounded-[16px] border-[6px] border-white bg-ink shadow-(--shadow-lift)">
                <Image
                  src="/images/data2-1.png"
                  alt="AI-driven laboratory"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Badge>{about.eyebrow}</Badge>
            <h2
              data-split
              className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            >
              <Words text={about.titleLead} />
              <Words text={about.titleAccent} className="text-brand" />
              <Words text={about.titleTail} className="text-ink/40" />
            </h2>
            <div data-stagger className="mt-8 space-y-5 text-[1.075rem] leading-relaxed text-muted [&_strong]:text-ink">
              <p data-reveal>
                <Rich parts={about.body1} />
              </p>
              <p data-reveal>{about.body2}</p>
              <div data-reveal className="pt-4">
                <Button href={about.cta.href}>{about.cta.label}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement: words brighten as they scroll through */}
      <section className="px-5 py-24 sm:px-8 lg:py-36">
        <h3
          data-scrub-words
          className="mx-auto max-w-[1100px] text-center font-display text-[clamp(1.9rem,4.6vw,4.2rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
        >
          {statement.split(" ").map((w, i) => (
            <span key={i}>
              <span
                className={`sw inline-block ${/AI|automation|federated|intelligence/i.test(w) ? "text-brand" : ""}`}
              >
                {w}
              </span>{" "}
            </span>
          ))}
        </h3>
      </section>
    </>
  );
}
