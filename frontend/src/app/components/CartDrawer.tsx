"use client";
import { useCart } from '../stores/useCart';

export default function CartDrawer() {
  const { items, removeItem, getTotal } = useCart();
  const total = getTotal();

  if (items.length === 0) return null; // Pa montre anyen si panier a vid

  return (
    <div className="fixed right-4 bottom-24 z-50 w-80 bg-white rounded-[32px] shadow-2xl border border-slate-100 p-6 animate-in slide-in-from-right">
      <h2 className="text-lg font-black text-slate-900 mb-4 flex justify-between">
        Panier ou 🛒
        <span className="text-emerald-600">{items.length}</span>
      </h2>

      <div className="max-h-60 overflow-y-auto space-y-3 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
            <div>
              <p className="text-sm font-bold text-slate-800">{item.nom}</p>
              <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">
                {item.quantite} x {item.prix} HTG
              </p>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">✕</button>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-slate-200 pt-4">
        <div className="flex justify-between mb-6">
          <span className="font-bold text-slate-400 uppercase text-xs">Total:</span>
          <span className="font-black text-xl text-slate-900">{total} HTG</span>
        </div>

        {/* BOUTON PEMAN YO */}
        <div className="grid gap-2">
          <button className="bg-[#cc1011] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition">
            Peye ak MonCash 🔴
          </button>
          <button className="bg-[#ef3d23] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition">
            Peye ak Natcash 🔴
          </button>
        </div>
      </div>
    </div>
  );
}