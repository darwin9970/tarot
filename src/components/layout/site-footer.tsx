import Link from "next/link";

import { brand, navigationItems } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="px-4 pb-10 pt-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(5,8,20,0.35)] backdrop-blur-xl md:grid-cols-[1.2fr_0.8fr] md:p-8">
        <div className="space-y-3">
          <p className="font-serif text-2xl tracking-[0.12em] text-white">
            {brand.name}
          </p>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--color-muted)]">
            你的问题不会被上传，塔罗记录将仅保留在本地设备。夜色提供的是一束安静的指引，而不是替你做决定的命令。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-[color:var(--color-muted)]">
          {navigationItems.map((item) => (
            <Link className="transition-colors hover:text-white" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
