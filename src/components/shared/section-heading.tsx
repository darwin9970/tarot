import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <Badge variant="accent">{eyebrow}</Badge>
      <div className="space-y-3">
        <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted)] sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
