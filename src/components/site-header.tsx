import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <Logo className="size-7" />
          <span>{profile.name}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/#projects" className="hover:text-foreground">
            Проекты
          </Link>
          <Link href="/#about" className="hidden hover:text-foreground sm:inline">
            Обо мне
          </Link>
          <Link href="/#contact" className="hover:text-foreground">
            Контакты
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
