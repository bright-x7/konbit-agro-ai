"use client";
import { useState, useEffect, useRef } from 'react';
import Header from '../components/header';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'agent';
  time: string;
};

export default function ContinuousChat() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Onè respè! Mwen se asistan Konbit. Dekri m sa k ap pase nan jaden w lan.", sender: 'bot', time: '11:25 PM' }
  ]);
  const [input, setInput] = useState("");
  const [isAgentLive, setIsAgentLive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fonksyon simulation pou repons agwonòm nan (Sa ta dwe soti nan Database la)
  const agentReplySimulation = (userText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Mwen konprann. Èske ou ka di m si gen ti tach nwa sou do fèy yo tou?",
        "Sa sanble yon mank azòt (azote). Depi konbyen tan ou remake sa?",
        "Oke, mwen rekòmande w sispann wouze yo nan aswè pou kounye a."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const newMsg: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMsg]);
    }, 2500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    // Si se premye fwa li ekri, nou fè transfè a
    if (!isAgentLive) {
      setIsTyping(true);
      setTimeout(() => {
        setIsAgentLive(true);
        const transferMsg: Message = {
          id: 't-1',
          text: "Mwen konekte w ak Agw. Jean-Baptiste. L ap gade ka w la kounye a...",
          sender: 'bot',
          time: 'kounye a'
        };
        setMessages(prev => [...prev, transferMsg]);
        
        // Premye repons ajan an
        setTimeout(() => {
          setIsTyping(false);
          const firstAgentMsg: Message = {
            id: 'a-1',
            text: "Bonswa, mwen se Agw. Jean-Baptiste. Mwen resevwa mesaj ou a sou " + currentInput + ". N ap rezoud sa.",
            sender: 'agent',
            time: 'kounye a'
          };
          setMessages(prev => [...prev, firstAgentMsg]);
        }, 2000);
      }, 1500);
    } else {
      // Si ajan an te deja la, li kontinye reponn
      agentReplySimulation(currentInput);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-[#F1F5F9]">
      <Header />
      
      <main className="flex-1 max-w-2xl mx-auto w-full flex flex-col overflow-hidden bg-white shadow-xl md:my-4 md:rounded-[40px]">
        {/* HEADER CHAT */}
        <div className="p-5 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">👨‍🌾</div>
            <div>
              <p className="font-black text-slate-800 text-sm">{isAgentLive ? "Agw. Jean-Baptiste" : "Asistan Konbit"}</p>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                {isAgentLive ? "An liy kounye a" : "Bot ap chache ajan..."}
              </p>
            </div>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-[24px] max-w-[85%] text-sm ${
                m.sender === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 
                m.sender === 'agent' ? 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200' : 
                'bg-emerald-50 text-emerald-700 italic text-xs'
              }`}>
                {m.sender === 'agent' && <p className="text-[8px] font-black mb-1 text-emerald-600 uppercase">Ajan Verifye ✔</p>}
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-xs text-slate-400 font-bold animate-pulse ml-2 italic">Agwonòm nan ap ekri...</div>}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ekri mesaj ou la..." 
              className="flex-1 bg-slate-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
            />
            <button className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 transition">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}