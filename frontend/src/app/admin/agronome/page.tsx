"use client";
import { useState, useRef, useEffect } from 'react';
import NextLink from 'next/link';

function SoItilizate({ role }: { role: string }) {
  if (role === 'agronome') {
    return (
      <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-black uppercase border border-emerald-200">
        ✅ Agwonòm
      </span>
    );
  }
  if (role === 'senpai') {
    return (
      <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[9px] font-black uppercase border border-amber-200">
        ⭐ Senpai
      </span>
    );
  }
  return null;
}

export default function AgronomeAdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [reply, setReply] = useState("");
  const [attachedFile, setAttachedFile] = useState<{name: string, type: string, url?: string} | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [tickets] = useState([
    { id: "1", non: "Jean-Claude", role: "senpai", pwoblem: "Fèy mayi m yo ap joni", tan: "5 min", status: "ijan" },
    { id: "2", non: "Marie Lucie", role: "user", pwoblem: "Ki pi bon angrè?", tan: "12 min", status: "nòmal" },
  ]);

  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);

  useEffect(() => { setMounted(true); }, []);

  // --- LOGIK ANREJISTREMAN VOKAL ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAttachedFile({ 
          name: `Vokal_${new Date().getTime()}.wav`, 
          type: "AUDIO",
          url: audioUrl 
        });
        // Sispann tout tras mikwofòn lan apre anrejistreman
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Ou dwe bay pèmisyon pou mikwofòn nan fonksyone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('audio') ? 'AUDIO' : 'DOC'
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-emerald-950 text-white flex flex-col p-6 hidden md:flex">
        <div className="mb-10">
          <h1 className="text-xl font-black tracking-tighter">KONBIT <span className="text-emerald-400">ADMIN</span></h1>
          <div className="mt-2">
             <SoItilizate role="agronome" />
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-emerald-800/50 rounded-xl text-sm font-bold border-l-4 border-emerald-400">💬 Mesaj yo</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-emerald-900 rounded-xl text-sm font-bold text-emerald-200 transition">📊 Statistik</button>
        </nav>
      </aside>

      <main className="flex-1 flex overflow-hidden">
        {/* LIS TIKÈ */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Ka k'ap tann</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {tickets.map((t) => (
              <button 
                key={t.id} 
                onClick={() => setSelectedTicket(t)}
                className={`w-full text-left p-4 rounded-[24px] border transition ${selectedTicket.id === t.id ? "bg-emerald-50 border-emerald-200 shadow-sm" : "bg-white border-slate-100"}`}
              >
                <div className="flex flex-col gap-1 mb-2">
                  <p className="font-black text-slate-900">{t.non}</p>
                  <SoItilizate role={t.role} />
                </div>
                <p className="text-xs text-slate-500 italic truncate">"{t.pwoblem}"</p>
              </button>
            ))}
          </div>
        </div>

        {/* ZÒN CHAT */}
        <div className="flex-1 bg-[#F8FAFC] flex flex-col h-full">
          <div className="p-6 bg-white border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">👤</div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-800">{selectedTicket.non}</h3>
                  <SoItilizate role={selectedTicket.role} />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Kliyan Konbit</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="flex justify-start">
              <div className="bg-white p-5 rounded-[28px] rounded-tl-none shadow-sm border border-slate-100 max-w-md">
                <p className="text-sm text-slate-700">{selectedTicket.pwoblem}</p>
              </div>
            </div>
          </div>

          {/* BOX REPONS MULTIMEDIA */}
          <div className="p-6 bg-white border-t border-slate-200">
            <div className="max-w-5xl mx-auto">
              
              {attachedFile && (
                <div className="mb-4 flex items-center justify-between bg-emerald-50 p-3 rounded-2xl border border-emerald-100 animate-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white p-2 rounded-lg text-[10px] font-black">{attachedFile.type}</span>
                    <p className="text-sm font-bold text-emerald-900 truncate max-w-[200px]">{attachedFile.name}</p>
                    {attachedFile.type === "AUDIO" && <span className="text-xs text-emerald-600 font-bold">● Pare pou voye</span>}
                  </div>
                  <button onClick={() => setAttachedFile(null)} className="text-red-500 text-xs font-black uppercase px-3 hover:underline">Retire</button>
                </div>
              )}

              <div className="flex items-end gap-3">
                <div className="flex gap-2 mb-1">
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} accept=".pdf,audio/*" />
                  
                  {/* BOUTON DOKIMAN */}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition shadow-sm"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 1 0 2.828 2.828l6.414-6.586a4 4 0 0 0-5.656-5.656l-6.415 6.585a6 6 0 1 0 8.486 8.486L20.5 13"></path></svg>
                  </button>

                  {/* BOUTON MIKWO (VOKAL) */}
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition shadow-sm ${
                      isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      {isRecording ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M9 9h6v6H9z" />
                      ) : (
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8" />
                      )}
                    </svg>
                  </button>
                </div>

                <textarea 
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder={isRecording ? "N ap anrejistre vokal la..." : "Ekri konsèy teknik ou an la..."} 
                  className="flex-1 p-4 bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 rounded-[24px] text-sm resize-none h-14"
                  disabled={isRecording}
                />

                <button 
                  onClick={() => {
                    console.log("Voye:", { text: reply, file: attachedFile });
                    setReply("");
                    setAttachedFile(null);
                  }}
                  className="h-14 bg-emerald-600 text-white px-6 rounded-[24px] font-black hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2"
                >
                  VOYE
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}