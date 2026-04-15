"use client";
import Header from './components/header'; // Nou remete import la
import NextLink from 'next/link';

export default function Home() {
  const sidebarItems = [
    { label: "Chat Vocal", icon: "🎙️", color: "bg-emerald-400", href: "/chat" },
    { label: "Photo", icon: "📸", color: "bg-sky-400", href: "/photo" },
    { label: "Météo", icon: "☁️", color: "bg-amber-400", href: "/meteo" },
    { label: "Market", icon: "🧺", color: "bg-purple-400", href: "/market" },
    { label: "Agronome", icon: "👨‍🌾", color: "bg-emerald-500", href: "/agronome" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F0FDF4]">
      {/* Header a tounen nan plas li nan paj la */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR GAUCHE */}
        <aside className="w-24 bg-white border-r border-gray-100 flex flex-col items-center py-8 gap-8 shadow-sm">
          {sidebarItems.map((item, idx) => (
            <NextLink 
              key={idx} 
              href={item.href}
              className="flex flex-col items-center gap-1 cursor-pointer group transition-all"
            >
              <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center text-white text-2xl shadow-lg transition-all group-hover:scale-110 group-active:scale-95 group-hover:shadow-emerald-200`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter group-hover:text-emerald-700 transition-colors text-center">
                {item.label}
              </span>
            </NextLink>
          ))}
        </aside>

        {/* CONTENU CENTRAL */}
        <main className="flex-1 p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
          <h1 className="text-5xl font-extrabold text-emerald-900 mb-4 leading-tight">
            Bienvenue sur <br /> 
            <span className="text-emerald-700 font-black tracking-tight">Konbit Agro AI</span>
          </h1>
          <p className="max-w-xl text-gray-600 text-lg mb-10 font-medium leading-relaxed">
            Votre plateforme intelligente pour une agriculture moderne, connectée et durable.
          </p>
          
          <div className="w-full max-w-2xl aspect-video bg-white rounded-[40px] shadow-2xl border-8 border-white overflow-hidden relative group">
             <img 
               src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80" 
               alt="Agriculture Konbit" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>
        </main>
      </div>
    </div>
  );
}