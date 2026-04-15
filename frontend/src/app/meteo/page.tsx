"use client";
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Header from '../components/header';

export default function MeteoKonplePage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Nou mete meteo nan yon state pou nou ka update li
  const [meteo, setMeteo] = useState({
    vil: "Pòtoprens, Ayiti",
    tanperati: 32,
    santi_li: 35,
    kondisyon: "Plis solèy pase nwaj",
    presipitasyon: 12,
    van_vites: 15,
    van_direksyon: "Nò-Olwès",
    imidite: 58,
    uv: 9,
    vizibilite: 12,
    presyon: 1014,
    pwen_wouze: 21,
    leve_soley: "06:10 AM",
    kouche_soley: "18:42 PM"
  });

  // Fonksyon pou chanje vil la (Similasyon)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // Isit la ou ta nòmalman rele yon API. Pou kounye a nou sèlman chanje non vil la
      setMeteo({
        ...meteo,
        vil: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
        tanperati: Math.floor(Math.random() * (35 - 15) + 15), // Simulation chanjman temp
      });
      setSearchQuery("");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F5F9] font-sans">
      <Header />

      <main className="flex-1 p-4 md:p-10 max-w-6xl mx-auto w-full">
        
        {/* BARRE DE RECHERCHE & ENTÈT */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-black text-slate-900">Météo Konbit</h1>
            <p className="text-emerald-600 font-bold flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Done an tan reyèl • {meteo.vil}
            </p>
          </div>

          {/* INPUT POU CHWAZI VIL */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Tape yon vil..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-6 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex-1 md:w-64 shadow-sm text-slate-700"
            />
            <button 
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition shadow-md active:scale-95"
            >
              Chèche
            </button>
          </form>

          <NextLink href="/" className="px-6 py-2 bg-white text-slate-600 rounded-full font-bold border border-slate-200 hover:bg-slate-50 transition shadow-sm whitespace-nowrap">
            Tounen nan akèy
          </NextLink>
        </div>

        {/* GRID PRENSIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* KAT PRENSIPAL (GWO) */}
          <div className="md:col-span-2 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <p className="font-black uppercase tracking-widest text-emerald-100 text-sm">Kounye a</p>
                <div className="flex items-center gap-6 mt-4">
                  <span className="text-9xl font-black leading-none">{meteo.tanperati}°</span>
                  <div className="text-6xl animate-bounce">☀️</div>
                </div>
                <p className="text-2xl font-bold mt-4 text-emerald-50">{meteo.kondisyon}</p>
              </div>
              
              <div className="mt-10 flex gap-6 text-emerald-50 font-medium flex-wrap">
                <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">Santi tankou: {meteo.santi_li}°</span>
                <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">Pwen wouze: {meteo.pwen_wouze}°</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* TI KAT DETAY (WIDGETS) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Van</p>
              <p className="text-2xl font-black text-slate-800">{meteo.van_vites} <span className="text-xs">km/h</span></p>
              <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase">{meteo.van_direksyon}</p>
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Lapli</p>
              <p className="text-2xl font-black text-slate-800">{meteo.presipitasyon}%</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${meteo.presipitasyon}%` }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Endis UV</p>
              <p className="text-2xl font-black text-slate-800">{meteo.uv}</p>
              <p className="text-[10px] font-bold text-orange-500 mt-1 uppercase">Trè Segondè</p>
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Imidite</p>
              <p className="text-2xl font-black text-slate-800">{meteo.imidite}%</p>
              <p className="text-[10px] font-bold text-sky-500 mt-1 uppercase">Nòmal</p>
            </div>
          </div>

          {/* DEZYÈM RANJE DETAY */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 p-6 rounded-[32px] text-white flex flex-col items-center text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Vizibilite</p>
              <p className="text-xl font-bold">{meteo.vizibilite} km</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-[32px] text-white flex flex-col items-center text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Presyon</p>
              <p className="text-xl font-bold">{meteo.presyon} hPa</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <p className="text-[10px] font-black text-amber-500 uppercase mb-2">Leve Solèy</p>
              <p className="text-xl font-black text-slate-800">{meteo.leve_soley}</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <p className="text-[10px] font-black text-purple-500 uppercase mb-2">Kouche Solèy</p>
              <p className="text-xl font-black text-slate-800">{meteo.kouche_soley}</p>
            </div>
          </div>
        </div>

        {/* REKÒMANDASYON AGWONÒM (AI) */}
        <div className="mt-10 bg-white p-10 rounded-[40px] shadow-xl border border-emerald-50 flex flex-col md:flex-row items-center gap-8 group">
          <div className="w-20 h-20 bg-emerald-600 text-white rounded-[24px] flex items-center justify-center text-4xl shadow-lg shadow-emerald-200 group-hover:rotate-6 transition-transform">
            🌱
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Konsèy Konbit Agro AI</h3>
            <p className="text-lg text-slate-700 leading-relaxed font-medium italic">
              "Jodi a nan vil {meteo.vil}, avèk yon endis UV nivo {meteo.uv}, solèy la ap frape fò. Nou rekòmande pou w wouze kilti yo bonè. Chans pou lapli a ba ({meteo.presipitasyon}%), donk pa konte sou syèl la pou wouze pou ou jodi a."
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}