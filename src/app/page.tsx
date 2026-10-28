import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectsGrid } from "@/components/projects-grid";
import { ActivityGraph } from "@/components/activity-graph";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { activityTotals } from "@/data/activity";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <section className="py-16 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{profile.role}</p>
        <div className="mt-6 max-w-2xl space-y-3 leading-relaxed">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <a href="#projects" className={buttonVariants({ size: "lg", className: "px-4" })}>
            Смотреть проекты
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg", className: "px-4" })}
          >
            <GithubIcon />
            GitHub
          </a>
        </div>
      </section>

      <Separator />

      <section id="projects" className="scroll-mt-20 py-16">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Проекты</h2>
          <span className="text-sm text-muted-foreground tabular-nums">{projects.length}</span>
        </div>
        <ProjectsGrid projects={projects} />
      </section>

      <Separator />

      <section id="about" className="scroll-mt-20 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Обо мне</h2>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">Опыт</h3>
            <ol className="mt-6 space-y-10 border-l pl-6">
              {profile.experience.map((e) => (
                <li key={e.role} className="relative">
                  <span className="absolute top-2 -left-[29px] size-2 rounded-full bg-foreground" aria-hidden="true" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <p className="font-medium">{e.role}</p>
                      {e.place && (
                        <p className="text-muted-foreground">
                          {e.slug ? (
                            <Link href={`/projects/${e.slug}/`} className="underline-offset-4 hover:underline">
                              {e.place}
                            </Link>
                          ) : (
                            e.place
                          )}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{e.period}</span>
                  </div>
                  {e.summary && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.summary}</p>}
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed marker:text-muted-foreground">
                    {e.points.map((pt) => (
                      <li key={pt.text}>
                        {pt.title && (
                          <>
                            {pt.slug ? (
                              <Link href={`/projects/${pt.slug}/`} className="font-medium underline-offset-4 hover:underline">
                                {pt.title}
                              </Link>
                            ) : (
                              <span className="font-medium">{pt.title}</span>
                            )}
                            {" — "}
                          </>
                        )}
                        {pt.text}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Навыки</h3>
            {profile.stack.map((g) => (
              <div key={g.group}>
                <h3 className="mb-2 text-sm text-muted-foreground">{g.group}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <Badge key={i} variant="outline">
                      {i}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <dl className="grid max-w-xl grid-cols-3 gap-4">
            <div>
              <dt className="text-sm text-muted-foreground">Коммитов</dt>
              <dd className="text-2xl font-semibold tabular-nums">{activityTotals.commits.toLocaleString("ru-RU")}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Дней с коммитами</dt>
              <dd className="text-2xl font-semibold tabular-nums">{activityTotals.activeDays}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Проектов в портфолио</dt>
              <dd className="text-2xl font-semibold tabular-nums">{projects.length}</dd>
            </div>
          </dl>
          <p className="mt-6 mb-3 text-sm text-muted-foreground">Коммиты по дням, апрель – октябрь 2026</p>
          <ActivityGraph />
        </div>
      </section>

      <Separator />

      <section id="contact" className="scroll-mt-20 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Контакты</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Код большинства проектов закрыт, могу показать на созвоне. Публичные репозитории — на GitHub.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg", className: "px-4" })}
          >
            <GithubIcon />
            github.com/{profile.githubLogin}
          </a>
        </div>
      </section>
    </div>
  );
}
