export default function Contact() {
  return <section id="contact" className="bg-[#b9f483] py-24 text-[#0c170e] sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.23em] text-[#4c7440]">06 / Next chapter</p>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[.95] tracking-[-.075em]">Have a backend challenge? <span className="italic font-light">Let's talk.</span></h2>
          <p className="mt-7 max-w-xl text-sm leading-7 text-[#476247]">Open to PHP/Laravel and broader backend roles in Ahmedabad, remotely or with relocation. I enjoy work where clean engineering makes operations noticeably easier.</p>
          <a href="mailto:madinkhan0633@gmail.com?subject=Backend%20Developer%20Opportunity" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#101c14] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#263c2b]">Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
        <div className="border-t border-[#759b69] pt-7 lg:border-l lg:border-t-0 lg:pl-10">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#54724c]">Find me elsewhere</p>
          <div className="mt-5 grid gap-1">
            <a href="https://www.linkedin.com/in/madin-bloch/" target="_blank" rel="noreferrer" className="flex justify-between border-b border-[#96b981] py-3 text-lg font-medium hover:opacity-60">LinkedIn <span>↗</span></a>
            <a href="https://github.com/MadinBloch" target="_blank" rel="noreferrer" className="flex justify-between border-b border-[#96b981] py-3 text-lg font-medium hover:opacity-60">GitHub <span>↗</span></a>
            <a href="/Madin_Bloch_Resume.pdf" download className="flex justify-between border-b border-[#96b981] py-3 text-lg font-medium hover:opacity-60">Resume / PDF <span>↓</span></a>
            <a href="https://madinbloch.hashnode.dev/" target="_blank" rel="noreferrer" className="flex justify-between border-b border-[#96b981] py-3 text-lg font-medium hover:opacity-60">Writing <span>↗</span></a>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-[#83aa75] pt-6 font-mono text-[10px] uppercase tracking-widest text-[#537348]"><span>© {new Date().getFullYear()} Madin Bloch</span><span>Made with care, shipped with intent.</span></div>
    </div>
  </section>
}
