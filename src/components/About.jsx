const values = [
  {number:'01',title:'Make it recoverable',text:'Imports, exports and queued work need a way to retry, inspect or pick up where they stopped.'},
  {number:'02',title:'Prefer clarity over cleverness',text:'The next developer should be able to understand why a business rule exists and how a record moves through the system.'},
  {number:'03',title:'Measure what matters',text:'When a page feels slow or a batch stalls, I look for the bottleneck and track the result rather than calling the code “optimized” without a baseline.'}
]
export default function About() {
  return <section id="about" className="bg-[#eff1e9] py-24 text-[#141e17] sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.24em] text-[#4d7744]">04 / How I think</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-.07em]">Good backend work is often the stuff <span className="font-light italic text-[#668b54]">you don't notice.</span></h2>
          <p className="mt-7 max-w-xl text-sm leading-8 text-[#59655c]">A business team can finish its work. A file doesn't go missing. A campaign can be paused. A release can be recovered. That's the kind of engineering I care about.</p>
          <div className="mt-10 flex flex-wrap gap-2">
            {['Laravel & PHP','MySQL','Frappe ERP APIs','Queues / Workers','AWS & Docker','Git & Linux'].map(s=><span key={s} className="rounded-full border border-[#cbd4c6] px-4 py-2 font-mono text-[11px] text-[#415146]">{s}</span>)}
          </div>
        </div>
        <div className="lg:pt-10">
          {values.map(v=><div key={v.number} className="grid grid-cols-[58px_1fr] gap-4 border-t border-[#c9d0c5] py-8 last:border-b">
            <span className="font-mono text-xs font-semibold text-[#73946b]">{v.number}</span>
            <div><h3 className="font-display text-2xl font-semibold tracking-tight text-[#17281c]">{v.title}</h3><p className="mt-3 max-w-lg text-sm leading-7 text-[#667267]">{v.text}</p></div>
          </div>)}
          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-[#dae6d5] p-6">
            <span aria-hidden="true" className="font-display text-3xl text-[#578b4a]">↗</span>
            <p className="text-sm leading-7 text-[#405845]">Also a workshop facilitator: I have taught Git and Docker through live demos for BCA/MCA students at Dr. Subhash University.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
}
