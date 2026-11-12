export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/[.07] bg-[#0b101b] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(112,132,241,.12),transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow">Let's connect</p>
          <h2 className="section-heading mt-4 max-w-xl">Have something in mind<span className="text-accent">?</span></h2>
          <p className="mt-5 max-w-md text-sm leading-8 text-[#a1adc8]">I'm open to backend developer opportunities and interesting projects. Feel free to reach out.</p>
          <a href="mailto:madinkhan0633@gmail.com?subject=Let's%20connect" className="btn-primary mt-7">Say hello <span aria-hidden="true">↗</span></a>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-6 text-[13px] font-medium text-[#a8b4d0]">
            <a href="https://www.linkedin.com/in/madin-bloch/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a>
            <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="hover:text-white">GitHub ↗</a>
            <a href="/Madin_Bloch_Resume.pdf" download className="hover:text-white">Resume ↓</a>
            <a href="https://madinbloch.hashnode.dev/" target="_blank" rel="noreferrer" className="hover:text-white">Blog ↗</a>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-[#66748f]">
          <span>© {new Date().getFullYear()} Madin Bloch</span><span>Built with React, Vite & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
