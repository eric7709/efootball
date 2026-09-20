import "./globals.css";

import type { Metadata } from "next";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "eFootball Competitive Platform",
  description: "Competitive identity, team and tournament management for eFootball players."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>;
}
