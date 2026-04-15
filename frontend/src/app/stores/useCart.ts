import { create } from 'zustand';

// Sa se definisyon yon pwodwi nan panier a
export interface CartItem {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  
  // Ajoute pwodwi oswa ogmante kantite si l te la deja
  addItem: (product) => set((state) => {
    const isExisting = state.items.find(item => item.id === product.id);
    if (isExisting) {
      return {
        items: state.items.map(item =>
          item.id === product.id ? { ...item, quantite: item.quantite + 1 } : item
        ),
      };
    }
    return { items: [...state.items, { ...product, quantite: 1 }] };
  }),

  // Retire yon pwodwi nèt
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),

  // Vide panier a apre peman
  clearCart: () => set({ items: [] }),

  // Kalkile total la an tan reyèl
  getTotal: () => {
    const { items } = get();
    return items.reduce((acc, item) => acc + (item.prix * item.quantite), 0);
  },
}));