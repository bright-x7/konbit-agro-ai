'use client';

import React, { memo, useEffect, useState, useRef } from 'react';
import NextLink from 'next/link';

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  // États pour les deux pop-ups
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Références pour fermer les menus en cliquant ailleurs
  const accountRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center shadow-sm">
      {/* GAUCHE : LOGO 🌱 */}
      <div className="flex items-center gap-2">
        <NextLink href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <div className="flex flex-col text-left">
            <span className="font-bold text-lg text-emerald-900 leading-none tracking-tight">Konbit Agro AI</span>
            <span className="text-[10px] text-emerald-600 font-medium">Votre assistant agricole intelligent</span>
          </div>
        </NextLink>
      </div>

      {/* DROITE : NAVIGATION */}
      <nav className="flex items-center gap-4">
        
        {/* BOUTON HOME 🏠 */}
        <NextLink 
          href="/" 
          className="p-2.5 bg-emerald-50 rounded-full text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm"
          title="Accueil"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </NextLink>

        {/* BOUTON COMPTE 👤 (Avec Pop-up Connexion/Inscription) */}
        <div className="relative" ref={accountRef}>
          <button 
            onClick={() => { setIsAccountOpen(!isAccountOpen); setIsContactOpen(false); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-md font-semibold text-sm active:scale-95"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Compte</span>
          </button>

          {isAccountOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60] animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Espace Membre</span>
              </div>
              
              <NextLink 
                href="/login" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors group" 
                onClick={() => setIsAccountOpen(false)}
              >
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
                  </svg>
                </div>
                <span className="font-semibold text-sm">Se connecter</span>
              </NextLink>

              <NextLink 
                href="/register" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors group" 
                onClick={() => setIsAccountOpen(false)}
              >
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/>
                  </svg>
                </div>
                <span className="font-semibold text-sm">Créer un compte</span>
              </NextLink>
            </div>
          )}
        </div>

        {/* BOUTON TÉLÉPHONE 📞 (Avec Pop-up Contact) */}
        <div className="relative" ref={contactRef}>
          <button 
            onClick={() => { setIsContactOpen(!isContactOpen); setIsAccountOpen(false); }}
            className="p-2.5 bg-emerald-50 rounded-full text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm active:scale-95"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </button>

          {isContactOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-[60] animate-in fade-in zoom-in duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-full text-emerald-700">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Téléphone</span>
                    <a href="tel:+50900000000" className="text-sm font-bold text-emerald-900 hover:text-emerald-600 transition-colors">+509 0000-0000</a>
                  </div>
                </div>
                
                <div className="h-[1px] bg-gray-50 mx-1" />

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-full text-emerald-700">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Email Support</span>
                    <a href="mailto:contact@konbitagro.ai" className="text-sm font-bold text-emerald-900 hover:text-emerald-600 transition-colors">contact@konbitagro.ai</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);