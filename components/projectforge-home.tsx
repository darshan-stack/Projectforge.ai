"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  FlaskConical,
  GraduationCap,
  Layers3,
  Menu,
  MessageCircle,
  Microscope,
  Orbit,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppHref } from "@/lib/config";
import { projects } from "@/lib/projects";

const featureItems = [
  {
    icon: Workflow,
    number: "01",
    title: "A clear path from idea to build",
    copy: "Turn a rough concept into a scoped project with modules, a practical workflow, and clear deliverables.",
  },
  {
    icon: Code2,
    number: "02",
    title: "Implementation you can explain",
    copy: "Build around understandable code, architecture notes, setup steps, and a demo you can confidently present.",
  },
  {
    icon: Microscope,
    number: "03",
    title: "Research with a method",
    copy: "Plan experiments, document decisions, compare baselines, and distinguish measured results from assumptions.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "No mystery deliverables",
    copy: "Align scope, timelines, and handover expectations before work begins. No grade or publication guarantees.",
  },
];

const workflow = [
  { icon: Search, number: "01", title: "Explore a direction", copy: "Browse example projects or bring your own idea, even if it is still rough." },
  { icon: Layers3, number: "02", title: "Shape the scope", copy: "Define your academic level, core modules, constraints, and what success should look like." },
  { icon: Code2, number: "03", title: "Build and understand", copy: "Work through implementation, documentation, and the important engineering decisions." },
  { icon: Rocket, number: "04", title: "Validate and present", copy: "Test the work, record evidence, and prepare a clear technical walkthrough." },
];

const levels = [
  { title: "Diploma", detail: "Practical prototypes, embedded systems, and focused demos.", icon: Cpu },
  { title: "BE / BTech", detail: "End-to-end builds with architecture, testing, and documentation.", icon: GraduationCap },
  { title: "ME / MTech", detail: "Deeper implementation, evaluation, and technical comparisons.", icon: FlaskConical },
  { title: "Research / PhD", detail: "Methodology, reproducibility, experiments, and research communication.", icon: BookOpen },
];

const questions = [
  { q: "Can I bring my own project idea?", a: "Yes. Share the problem, your academic level, required technologies, deadline, and any constraints. The scope can be shaped around your idea instead of starting from a catalog item." },
  { q: "Are all projects hardware-based?", a: "No. Project directions can be software-only, simulation-first, embedded/IoT, robotics, AI/ML, or a mix. Hardware requirements should be agreed before work starts." },
  { q: "Do you guarantee marks or publication?", a: "No. ProjectForge focuses on clear scope, implementation guidance, documentation, and responsible validation. Academic outcomes depend on your work, evaluation criteria, and institution." },
  { q: "Can I understand and present the implementation?", a: "That is a core goal. Scope and handover should include explanations, setup instructions, architecture, and a walkthrough appropriate to the agreed deliverables." },
];

const domainsPreview = [
  { name: "AI & ML", icon: Atom, summary: "Models, evaluation, and practical AI applications", stack: ["Python", "PyTorch", "Evaluation"] },
  { name: "Robotics", icon: Orbit, summary: "Autonomy, simulation, perception, and navigation", stack: ["ROS 2", "Gazebo", "SLAM"] },
  { name: "IoT & Embedded", icon: Cpu, summary: "Connected devices, firmware, and sensor systems", stack: ["ESP32", "MQTT", "Edge"] },
  { name: "Generative AI", icon: Sparkles, summary: "Grounded assistants and retrieval workflows", stack: ["LLMs", "RAG", "Vector search"] },
];

export function ProjectForgeHome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDomain, setActiveDomain] = useState("AI & ML");
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featuredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects
      .filter((project) => project.featured)
      .filter((project) => !normalized || `${project.title} ${project.description} ${project.domain} ${project.tags.join(" ")}`.toLowerCase().includes(normalized))
      .slice(0, 4);
  }, [query]);

  const activePreview = domainsPreview.find((item) => item.name === activeDomain) ?? domainsPreview[0];
  const navItems = [
    ["Explore", "#projects"],
    ["What you get", "#approach"],
    ["How it works", "#workflow"],
    ["FAQ", "#faq"],
  ];

  return (
    <main className="pf-home">
      <div className="pf-announcement">
        <span className="pf-announcement-label"><Sparkles size={13} /> PROJECTFORGE AI</span>
        <span>From ambitious idea to a project you can confidently explain.</span>
        <a href="#projects">Explore the catalog <ArrowRight size={13} /></a>
      </div>

      <header className="pf-header">
        <Link href="/" className="pf-brand" aria-label="ProjectForge AI home">
          <span className="pf-brand-mark"><span>P</span></span>
          <span>projectforge<span className="pf-brand-ai">.ai</span></span>
        </Link>
        <nav className="pf-desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="pf-header-actions">
          <a className="pf-header-contact" href={getWhatsAppHref("a project consultation", "my academic level", "general inquiry")} target="_blank" rel="noreferrer">Talk to us <ArrowUpRight size={14} /></a>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="pf-mobile-toggle"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        {mobileOpen && (
          <nav className="pf-mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>)}
            <a href={getWhatsAppHref()} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>Talk to us <ArrowUpRight size={14} /></a>
          </nav>
        )}
      </header>

      <section className="pf-hero">
        <div className="pf-hero-copy">
          <div className="pf-eyebrow"><span className="pf-status-dot" /> ENGINEERING, WITH A PLAN</div>
          <h1>Make your next project <span className="pf-highlight">worth showing.</span></h1>
          <p className="pf-hero-subtitle">ProjectForge AI helps students and researchers turn complex engineering ideas into scoped, understandable, and presentation-ready work.</p>
          <div className="pf-hero-actions">
            <Button render={<a href="#projects" />} className="pf-button pf-button-primary">Explore projects <ArrowRight size={16} /></Button>
            <Button render={<a href={getWhatsAppHref("a custom project idea", "my academic level", "project consultation")} target="_blank" rel="noreferrer" />} variant="outline" className="pf-button pf-button-outline"><MessageCircle size={16} /> Discuss your idea</Button>
          </div>
          <div className="pf-hero-proof">
            <div className="pf-proof-icons"><span><Check size={13} /></span><span><Code2 size={13} /></span><span><BookOpen size={13} /></span></div>
            <div><strong>Scope. Build. Understand. Present.</strong><span>Practical guidance for ambitious builders.</span></div>
          </div>
        </div>

        <div className="pf-hero-visual" aria-label="ProjectForge workspace preview">
          <div className="pf-visual-glow" />
          <div className="pf-workspace">
            <div className="pf-window-bar">
              <div className="pf-window-dots"><i /><i /><i /></div>
              <span>projectforge / workspace</span>
              <span className="pf-demo-pill"><span /> INTERACTIVE PREVIEW</span>
            </div>
            <div className="pf-workspace-body">
              <aside className="pf-workspace-sidebar">
                <span className="pf-sidebar-label">PROJECT DOMAINS</span>
                {domainsPreview.map((item) => {
                  const Icon = item.icon;
                  return <button type="button" key={item.name} onClick={() => setActiveDomain(item.name)} className={activeDomain === item.name ? "is-active" : ""}><Icon size={15} />{item.name}<ChevronDown size={12} /></button>;
                })}
                <div className="pf-sidebar-note"><Sparkles size={15} /><span>Start with a direction.<br /><strong>Refine it as you go.</strong></span></div>
              </aside>
              <div className="pf-workspace-main">
                <div className="pf-workspace-heading"><div><span className="pf-kicker">YOUR PROJECT SPACE</span><h3>{activePreview.name}</h3></div><span className="pf-live-badge"><span /> Ready to scope</span></div>
                <p className="pf-workspace-summary">{activePreview.summary}</p>
                <div className="pf-stack-label">SUGGESTED BUILDING BLOCKS</div>
                <div className="pf-stack-tags">{activePreview.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="pf-mini-architecture">
                  <div className="pf-architecture-head"><span>PROJECT WORKFLOW</span><span>01 — 04</span></div>
                  <div className="pf-flow">
                    <div><span className="pf-flow-icon"><Search size={15} /></span><strong>Define</strong><small>Problem & scope</small></div>
                    <i />
                    <div><span className="pf-flow-icon"><Code2 size={15} /></span><strong>Build</strong><small>Modules & code</small></div>
                    <i />
                    <div><span className="pf-flow-icon"><ShieldCheck size={15} /></span><strong>Validate</strong><small>Tests & evidence</small></div>
                  </div>
                </div>
                <div className="pf-workspace-footer"><span><span className="pf-check-dot"><Check size={11} /></span> Human-readable deliverables</span><span>DEMO DATA</span></div>
              </div>
            </div>
          </div>
          <div className="pf-floating-note"><span className="pf-floating-icon"><Zap size={16} /></span><div><strong>Built around your goals</strong><span>Level · Scope · Deliverables</span></div><Check size={16} className="pf-floating-check" /></div>
        </div>
      </section>

      <section className="pf-trust-strip" aria-label="Project approach">
        <div><span>01</span><strong>Clear scope</strong><small>Know what you are building</small></div>
        <div><span>02</span><strong>Understandable code</strong><small>Learn the decisions behind it</small></div>
        <div><span>03</span><strong>Responsible validation</strong><small>Show evidence, not hype</small></div>
        <div><span>04</span><strong>Useful handover</strong><small>Prepare to explain your work</small></div>
      </section>

      <section id="approach" className="pf-section pf-approach">
        <div className="pf-section-heading">
          <div><div className="pf-eyebrow"><span className="pf-status-dot" /> A BETTER WAY TO BUILD</div><h2>Big ideas are easier<br />with <span className="pf-highlight">a clear process.</span></h2></div>
          <p>From the first sketch to the final walkthrough, keep the technical work organized and the next step obvious.</p>
        </div>
        <div className="pf-feature-grid">
          {featureItems.map((feature) => {
            const Icon = feature.icon;
            return <article className="pf-feature-card" key={feature.number}><div className="pf-feature-top"><span className="pf-feature-icon"><Icon size={19} /></span><span>{feature.number}</span></div><h3>{feature.title}</h3><p>{feature.copy}</p><div className="pf-feature-line" /></article>;
          })}
        </div>
      </section>

      <section id="projects" className="pf-section pf-projects">
        <div className="pf-section-heading pf-projects-heading">
          <div><div className="pf-eyebrow"><span className="pf-status-dot" /> FIND YOUR STARTING POINT</div><h2>Explore ideas.<br /><span className="pf-highlight">Build something real.</span></h2></div>
          <div className="pf-catalog-tools">
            <label className="pf-project-search"><Search size={16} /><input aria-label="Search featured projects" placeholder="Search projects or tech..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
            <Link href="/projects" className="pf-text-link">View all projects <ArrowUpRight size={15} /></Link>
          </div>
        </div>
        <div className="pf-project-grid">
          {featuredProjects.map((project, index) => (
            <Link href={`/projects/${project.slug}`} className="pf-project-card" key={project.slug}>
              <div className={`pf-project-art pf-project-art-${index + 1}`}>
                {project.image && <img src={project.image} alt="" loading="lazy" />}
                <div className="pf-project-art-overlay" />
                <span className="pf-project-domain">{project.domain}</span>
                <span className="pf-project-arrow"><ArrowUpRight size={17} /></span>
              </div>
              <div className="pf-project-content"><div className="pf-project-meta"><span>{project.level}</span><span>{project.difficulty}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="pf-project-tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="pf-project-bottom"><span>{project.price}</span><span>Explore project <ArrowRight size={14} /></span></div></div>
            </Link>
          ))}
          {featuredProjects.length === 0 && <div className="pf-no-results">No featured projects match “{query}”. Try another keyword or view the full catalog.</div>}
        </div>
        <div className="pf-projects-footnote"><ShieldCheck size={15} /><span>Catalog entries are examples to explore. Final scope, availability, and deliverables are confirmed before work begins.</span></div>
      </section>

      <section id="workflow" className="pf-section pf-workflow-section">
        <div className="pf-section-heading">
          <div><div className="pf-eyebrow"><span className="pf-status-dot" /> FROM CONCEPT TO CONFIDENCE</div><h2>Four steps. <span className="pf-highlight">One clear direction.</span></h2></div>
          <p>No guesswork about the next step. Keep the scope practical, the implementation understandable, and the results honest.</p>
        </div>
        <div className="pf-workflow-grid">
          {workflow.map((step) => {
            const Icon = step.icon;
            return <article key={step.number} className="pf-workflow-step"><div className="pf-step-top"><span className="pf-step-icon"><Icon size={18} /></span><span>{step.number}</span></div><h3>{step.title}</h3><p>{step.copy}</p><div className="pf-step-connector" /></article>;
          })}
        </div>
      </section>

      <section className="pf-section pf-levels">
        <div className="pf-levels-panel">
          <div className="pf-levels-copy"><div className="pf-eyebrow"><span className="pf-status-dot" /> BUILT AROUND YOUR STAGE</div><h2>Right-sized for where <span className="pf-highlight">you are.</span></h2><p>A focused diploma prototype and a research-grade evaluation need different plans. Start with your level, goals, and constraints.</p><Button render={<a href={getWhatsAppHref("a scoped project plan", "my academic level", "project scoping")} target="_blank" rel="noreferrer" />} className="pf-button pf-button-primary">Plan my project <ArrowRight size={16} /></Button></div>
          <div className="pf-level-list">{levels.map((level, index) => { const Icon = level.icon; return <div className="pf-level-row" key={level.title}><span className="pf-level-icon"><Icon size={17} /></span><div><strong>{level.title}</strong><p>{level.detail}</p></div><span className="pf-level-number">0{index + 1}</span></div>; })}</div>
        </div>
      </section>

      <section id="faq" className="pf-section pf-faq-section">
        <div className="pf-faq-intro"><div className="pf-eyebrow"><span className="pf-status-dot" /> GOOD QUESTIONS, CLEAR ANSWERS</div><h2>Before you <span className="pf-highlight">get started.</span></h2><p>Understand the process and expectations before committing to a project scope.</p><a href={getWhatsAppHref("a project consultation", "my academic level", "questions")} target="_blank" rel="noreferrer">Still have a question? Talk to us <ArrowUpRight size={14} /></a></div>
        <div className="pf-faq-list">{questions.map((item, index) => <article key={item.q} className={openFaq === index ? "pf-faq-item is-open" : "pf-faq-item"}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{item.q}</span><span className="pf-faq-toggle">{openFaq === index ? <X size={15} /> : <ArrowDownRight size={15} />}</span></button>{openFaq === index && <p>{item.a}</p>}</article>)}</div>
      </section>

      <section id="contact" className="pf-final-cta">
        <div className="pf-cta-glow" />
        <div className="pf-cta-content"><span className="pf-cta-mark"><Orbit size={21} /></span><div className="pf-eyebrow"><span className="pf-status-dot" /> YOUR IDEA, NEXT STEP</div><h2>Have an idea?<br /><span>Let’s give it a plan.</span></h2><p>Tell us your academic level, the problem you want to solve, and the constraints you have. We’ll start with scope—not assumptions.</p><div className="pf-hero-actions"><Button render={<a href={getWhatsAppHref("a custom project idea", "my academic level", "project consultation")} target="_blank" rel="noreferrer" />} className="pf-button pf-button-primary">Discuss your project <MessageCircle size={16} /></Button><Button render={<Link href="/projects" />} variant="outline" className="pf-button pf-button-outline">Browse project catalog <ArrowUpRight size={16} /></Button></div><div className="pf-cta-note"><Check size={13} /> Clear scope before work begins <span /> No promises of grades or publication</div></div>
      </section>

      <footer className="pf-footer"><div className="pf-footer-main"><Link href="/" className="pf-brand"><span className="pf-brand-mark"><span>P</span></span><span>projectforge<span className="pf-brand-ai">.ai</span></span></Link><p>Engineering ideas, turned into understandable work.</p><div className="pf-footer-links"><a href="#projects">Projects</a><a href="#approach">Our approach</a><a href="#workflow">How it works</a><a href="#faq">FAQ</a></div><a className="pf-footer-contact" href={getWhatsAppHref()} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={14} /></a></div><div className="pf-footer-bottom"><span>© {new Date().getFullYear()} ProjectForge AI. Built for curious minds.</span><span>Learn the work. Understand the choices. Own the outcome.</span></div></footer>
    </main>
  );
}
