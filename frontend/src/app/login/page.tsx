'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Identifiants incorrects');

      const data = await response.json();
      
      // On sauvegarde le token dans le stockage local du navigateur
      localStorage.setItem('token', data.access_token);
      
      // Redirection vers l'accueil ou le dashboard
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Connexion</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input 
          type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Mot de passe" value={password}
          onChange={(e) => setPassword(e.target.value)} required 
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Pas de compte ? <a href="/register">S'inscrire</a></p>
    </div>
  );
}
