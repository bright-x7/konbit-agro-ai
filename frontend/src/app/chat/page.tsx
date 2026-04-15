"use client";
import { useState, useRef, useEffect } from 'react';
import NextLink from 'next/link';
import Header from '../components/header';

type Message = {
  id: number;
  text?: string;
  image?: string;
  sender: 'user' | 'ai';
  type: 'text' | 'voice' | 'image';
  time: string;
};

export default function KonbitChatUI() {
  const [mounted, setMounted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // 1. Inisyalizasyon
  useEffect(() => {
    setMounted(true);
    setMessages([
      { 
        id: 1, 
        text: "Byenvini nan Konbit Agro AI. Peze mikwo a pou pale oswa voye yon foto kilti w.", 
        sender: 'ai', 
        type: 'text', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      },
    ]);
  }, []);

  // 2. Konfigirasyon Rekonèt Vwa (Kreyòl Ayisyen)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ht-HT'; // Kreyòl Ayisyen obligatwa

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          envoyerMessageVocal(transcript);
        };

        recognitionRef.current.onend = () => setIsRecording(false);
        recognitionRef.current.onerror = () => setIsRecording(false);
      }
    }
  }, []);

  const envoyerMessageVocal = (texteTranscrit: string) => {
    const newMsg: Message = {
      id: Date.now(),
      text: texteTranscrit,
      sender: 'user',
      type: 'voice',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    
    // Repons AI an Kreyòl
    setTimeout(() => {
      const reponse = `Mwen tande ou byen. Ou di: "${texteTranscrit}". Kouman mwen ka ede w ak jaden w jodi a?`;
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: reponse,
        sender: 'ai',
        type: 'text',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      lireTexte(reponse);
    }, 1000);
  };

  const toggleVoice = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setIsRecording(true);
      recognitionRef.current?.start();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMsg: Message = {
          id: Date.now(),
          image: reader.result as string,
          sender: 'user',
          type: 'image',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMsg]);
      };
      reader.readAsDataURL(file);
    }
  };

  const lireTexte = (texte: string) => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texte);
      // Nou itilize fr-FR paske se li ki pi pwòch aksan kreyòl sou pifò navigatè
      utterance.lang = 'fr-FR'; 
      utterance.rate = 0.9; 
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-slate-900">
      <Header />

      {/* ZÒN MESAJ YO */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-emerald-600 text-white rounded-t-2xl rounded-bl-2xl' 
                  : 'bg-white text-slate-700 rounded-t-2xl rounded-br-2xl border border-gray-100'
              }`}>
                {msg.type === 'image' ? (
                  <img src={msg.image} alt="Kilti" className="rounded-lg max-w-full h-auto" />
                ) : (
                  <p className="text-[16px] leading-relaxed">
                    {msg.type === 'voice' ? '🎙️ ' : ''}{msg.text}
                  </p>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </main>

      {/* ZÒN KONTWÒL ANBA */}
      <footer className="p-6 bg-white border-t border-gray-100 flex justify-between items-center px-10">
        <button 
          onClick={() => fileInputRef.current?.click()} 
          className="p-4 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition active:scale-95"
          title="Voye foto"
        >
           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" capture="environment" onChange={handleFileChange} />
           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
        </button>

        <button 
          onClick={toggleVoice}
          className={`p-8 rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${
            isRecording 
            ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-100' 
            : 'bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700'
          }`}
        >
          {isRecording ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path></svg>
          )}
        </button>
        
        <NextLink href="/" className="p-4 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </NextLink>
      </footer>
    </div>
  );
}