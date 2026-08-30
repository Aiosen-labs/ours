import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4">
      <h2 className="font-headline-lg text-[48px] md:text-[64px] text-on-surface mb-6 font-bold tracking-tighter">Project Not Found</h2>
      <p className="font-body-md text-on-surface-variant text-xl mb-12 max-w-md text-center font-light leading-relaxed">
        The case study you are looking for does not exist or has been moved.
      </p>
      <Link href="/#projects" className="btn-primary font-label-sm text-sm px-8 py-4 rounded-full uppercase tracking-widest font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
        Back to Case Studies
      </Link>
    </div>
  );
}
