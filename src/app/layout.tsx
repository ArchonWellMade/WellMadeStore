import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import { SiteHeader } from "@/frontend/components/site/site-header";
import { SiteFooter } from "@/frontend/components/site/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WellMadeStore — RC cars, drones, planes & more",
    template: "%s | WellMadeStore",
  },
  description:
    "Premium RC vehicles, drones, and parts for hobbyists. Cars, motorcycles, planes, boats, helicopters, and our signature flying RC swords.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
