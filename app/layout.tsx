import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { posthogSnippet } from "@/lib/posthog";

const jost = localFont({
  src: "./fonts/jost-var.woff2",
  variable: "--font-jost",
  weight: "300 800",
  display: "swap",
});

const barlow = localFont({
  src: [
    { path: "./fonts/barlow-300.woff2", weight: "300" },
    { path: "./fonts/barlow-400.woff2", weight: "400" },
    { path: "./fonts/barlow-500.woff2", weight: "500" },
    { path: "./fonts/barlow-600.woff2", weight: "600" },
    { path: "./fonts/barlow-700.woff2", weight: "700" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.matriqx.com"),
  // Private prospect demo: keep it out of search engines.
  robots: { index: false, follow: false },
  title: "Home - MatriQx",
  description:
    "Unlocking the full value of scientific data with AI, automation, and federated intelligence.",
  openGraph: {
    title: "Home - MatriQx",
    description:
      "Unlocking the full value of scientific data with AI, automation, and federated intelligence.",
    images: ["/images/precision.png"],
    siteName: "MatriQx",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={`${jost.variable} ${barlow.variable}`}>
      <head>
        {/* Flag JS early so reveal targets start hidden without a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
