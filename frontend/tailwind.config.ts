import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palèt koulè ofisyèl Konbit Agro AI
        'konbit': {
          'light': '#F0FDF4',   // Vèt trè klè (Nati)
          'primary': '#10B981',  // Vèt Emerald (Kwasans)
          'dark': '#064E3B',     // Vèt Fonse (Estabilite)
          'accent': '#F59E0B',   // Jòn/Zoranj (Rekòt)
        },
        // Nou ranplase ansyen non yo nèt ak vèt Konbit la pou sekirite
        'konbit-green': '#10B981', 
        'konbit-deep': '#064E3B',
      },
    },
  },
  plugins: [],
};
export default config;