"use client";
import { useState, useEffect } from 'react';
import AdminDashboard from '../components/AdminDashboard';

export default function SuperAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  
  // Paramèt default ou yo
  const [adminCreds, setAdminCreds] = useState({
    user: "admin",
    pass: "AdminBright7"
  });

  // Tcheke si ou te deja modifye yo (Sove nan LocalStorage)
  useEffect(() => {
    const savedCreds = localStorage.getItem('admin_creds');
    if (savedCreds) setAdminCreds(JSON.parse(savedCreds));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === adminCreds.user && pass === adminCreds.pass) {
      setIsLoggedIn(true);
    } else {
      alert("Username oswa Modpas kòrèk!");
    }
  };

  if (isLoggedIn) {
    return <AdminDashboard adminCreds={adminCreds} setAdminCreds={setAdminCreds} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Super Admin</h1>
        <p className="text-slate-400 font-bold mb-8 uppercase text-xs tracking-widest">Konbit Agro AI Control Panel</p>
        
        <div className="space-y-4">
          <input 
            type="text" placeholder="Username" 
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 font-bold"
            onChange={(e) => setUser(e.target.value)}
          />
          <input 
            type="password" placeholder="Modpas" 
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 font-bold"
            onChange={(e) => setPass(e.target.value)}
          />
          <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
            ANTRE NAN SISTÈM NAN
          </button>
        </div>
      </form>
    </div>
  );
}