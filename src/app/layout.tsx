import type { Metadata } from "next";

import { AmbientBackground } from "@/components/layout/ambient-background";
import { AppProviders } from "@/components/layout/app-providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Arcana Noctis | 夜谕塔罗",
    template: "%s | Arcana Noctis",
  },
  description: "沉浸式塔罗 Web 应用，在深色星幕与仪式感流程中领取你的专属讯号。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">
        <AppProviders>
          <AmbientBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
