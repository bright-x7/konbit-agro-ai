"use client";
import { useState, useRef, useEffect } from 'react';
import NextLink from 'next/link';
import Header from '../components/header';

export default function PhotoPage() {
  const [mounted, setMounted] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Kamera pa ka louvri", err);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvasRef.current.toDataURL('image/png'));
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulation repons IA
    setTimeout(() => {
      setResult({
        title: "Analiz Plantasyon",
        status: "Pwoblèm Detekte",
        details: "Nou detekte yon mank nitrisyon nan fèy yo, pwobableman yon mank Azòt (N). Sa fè fèy yo vin jòn nan pwent yo.",
        solution: "Nou rekòmande pou w mete yon ti angrè òganik (konpòs) oswa yon angrè ki rich nan nitwojèn nan pye plant lan.",
        confidence: "92%"
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-[#F0FDF4]">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 md:p-8 gap-6">
        
        {/* PANEL GÒCH: Repons IA (Style Gemini) */}
        <div className="flex-1 bg-white rounded-[40px] shadow-sm border border-emerald-50 flex flex-col overflow-hidden">
          <div className="p-8 flex-1 overflow-y-auto">
            {!capturedImage && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-emerald-900">IA Konbit Analiz</h2>
                  <p className="text-emerald-600/70 font-medium">Pran yon foto pou n kòmanse analiz la</p>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                  </div>
                </div>
                <p className="text-emerald-800 font-bold tracking-tight animate-pulse text-lg">Konbit Agro ap egzamine foto w la...</p>
              </div>
            )}

            {result && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-emerald-200">AI</div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">{result.title}</h3>
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Konfyans: {result.confidence}</span>
                  </div>
                </div>
                
                <div className="bg-amber-50 border-l-8 border-amber-400 p-6 rounded-r-3xl">
                  <p className="text-amber-800 font-black text-lg">{result.status}</p>
                </div>

                <div className="space-y-6">
                  <p className="text-slate-700 leading-relaxed font-medium text-lg">{result.details}</p>
                  
                  <div className="bg-emerald-900 p-8 rounded-[32px] shadow-xl">
                    <h4 className="font-black text-emerald-400 mb-3 uppercase text-sm tracking-widest">Solisyon Konbit:</h4>
                    <p className="text-white text-lg leading-relaxed font-medium">{result.solution}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PANEL DWAT: Foto Itilizatè a */}
        <div className="w-full md:w-[450px] flex flex-col gap-6">
          <div className="flex-1 bg-black rounded-[40px] overflow-hidden relative shadow-2xl border-8 border-white ring-1 ring-emerald-100">
            {!capturedImage ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale-[20%]" />
            ) : (
              <img src={capturedImage} className="w-full h-full object-cover" alt="Foto plant" />
            )}
            
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-6">
              {!capturedImage ? (
                <button 
                  onClick={takePhoto}
                  className="w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all border-4 border-emerald-500/20"
                >
                  <div className="w-14 h-14 border-4 border-emerald-600 rounded-full" />
                </button>
              ) : (
                <button 
                  onClick={() => {setCapturedImage(null); setResult(null); startCamera();}}
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-full font-black border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                >
                  REFÈ FOTO A
                </button>
              )}
            </div>
          </div>

          {capturedImage && !result && !isAnalyzing && (
            <button 
              onClick={handleAnalyze}
              className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-[0.98] animate-in zoom-in-95"
            >
              LANSE ANALIZ IA
            </button>
          )}

          <div className="flex gap-4">
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-4 bg-white text-emerald-700 rounded-2xl font-bold border border-emerald-100 hover:bg-emerald-50 transition shadow-sm"
              >
                Galri
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setCapturedImage(ev.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }} />
              </button>
              
              <NextLink href="/" className="p-4 bg-white text-gray-400 rounded-2xl border border-gray-100 hover:text-emerald-600 transition">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              </NextLink>
          </div>
        </div>
      </main>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}