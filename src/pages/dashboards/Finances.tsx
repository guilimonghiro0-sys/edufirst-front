import React, { useState } from 'react';
import {
    LayoutDashboard,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    Wallet,
    Search,
    Bell,
    MoreHorizontal,
    GraduationCap,
    BookOpen,
    Calendar,
    Plus,
    Send
} from 'lucide-react';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Tableau de bord');

    // Données factices pour l'UI
    const transactions = [
        { id: 1, name: 'Abonnement Bibliothèque', date: '04.07.2026 12:40 AM', amount: -4.99, status: 'Réussi', type: 'Education' },
        { id: 2, name: 'Virement de Tutorat', date: '03.07.2026 09:15 PM', amount: 150.00, status: 'Réussi', type: 'Revenu' },
    ];

    const subscriptions = [
        { name: 'iCloud Etudiant', icon: '☁️', price: 2.99, date: 'Prochain 15 Juil' },
        { name: 'Coursera Plus', icon: '🎓', price: 49.00, date: 'Prochain 19 Juil' },
        { name: 'ChatGPT Plus', icon: '🤖', price: 20.00, date: 'Prochain 04 Août' },
    ];

    const sidebarItems = [
        { name: 'Tableau de bord', icon: LayoutDashboard },
        { name: 'Statistiques', icon: BarChart3 },
        { name: 'Transactions', icon: ArrowUpRight },
        { name: 'Mon Portefeuille', icon: Wallet },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white font-sans p-4 md:p-8 flex items-center justify-center">
            {/* Container Principal Style Tablette */}
            <div className="w-full max-w-7xl bg-[#141417] rounded-[40px] shadow-2xl overflow-hidden border border-white/5 flex flex-col md:flex-row h-[90vh]">

                {/* Barre de navigation supérieure (Style Header Image) */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 pointer-events-none">
                    {/* Logo placeholder */}
                </div>

                {/* Contenu Principal */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">

                    {/* Header avec Navigation */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-600 p-2 rounded-xl">
                                <GraduationCap size={28} className="text-white" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">EduFirst <span className="text-gray-500 font-medium">Finance</span></h1>
                        </div>

                        <nav className="bg-[#1c1c21] rounded-full p-1.5 flex gap-2 self-start md:self-center">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => setActiveTab(item.name)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === item.name
                                        ? 'bg-white text-black shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <button className="p-2.5 rounded-full bg-[#1c1c21] text-gray-400 hover:text-white transition-colors">
                                <Search size={20} />
                            </button>
                            <button className="p-2.5 rounded-full bg-[#1c1c21] text-gray-400 hover:text-white transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1c1c21]"></span>
                            </button>
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                alt="Avatar"
                                className="w-10 h-10 rounded-full border border-indigo-500/50"
                            />
                        </div>
                    </header>

                    <h2 className="text-4xl font-semibold mb-8">Mon Tableau de bord</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Section Gauche: Soldes et Graphiques */}
                        <div className="lg:col-span-8 space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Carte Solde Total - Gradient Vert/Jaune style image */}
                                <div className="bg-gradient-to-br from-[#8af7b7] via-[#a8f98c] to-[#d6ff7d] p-8 rounded-[32px] text-black flex flex-col justify-between h-[240px] shadow-[0_20px_50px_rgba(138,247,183,0.15)]">
                                    <div>
                                        <p className="text-sm font-semibold opacity-70">Solde Total</p>
                                        <h3 className="text-5xl font-bold mt-2">120,456.50 <span className="text-2xl">$</span></h3>
                                        <p className="text-sm mt-3 font-medium opacity-80">+2,456 revenue ce mois-ci</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-zinc-900 transition-all">
                                            Transfert
                                        </button>
                                        <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm border border-black/5 hover:bg-gray-100 transition-all">
                                            Recharger
                                        </button>
                                    </div>
                                </div>

                                {/* Revenus & Dépenses en colonnes */}
                                <div className="grid grid-rows-2 gap-4">
                                    {/* Revenus */}
                                    <div className="bg-[#1c1c21] p-6 rounded-[24px] border border-white/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Revenus</p>
                                            <h4 className="text-2xl font-bold text-white">+2,456 <span className="text-sm opacity-50">$</span></h4>
                                            <p className="text-[10px] text-gray-500 mt-1">Revenus de la semaine</p>
                                        </div>
                                        <div className="bg-[#8af7b7]/10 text-[#8af7b7] px-3 py-1 rounded-full text-xs font-bold">
                                            +15.7%
                                        </div>
                                    </div>
                                    {/* Dépenses */}
                                    <div className="bg-[#1c1c21] p-6 rounded-[24px] border border-white/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Dépenses Scolaires</p>
                                            <h4 className="text-2xl font-bold text-white">-1,124 <span className="text-sm opacity-50">$</span></h4>
                                            <p className="text-[10px] text-gray-500 mt-1">Dépenses de la semaine</p>
                                        </div>
                                        <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
                                            -10.7%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Graphique de Flux de Revenus (Barres simplifiées) */}
                            <div className="bg-[#1c1c21] p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-lg font-semibold">Flux de revenus</h3>
                                    <div className="flex gap-2">
                                        <button className="bg-[#2a2a30] text-[10px] px-3 py-1 rounded-full text-gray-400 uppercase tracking-widest">Mensuel</button>
                                        <button className="bg-[#2a2a30] p-1.5 rounded-full text-gray-400"><ArrowUpRight size={14} /></button>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between h-[150px] gap-2">
                                    {[
                                        { m: 'Avr', h: '40%', val: '$4.1K' },
                                        { m: 'Mai', h: '60%', val: '$2.2K' },
                                        { m: 'Juin', h: '85%', val: '$3.5K' },
                                        { m: 'Juil', h: '35%', val: '$1.2K' },
                                        { m: 'Août', h: '100%', val: '$2.4K', active: true }
                                    ].map((bar, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
                                            <div className="relative w-full flex justify-center items-end h-[120px]">
                                                <div
                                                    style={{ height: bar.h }}
                                                    className={`w-10 rounded-t-xl transition-all duration-500 ${bar.active ? 'bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.4)]' : 'bg-[#2a2a30] group-hover:bg-[#3a3a45]'}`}
                                                >
                                                    {bar.active && (
                                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#3a3a45] text-[10px] p-2 rounded-lg whitespace-nowrap shadow-xl">
                                                            <span className="block font-bold text-white">$2,456.00</span>
                                                            <span className="text-green-400">+16%</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-gray-500 mt-4 uppercase font-bold tracking-tighter">{bar.m}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Transactions Récentes */}
                            <div className="bg-[#1c1c21] p-8 rounded-[32px] border border-white/5">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold">Transactions récentes <span className="text-gray-500 text-sm ml-2">234</span></h3>
                                    <button className="text-xs text-gray-400 hover:text-white transition-colors">Voir tout &gt;</button>
                                </div>
                                <div className="space-y-4">
                                    {transactions.map(t => (
                                        <div key={t.id} className="flex items-center justify-between p-2">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                                    <Send size={16} className="text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{t.name}</p>
                                                    <p className="text-[10px] text-gray-500">{t.date}</p>
                                                </div>
                                            </div>
                                            <div className="bg-[#8af7b7]/10 text-[#8af7b7] px-3 py-1 rounded-full text-[10px] font-bold">
                                                {t.status}
                                            </div>
                                            <div className="text-gray-500 text-xs hidden md:block">**4352</div>
                                            <div className={`font-bold ${t.amount < 0 ? 'text-white' : 'text-green-400'}`}>
                                                {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount)}
                                            </div>
                                            <button className="text-gray-500"><MoreHorizontal size={18} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section Droite: Cartes et Subscriptions */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Stack de Cartes - Style visuel de l'image */}
                            <div className="bg-[#1c1c21] p-8 rounded-[32px] border border-white/5">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold">Mes cartes <sup className="text-xs text-gray-500 ml-1">3</sup></h3>
                                    <div className="bg-[#2a2a30] rounded-full p-1 flex gap-1">
                                        <button className="px-3 py-1 text-[10px] bg-white text-black rounded-full font-bold">Détails</button>
                                        <button className="px-2 py-1 text-[10px] text-gray-400"><Plus size={12} /></button>
                                    </div>
                                </div>

                                <div className="relative h-[280px] mt-10">
                                    {/* Carte Rose (Arrière) */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-40 bg-orange-300 rounded-3xl opacity-40 blur-[1px]"></div>
                                    {/* Carte Bleue (Milieu) */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] h-44 bg-cyan-300 rounded-3xl opacity-60 blur-[1px]"></div>
                                    {/* Carte Violette (Avant - Active) */}
                                    <div className="absolute top-8 left-0 w-full h-56 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[32px] p-6 shadow-2xl overflow-hidden group">
                                        <div className="flex justify-between items-start">
                                            <span className="text-2xl font-black italic tracking-tighter">VISA</span>
                                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                <CreditCard size={20} />
                                            </div>
                                        </div>
                                        <div className="mt-10">
                                            <p className="text-sm opacity-80 font-medium tracking-[0.2em]">4156 6727 1439 6902</p>
                                            <div className="flex justify-between items-end mt-8">
                                                <div>
                                                    <p className="text-[10px] opacity-60 uppercase">Titulaire</p>
                                                    <p className="text-sm font-bold">Micky Larson</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] opacity-60 uppercase">Expire</p>
                                                    <p className="text-sm font-bold">07/25</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Effet verre flouté superposé comme dans l'image */}
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white/10 backdrop-blur-md border-t border-white/20 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <button className="text-xs font-bold uppercase tracking-widest">Voir le code PIN</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subscriptions - Style Education */}
                            <div className="bg-[#1c1c21] p-8 rounded-[32px] border border-white/5">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold">Services EduFirst <sup className="text-xs text-gray-500 ml-1">5</sup></h3>
                                    <button className="text-xs text-gray-400 hover:text-white transition-colors">Gérer &gt;</button>
                                </div>

                                {/* Icônes de groupe */}
                                <div className="flex gap-2 mb-8">
                                    {['📚', '🎓', '📝', '🌍', '💻'].map((emoji, i) => (
                                        <div key={i} className="w-10 h-10 bg-[#2a2a30] rounded-full flex items-center justify-center text-lg shadow-sm border border-white/5">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    {subscriptions.map((sub, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl hover:bg-black/40 transition-colors border border-transparent hover:border-white/5 cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="text-xl">{sub.icon}</div>
                                                <div>
                                                    <p className="text-sm font-medium">{sub.name}</p>
                                                    <p className="text-[10px] text-gray-500">{sub.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold">${sub.price}</span>
                                                <MoreHorizontal size={14} className="text-gray-600" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Répartition des dépenses (Circle chart style) */}
                            <div className="bg-[#1c1c21] p-8 rounded-[32px] border border-white/5">
                                <h3 className="text-lg font-semibold mb-6">Répartition budget</h3>
                                <div className="flex items-center gap-8">
                                    <div className="relative w-28 h-28">
                                        {/* Anneau de progression simplifié avec des bordures circulaires */}
                                        <div className="w-full h-full rounded-full border-[10px] border-indigo-500 border-t-pink-500 border-l-yellow-400 border-r-emerald-400 rotate-45 flex items-center justify-center">
                                            <div className="bg-[#1c1c21] w-full h-full rounded-full flex flex-col items-center justify-center -rotate-45">
                                                <span className="text-[10px] text-gray-500 uppercase font-bold">Total</span>
                                                <span className="text-sm font-black">$1,124</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-y-3 gap-x-4">
                                        {[
                                            { label: 'Cours', p: '30%', c: 'bg-indigo-500' },
                                            { label: 'Loisirs', p: '10%', c: 'bg-pink-500' },
                                            { label: 'Santé', p: '10%', c: 'bg-emerald-400' },
                                            { label: 'Matériel', p: '15%', c: 'bg-yellow-400' },
                                            { label: 'Logis', p: '20%', c: 'bg-blue-400' },
                                            { label: 'Autre', p: '15%', c: 'bg-orange-400' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className={`w-1 h-3 rounded-full ${item.c}`}></div>
                                                    <span className="text-[10px] text-gray-400">{item.label}</span>
                                                </div>
                                                <span className="text-xs font-bold pl-3">{item.p}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Styles CSS injectés pour les scrolls et effets spécifiques */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
        </div>
    );
};

export default App;