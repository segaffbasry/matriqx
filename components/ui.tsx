import type { CSSProperties, ReactNode } from "react";

/** Renders text as per-word masks so GSAP can lift each word into view. */
export function Words({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((p, i) =>
        /^\s+$/.test(p) ? (
          " "
        ) : p ? (
          <span key={i} className="w">
            <span className={`w-i ${className ?? ""}`}>{p}</span>
          </span>
        ) : null,
      )}
    </>
  );
}

export function Badge({
  children,
  dark,
  plain,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  /** Long eyebrows read better as a line than a pill. */
  plain?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`badge ${dark ? "badge--dark" : ""} ${plain ? "badge--plain" : ""} ${className}`}
      data-reveal
    >
      <span className="badge-dot" aria-hidden />
      <span>{children}</span>
    </span>
  );
}

export function Arrow({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="ch" style={{ "--i": i } as CSSProperties}>
          {c === " " ? "\u00a0" : c}
        </span>
      ))}
    </>
  );
}

export function Button({
  href,
  children,
  variant = "dark",
  size,
  className = "",
  reveal = true,
}: {
  href: string;
  children: string;
  variant?: "dark" | "light" | "ghost";
  size?: "sm";
  className?: string;
  reveal?: boolean;
}) {
  const v = variant === "light" ? "btn--light" : variant === "ghost" ? "btn--ghost" : "";
  return (
    <a
      href={href}
      aria-label={children}
      className={`btn ${v} ${size === "sm" ? "btn--sm" : ""} ${className}`}
      {...(reveal ? { "data-reveal": "" } : {})}
    >
      <span className="btn-fill" aria-hidden />
      <span className="btn-inner" aria-hidden>
        <span className="btn-label">
          <span className="btn-row">
            <Chars text={children} />
          </span>
          <span className="btn-row">
            <Chars text={children} />
          </span>
        </span>
        <span className="btn-chip">
          <Arrow />
          <Arrow />
        </span>
      </span>
    </a>
  );
}

export function Rich({ parts }: { parts: [string, boolean][] }) {
  return (
    <>
      {parts.map(([t, b], i) =>
        b ? (
          <strong key={i} className="font-semibold text-current">
            {t}
          </strong>
        ) : (
          <span key={i}>{t}</span>
        ),
      )}
    </>
  );
}

export const Icon = {
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9z" />
    </svg>
  ),
  youtube: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12z" />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  chevron: (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};
