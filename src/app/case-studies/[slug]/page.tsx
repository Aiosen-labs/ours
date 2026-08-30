import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar';

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) return { title: 'Not Found' };
  
  return {
    title: `${project.title} | Case Study | AIOSEN`,
    description: project.description
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default function CaseStudyPage({ params }: Props) {
  const projectIndex = projects.findIndex(p => p.slug === params.slug);
  if (projectIndex === -1) notFound();
  
  const project = projects[projectIndex];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 md:pt-40 pb-20">
        <article className="max-w-[1000px] mx-auto px-margin-desktop">
          
          <Link href="/#projects" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-sm text-xs uppercase tracking-widest font-bold mb-12 transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Case Studies
          </Link>

          <header className="mb-16">
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-md bg-gray-100 text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest font-bold">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-headline-lg text-[48px] md:text-[72px] text-on-surface leading-[1.1] tracking-tighter font-medium mb-8">
              {project.title}
            </h1>
            <p className="font-body-md text-on-surface-variant text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </header>

          <div className="w-full aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden mb-20 relative shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            <div className="md:col-span-8 space-y-16">
              {project.problem && (
                <section>
                  <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-6">The Challenge</h2>
                  <p className="font-body-md text-on-surface-variant text-lg font-light leading-relaxed">
                    {project.problem}
                  </p>
                </section>
              )}
              
              {project.architecture && (
                <section>
                  <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-6">Architecture & Solution</h2>
                  <p className="font-body-md text-on-surface-variant text-lg font-light leading-relaxed">
                    {project.architecture}
                  </p>
                </section>
              )}
            </div>
            
            <div className="md:col-span-4 space-y-12">
              {project.capabilities && project.capabilities.length > 0 && (
                <section>
                  <h3 className="font-label-sm text-sm font-semibold tracking-widest text-on-surface mb-6 uppercase">Key Capabilities</h3>
                  <ul className="space-y-4">
                    {project.capabilities.map((cap, i) => (
                      <li key={i} className="flex gap-3 text-on-surface-variant font-light text-base">
                        <span className="material-symbols-outlined text-[20px] text-primary shrink-0">check_circle</span>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
              {project.stack && project.stack.length > 0 && (
                <section>
                  <h3 className="font-label-sm text-sm font-semibold tracking-widest text-on-surface mb-6 uppercase">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded-md border border-black/10 text-on-surface font-label-sm text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="border-t border-black/5 pt-16 pb-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="font-headline-lg text-3xl text-on-surface">Ready to engineer something similar?</h3>
            <Link href="/#contact" className="btn-primary font-label-sm text-sm px-8 py-4 rounded-full uppercase tracking-widest font-bold whitespace-nowrap shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Start a Conversation
            </Link>
          </div>

          <nav className="border-t border-black/5 pt-8 flex justify-between items-center pb-20">
            <Link href={`/case-studies/${prevProject.slug}`} className="group flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <div className="flex flex-col hidden sm:flex">
                <span className="font-label-sm text-[10px] uppercase tracking-widest">Previous Project</span>
                <span className="font-headline-lg text-lg font-semibold">{prevProject.title}</span>
              </div>
            </Link>
            
            <Link href={`/case-studies/${nextProject.slug}`} className="group flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors text-right">
              <div className="flex flex-col hidden sm:flex">
                <span className="font-label-sm text-[10px] uppercase tracking-widest">Next Project</span>
                <span className="font-headline-lg text-lg font-semibold">{nextProject.title}</span>
              </div>
              <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
