import Image from "next/image";
import { cn } from "@/lib/utils";

// Монограмма TG: тёмный знак в светлой теме, светлый — в тёмной.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <Image src="/logo-dark.png" alt="" fill sizes="64px" className="object-contain dark:hidden" />
      <Image src="/logo-light.png" alt="" fill sizes="64px" className="hidden object-contain dark:block" />
    </span>
  );
}
