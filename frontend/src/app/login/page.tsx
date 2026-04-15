"use client";
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClientComponentClient();

  // Fonksyon pou kreye yon kont (Sign Up)
  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (error) setMessage(error.message);
    else setMessage("Tcheke imel ou pou verifye kont la!");
    setLoading(false);
  };

  // Fonksyon pou konekte (Login)
  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else window.location.href = '/'; // Redireksyon apre siksè
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-[32px] shadow-xl border border-slate-100">
        <h1 className="text-2xl font-black text-slate-900 mb-6 text-center">Konekte sou Konbit</h1>
        
        <div className="space-y-4">
          <input 
            type="email" placeholder="Imel ou" 
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Modpas ou" 
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            onClick={handleLogin} disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 transition"
          >
            {loading ? "Chaje..." : "KONEKTE"}
          </button>
          
          <button 
            onClick={handleSignUp}
            className="w-full text-emerald-600 font-bold text-sm hover:underline"
          >
            Mwen pa gen kont, kreye youn
          </button>
        </div>
        
        {message && <p className="mt-4 text-center text-sm font-medium text-amber-600">{message}</p>}
      </div>
    </div>
  );
}