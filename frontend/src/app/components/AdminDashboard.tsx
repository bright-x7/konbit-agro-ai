"use client";
import { useState } from 'react';

export default function AdminDashboard({ adminCreds, setAdminCreds }: any) {
  const [activeTab, setActiveTab] = useState("kandida");
  const [newUsername, setNewUsername] = useState(adminCreds.user);
  const [newPassword, setNewPassword] = useState(adminCreds.pass);

  // Done tès pou Kandida yo
  const [kandidaYo, setKandidaYo] = useState([
    { id: 1, non: "Jean Baptiste", tip: "Agronome", status: "pending", email: "jean@gmail.com" },
    { id: 2, non: "Marie Lucie", tip: "Vétérinaire", status: "pending", email: "lucie@gmail.com" },
  ]);

  const handleUpdateCreds = () => {
    const updated = { user: newUsername, pass: newPassword };
    setAdminCreds(updated);
    localStorage.setItem('admin_creds', JSON.stringify(updated));
    alert("Username ak Modpas modifye ak siksè!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR ADMIN */}
      <aside className="w-72 bg-slate-900 text-white p-8 flex flex-col gap-4">
        <div className="mb-10">
          <h2 className="text-xl font-black text-emerald-400 italic">KONBIT AGRO</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase">Super Admin Room</p>
        </div>
        
        <button onClick={() => setActiveTab("kandida")} className={`p-4 rounded-2xl font-bold text-left ${activeTab === 'kandida' ? 'bg-emerald-600' : 'hover:bg-slate-800'}`}>👥 Kandida Agwo</button>
        <button onClick={() => setActiveTab("users")} className={`p-4 rounded-2xl font-bold text-left ${activeTab === 'users' ? 'bg-emerald-600' : 'hover:bg-slate-800'}`}>💬 Chat & Sipò</button>
        <button onClick={() => setActiveTab("settings")} className={`p-4 rounded-2xl font-bold text-left ${activeTab === 'settings' ? 'bg-emerald-600' : 'hover:bg-slate-800'}`}>⚙️ Paramèt Sekirite</button>
      </aside>

      {/* KONTNI DASHBOARD */}
      <main className="flex-1 p-10">
        
        {/* TAB 1: KANDIDA */}
        {activeTab === "kandida" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">Apwouve Kandida</h2>
            <div className="grid gap-4">
              {kandidaYo.map(k => (
                <div key={k.id} className="bg-white p-6 rounded-[32px] border border-slate-100 flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-black text-slate-900 text-lg">{k.non}</p>
                    <p className="text-sm text-emerald-600 font-bold uppercase">{k.tip} • {k.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-xl font-black hover:bg-emerald-600 hover:text-white transition">AKSEPTE</button>
                    <button className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-black">REJTE</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CHAT & SIPÒ */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">Siyalman & Sipò</h2>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100">
               <p className="text-slate-500 font-medium mb-4 italic">Yon itilizatè siynale ke li bliye modpas li nan chat la...</p>
               <div className="flex gap-4">
                 <input type="email" placeholder="Email itilizatè a" className="flex-1 p-4 bg-slate-50 rounded-2xl border-none" />
                 <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black">VOYE MODPAS LA</button>
               </div>
            </div>
          </div>
        )}

        {/* TAB 3: PARAMÈT (MODIFYE ACCESS) */}
        {activeTab === "settings" && (
          <div className="max-w-md space-y-6">
            <h2 className="text-3xl font-black text-slate-900">Chanje Aksè Admin</h2>
            <div className="bg-white p-8 rounded-[40px] shadow-sm space-y-4">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase ml-2">Username nèf</label>
                <input value={newUsername} onChange={(e)=>setNewUsername(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold mt-1" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase ml-2">Modpas nèf</label>
                <input type="text" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold mt-1" />
              </div>
              <button onClick={handleUpdateCreds} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg">SOVE MODIFIKASYON YO</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}