"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MoonStar, Volume2, VolumeX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { brand, navigationItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { usePreferencesStore } from "@/stores/preferences-store";

export function SiteHeader() {
  const pathname = usePathname();
  const soundEnabled = usePreferencesStore((state) => state.soundEnabled);
  const toggleSound = usePreferencesStore((state) => state.toggleSound);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/20 px-4 py-3 shadow-[0_12px_48px_rgba(3,5,14,0.45)] backdrop-blur-2xl md:px-5">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <div className="flex size-10 items-center justify-center rounded-full border border-[color:var(--color-accent-gold)]/25 bg-[color:var(--color-accent-gold)]/10 text-[color:var(--color-accent-gold)]">
            <MoonStar className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="truncate font-serif text-lg tracking-[0.18em] text-white">
              {brand.name}
            </div>
            <div className="truncate text-xs tracking-[0.28em] text-[color:var(--color-muted)]">
              {brand.subName}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                className={cn(
                  "rounded-full px-4 py-2 text-sm text-[color:var(--color-muted)] transition-colors hover:text-white",
                  active && "bg-white/8 text-white",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            aria-label={soundEnabled ? "关闭环境音" : "开启环境音"}
            onClick={toggleSound}
            size="icon"
            type="button"
            variant="secondary"
          >
            {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" type="button" variant="secondary">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" title="导航">
              <div className="flex items-center gap-3">
                <Badge variant="accent">Mystical Dark</Badge>
                <span className="text-sm text-[color:var(--color-muted)]">
                  沉浸式主风格已开启
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <Link
                    className={cn(
                      "rounded-2xl border border-transparent px-4 py-3 text-sm text-[color:var(--color-muted)] transition-colors hover:border-white/10 hover:bg-white/6 hover:text-white",
                      pathname === item.href && "border-white/10 bg-white/6 text-white",
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
