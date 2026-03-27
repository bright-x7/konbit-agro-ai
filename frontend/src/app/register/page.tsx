'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur lors de l'inscription");
      }

      // Succès !
      setSuccess(true);
      
      // On attend 2 secondes pour que l'utilisateur voie le message, puis redirection
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Créer un compte</h1>
      
      {!success ? (
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
            S'inscrire
          </button>
        </form>
      ) : (
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          Inscription réussie ! Redirection vers la connexion...
        </p>
      )}

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      
      <p style={{ marginTop: '20px' }}>
        Déjà un compte ? <a href="/login">Se connecter</a>
      </p>
    </div>
  );
}
