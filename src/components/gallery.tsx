"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Shot } from "@/components/shot";
import type { Screenshot } from "@/data/projects";

export function Gallery({ shots }: { shots: Screenshot[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = open ? shots[index] : null;

  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const [first, ...rest] = shots;

  return (
    <>
      <button type="button" className="block w-full cursor-zoom-in text-left" onClick={() => setIndex(0)}>
        <Shot shot={first} priority sizes="(min-width: 1024px) 1000px, 100vw" />
        <span className="mt-2 block text-sm text-muted-foreground">{first.caption}</span>
      </button>

      {rest.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {rest.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className="block cursor-zoom-in text-left"
              onClick={() => setIndex(i + 1)}
            >
              <Shot shot={s} sizes="(min-width: 1024px) 320px, 50vw" />
              <span className="mt-1.5 line-clamp-2 block text-xs text-muted-foreground">{s.caption}</span>
            </button>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-[calc(100%-1rem)] gap-3 p-3 sm:max-w-[min(96vw,1400px)]">
          {current && (
            <>
              <div className="relative flex max-h-[78vh] items-center justify-center">
                <Image
                  src={current.src}
                  alt={current.caption}
                  width={current.width}
                  height={current.height}
                  className="h-auto max-h-[78vh] w-auto max-w-full rounded-md"
                />
              </div>
              <div className="flex items-center justify-between gap-3 pr-1">
                <DialogTitle className="text-sm font-normal text-muted-foreground">
                  {current.caption}
                  <span className="ml-2 tabular-nums">
                    {index! + 1} / {shots.length}
                  </span>
                </DialogTitle>
                {shots.length > 1 && (
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon-sm" aria-label="Предыдущий" onClick={() => step(-1)}>
                      <ChevronLeftIcon />
                    </Button>
                    <Button variant="outline" size="icon-sm" aria-label="Следующий" onClick={() => step(1)}>
                      <ChevronRightIcon />
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
