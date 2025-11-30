import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Wrench, 
  Rocket, 
  BrainCircuit, 
  Target, 
  ChevronRight,
  ExternalLink,
  Zap, 
  CheckCircle2, 
  Menu, 
  X, 
  Trophy, 
  ArrowUpRight, 
  Sparkles, 
  Award, 
  BarChart, 
  ShieldCheck, 
  TrendingUp, 
  CalendarDays, 
  RotateCcw, 
  Lock, 
  Wand2, 
  AlertTriangle, 
  ChevronDown, 
  MessageCircle, 
  Instagram, 
  HelpCircle, 
  Crown, 
  LogOut, 
  GraduationCap, 
  CreditCard, 
  Mail, 
  RefreshCw, 
  Server, 
  BookOpen, 
  ShoppingCart, 
  Unlock 
} from 'lucide-react';

/* --- ESTILOS GLOBAIS (ANIMAÇÕES) --- */
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-glow-cyan {
      0%, 100% { box-shadow: 0 0 15px rgba(6, 182, 212, 0.5); transform: scale(1); }
      50% { box-shadow: 0 0 25px rgba(6, 182, 212, 0.8); transform: scale(1.05); }
    }
    @keyframes pulse-glow-purple {
      0%, 100% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.5); transform: scale(1); }
      50% { box-shadow: 0 0 25px rgba(168, 85, 247, 0.8); transform: scale(1.05); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
    .animate-pulse-glow-cyan {
      animation: pulse-glow-cyan 2s infinite;
    }
    .animate-pulse-glow-purple {
      animation: pulse-glow-purple 2s infinite;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #0f172a; 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #334155; 
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #475569; 
    }
  `}</style>
);

/* --- HELPER DE TEMA (COR DINÂMICA) --- */
// Esta função retorna as classes de cor baseadas no nível
const useTheme = (level) => {
  const isMaster = level === 'mestre';
  return {
    primary: isMaster ? 'purple' : 'cyan', // Cor principal (texto, icones)
    secondary: isMaster ? 'fuchsia' : 'blue', // Cor secundária (gradientes)
    border: isMaster ? 'border-purple-500' : 'border-cyan-500',
    bgLight: isMaster ? 'bg-purple-500/10' : 'bg-cyan-500/10',
    text: isMaster ? 'text-purple-400' : 'text-cyan-400',
    textHover: isMaster ? 'group-hover:text-purple-300' : 'group-hover:text-cyan-300',
    button: isMaster ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/20' : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/20',
    pulse: isMaster ? 'animate-pulse-glow-purple' : 'animate-pulse-glow-cyan',
    iconColor: isMaster ? '#a855f7' : '#06b6d4', // Hex para SVGs
    gradient: isMaster ? 'from-purple-600 to-pink-600' : 'from-cyan-600 to-blue-600',
    checkColor: isMaster ? 'text-purple-400' : 'text-cyan-400',
    activeTab: isMaster ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
  };
};

/* --- DADOS DO TOOLKIT --- */
const TOOLKIT_DATA = [
  { 
    id: 'creation', 
    title: 'Criação & Inteligência', 
    icon: BrainCircuit, 
    description: 'Motores de IA para gerar conteúdo e estrutura.', 
    tools: [ 
      { name: 'ChatGPT', desc: 'O cérebro da operação para textos.', url: 'https://chat.openai.com', tag: 'Essencial', color: 'text-green-400' },
      { name: 'Gamma.app', desc: 'Gere ebooks, slides e sites inteiros.', url: 'https://gamma.app', tag: 'Produtividade', color: 'text-purple-400' }, 
      { name: 'Gemini Ultra', desc: 'Seu co-piloto para copy e estratégia.', url: 'https://gemini.google.com', tag: 'IA Master', color: 'text-blue-400' }, 
      { name: 'Amazon KDP', desc: 'Publique livros globalmente.', url: 'https://kdp.amazon.com', tag: 'Vendas', color: 'text-orange-400' }, 
    ] 
  },
  { 
    id: 'dev_design', 
    title: 'Estrutura & Tech', 
    icon: Wrench, 
    description: 'Construa seu império digital sem código.', 
    tools: [ 
      { name: 'Lovable.dev', desc: 'Crie apps completos via prompt.', url: 'https://lovable.dev', tag: 'IA Code', color: 'text-indigo-400' },
      { name: 'bolt.new', desc: 'Desenvolvimento web instantâneo.', url: 'https://bolt.new', tag: 'Fullstack', color: 'text-blue-300' },
      { name: 'v0.dev', desc: 'Interface de usuário gerada por IA.', url: 'https://v0.dev', tag: 'UI/UX', color: 'text-white' }, 
      { name: 'Netlify', desc: 'Hospedagem profissional gratuita.', url: 'https://www.netlify.com', tag: 'Infra', color: 'text-teal-400' }, 
      { name: 'Carrd', desc: 'Landing pages de alta conversão.', url: 'https://carrd.co', tag: 'Rápido', color: 'text-orange-300' }, 
    ] 
  },
  { 
    id: 'traffic', 
    title: 'Tráfego & Automação', 
    icon: Zap, 
    description: 'Ferramentas para dominar a atenção e atendimento.', 
    tools: [ 
      { name: 'Converza.io', desc: 'Automação de respostas e mensagens.', url: 'https://converza.io', tag: 'Automação', color: 'text-green-500' },
      { name: 'Manychat', desc: 'Líder global em automação de DM (Instagram).', url: 'https://manychat.com', tag: 'Chatbot', color: 'text-blue-500' },
      { name: 'Opus Clip', desc: 'Transforme 1 vídeo longo em 10 curtos.', url: 'https://www.opus.pro', tag: 'Viral', color: 'text-yellow-400' }, 
      { name: 'CapCut', desc: 'O editor mobile padrão ouro.', url: 'https://www.capcut.com', tag: 'Editor', color: 'text-white' }, 
    ] 
  },
  { 
    id: 'sales', 
    title: 'Ecossistema de Vendas', 
    icon: Target, 
    description: 'Gateways de pagamento e checkout.', 
    tools: [ 
      { name: 'Kiwify', desc: 'A melhor experiência de checkout.', url: 'https://kiwify.com.br', tag: 'Recomendado', color: 'text-green-400' }, 
      { name: 'Cakto', desc: 'Design limpo e foco em conversão.', url: 'https://cakto.com.br', tag: 'Simples', color: 'text-pink-400' },
      { name: 'Kirvano', desc: 'Taxas agressivas e boa aprovação.', url: 'https://kirvano.com', tag: 'Nova', color: 'text-purple-400' },
      { name: 'Hotmart', desc: 'Líder global, robusta para afiliados.', url: 'https://hotmart.com', tag: 'Global', color: 'text-orange-500' },
      { name: 'Eduzz', desc: 'Integração sólida para infoprodutos.', url: 'https://eduzz.com', tag: 'Clássica', color: 'text-yellow-500' },
    ] 
  }
];

const POPULAR_NICHES = [
  "Marketing Digital", "Emagrecimento", "Renda Extra", "Finanças", 
  "Relacionamento", "Desenvolvimento Pessoal", "Programação", "Idiomas", "Pets"
];

const NICHE_CORRECTIONS = {
  "marketing": "Marketing Digital",
  "mkt": "Marketing Digital",
  "dinheiro": "Renda Extra / Finanças",
  "fitness": "Emagrecimento e Fitness",
  "emagrecer": "Emagrecimento",
  "ingles": "Idiomas (Inglês)",
  "inglês": "Idiomas (Inglês)",
  "programacao": "Programação e Dev",
  "dev": "Programação e Dev"
};

/* --- TEXTOS DE MENTORIA COMPLETA --- */
const MISSIONS_DATA = {
  iniciante: {
    fase1: [
      { id: 'ini_d1', text: 'Dia 1: Definição de Nicho e Micro-segmentação', xp: 100 },
      { id: 'ini_d2', text: 'Dia 2: Mapeamento Profundo de Avatar (Dores/Desejos)', xp: 100 },
      { id: 'ini_d3', text: 'Dia 3: Análise de Concorrência (Benchmarking Top 5)', xp: 100 },
      { id: 'ini_d4', text: 'Dia 4: Criação da "Big Idea" e Promessa Única', xp: 150 },
      { id: 'ini_d5', text: 'Dia 5: Identidade Visual MVP (Logo e Paleta no Canva)', xp: 150 },
    ],
    fase1_summary: {
      done: "Operador, preste muita atenção. 90% das pessoas que tentam vender na internet falham exatamente aqui. Elas tentam vender 'tudo para todos'. Nesta fase, nós cortamos o ruído. Definimos exatamente QUEM vamos atacar e COMO vamos nos posicionar. A análise de concorrência serve para entender o nível de sofisticação do mercado, não para copiar. Sua 'Big Idea' é a arma que vai furar o bloqueio mental do seu cliente.",
      result: "Você agora possui uma Bússola Estratégica. Enquanto os amadores estão atirando no escuro, você tem um alvo laser. Você sabe com quem está falando, conhece as dores que tiram o sono do seu cliente e tem uma promessa forte o suficiente para fazê-lo parar de rolar o feed e te escutar."
    },
    fase2: [
      { id: 'ini_d6', text: 'Dia 6: Estruturação do Produto (Outline do Ebook/Curso)', xp: 200 },
      { id: 'ini_d7', text: 'Dia 7: Produção de Conteúdo Base (Escrita ou Gravação com IA)', xp: 250 },
      { id: 'ini_d8', text: 'Dia 8: Configuração da Área de Membros (Kiwify/Hotmart)', xp: 200 },
      { id: 'ini_d9', text: 'Dia 9: Construção da Página de Vendas (Headline + VSL)', xp: 300 },
      { id: 'ini_d10', text: 'Dia 10: Deploy Técnico: Hospedar Site no Netlify/Vercel', xp: 400 },
    ],
    fase2_summary: {
      done: "Ideias não pagam boletos. Nesta fase, transformamos o conceito abstrato em um Ativo Digital tangível. A estruturação garante que seu produto entregue a transformação prometida. O deploy da página de vendas é o momento em que sua loja abre as portas para o mundo. Lembre-se: uma página de vendas não é um folheto, é um vendedor treinado que trabalha 24 horas por dia, 7 dias por semana, sem reclamar.",
      result: "Sua Infraestrutura de Guerra está montada. Você tem um produto real, um link de pagamento funcional e uma página persuasiva. Você deixou de ser um 'curioso' e se tornou um produtor digital com capacidade de processar pagamentos. O terreno está preparado para receber tráfego."
    },
    fase3: [ 
      { id: 'ini_d11', text: 'Dia 11: Configuração de Checkout e Order Bump', xp: 300 },
      { id: 'ini_d12', text: 'Dia 12: Implementação de Back Redirect (Recuperação)', xp: 400 },
      { id: 'ini_d13', text: 'Dia 13: Criação de Criativos Orgânicos (10 Cortes Virais)', xp: 350 },
      { id: 'ini_d14', text: 'Dia 14: Estratégia de Tráfego X1 (Script Whatsapp)', xp: 300 },
      { id: 'ini_d15', text: 'Dia 15: Lançamento Semente / Abertura de Carrinho', xp: 500 },
    ],
    fase3_summary: {
      done: "Chegou a hora da verdade: O Combate. Configuramos armadilhas de lucro (Order Bump) para aumentar o ticket médio sem esforço extra. Mas o foco total aqui é VALIDAÇÃO. Esqueça a vaidade das métricas, foque no dinheiro no bolso. A estratégia X1 (um a um) no WhatsApp é trabalhosa, mas é a única que te dá o feedback real do porquê as pessoas compram (ou não compram) de você.",
      result: "Prova de Conceito (POC). O objetivo desta fase é fazer o celular vibrar com a notificação de venda. Se você fez sua primeira venda, você provou que o sistema funciona. Agora, o jogo deixa de ser 'será que dá certo?' para se tornar 'como eu faço isso acontecer 1.000 vezes?'."
    }
  },
  mestre: {
    fase1: [
      { id: 'mst_d16', text: 'Dia 16: Configuração Profissional do Business Manager (Meta)', xp: 400 },
      { id: 'mst_d17', text: 'Dia 17: Instalação Avançada de Pixel e API de Conversão', xp: 500 },
      { id: 'mst_d18', text: 'Dia 18: Criação de Públicos (Lookalike e Custom Audiences)', xp: 450 },
      { id: 'mst_d19', text: 'Dia 19: Subir Campanha de Teste AB (Criativos)', xp: 600 },
      { id: 'mst_d20', text: 'Dia 20: Análise de Métricas Primárias (CTR, CPC, CPM)', xp: 500 },
    ],
    fase1_summary: {
      done: "Bem-vindo à Liga Profissional. Acabou a dependência da sorte do algoritmo orgânico. Aqui nós compramos dados. Configuramos o Business Manager e o Pixel para rastrear cada passo do cliente. O Teste AB é onde separamos os homens dos meninos: deixamos os dados decidirem qual criativo converte, eliminando o 'eu acho' do vocabulário.",
      result: "Controle de Tráfego. Você agora tem um painel de controle. Você sabe que se colocar R$ 10,00, quantas pessoas chegam na sua página. Começamos a transformar publicidade em matemática previsível."
    },
    fase2: [
      { id: 'mst_d21', text: 'Dia 21: Implementação de Upsell 1-Clique', xp: 600 },
      { id: 'mst_d22', text: 'Dia 22: Estruturação de Downsell', xp: 550 },
      { id: 'mst_d23', text: 'Dia 23: Automação de Email Marketing', xp: 500 },
      { id: 'mst_d24', text: 'Dia 24: Otimização de Página (Heatmaps)', xp: 400 },
      { id: 'mst_d25', text: 'Dia 25: Configuração de Remarketing Dinâmico', xp: 600 },
    ],
    fase2_summary: {
      done: "Nesta fase, focamos em Eficiência e LTV (Lifetime Value). O cliente mais caro é o novo; o mais barato é aquele que já comprou. Com Upsells e Downsells, aumentamos o lucro por venda instantaneamente. O Email Marketing e o Remarketing garantem que estamos cercando o cliente por todos os lados, vencendo pelo cansaço e pela onipresença.",
      result: "Máquina de Lucro Otimizada. Seu sistema não apenas vende, ele espreme cada centavo possível de oportunidade. Você está construindo um ativo que vale dinheiro a longo prazo, não apenas uma renda extra de fim de semana."
    },
    fase3: [
      { id: 'mst_d26', text: 'Dia 26: Escala Vertical (Aumento de Orçamento)', xp: 700 },
      { id: 'mst_d27', text: 'Dia 27: Escala Horizontal (Novos Públicos)', xp: 800 },
      { id: 'mst_d28', text: 'Dia 28: Delegação: Criar Processos Operacionais (SOPs)', xp: 900 },
      { id: 'mst_d29', text: 'Dia 29: Análise de LTV e Planejamento Financeiro', xp: 800 },
      { id: 'mst_d30', text: 'Dia 30: CONCLUSÃO DO PROTOCOLO NEXUS', xp: 1000 },
    ],
    fase3_summary: {
      done: "O estágio final da metamorfose: de Vendedor para Empresário. A escala exige coragem para investir pesado e inteligência para não quebrar. Mas o verdadeiro segredo aqui é a Delegação. Você cria processos para que outras pessoas ou IAs operem a máquina, enquanto você foca na estratégia macro.",
      result: "Liberdade Real. Você não tem mais um emprego que você mesmo criou; você tem um negócio. Com processos definidos, caixa saudável e tráfego escalável, você atingiu o objetivo final do Nexus. Os arquivos confidenciais de elite esperam por você."
    }
  }
};

/* --- NOVO COMPONENTE: BOTÃO FLUTUANTE (COM TIMER E TEXTO AJUSTADO) --- */
const StickyBuyButton = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Configura o timer para 3 segundos (3000ms)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // Limpa o timer se o componente for desmontado
    return () => clearTimeout(timer);
  }, []);

  return (
    <a 
      href="https://nexusdigital.net.br" 
      target="_blank" 
      rel="noopener noreferrer"
      // Usamos uma cor fixa aqui ou a do tema? Geralmente CTA de compra é bom manter consistente (verde ou a cor do tema)
      // Vou usar a cor do tema para consistência visual pedida
      className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-${theme.primary}-500 hover:bg-${theme.primary}-400 text-black px-6 py-4 rounded-full font-black shadow-[0_0_25px_rgba(0,0,0,0.5)] ${theme.pulse} transition-all duration-1000 ease-in-out group md:bottom-10 md:right-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <div className="bg-black/10 p-2 rounded-full">
        <ShoppingCart size={24} className="text-black group-hover:text-white transition-colors"/>
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase font-bold opacity-80 mb-0.5">Oportunidade</span>
        <span className="text-lg tracking-tight">LIBERAR GUIAS E CURSOS</span>
      </div>
    </a>
  );
};

/* --- COMPONENTE: CTA INTERMEDIÁRIA (DIA 15) --- */
const MidContentCTA = ({ theme }) => (
  <div className={`my-12 relative overflow-hidden rounded-2xl border ${theme.border}/30 bg-gradient-to-r from-slate-900 via-${theme.primary}-950/20 to-slate-900 shadow-2xl`}>
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <Rocket size={120} className={`text-${theme.primary}-500`} />
    </div>
    <div className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
      <div className="flex-1">
        <div className={`inline-block px-3 py-1 bg-${theme.primary}-500/20 text-${theme.primary}-400 text-xs font-black uppercase tracking-widest rounded mb-4`}>
          Oportunidade de Aceleração
        </div>
        <h3 className="text-3xl font-black text-white mb-3">VOCÊ SOBREVIVEU AOS PRIMEIROS 15 DIAS</h3>
        <p className="text-slate-300 text-lg leading-relaxed">
          95% dos iniciantes desistem antes de chegar aqui. Você já provou que tem disciplina. 
          <br/><br/>
          Se você sente que seus resultados poderiam ser <strong>10x maiores</strong> se tivesse acesso às ferramentas que a Elite esconde, não espere o Dia 30.
        </p>
      </div>
      <a 
        href="https://nexusdigital.net.br" 
        target="_blank"
        className={`shrink-0 bg-${theme.primary}-500 hover:bg-white text-black font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all transform hover:scale-105 flex items-center gap-3`}
      >
        FURAR A FILA AGORA <Unlock size={20} strokeWidth={3} />
      </a>
    </div>
  </div>
);

/* --- COMPONENTES VISUAIS PADRÃO (Adaptados ao Tema) --- */
const NexusLogo = ({ className = "h-12", showText = true, theme }) => {
  const [error, setError] = useState(false);
  // Default to cyan theme for login screen or if theme not passed
  const t = theme || { primary: 'cyan', text: 'text-cyan-400' }; 

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {!error ? (
        <img 
          src="/logo.jpg" 
          alt="Nexus Digital" 
          className={`h-full w-auto rounded-full shadow-lg border-2 border-white/10 hover:border-${t.primary}-500/50 transition-all cursor-pointer object-contain`}
          onError={() => setError(true)}
        />
      ) : (
        <div className={`flex flex-col justify-center items-center bg-${t.primary}-950/30 p-2 rounded-lg border border-${t.primary}-500/30`}>
            <BrainCircuit className={t.text} size={24}/>
            {showText && <span className="font-black text-white text-xs tracking-tighter uppercase">Nexus</span>}
        </div>
      )}
      {(!error && showText) && (
          <div className="hidden md:flex flex-col justify-center ml-3">
            <span className="font-black text-white text-2xl tracking-tighter leading-none drop-shadow-lg">NEXUS</span>
            <span className={`text-[9px] font-bold ${t.text} tracking-[0.4em] leading-none mt-1 drop-shadow-md uppercase`}>Digital</span>
          </div>
      )}
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = '', theme }) => {
  const t = theme || { primary: 'cyan', button: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/20' };
  
  const baseStyle = "rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg";
  const variants = {
    primary: `${t.button} text-white hover:scale-[1.02]`,
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-white/10",
    outline: `bg-transparent border-2 border-${t.primary}-500 text-${t.primary}-400 hover:bg-${t.primary}-500/10`
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const GlassCard = ({ children, className = "", hoverEffect = false, onClick, theme }) => {
  const t = theme || { primary: 'cyan', border: 'border-cyan-500' };
  return (
    <div 
      onClick={onClick}
      className={`
        relative bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl 
        ${hoverEffect ? `hover:bg-slate-800/60 hover:${t.border}/30 hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 group cursor-pointer` : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

const ToolCard = ({ tool, theme }) => (
  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
    <GlassCard hoverEffect={true} className="flex flex-col h-full cursor-pointer p-6" theme={theme}>
      <div className="flex justify-between items-start mb-4">
        <h4 className={`font-bold text-white text-xl tracking-tight ${theme.textHover} transition-colors flex items-center gap-2`}>
          {tool.name}
        </h4>
        <span className={`text-[11px] uppercase tracking-widest bg-white/5 px-3 py-1 rounded border border-white/10 font-bold transition-colors ${tool.color ? tool.color : 'text-slate-300'} group-hover:${theme.border}/30`}>
          {tool.tag}
        </span>
      </div>
      <p className="text-slate-400 text-lg mb-6 flex-grow leading-relaxed group-hover:text-slate-300 transition-colors">{tool.desc}</p>
      <div className={`mt-auto w-full py-4 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-base font-bold flex items-center justify-center gap-2 group-hover:bg-${theme.primary}-500 group-hover:text-black group-hover:border-${theme.primary}-500 transition-all duration-300`}>
        Acessar Ferramenta <ExternalLink size={18} />
      </div>
    </GlassCard>
  </a>
);

const TaskItem = ({ id, text, xp, done, onToggle, theme }) => (
  <div onClick={() => onToggle(id, !done)} className={`relative p-6 border-b border-white/5 last:border-0 flex items-center gap-6 cursor-pointer group overflow-hidden transition-all duration-300 select-none ${done ? `bg-${theme.primary}-950/10` : 'hover:bg-white/[0.02]'}`}>
    <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${done ? `bg-${theme.primary}-500` : 'bg-transparent group-hover:bg-slate-700'}`} />
    <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${done ? `bg-${theme.primary}-500 border-${theme.primary}-500 scale-110` : `border-slate-600 group-hover:border-${theme.primary}-400`}`}>
      {done && <CheckSquare size={20} className="text-black" strokeWidth={4} />}
    </div>
    <div className="flex-1">
      <span className={`text-lg md:text-xl font-medium transition-all duration-300 block leading-tight ${done ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-white'}`}>{text}</span>
    </div>
    <div className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-300 ${done ? `bg-${theme.primary}-500/20 ${theme.text} border-${theme.primary}-500/30` : 'bg-white/5 text-slate-500 border-white/5 group-hover:border-white/10'}`}>
      +{xp} XP
    </div>
  </div>
);

const PhaseSummary = ({ data, setActiveTab, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!data) return null;
  return (
    <div className="mt-6 mb-4 mx-6">
      <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl border border-white/10 hover:${theme.border}/30 transition-all group shadow-lg`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 bg-${theme.primary}-500/10 rounded-lg ${theme.text} ${theme.textHover}`}><Target size={28} /></div>
          <span className="font-bold text-slate-200 text-xl">O que esperar deste capítulo</span>
        </div>
        <ChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={28} />
      </button>
      
      {isOpen && (
        <div className="mt-3 bg-slate-900/80 rounded-xl border border-white/5 overflow-hidden animate-fadeIn">
          <div className="p-8 grid gap-8 md:grid-cols-1">
            <div className="space-y-4">
              <h4 className="text-lg uppercase tracking-widest text-green-400 font-black flex items-center gap-3"><CheckCircle2 size={24} /> Objetivo Tático</h4>
              <p className="text-slate-300 text-lg leading-relaxed border-l-4 border-green-500/30 pl-6 py-1">{data.done}</p>
            </div>
            <div className="space-y-4 pt-6 border-t border-white/5">
              <h4 className={`text-lg uppercase tracking-widest ${theme.text} font-black flex items-center gap-3`}><Trophy size={24} /> Resultado Esperado</h4>
              <p className={`text-slate-300 text-lg leading-relaxed border-l-4 border-${theme.primary}-500/30 pl-6 py-1`}>{data.result}</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-sm text-slate-500 flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity">
               <HelpCircle size={20} className="shrink-0 mt-0.5 text-slate-400" />
               <p className="text-base">
                 Dúvidas estratégicas? Use as IAs do <strong>ChatGPT</strong> ou <strong>Gemini</strong>. 
                 Para suporte sobre o método Nexus, acesse a aba <button onClick={() => setActiveTab('contacts')} className={`${theme.text} hover:underline font-bold`}>Contato</button>.
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LevelUpModal = ({ isOpen, onClose, onConfirm, currentLevel, theme }) => {
  if (!isOpen) return null;
  const isUpgrade = currentLevel === 'iniciante';
  const targetLevel = isUpgrade ? 'mestre' : 'iniciante';

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
      <GlassCard className={`max-w-lg w-full ${theme.border}/30 p-10 shadow-2xl shadow-${theme.primary}-900/40`}>
        <div className="text-center mb-10">
          <Award size={80} className={`mx-auto mb-6 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)] ${theme.text}`} />
          <h2 className="text-4xl font-black text-white mb-4">{isUpgrade ? "ASCENSÃO DE NÍVEL" : "RETORNAR À BASE"}</h2>
          <p className="text-slate-300 text-xl leading-relaxed">
            {isUpgrade 
              ? "Você provou seu valor. Está pronto para deixar o amadorismo e entrar no campo de batalha do Tráfego Pago e Escala?" 
              : "Um bom general sabe quando recuar. Voltando para reforçar os fundamentos e corrigir a rota."}
          </p>
        </div>
        
        <div className="flex flex-col gap-4 mt-8">
          <Button onClick={() => onConfirm(targetLevel)} variant="primary" className="py-5 text-xl font-black tracking-wide w-full" theme={theme}>
            {isUpgrade ? "CONFIRMAR ASCENSÃO" : "CONFIRMAR RETORNO"} <Rocket size={24} className={!isUpgrade ? "rotate-180" : ""} />
          </Button>
          <button onClick={onClose} className="py-4 text-slate-500 font-bold hover:text-white transition-colors">
            Cancelar Operação
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

/* --- TELAS E NAVEGAÇÃO --- */
const OnboardingScreen = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [nicheSuggestion, setNicheSuggestion] = useState('');

  const handleNicheInput = (e) => {
    const val = e.target.value;
    setInput(val);
    const lowerVal = val.toLowerCase().trim();
    
    if (NICHE_CORRECTIONS[lowerVal] && NICHE_CORRECTIONS[lowerVal] !== val) {
      setNicheSuggestion(NICHE_CORRECTIONS[lowerVal]);
    } else {
      setNicheSuggestion('');
    }
  };

  const applySuggestion = () => {
    setInput(nicheSuggestion);
    setNicheSuggestion('');
  };

  const handleLevelSelect = (lvl) => {
      onComplete({ niche: input, level: lvl });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
      <div className="w-full max-w-lg space-y-10 text-center relative z-10">
        <NexusLogo className="justify-center scale-150 mb-16 h-40" />
        
        {step === 0 ? (
           <>
            <div className="space-y-4">
              <h1 className="text-5xl font-black text-white tracking-tight">DEFINA SEU ALVO</h1>
              <p className="text-slate-400 text-xl">Em qual mercado você vai construir seu império?</p>
            </div>
            
            <div className="space-y-8 animate-fadeIn">
               <div className="relative">
                  <input 
                    type="text" 
                    value={input} 
                    onChange={handleNicheInput} 
                    placeholder="Ex: Marketing, Fitness, Inglês..." 
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-8 py-6 text-white text-center text-2xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600 font-bold shadow-xl" 
                    spellCheck="true"
                    lang="pt-BR"
                    autoFocus 
                  />
                  
                  {nicheSuggestion && (
                    <div 
                      onClick={applySuggestion}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-slate-800 text-cyan-400 text-base py-3 px-8 rounded-xl shadow-xl cursor-pointer flex items-center gap-3 animate-bounce hover:bg-slate-700 border border-cyan-500/30 z-50 w-max font-bold"
                    >
                      <Wand2 size={20} />
                      <span>Você quis dizer: <strong>{nicheSuggestion}</strong>?</span>
                    </div>
                  )}
               </div>

               <div className="flex flex-wrap justify-center gap-3">
                  {POPULAR_NICHES.map(niche => (
                    <button
                      key={niche}
                      onClick={() => setInput(niche)}
                      className="text-base font-bold px-5 py-2.5 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 transition-colors text-slate-400"
                    >
                      {niche}
                    </button>
                  ))}
               </div>

               <button 
                 type="button" 
                 onClick={() => { if(input.length > 2) setStep(1); }} 
                 disabled={input.length < 3} 
                 className="w-full py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-[1.02] text-white font-black text-2xl rounded-2xl transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-4 shadow-xl shadow-cyan-900/20"
               >
                 AVANÇAR <ChevronRight size={28} />
               </button>
            </div>
           </>
        ) : (
           <div className="space-y-8 animate-fadeIn">
               <h1 className="text-4xl font-black text-white">NÍVEL DE EXPERIÊNCIA</h1>
               <div className="grid gap-6">
                   <button onClick={() => handleLevelSelect('iniciante')} className="p-8 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-left transition-all hover:bg-slate-800 group hover:shadow-lg hover:shadow-cyan-900/20">
                       <h3 className="text-3xl font-black text-cyan-400 group-hover:text-cyan-300 mb-3">INICIANTE</h3>
                       <p className="text-slate-400 text-lg leading-relaxed">Estou começando do zero ou fiz poucas vendas. Preciso de fundamentos e validação.</p>
                   </button>
                   <button onClick={() => handleLevelSelect('mestre')} className="p-8 rounded-2xl bg-slate-900 border border-slate-700 hover:border-purple-500 text-left transition-all hover:bg-slate-800 group hover:shadow-lg hover:shadow-purple-900/20">
                       <h3 className="text-3xl font-black text-purple-400 group-hover:text-purple-300 mb-3">MESTRE</h3>
                       <p className="text-slate-400 text-lg leading-relaxed">Já faturo consistentemente e quero escalar agressivamente com tráfego pago e otimização.</p>
                   </button>
               </div>
               <button onClick={() => setStep(0)} className="text-slate-500 hover:text-white text-lg underline decoration-slate-700 hover:decoration-white underline-offset-4">Voltar e corrigir nicho</button>
           </div>
        )}
      </div>
    </div>
  );
};

/* --- DASHBOARD COM SIDEBAR --- */
const Dashboard = ({ niche, completedTasks = [], onTaskToggle, xp, level, resetApp, setLevel }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  
  // IMPORTAR O TEMA BASEADO NO NÍVEL
  const theme = useTheme(level);

  // LÓGICA DINÂMICA DE PROGRESSO
  const totalTasks = useMemo(() => {
    let count = 0;
    Object.values(MISSIONS_DATA).forEach(lvl => {
        Object.values(lvl).forEach(phase => {
            if(Array.isArray(phase)) count += phase.length;
        });
    });
    return count;
  }, []);

  const completedCount = Array.isArray(completedTasks) ? completedTasks.length : 0;
  const progressPercent = Math.min(100, Math.round((completedCount / totalTasks) * 100));
  
  // LÓGICA DO LINK SECRETO:
  const isMasterComplete = level === 'mestre' && progressPercent >= 95; 

  const NavButton = ({ id, icon: Icon, label, onClick }) => (
    <button 
      onClick={onClick ? onClick : () => { setActiveTab(id); setMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl font-bold text-lg transition-all ${activeTab === id ? theme.activeTab : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={26} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-200 font-sans selection:bg-cyan-500/30">
      <GlobalStyles />
      <StickyBuyButton theme={theme} /> {/* BOTÃO FLUTUANTE SEMPRE ATIVO */}
      
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex w-80 flex-col border-r border-white/5 bg-slate-950/50 backdrop-blur-xl h-screen fixed left-0 top-0 z-50 p-8">
        <div className="mb-14 mt-6 flex justify-center transform hover:scale-105 transition-transform duration-300">
            <NexusLogo className="h-32" theme={theme} />
        </div>
        <nav className="space-y-4 flex-1 custom-scrollbar overflow-y-auto pr-2">
          <div className="px-6 mb-4 text-xs font-black text-slate-500 uppercase tracking-widest">Menu Principal</div>
          <NavButton id="dashboard" icon={LayoutDashboard} label="Painel Principal" />
          <NavButton id="arsenal" icon={Wrench} label="Arsenal Nexus" />
          <NavButton id="agenda" icon={CalendarDays} label="Agenda Nexus" />
          
          <div className="px-6 mt-12 mb-4 text-xs font-black text-slate-500 uppercase tracking-widest">Suporte</div>
          <NavButton id="contacts" icon={MessageCircle} label="Contato" />
          <NavButton id="legal" icon={ShieldCheck} label="Termos de Uso" />
        </nav>
        
        <div className="mt-auto space-y-4">
            {/* SYSTEM STATUS CARD */}
            <div className="bg-slate-900/80 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <Server size={16} className="text-green-500"/>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sistema Online</span>
                </div>
                <div className="flex items-center gap-3">
                    <RefreshCw size={16} className="text-blue-500"/>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">v11.5.0 - Pro</span>
                </div>
            </div>

            <div className="pt-6 border-t border-white/10">
                <button onClick={resetApp} className="flex items-center justify-center gap-3 text-sm font-bold text-red-400 hover:text-red-300 transition-colors px-4 py-3 rounded-xl hover:bg-red-900/10 w-full group">
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform"/> Resetar Progresso
                </button>
            </div>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur border-b border-white/5 px-6 h-24 flex items-center justify-between shadow-xl">
        <NexusLogo showText={false} className="h-16" theme={theme} />
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-3 text-white bg-white/5 rounded-xl">
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950 pt-32 px-6 space-y-6 overflow-y-auto">
           <NavButton id="dashboard" icon={LayoutDashboard} label="Painel Principal" />
           <NavButton id="arsenal" icon={Wrench} label="Arsenal Nexus" />
           <NavButton id="agenda" icon={CalendarDays} label="Agenda Nexus" />
           <NavButton id="contacts" icon={MessageCircle} label="Contato" />
           <NavButton id="legal" icon={ShieldCheck} label="Termos de Uso" />
           <div className="h-px bg-white/10 my-8" />
           <button onClick={resetApp} className="text-red-400 flex items-center gap-4 py-5 font-bold text-xl w-full justify-center border border-red-500/20 rounded-2xl bg-red-500/5">Resetar App</button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-80 p-6 md:p-16 pt-32 md:pt-16 max-w-[1600px] mx-auto w-full">
        
        {/* HEADER STATS */}
        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center justify-between mb-16">
          <div>
             <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">QUARTEL GENERAL</h2>
             <p className="text-slate-400 text-xl">Operador: <span className="text-white font-bold capitalize bg-white/10 px-3 py-1 rounded-lg">{niche}</span></p>
          </div>
          <div className="flex items-center gap-8 bg-slate-900 border border-white/5 p-4 pr-8 rounded-3xl shadow-2xl">
             <div className={`h-20 w-20 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${theme.gradient} shadow-${theme.primary}-900/30`}>
               <Crown size={36} className="text-white" />
             </div>
             <div className="text-left">
               <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Patente Atual</div>
               <div className={`font-black text-3xl uppercase tracking-tight ${theme.text}`}>{level}</div>
               <div className="text-slate-400 text-sm font-mono font-bold mt-1">{xp} XP Acumulado</div>
             </div>
          </div>
        </div>

        {/* PAINEL PRINCIPAL (DASHBOARD) */}
        {activeTab === 'dashboard' && (
            <div className="animate-fadeIn space-y-12">
               
               {/* 1. CARD DE ASCENSÃO */}
               <div className={`p-[2px] rounded-[32px] shadow-2xl ${level === 'iniciante' ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500' : 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700'}`}>
                   <div className="bg-slate-950/90 backdrop-blur rounded-[30px] p-10 md:p-14 flex flex-col xl:flex-row items-center justify-between gap-10">
                       <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                           <div className={`p-8 rounded-full shadow-inner ${level === 'iniciante' ? 'bg-purple-500/10 text-purple-400 shadow-purple-500/20' : 'bg-cyan-500/10 text-cyan-400 shadow-cyan-500/20'}`}>
                               <GraduationCap size={56} />
                           </div>
                           <div>
                               <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                                   {level === 'iniciante' ? 'PRONTO PARA SUBIR DE NÍVEL?' : 'REVISÃO DE FUNDAMENTOS'}
                               </h3>
                               <p className="text-slate-400 max-w-2xl text-xl leading-relaxed">
                                   {level === 'iniciante' 
                                       ? 'Se você já validou sua oferta e fez suas primeiras vendas, não perca tempo. A fase "Mestre" desbloqueia Tráfego Pago e Escala.' 
                                       : 'Deseja mudar de nicho ou sente que a base está fraca? Você pode retornar ao nível Iniciante para ajustar a rota.'}
                               </p>
                           </div>
                       </div>
                       <Button 
                           onClick={() => setIsLevelModalOpen(true)}
                           variant="secondary"
                           className={`px-10 py-6 text-xl font-bold whitespace-nowrap w-full md:w-auto ${level === 'iniciante' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'}`}
                       >
                           {level === 'iniciante' ? 'ASCENDER PARA MESTRE' : 'VOLTAR PARA INICIANTE'}
                       </Button>
                   </div>
               </div>

               {/* 2. LINK SECRETO / EBOOKS - "DOMINÂNCIA DO PROTOCOLO" */}
               {isMasterComplete && (
                    <div className="mb-10 p-1 rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600 animate-pulse shadow-[0_0_50px_-10px_rgba(251,191,36,0.4)]">
                        <div className="bg-slate-950 rounded-[28px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-3xl font-black text-amber-400 mb-3 flex items-center gap-3">
                                    <Crown size={32} /> ACESSO ELITE LIBERADO
                                </h3>
                                <p className="text-slate-300 text-xl font-medium leading-relaxed">
                                    A teoria gratuita acaba aqui. O <strong>Curso Nexus Black</strong> não é apenas aula, é um arsenal nuclear de vendas.
                                </p>
                            </div>
                            <a 
                                href="https://nexusdigital.net.br" 
                                target="_blank" 
                                className="px-10 py-6 bg-amber-500 hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all shadow-xl shadow-amber-500/20 flex items-center gap-3 hover:scale-105 transform whitespace-nowrap"
                            >
                                ACESSAR CURSO <ArrowUpRight size={24} strokeWidth={3} />
                            </a>
                        </div>
                    </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <GlassCard className={`flex items-center gap-8 p-8 border-t-4 border-t-${theme.secondary}-500`} theme={theme}>
                       <div className={`p-5 bg-${theme.secondary}-500/10 rounded-2xl text-${theme.secondary}-400`}><Target size={40} /></div>
                       <div>
                       <div className="text-sm text-slate-500 font-black uppercase tracking-widest mb-2">Nicho Alvo</div>
                       <div className="text-white font-bold text-2xl capitalize">{niche}</div>
                       </div>
                   </GlassCard>
                   
                   <GlassCard className="flex items-center gap-8 p-8 border-t-4 border-t-green-500" theme={theme}>
                       <div className="p-5 bg-green-500/10 rounded-2xl text-green-400"><BarChart size={40} /></div>
                       <div>
                       <div className="text-sm text-slate-500 font-black uppercase tracking-widest mb-2">Progresso Global</div>
                       <div className="text-white font-bold text-2xl">{progressPercent}% Concluído</div>
                       </div>
                   </GlassCard>

                   <GlassCard className={`flex items-center gap-8 p-8 border-t-4 transition-all duration-500 ${isMasterComplete ? 'border-t-amber-500 bg-amber-500/5 cursor-pointer hover:scale-[1.02]' : 'border-t-slate-700 opacity-70 grayscale'}`} theme={theme}>
                        <div className={`p-5 rounded-2xl ${isMasterComplete ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-500'}`}>
                            {isMasterComplete ? <BookOpen size={40} strokeWidth={2.5} /> : <Lock size={40} />}
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 font-black uppercase tracking-widest mb-2">Biblioteca Oculta</div>
                            <div className={`font-bold text-2xl ${isMasterComplete ? 'text-amber-400' : 'text-slate-500'}`}>
                                {isMasterComplete ? 'DESBLOQUEADA' : 'Bloqueada'}
                            </div>
                            {!isMasterComplete && (
                                <div className="text-xs text-amber-500/70 mt-1 font-bold">Requer nível Mestre + 95%</div>
                            )}
                        </div>
                   </GlassCard>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <GlassCard className="flex flex-col justify-center items-center py-20 text-center relative overflow-hidden group" theme={theme}>
                       <div className="w-56 h-56 rounded-full border-[12px] border-slate-800 flex items-center justify-center relative mb-10 group-hover:scale-105 transition-transform duration-500">
                           <span className="text-6xl font-black text-white">{progressPercent}%</span>
                           <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                               <circle cx="50" cy="50" r="44" fill="none" stroke="transparent" strokeWidth="12" />
                               <circle cx="50" cy="50" r="44" fill="none" stroke={theme.iconColor} strokeWidth="12" strokeDasharray="276" strokeDashoffset={276 - (276 * progressPercent) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                           </svg>
                       </div>
                       <h3 className="text-3xl font-bold text-white mb-3">Status da Missão</h3>
                       <p className="text-slate-400 text-lg max-w-sm mb-10">Você está completando o protocolo {level}. Cada tarefa concluída é um passo a mais para a liberdade.</p>
                       <button onClick={() => setActiveTab('agenda')} className={`px-10 py-4 ${theme.button} text-white rounded-full font-bold text-xl transition-all shadow-xl hover:scale-105`}>
                           Continuar Missões
                       </button>
                   </GlassCard>

                   <div className="grid grid-rows-2 gap-10">
                       <GlassCard className="flex flex-col justify-center p-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden group" theme={theme}>
                           <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-950/70 transition-all duration-500"></div>
                           <div className="relative z-10">
                               <h4 className={`${theme.text} text-sm font-black uppercase tracking-widest mb-4`}>Próximo Passo</h4>
                               <p className="text-4xl font-black text-white leading-tight">
                                   {completedCount === 0 ? "Iniciar a Missão 01: Definição de Nicho" : "Revisar Métricas e Avançar para Próxima Fase"}
                               </p>
                               <button onClick={() => setActiveTab('agenda')} className={`mt-8 text-white text-lg font-bold hover:${theme.text} flex items-center gap-3 w-max transition-colors`}>
                                   Ir para Agenda <ChevronRight size={22} className={theme.text}/>
                               </button>
                           </div>
                       </GlassCard>
                       <GlassCard className="bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 flex flex-col justify-center p-10" theme={theme}>
                            <div className="flex items-center gap-4 mb-4">
                               <Sparkles size={32} className="text-yellow-400"/>
                               <h4 className="text-yellow-400 text-sm font-black uppercase tracking-widest">Mindset do Operador</h4>
                            </div>
                            <p className="text-slate-300 text-2xl italic leading-relaxed font-serif">"O segredo não é a velocidade, é a direção. Siga o protocolo sem pular etapas e o resultado será inevitável."</p>
                       </GlassCard>
                   </div>
               </div>
            </div>
        )}

        {/* AGENDA NEXUS (TASKS TAB) */}
        {activeTab === 'agenda' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* CTA NO TOPO SE MESTRE ESTIVER COMPLETO */}
            {isMasterComplete && (
                <div className="mb-12 p-1 rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600 shadow-2xl">
                    <div className="bg-slate-950 rounded-[28px] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div>
                            <h3 className="text-4xl font-black text-amber-500 mb-3 flex items-center gap-4"><Crown size={40} /> VOCÊ ZEROU O JOGO GRÁTIS</h3>
                            <p className="text-slate-300 text-xl">A Elite do mercado não opera com conteúdo gratuito. O próximo passo é pago, e é caro porque funciona.</p>
                        </div>
                        <a href="https://nexusdigital.net.br" target="_blank" className="px-12 py-6 bg-amber-500 hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all shadow-xl shadow-amber-500/20 flex items-center gap-4 hover:scale-105">
                            ENTRAR NA ELITE <Unlock size={28}/>
                        </a>
                    </div>
                </div>
            )}

            <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-10 gap-6">
                <div>
                    <h2 className="text-5xl font-black text-white mb-4">Agenda Tática</h2>
                    <p className="text-slate-400 text-xl max-w-2xl">Seu plano de voo detalhado. Execute dia após dia, sem pular etapas.</p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Status Global</div>
                    <div className="text-3xl font-black text-white">{progressPercent}% <span className="text-slate-500 text-xl font-medium">concluído</span></div>
                </div>
            </header>

            {/* LISTA DE MISSÕES */}
            <div className="grid gap-12">
                 {/* FASE 1 - INICIANTE */}
                 {level === 'iniciante' && (
                      <>
                          <div className="space-y-6">
                              <h3 className={`text-2xl font-black ${theme.text} uppercase tracking-widest pl-6 border-l-8 border-${theme.primary}-500`}>Semana 1: Fundação & Identidade</h3>
                              <GlassCard className="p-0 overflow-hidden shadow-2xl" theme={theme}>
                                  {MISSIONS_DATA.iniciante.fase1.map(t => <TaskItem key={t.id} {...t} done={completedTasks.includes(t.id)} onToggle={onTaskToggle} theme={theme} />)}
                                  <PhaseSummary data={MISSIONS_DATA.iniciante.fase1_summary} setActiveTab={setActiveTab} theme={theme} />
                              </GlassCard>
                          </div>

                          <div className="space-y-6">
                              <h3 className={`text-2xl font-black ${theme.text} uppercase tracking-widest pl-6 border-l-8 border-${theme.primary}-500`}>Semana 2: Estrutura de Vendas</h3>
                              <GlassCard className="p-0 overflow-hidden shadow-2xl" theme={theme}>
                                  {MISSIONS_DATA.iniciante.fase2.map(t => <TaskItem key={t.id} {...t} done={completedTasks.includes(t.id)} onToggle={onTaskToggle} theme={theme} />)}
                                  <PhaseSummary data={MISSIONS_DATA.iniciante.fase2_summary} setActiveTab={setActiveTab} theme={theme} />
                              </GlassCard>
                          </div>

                          <div className="space-y-6">
                              <h3 className={`text-2xl font-black ${theme.text} uppercase tracking-widest pl-6 border-l-8 border-${theme.primary}-500`}>Semana 3: Validação & Dinheiro</h3>
                              <GlassCard className="p-0 overflow-hidden shadow-2xl" theme={theme}>
                                  {MISSIONS_DATA.iniciante.fase3.map(t => <TaskItem key={t.id} {...t} done={completedTasks.includes(t.id)} onToggle={onTaskToggle} theme={theme} />)}
                                  <PhaseSummary data={MISSIONS_DATA.iniciante.fase3_summary} setActiveTab={setActiveTab} theme={theme} />
                              </GlassCard>
                          </div>

                          {/* !!! AQUI ESTÁ A CTA INTERMEDIÁRIA (APÓS DIA 15/FIM DE INICIANTE) !!! */}
                          <MidContentCTA theme={theme} />
                      </>
                 )}

                 {/* FASE 2 - MESTRE */}
                 {level === 'mestre' && (
                      <>
                          <div className="space-y-6">
                              <h3 className={`text-2xl font-black ${theme.text} uppercase tracking-widest pl-6 border-l-8 border-${theme.primary}-500`}>Semana 4: Tráfego Pago Profissional</h3>
                              <GlassCard className="p-0 overflow-hidden shadow-2xl" theme={theme}>
                                  {MISSIONS_DATA.mestre.fase1.map(t => <TaskItem key={t.id} {...t} done={completedTasks.includes(t.id)} onToggle={onTaskToggle} theme={theme} />)}
                                  <PhaseSummary data={MISSIONS_DATA.mestre.fase1_summary} setActiveTab={setActiveTab} theme={theme} />
                              </GlassCard>
                          </div>
                          
                          <div className="space-y-6">
                              <h3 className={`text-2xl font-black ${theme.text} uppercase tracking-widest pl-6 border-l-8 border-${theme.primary}-500`}>Semana 5: Otimização de LTV</h3>
                              <GlassCard className="p-0 overflow-hidden shadow-2xl" theme={theme}>
                                  {MISSIONS_DATA.mestre.fase2.map(t => <TaskItem key={t.id} {...t} done={completedTasks.includes(t.id)} onToggle={onTaskToggle} theme={theme} />)}
                                  <PhaseSummary data={MISSIONS_DATA.mestre.fase2_summary} setActiveTab={setActiveTab} theme={theme} />
                              </GlassCard>
                          </div>

                          <div className="space-y-6">
                              <h3 className={`text-2xl font-black ${theme.text} uppercase tracking-widest pl-6 border-l-8 border-${theme.primary}-500`}>Semana 6: Escala & Liberdade</h3>
                              <GlassCard className="p-0 overflow-hidden shadow-2xl" theme={theme}>
                                  {MISSIONS_DATA.mestre.fase3.map(t => <TaskItem key={t.id} {...t} done={completedTasks.includes(t.id)} onToggle={onTaskToggle} theme={theme} />)}
                                  <PhaseSummary data={MISSIONS_DATA.mestre.fase3_summary} setActiveTab={setActiveTab} theme={theme} />
                              </GlassCard>
                          </div>
                      </>
                 )}
            </div>
          </div>
        )}

        {/* ARSENAL NEXUS (TOOLKIT TAB) */}
        {activeTab === 'arsenal' && (
          <div className="grid gap-12 animate-fadeIn">
            {/* ... Conteúdo do Arsenal ... */}
            <header className="mb-6 border-b border-white/10 pb-10">
                <h2 className="text-5xl font-black text-white mb-4">Arsenal Nexus</h2>
                <p className="text-slate-400 text-xl">Ferramentas de elite para construir seu ecossistema. Selecionadas a dedo.</p>
            </header>

            {/* DICA DE OURO EXPANDIDA E COMPLETA */}
            {level === 'iniciante' && (
                <div className="rounded-3xl bg-gradient-to-br from-yellow-900/40 to-slate-900 border border-yellow-500/30 overflow-hidden shadow-2xl shadow-yellow-900/20">
                    <div className="bg-yellow-500/10 px-8 py-6 border-b border-yellow-500/20 flex items-center gap-4">
                        <AlertTriangle size={32} className="text-yellow-500" />
                        <h4 className="text-yellow-400 font-black text-2xl tracking-wide uppercase">PROTOCOLO DE GUERRILHA (Modo Gratuito)</h4>
                    </div>
                    <div className="p-8 md:p-10 space-y-8">
                        <p className="text-slate-200 text-xl font-medium leading-relaxed">
                            Muitas ferramentas abaixo são pagas, mas possuem testes gratuitos (Free Trial). Se você está sem caixa, utilize este protocolo para operar com custo zero até sua primeira venda:
                        </p>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="p-3 bg-slate-800 rounded-lg text-cyan-400"><Mail size={24}/></div>
                                <div>
                                    <h5 className="text-white font-bold text-lg mb-1">E-mails Infinitos</h5>
                                    <p className="text-slate-400">Crie múltiplas contas no Gmail ou Outlook. Use um e-mail novo para cada período de teste (7 ou 14 dias).</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="p-3 bg-slate-800 rounded-lg text-cyan-400"><CreditCard size={24}/></div>
                                <div>
                                    <h5 className="text-white font-bold text-lg mb-1">Cartão Virtual</h5>
                                    <p className="text-slate-400">Use cartões virtuais do Nubank/Inter que podem ser bloqueados/apagados após o cadastro para evitar cobranças indesejadas.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-950/50 p-6 rounded-xl border-l-4 border-yellow-500">
                             <p className="text-slate-400 italic text-lg">"O empreendedor de guerrilha não reclama da falta de recursos; ele usa a criatividade como moeda. Use o sistema a seu favor."</p>
                        </div>
                    </div>
                </div>
            )}

            {TOOLKIT_DATA.map(cat => (
              <div key={cat.id}>
                <div className="flex items-center gap-5 mb-8">
                  <div className={`p-4 bg-slate-800 rounded-2xl border border-white/5 shadow-lg`}><cat.icon size={32} className={theme.text} /></div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{cat.title}</h3>
                    <p className="text-slate-400 text-base">{cat.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.tools.map((tool, idx) => (
                    <ToolCard key={idx} tool={tool} theme={theme} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

         {/* CONTACTS TAB */}
         {activeTab === 'contacts' && (
            <div className="animate-fadeIn max-w-5xl mx-auto pb-16">
              <header className="mb-16 text-center md:text-left border-b border-white/10 pb-16">
                <h2 className="text-5xl font-black text-white mb-6">Central de Comando</h2>
                <p className="text-slate-400 text-2xl max-w-3xl leading-relaxed">
                  Está travado em alguma etapa ou precisa de uma análise tática? Nossa equipe de suporte está pronta.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <a href="https://wa.me/5524981073909" target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <GlassCard hoverEffect={true} className="flex flex-col items-center justify-center py-20 gap-8 h-full border-green-500/30 hover:bg-green-950/20 shadow-2xl shadow-green-900/10" theme={theme}>
                    <div className="p-8 bg-green-500/10 rounded-full text-green-400 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                      <MessageCircle size={72} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-white group-hover:text-green-400 transition-colors mb-3">WhatsApp Oficial</h3>
                      <p className="text-slate-400 text-xl font-mono">+55 24 98107-3909</p>
                    </div>
                    <span className="mt-8 px-10 py-4 rounded-full bg-green-500 text-black font-black text-lg group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all transform group-hover:-translate-y-1">
                      CHAMAR SUPORTE
                    </span>
                  </GlassCard>
                </a>
                <a href="https://instagram.com/metodo_nexus" target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <GlassCard hoverEffect={true} className="flex flex-col items-center justify-center py-20 gap-8 h-full border-pink-500/30 hover:bg-pink-950/20 shadow-2xl shadow-pink-900/10" theme={theme}>
                    <div className="p-8 bg-pink-500/10 rounded-full text-pink-400 group-hover:scale-110 transition-transform duration-300 border border-pink-500/20">
                      <Instagram size={72} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-white group-hover:text-pink-400 transition-colors mb-3">Instagram</h3>
                      <p className="text-slate-400 text-xl">@metodo_nexus</p>
                    </div>
                    <span className="mt-8 px-10 py-4 rounded-full bg-pink-500 text-black font-black text-lg group-hover:shadow-lg group-hover:shadow-pink-500/30 transition-all transform group-hover:-translate-y-1">
                      VER BASTIDORES
                    </span>
                  </GlassCard>
                </a>
              </div>
              
              <div className="mt-16 p-10 rounded-3xl bg-slate-800/50 border border-white/10 text-center shadow-xl">
                <p className={`${theme.text} text-xl font-bold tracking-widest uppercase flex items-center justify-center gap-4`}>
                  <Zap size={24} className={theme.pulse}/> O atendimento é priorizado para membros ativos.
                </p>
              </div>
            </div>
          )}

           {/* LEGAL TAB */}
           {activeTab === 'legal' && (
            <div className="animate-fadeIn max-w-5xl mx-auto pb-12">
               <h2 className="text-5xl font-black text-white mb-16">Termos & Privacidade</h2>
               <GlassCard className="p-12" theme={theme}>
                   <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-10">
                        <div className={`p-6 bg-slate-800 rounded-2xl border border-white/10 ${theme.text}`}><ShieldCheck size={48}/></div>
                        <div>
                             <h3 className="text-4xl font-bold text-white mb-2">Documentação Oficial</h3>
                             <p className="text-slate-400 text-lg">Leia com atenção antes de prosseguir.</p>
                        </div>
                   </div>
                   
                   <div className="text-slate-300 space-y-8 leading-relaxed text-xl">
                       <p>Este produto é comercializado com garantia incondicional de satisfação por meio da plataforma de pagamentos segura. Nós prezamos pela transparência total.</p>
                       <p>Os resultados podem variar de acordo com a dedicação e aplicação individual das estratégias. Não prometemos dinheiro fácil, prometemos um método validado.</p>
                       <div className="p-6 bg-slate-950/50 rounded-xl border border-white/5 text-base text-slate-500 font-mono">
                           © 2025 Arthur Furtado Silva/Nexus Digital. Todos os direitos reservados. CNPJ e detalhes adicionais disponíveis na página de checkout.
                       </div>
                   </div>

                   <div className="mt-12 pt-10 border-t border-white/5">
                        <a 
                           href="https://termos-protocolo-dominan-exayvin.gamma.site" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className={`inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 ${theme.text} hover:${theme.textHover} transition-all font-bold text-xl group w-full justify-center md:w-auto`}
                        >
                           <ExternalLink size={24} className="group-hover:scale-110 transition-transform" />
                           Ler Política de Privacidade & Termos
                        </a>
                   </div>
               </GlassCard>
            </div>
           )}

        {/* FOOTER */}
        <footer className="mt-24 pt-12 border-t border-white/5 text-center text-slate-500 text-base pb-12 font-medium">
          <p className="mb-2">© 2025 Arthur Furtado Silva/Nexus Digital. Todos os direitos reservados.</p>
          <p className="text-sm opacity-60">Sistema Operacional Nexus v11.5</p>
        </footer>

      </main>

      <LevelUpModal
        isOpen={isLevelModalOpen}
        onClose={() => setIsLevelModalOpen(false)}
        onConfirm={(target) => { setLevel(target); setIsLevelModalOpen(false); }}
        currentLevel={level}
        progress={progressPercent}
        theme={theme}
      />
    </div>
  );
};

/* --- APP PRINCIPAL --- */
export default function App() {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('nexus_pro_v11'); 
    return saved ? JSON.parse(saved) : { niche: null, level: 'iniciante', completedTasks: [], xp: 0 };
  });

  useEffect(() => {
    localStorage.setItem('nexus_pro_v11', JSON.stringify(userData));
  }, [userData]);

  const handleReset = () => {
    if(window.confirm("ATENÇÃO: Isso apagará todo seu progresso e XP. Deseja continuar?")) {
      setUserData({ niche: null, level: 'iniciante', completedTasks: [], xp: 0 });
    }
  };

  const handleTaskToggle = (taskId, isDone) => {
    let taskXP = 0;
    Object.values(MISSIONS_DATA).forEach(lvl => {
      Object.values(lvl).forEach(arr => {
        if(Array.isArray(arr)) {
          const t = arr.find(x => x.id === taskId);
          if(t) taskXP = t.xp;
        }
      });
    });

    setUserData(prev => {
      const safeTasks = Array.isArray(prev.completedTasks) ? prev.completedTasks : [];
      const newCompleted = isDone ? [...safeTasks, taskId] : safeTasks.filter(id => id !== taskId);
      const newXP = isDone ? (prev.xp || 0) + taskXP : (prev.xp || 0) - taskXP;
      return { ...prev, completedTasks: newCompleted, xp: Math.max(0, newXP) };
    });
  };

  if (!userData.niche) return <OnboardingScreen onComplete={(d) => setUserData(prev => ({ ...prev, niche: d.niche, level: d.level }))} />;
  
  return <Dashboard niche={userData.niche} completedTasks={userData.completedTasks || []} xp={userData.xp} level={userData.level} onTaskToggle={handleTaskToggle} resetApp={handleReset} setLevel={(l) => setUserData(prev => ({...prev, level: l}))} />;
}