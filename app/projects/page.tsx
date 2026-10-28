import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#07111f] px-5 py-10 text-slate-200 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="mr-2 inline size-4" /> Back home
        </Link>
        <div className="mt-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Project catalog</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-white">Find a direction worth building.</h1>
          <p className="mt-5 text-base leading-7 text-slate-400">These demonstration listings help you compare project directions. Confirm current availability, scope, and deliverables with our team.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-cyan-300/40">
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img src={project.image ?? '/projects/ai-computer-lab.png'} alt={`${project.title} project preview`} className="size-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">{project.domain}</p>
                <h2 className="mt-8 text-xl font-semibold text-white">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-500">
                  <span>{project.level}</span>
                  <span className="font-semibold text-white group-hover:text-cyan-300">View details <ArrowUpRight className="ml-1 inline size-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
