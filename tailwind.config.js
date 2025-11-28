/** @type {import('tailwindcss').Config} */
export default {
  // CONFIGURAÇÃO CORRIGIDA PARA ENCONTRAR ARQUIVOS NA RAIZ E EM PASTAS
  content: [
    // 1. O index.html
    "./index.html",
    // 2. Arquivos na raiz (Solução para o Netlify)
    "./*.{js,ts,jsx,tsx}", 
    // 3. Arquivos na pasta src/ (Para sua compatibilidade local, se existir)
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}