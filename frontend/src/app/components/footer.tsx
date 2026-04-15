"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Pati Goch: Enfòmasyon sou Konbit */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-xl font-black text-slate-900 tracking-tighter">
            KONBIT <span className="text-emerald-600">AGRO AI</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
            Teknoloji pou yon agrikilti pi solid
          </p>
          <p className="text-xs text-slate-300 mt-4">© 2026 Ayiti. Tout dwa rezève.</p>
        </div>

        {/* Pati Lateral Dwat: Bouton Kandidati a */}
        <div className="flex flex-col items-center md:items-end border-l-0 md:border-l md:border-slate-100 md:pl-10">
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-3 bg-emerald-50 px-3 py-1 rounded-full">
            Opòtinite pou Agwonòm
          </span>
          <h3 className="text-sm font-bold text-slate-700 mb-4 text-center md:text-right max-w-[200px]">
            Èske ou vle travay kòm ajan sou platfòm lan?
          </h3>
          <Link 
            href="/deveni-agronome"
            className="group relative bg-slate-900 text-white px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:bg-emerald-600 active:scale-95 shadow-2xl shadow-slate-200"
          >
            <span className="relative z-10">Voye Kandidati M</span>
            <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </div>

      </div>
    </footer>
  );
}