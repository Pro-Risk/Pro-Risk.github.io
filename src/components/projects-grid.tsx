"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/project-card";
import { categories, type Project } from "@/data/projects";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <Tabs value={filter} onValueChange={(v) => setFilter(String(v))}>
        <div className="-mx-4 overflow-x-auto overflow-y-hidden px-4 py-0.5 sm:mx-0 sm:px-0">
          <TabsList>
            {categories.map((c) => (
              <TabsTrigger key={c.id} value={c.id} className="px-3">
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
      <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
