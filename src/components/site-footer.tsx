import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:px-6">
        <span>© 2026 {profile.name}</span>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
          github.com/{profile.githubLogin}
        </a>
      </div>
    </footer>
  );
}
