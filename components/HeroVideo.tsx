"use client";

import { useState } from "react";

/** Original homepage background film (YouTube, 1s–70s loop), faded in once it is actually playing. */
export default function HeroVideo({ id }: { id: string }) {
  const [ready, setReady] = useState(false);
  const src =
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1` +
    `&playlist=${id}&start=1&end=70&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`;

  return (
    <iframe
      src={src}
      title="MatriQx background film"
      aria-hidden
      tabIndex={-1}
      allow="autoplay; encrypted-media"
      onLoad={() => setTimeout(() => setReady(true), 1800)}
      className={`video-cover transition-opacity duration-[2000ms] ${ready ? "opacity-70" : "opacity-0"}`}
    />
  );
}
