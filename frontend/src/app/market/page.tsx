"use client";
import { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import Header from '../components/header';

type Product = {
  id: number;
  non: string;
  pri: number;
  kategori: string;
  imaj: string; // Sa pral URL foto a
  machann: string;
  isMine: boolean;
};

export default function MarketRealPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"tout" | "mwen" | "bous">("tout");
  const [showModal, setShowModal] = useState(false);
  
  // State pou fòm nouvo pwodwi a
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdImage, setNewProdImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pwodwi, setPwodwi] = useState<Product[]>([
    { id: 1, non: "Diri Latibonit (25kg)", pri: 2500, kategori: "Semans", imaj: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=200&auto=format&fit=crop", machann: "Jean Agwo", isMine: false },
    { id: 2, non: "Bwat Tomat Fre", pri: 500, kategori: "Legim", imaj: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop", machann: "Ou", isMine: true },
  ]);

  useEffect(() => { setMounted(true); }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setNewProdImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProdName && newProdPrice && newProdImage) {
      const nouvo: Product = {
        id: Date.now(),
        non: newProdName,
        pri: Number(newProdPrice),
        kategori: "Pwodwi Tè",
        imaj: newProdImage,
        machann: "Ou",
        isMine: true
      };
      setPwodwi([nouvo, ...pwodwi]);
      // Reset fòm nan
      setShowModal(false);
      setNewProdName("");
      setNewProdPrice("");
      setNewProdImage(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* TOP NAV (Menm jan an) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Mache Konbit</h1>
            <p className="text-emerald-600 font-bold italic font-medium">Bous kiltivatè ayisyen yo</p>
          </div>

          <div className="bg-white p-1.5 rounded-3xl shadow-sm border border-slate-100 flex gap-2">
            {["tout", "mwen", "bous"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-2xl font-bold transition capitalize ${activeTab === tab ? "bg-emerald-600 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`}
              >
                {tab === "tout" ? "Mache a" : tab === "mwen" ? "Pwodwi m yo" : "Bous"}
              </button>
            ))}
          </div>
        </div>

        {/* --- MACHE A --- */}
        {activeTab === "tout" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pwodwi.map(p => (
              <div key={p.id} className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-300">
                <div className="aspect-square bg-slate-100 rounded-[24px] overflow-hidden mb-4">
                  <img src={p.imaj} alt={p.non} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="px-2">
                  <span className="text-[10px] font-black text-emerald-500 uppercase">{p.kategori}</span>
                  <h3 className="font-bold text-slate-800 truncate">{p.non}</h3>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-black text-slate-900">{p.pri} HTG</span>
                    {!p.isMine && <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold">Achte</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PWODWI M YO --- */}
        {activeTab === "mwen" && (
          <div className="space-y-6">
            <div className="bg-emerald-950 p-8 rounded-[40px] text-white flex justify-between items-center shadow-2xl">
              <div>
                <h2 className="text-2xl font-black italic">Jere depo ou</h2>
                <p className="text-emerald-300">Ou gen {pwodwi.filter(p=>p.isMine).length} pwodwi an liy</p>
              </div>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition active:scale-95"
              >
                + Ajoute Pwodwi
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {pwodwi.filter(p => p.isMine).map(p => (
                 <div key={p.id} className="bg-white p-4 rounded-[32px] border border-slate-100 flex items-center gap-4 shadow-sm">
                    <img src={p.imaj} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{p.non}</p>
                      <p className="text-emerald-600 font-black">{p.pri} HTG</p>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-red-500 transition">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"></path></svg>
                    </button>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* --- BOUS (Kenbe menm kòd la) --- */}
        {activeTab === "bous" && ( <div className="text-center p-20 bg-white rounded-[40px]">Bous la ap fonksyone byen...</div> )}
      </main>

      {/* --- MODAL POU AJOUTE PWODWI --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Nouvo Pwodwi</h2>
            
            <form onSubmit={handleSaveProduct} className="space-y-6">
              {/* UPLOAD FOTO */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-emerald-400 transition"
              >
                {newProdImage ? (
                  <img src={newProdImage} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Chwazi Foto Pwodwi a</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
              </div>

              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Non pwodwi a (ex: Bannann fre)" 
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  required
                />
                <input 
                  type="number" 
                  placeholder="Pri (HTG)" 
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition"
                >
                  Anile
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition active:scale-95"
                >
                  Mete nan Mache
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}"use client";
import { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import Header from '../components/header';
import { useCart } from '../stores/useCart'; // Enpòte store panye a
import CartDrawer from '../components/CartDrawer'; // Enpòte UI panye a

type Product = {
  id: number;
  non: string;
  pri: number;
  kategori: string;
  imaj: string;
  machann: string;
  isMine: boolean;
};

export default function MarketRealPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"tout" | "mwen" | "bous">("tout");
  const [showModal, setShowModal] = useState(false);
  
  // Zustand: Fonksyon pou ajoute nan panye
  const addItem = useCart((state) => state.addItem);
  
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdImage, setNewProdImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pwodwi, setPwodwi] = useState<Product[]>([
    { id: 1, non: "Diri Latibonit (25kg)", pri: 2500, kategori: "Semans", imaj: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=200&auto=format&fit=crop", machann: "Jean Agwo", isMine: false },
    { id: 2, non: "Bwat Tomat Fre", pri: 500, kategori: "Legim", imaj: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop", machann: "Ou", isMine: true },
    { id: 3, non: "Lwil Maskriti", pri: 1250, kategori: "Transfòme", imaj: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=200&auto=format&fit=crop", machann: "Sò Anne", isMine: false },
  ]);

  useEffect(() => { setMounted(true); }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setNewProdImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProdName && newProdPrice && newProdImage) {
      const nouvo: Product = {
        id: Date.now(),
        non: newProdName,
        pri: Number(newProdPrice),
        kategori: "Pwodwi Tè",
        imaj: newProdImage,
        machann: "Ou",
        isMine: true
      };
      setPwodwi([nouvo, ...pwodwi]);
      setShowModal(false);
      setNewProdName("");
      setNewProdPrice("");
      setNewProdImage(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* TOP NAV */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Mache Konbit</h1>
            <p className="text-emerald-600 font-bold italic">Bous kiltivatè ayisyen yo</p>
          </div>

          <div className="bg-white p-1.5 rounded-3xl shadow-sm border border-slate-100 flex gap-2">
            {["tout", "mwen", "bous"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-2xl font-bold transition capitalize ${activeTab === tab ? "bg-emerald-600 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`}
              >
                {tab === "tout" ? "Mache a" : tab === "mwen" ? "Pwodwi m yo" : "Bous"}
              </button>
            ))}
          </div>
        </div>

        {/* --- MACHE A (Lè itilizatè ap achte) --- */}
        {activeTab === "tout" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pwodwi.map(p => (
              <div key={p.id} className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-300">
                <div className="aspect-square bg-slate-100 rounded-[24px] overflow-hidden mb-4">
                  <img src={p.imaj} alt={p.non} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="px-2">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{p.kategori}</span>
                  <h3 className="font-bold text-slate-800 truncate text-lg">{p.non}</h3>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-black text-slate-900">{p.pri} HTG</span>
                    {!p.isMine && (
                      <button 
                        onClick={() => addItem({ id: p.id.toString(), nom: p.non, prix: p.pri, quantite: 1 })}
                        className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors active:scale-95"
                      >
                        Achte
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PWODWI M YO (Jere depo) --- */}
        {activeTab === "mwen" && (
          <div className="space-y-6">
            <div className="bg-emerald-950 p-8 rounded-[40px] text-white flex justify-between items-center shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Jere depo ou</h2>
                <p className="text-emerald-300 font-medium">Ou gen {pwodwi.filter(p=>p.isMine).length} pwodwi an liy</p>
              </div>
              <button 
                onClick={() => setShowModal(true)}
                className="relative z-10 bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition active:scale-95"
              >
                + Ajoute Pwodwi
              </button>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-800/30 rounded-full blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {pwodwi.filter(p => p.isMine).map(p => (
                 <div key={p.id} className="bg-white p-4 rounded-[32px] border border-slate-100 flex items-center gap-4 shadow-sm hover:border-emerald-200 transition">
                    <img src={p.imaj} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{p.non}</p>
                      <p className="text-emerald-600 font-black">{p.pri} HTG</p>
                    </div>
                    <button className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"></path></svg>
                    </button>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* --- BOUS --- */}
        {activeTab === "bous" && ( 
          <div className="text-center p-20 bg-white rounded-[40px] border border-dashed border-slate-200">
            <span className="text-4xl block mb-4">📈</span>
            <p className="font-black text-slate-400 uppercase tracking-widest">Bous agrikòl la ap fonksyone byen...</p>
          </div> 
        )}
      </main>

      {/* --- PANIER A (Drawer) --- */}
      {/* L ap parèt sèlman si gen atik nan panye a */}
      <CartDrawer />

      {/* MODAL AJOUTE PWODWI (Retire pou espas) */}
      {/* ... (Kenbe menm kòd Modal ou a isit la) ... */}
    </div>
  );
}