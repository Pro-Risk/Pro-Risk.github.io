import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gallery } from "@/components/gallery";
import { ShotPlaceholder } from "@/components/shot";
import { categories, getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const category = categories.find((c) => c.id === project.category)?.label;

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        Все проекты
      </Link>

      <header className="mt-8">
        <p className="text-sm text-muted-foreground">
          {category} · {project.period}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>
        {project.links && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-muted-foreground"
              >
                {l.label}
                <ExternalLinkIcon className="size-3.5" />
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="mt-10">
        {project.screenshots.length > 0 ? (
          <Gallery shots={project.screenshots} />
        ) : (
          <ShotPlaceholder title="Скриншотов пока нет" />
        )}
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-10">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">О проекте</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              {project.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight">Что сделано</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed marker:text-muted-foreground">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8 text-sm">
          <div>
            <h3 className="text-muted-foreground">Роль</h3>
            <p className="mt-1">{project.role}</p>
          </div>
          {project.stats && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="mt-0.5 text-lg font-semibold tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div>
            <h3 className="mb-2 text-muted-foreground">Стек</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          {project.note && <p className="text-muted-foreground">{project.note}</p>}
        </aside>
      </div>

      <Separator className="mt-16" />
      <nav className="mt-6 flex justify-between gap-4 text-sm">
        <Link href={`/projects/${prev.slug}/`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="size-4" />
          {prev.title}
        </Link>
        <Link href={`/projects/${next.slug}/`} className="inline-flex items-center gap-1.5 text-right text-muted-foreground hover:text-foreground">
          {next.title}
          <ArrowRightIcon className="size-4" />
        </Link>
      </nav>
    </article>
  );
}
