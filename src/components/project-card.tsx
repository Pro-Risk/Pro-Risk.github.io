import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Shot, ShotPlaceholder } from "@/components/shot";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.screenshots[0];
  return (
    <Link href={`/projects/${project.slug}/`} className="group block">
      {cover ? (
        <Shot shot={cover} className="transition-opacity group-hover:opacity-90" />
      ) : (
        <ShotPlaceholder title={project.title} />
      )}
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-medium group-hover:underline group-hover:underline-offset-4">{project.title}</h3>
        <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <Badge key={s} variant="secondary">
            {s}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
