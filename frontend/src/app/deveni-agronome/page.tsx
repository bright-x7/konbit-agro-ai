"use client";
import { useState } from 'react';
import Header from '../components/header';

export default function KandidatiAjan() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation voye done
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 2000);
  };

  if (sent) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce">✓</div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Kandidati Resevwa!</h1>
        <p className="text-slate-600 max-w-sm">Ekip Konbit la ap egzamine pwofil ou. N ap kontakte w nan imel ou byento.</p>
        <button onClick={() => window.location.href = '/'} className="mt-8 text-emerald-600 font-bold underline">Tounen sou paj akèy</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
          <div className="mb-8">
            <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Rekritman</span>
            <h1 className="text-3xl font-black text-slate-900 mt-4 leading-tight">Vin yon Agwonòm sou <span className="text-emerald-600">Konbit</span></h1>
            <p className="text-slate-500 mt-2 font-medium">Ede kiltivatè yo ak konesans ou epi touche revni an plis.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">Non Konplè</label>
                <input required type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500" placeholder="Egz: Jean-Baptiste" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">Nimewo Telefòn</label>
                <input required type="tel" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500" placeholder="+509..." />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">Espesyalite (Kilti, Elevaj, etc.)</label>
              <input required type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500" placeholder="Kilti Mayi, Irigasyon..." />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">Eksperyans ou (Rezime brèf)</label>
              <textarea required className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 h-32 resize-none" placeholder="Esplike nou pakou w..." />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-2">Prèv Diplòm oswa Sètifika (PDF/Foto)</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-emerald-400 transition cursor-pointer bg-slate-50">
                <p className="text-sm text-slate-400 font-bold">Klike la pou w chaje fichye a</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? "AP VOYE..." : "SOUMÈT KANDIDATI M"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}