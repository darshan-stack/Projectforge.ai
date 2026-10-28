"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Filter,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Sun,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { projects, domains, type Project } from "@/lib/projects";
import { getWhatsAppHref, siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 font-semibold tracking-tight"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-[#315efb] text-sm font-black text-white">
        P
      </span>
      <span className="text-[15px] text-[#172033]">
        ProjectForge <span className="text-[#1769aa]">AI</span>
      </span>
    </Link>
  );
}

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("projectforge-theme");
    const nextIsLight = savedTheme === "light";
    setIsLight(nextIsLight);
    document.documentElement.classList.toggle("light", nextIsLight);
  }, []);

  function toggleTheme() {
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);
    document.documentElement.classList.toggle("light", nextIsLight);
    window.localStorage.setItem("projectforge-theme", nextIsLight ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className="rounded-full border-white/15 bg-transparent text-slate-300 hover:border-white/40 hover:bg-white/[0.06] hover:text-white"
    >
      {isLight ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </Button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const items = [
    ["Projects", "#projects"],
    ["Academic levels", "#levels"],
    ["Research", "#research"],
    ["How it works", "#process"],
    ["About", "#about"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dfe4ec]/80 bg-[#f7f8fb]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 lg:flex">
          {items.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={siteConfig.phoneHref}
            className="hidden text-sm text-slate-600 xl:block"
          >
            {siteConfig.phoneDisplay}
          </a>
          <Button asChild className="hidden rounded-full bg-white px-4 text-slate-950 hover:bg-zinc-200 sm:inline-flex">
            <a href="#contact">
              Explore projects <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-slate-700 lg:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-5 border-t border-[#dfe4ec] px-5 py-6 lg:hidden">
          {items.map(([label, href]) => (
            <a
              onClick={() => setOpen(false)}
              key={href}
              href={href}
              className="text-sm text-slate-700"
            >
              {label}
            </a>
          ))}
          <Button asChild className="w-fit rounded-full bg-white text-slate-950 hover:bg-zinc-200">
            <a href="#contact">Explore projects</a>
          </Button>
        </nav>
      )}
    </header>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card group overflow-hidden border border-[#d6dbe3] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#1d4ed8]">
      <div className="relative h-48 overflow-hidden bg-[#e8edf3]">
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#111827]/80 to-transparent px-5 pb-4 pt-12">
          <span className="text-xs font-medium text-white">
            {project.domain}
          </span>
          <span className="text-xs text-white/80">{project.difficulty}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#1769aa]">
            {project.eyebrow}
          </p>
          <h3 className="text-lg font-semibold text-[#172033]">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#eef2f7] px-2 py-1 text-[11px] text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-[#dfe4ec] pt-4">
          <span className="text-sm text-slate-700">{project.price}</span>
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-semibold text-[#172033] transition group-hover:text-[#315efb]"
          >
            View details <ArrowUpRight className="ml-1 inline size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function TypingHeroLine() {
  const fullText = "Your next big project starts here.";
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setText(fullText.slice(0, index));
      if (index === fullText.length) window.clearInterval(timer);
    }, 58);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      {text || "\u00a0"}
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.82em] w-px translate-y-[0.08em] bg-[#315efb] align-baseline motion-safe:animate-pulse"
      />
    </>
  );
}

function AcademicTracks() {
  const tracks = [
    {
      level: "ME / MTech",
      title: "Research-grade systems",
      copy: "Reproducible experiments, evaluation plans, and implementation support for postgraduate work.",
      tags: ["RAG", "MLOps", "Computer Vision"],
      icon: "02",
    },
    {
      level: "PhD / Research",
      title: "MCP + LLM research lab",
      copy: "Design tool-using AI systems with MCP servers, retrieval, agents, and measurable methodology.",
      tags: ["MCP", "LLM evaluation", "Research"],
      icon: "04",
    },
  ];
  return (
    <section
      id="levels"
      className="theme-surface relative overflow-hidden border-y border-white/10 bg-[#090d14] px-5 py-20 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,.16),transparent_34%),radial-gradient(circle_at_90%_70%,rgba(124,58,237,.13),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Built for serious academic work
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Choose a track that matches your ambition.
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            A clear starting point for implementation projects, postgraduate
            research, and emerging LLM systems. Every scope is reviewed before
            work begins.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {tracks.map((track) => (
            <article
              key={track.level}
              className="group relative overflow-hidden border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.07] sm:p-8"
            >
              <span className="absolute right-5 top-4 font-mono text-6xl font-bold text-white/[0.05]">
                {track.icon}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                {track.level}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {track.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
                {track.copy}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {track.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 px-2.5 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={getWhatsAppHref(
                  track.title,
                  track.level,
                  "project consultation",
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:text-cyan-300"
              >
                Discuss this track <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutServices() {
  const services = [
    {
      title: "Technical blog writing",
      copy: "Clear, well-structured articles that explain engineering ideas, experiments, and implementation choices for a technical audience.",
      tag: "Technical communication",
    },
    {
      title: "Project synopsis writing",
      copy: "A concise project brief covering the problem, objectives, scope, methodology, modules, and expected outcomes.",
      tag: "Synopsis support",
    },
    {
      title: "Research paper support",
      copy: "Literature mapping, methodology writing, experiment documentation, and IEEE-style editing with transparent academic guidance.",
      tag: "Research support",
    },
  ];
  return (
    <>
      <section
        id="research"
        className="theme-surface order-6 border-y border-white/10 bg-[#0b111c] px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Research & writing studio
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Turn complex work into clear technical communication.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
              Get structured support for documentation and research
              communication while keeping ownership of your ideas, validation,
              and final academic submission.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/50"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {service.tag}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {service.copy}
                </p>
                <a
                  href={getWhatsAppHref(
                    service.title,
                    "ME / MTech or PhD",
                    "service inquiry",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-sm font-semibold text-white hover:text-cyan-300"
                >
                  Discuss service <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="about"
        className="order-7 bg-[#f7f8fb] px-5 py-20 text-[#172033] lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1769aa]">
              About ProjectForge AI
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              A practical partner for ambitious student builders.
            </h2>
          </div>
          <div className="text-sm leading-7 text-slate-600">
            <p>
              ProjectForge AI brings project scoping, implementation guidance,
              technical documentation, and research support into one clear
              workflow for diploma, BE/BTech, ME/MTech, and PhD teams.
            </p>
            <p className="mt-4">
              We focus on honest scope, reproducible work, and useful handover.
              You should understand, test, and present your work independently;
              we do not promise grades, publication acceptance, or unverified
              results.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Marketplace() {
  const [activeDomain, setActiveDomain] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (activeDomain === "All" || p.domain === activeDomain) &&
          `${p.title} ${p.description} ${p.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [activeDomain, query],
  );
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8fb] text-[#172033]">
      <Nav />
      <main className="flex flex-col">
        <section className="hero-section relative px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-48">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-24 border-b border-[#d6dbe3] bg-[#eef3f8]" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border-l-2 border-[#1d4ed8] pl-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#075985]">
                Curated engineering projects
              </div>
              <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#172033] sm:text-6xl lg:text-7xl">
                <TypingHeroLine />
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Explore engineering projects, AI/ML innovations, research-ready
                implementations, and technical documentation tailored to your
                academic level.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-[#315efb] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#dbeafe]"
                >
                  Explore projects{" "}
                  <ArrowUpRight className="ml-1 inline size-4" />
                </a>
                <a
                  href={getWhatsAppHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#cbd3df] px-5 py-3 text-sm font-semibold text-[#172033] transition hover:border-cyan-300/50 hover:bg-white/[0.05]"
                >
                  Discuss your idea{" "}
                  <MessageCircle className="ml-1 inline size-4" />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
                <span>
                  <ShieldCheck className="mr-1 inline size-4 text-[#1769aa]" />{" "}
                  Clear scope & deliverables
                </span>
                <span>
                  <Zap className="mr-1 inline size-4 text-[#1769aa]" />{" "}
                  Practical technical guidance
                </span>
              </div>
            </div>
            <div className="hero-visual relative overflow-hidden border border-[#cbd5e1] bg-[#0b1220] p-2 shadow-2xl shadow-blue-900/20">
              <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-cyan-300/20 via-blue-500/10 to-violet-400/20 blur-2xl" />
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/projects/ai-computer-lab.png"
                  alt="AI computer vision research workstation"
                  className="size-full object-cover opacity-90 transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      ProjectForge lab
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      AI systems, tested in practice
                    </p>
                  </div>
                  <span className="border border-white/20 bg-black/30 px-2 py-1 font-mono text-[10px] text-white/80">
                    LIVE PREVIEW
                  </span>
                </div>
              </div>
              <div className="relative rounded-2xl border border-white/15 bg-[#0b1a2c]/90 p-4 shadow-2xl shadow-blue-950/40">
                <div className="flex items-center justify-between border-b border-white/10 px-2 pb-4">
                  <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-rose-400" />
                    <span className="size-2 rounded-full bg-amber-300" />
                    <span className="size-2 rounded-full bg-emerald-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    project / explorer
                  </span>
                </div>
                <div className="grid grid-cols-[.65fr_1fr] gap-3 pt-4">
                  <div className="flex flex-col gap-2">
                    {[
                      "AI & ML",
                      "Computer Vision",
                      "Robotics",
                      "IoT Systems",
                    ].map((item, i) => (
                      <div
                        key={item}
                        className={`rounded-lg px-3 py-3 text-xs ${i === 0 ? "bg-cyan-300/15 text-[#1769aa]" : "text-slate-500"}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#1769aa]">
                          Featured build
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          Edge AI Vision Inspection
                        </p>
                      </div>
                      <ArrowUpRight className="size-4 text-slate-500" />
                    </div>
                    <div className="relative h-28 overflow-hidden rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-700/20">
                      <div className="absolute inset-4 rounded border border-cyan-300/40" />
                      <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200 bg-[#dbeafe]/20 shadow-[0_0_35px_#22d3ee]" />
                      <div className="absolute bottom-2 left-3 text-[10px] text-cyan-100">
                        inference pipeline / v1.0
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {["YOLOv8", "Python", "Edge AI"].map((t) => (
                        <span
                          key={t}
                          className="rounded bg-white/10 px-2 py-1 text-[10px] text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-y border-[#dfe4ec] bg-white/[0.02] px-5 py-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-white">
                01 / Build, don&apos;t just submit
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Understandable implementations with source and setup notes.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                02 / Document the thinking
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Synopsis, architecture, methodology, and presentation support.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                03 / Validate responsibly
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Clear evaluation plans instead of unverified performance claims.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                04 / Make it yours
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Scope and customize around your academic requirements.
              </p>
            </div>
          </div>
        </section>
        <section id="projects" className="order-3 px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1769aa]">
                  Curated catalog
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Start with a strong direction.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  Demonstration listings to help you explore possibilities.
                  Final scope, pricing, and deliverables are confirmed with you.
                </p>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 size-4 text-slate-500" />
                <input
                  aria-label="Search projects"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400/30"
                />
              </div>
            </div>
            <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
              <Button
                type="button"
                size="sm"
                variant={activeDomain === "All" ? "default" : "outline"}
                onClick={() => setActiveDomain("All")}
                aria-pressed={activeDomain === "All"}
                className={`whitespace-nowrap rounded-full ${activeDomain === "All" ? "border-white bg-white text-black hover:bg-zinc-200" : "border-white/10 bg-transparent text-muted-foreground hover:border-white/25 hover:bg-white/[0.05] hover:text-foreground"}`}
              >
                <Filter aria-hidden="true" /> All projects
              </Button>
              {domains.map((domain) => (
                <Button
                  key={domain}
                  type="button"
                  size="sm"
                  variant={activeDomain === domain ? "default" : "outline"}
                  onClick={() => setActiveDomain(domain)}
                  aria-pressed={activeDomain === domain}
                  className={`whitespace-nowrap rounded-full ${activeDomain === domain ? "border-white bg-white text-black hover:bg-zinc-200" : "border-white/10 bg-transparent text-muted-foreground hover:border-white/25 hover:bg-white/[0.05] hover:text-foreground"}`}
                >
                  {domain}
                </Button>
              ))}
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, 6).map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/15 py-16 text-center text-sm text-slate-500">
                No projects match that search yet. Try another direction.
              </div>
            )}
            <div className="mt-10 text-center">
              <Button asChild variant="link" className="text-sm font-semibold text-indigo-300 hover:text-white">
                <Link href="/projects">
                  View the full catalog <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section
          id="levels"
          className="theme-surface order-4 border-y border-[#dfe4ec] bg-[#091827] px-5 py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300">
                A clear starting point
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built around where you are.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "01",
                  "Diploma",
                  "Practical prototypes, embedded systems, and clear demonstration flows.",
                ],
                [
                  "02",
                  "BE / BTech",
                  "Final-year implementations with architecture, code, and viva guidance.",
                ],
                [
                  "03",
                  "ME / MTech",
                  "Research-oriented systems, experiments, and reproducibility support.",
                ],
                [
                  "04",
                  "PhD / Research",
                  "Literature mapping, methodology design, experiments, and technical implementation.",
                ],
              ].map(([n, title, copy]) => (
                <div key={title} className="border-t border-white/15 pt-5">
                  <span className="text-xs text-[#1769aa]">{n}</span>
                  <h3 className="mt-8 text-xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="order-5 contents">
          <AcademicTracks />
        </div>
        <section
          id="pricing"
          className="order-9 bg-[#f7f8fb] px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 border-b border-[#d6dbe3] pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1769aa]">
                  Straightforward project packages
                </p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] text-[#172033] sm:text-5xl">
                  Choose the right level of support.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                  Start with a defined scope, then add the guidance your
                  academic project actually needs. Final pricing is confirmed
                  after requirements are reviewed.
                </p>
              </div>
              <a
                href={getWhatsAppHref(
                  "Project consultation",
                  "Any academic level",
                  "pricing inquiry",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#172033] transition hover:text-[#315efb]"
              >
                Need a custom scope <ArrowUpRight />
              </a>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                {
                  name: "Project Starter",
                  price: "From ₹4,999",
                  copy: "A practical starting point for diploma and undergraduate implementations.",
                  items: [
                    "Project synopsis and scope",
                    "Core implementation guidance",
                    "Setup notes and walkthrough",
                  ],
                  featured: false,
                },
                {
                  name: "Research Build",
                  price: "From ₹14,999",
                  copy: "A stronger package for BE/BTech and ME/MTech systems with evaluation.",
                  items: [
                    "Architecture and module design",
                    "Source code with setup guidance",
                    "Evaluation plan and documentation",
                  ],
                  featured: true,
                },
                {
                  name: "Research Lab",
                  price: "Custom quote",
                  copy: "For PhD scholars and teams building reproducible research systems.",
                  items: [
                    "Methodology and experiment design",
                    "MCP, LLM, or domain implementation",
                    "Reproducibility and presentation support",
                  ],
                  featured: false,
                },
              ].map((plan) => (
                <article
                  key={plan.name}
                  className={`relative flex flex-col border p-6 sm:p-8 ${plan.featured ? "theme-surface border-[#315efb] bg-[#0b1220] text-white shadow-[0_20px_50px_rgba(37,99,235,.16)]" : "border-[#d6dbe3] bg-white text-[#172033]"}`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-6 bg-[#315efb] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                      Most requested
                    </span>
                  )}
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${plan.featured ? "text-cyan-300" : "text-[#1769aa]"}`}
                  >
                    {plan.name}
                  </p>
                  <p className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                    {plan.price}
                  </p>
                  <p
                    className={`mt-3 min-h-14 text-sm leading-6 ${plan.featured ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {plan.copy}
                  </p>
                  <ul className="mt-6 flex flex-col gap-3 border-t border-current/10 pt-6">
                    {plan.items.map((item) => (
                      <li
                        key={item}
                        className={`text-sm ${plan.featured ? "text-slate-200" : "text-slate-700"}`}
                      >
                        <span
                          className={`mr-2 ${plan.featured ? "text-cyan-300" : "text-[#315efb]"}`}
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={getWhatsAppHref(
                      plan.name,
                      "Any academic level",
                      "pricing inquiry",
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-8 inline-flex items-center justify-center gap-2 border px-4 py-3 text-sm font-semibold transition ${plan.featured ? "border-cyan-300/40 text-white hover:bg-white/10" : "border-[#cbd3df] text-[#172033] hover:border-[#315efb] hover:bg-[#eef3ff]"}`}
                  >
                    Discuss this package <ArrowUpRight />
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Demonstration pricing only. Scope, deliverables, timeline, and
              payment terms are confirmed before work begins. No guaranteed
              grades, publication acceptance, or unverified results.
            </p>
          </div>
        </section>
        <section id="research" className="px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1769aa]">
                Research & documentation
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                The technical story matters.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                From synopsis preparation to reproducible experiments, get
                support that helps you understand, explain, and validate your
                work. We do not promise journal acceptance or fabricate results.
              </p>
              <a
                href={getWhatsAppHref(
                  "a research project",
                  "postgraduate study",
                  "research consultation",
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-block text-sm font-semibold text-[#1769aa]"
              >
                Talk through your methodology{" "}
                <ArrowUpRight className="ml-1 inline size-4" />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Project synopsis preparation",
                "System design documentation",
                "Literature review assistance",
                "Research methodology design",
                "Experiment implementation",
                "IEEE-style editing & formatting",
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-700"
                >
                  <span className="grid size-7 place-items-center rounded-lg bg-cyan-300/10 text-xs text-[#1769aa]">
                    0{i + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="process"
          className="theme-surface order-8 bg-gradient-to-br from-blue-600/20 via-[#0b1a2c] to-violet-600/20 px-5 py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1769aa]">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A more thoughtful project process.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-4">
              {[
                [
                  "01",
                  "Browse or share",
                  "Explore a direction or send us your own idea.",
                ],
                [
                  "02",
                  "Define the scope",
                  "Align on level, requirements, deliverables, and timeline.",
                ],
                [
                  "03",
                  "Review the quote",
                  "Confirm the quotation and payment terms before work begins.",
                ],
                [
                  "04",
                  "Build & guide",
                  "Receive the agreed deliverables with technical guidance.",
                ],
              ].map(([n, t, c]) => (
                <div key={n}>
                  <span className="text-xs text-[#1769aa]">{n}</span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="order-10 px-5 py-24 text-center lg:px-8">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1769aa]">
              Your move
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Have a project idea? Let&apos;s build it.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-600">
              Tell us your academic level, domain, deadline, and requirements.
              Get a clear project scope and a customized quotation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-white px-5 text-black hover:bg-zinc-200">
                <Link href="/projects">Explore projects</Link>
              </Button>
              <Button asChild size="lg" className="rounded-full bg-emerald-500 px-5 text-emerald-950 hover:bg-emerald-400">
                <a href={getWhatsAppHref()} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
        <AboutServices />
      </main>
      <a
        aria-label="Contact ProjectForge AI on WhatsApp"
        href={getWhatsAppHref()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-slate-950 shadow-lg shadow-emerald-950/40 transition hover:scale-105"
      >
        <MessageCircle />
      </a>
      <footer className="border-t border-[#dfe4ec] px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <span>
            © 2026 ProjectForge AI. Educational technology support, thoughtfully
            delivered.
          </span>
          <span>
            Students remain responsible for understanding and presenting their
            work.
          </span>
        </div>
      </footer>
    </div>
  );
}
