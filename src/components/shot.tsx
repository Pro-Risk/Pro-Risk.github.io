import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/data/projects";

// Превью скриншота в рамке фиксированной пропорции.
// Широкие кадры обрезаются сверху вниз, вертикальные (мобильные) вписываются целиком.
export function Shot({
  shot,
  className,
  sizes,
  priority,
}: {
  shot: Screenshot;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const portrait = shot.height > shot.width;
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted", className)}>
      <Image
        src={shot.src}
        alt={shot.caption}
        fill
        sizes={sizes ?? "(min-width: 1024px) 480px, 100vw"}
        priority={priority}
        className={cn(portrait ? "object-contain p-2" : "object-cover object-top")}
      />
    </div>
  );
}

export function ShotPlaceholder({ title, className }: { title: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-[16/10] items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground",
        className,
      )}
    >
      {title}
    </div>
  );
}
