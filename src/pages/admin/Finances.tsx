import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
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
    Send,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Finances = () => {
    const [activeTab, setActiveTab] = useState('Tableau de bord');

    // Données factices pour l'UI
    const transactions = [
        { id: 1, name: 'Abonnement Bibliothèque', date: '04.07.2026 12:40 AM', amount: -4.99, status: 'Réussi', type: 'Education' },
        { id: 2, name: 'Virement de Tutorat', date: '03.07.2026 09:15 PM', amount: 150.00, status: 'Réussi', type: 'Revenu' },
        { id: 3, name: 'Matériel Scolaire', date: '02.07.2026 03:22 PM', amount: -89.50, status: 'Réussi', type: 'Fournitures' },
        { id: 4, name: 'Bourse Étudiante', date: '01.07.2026 11:15 AM', amount: 500.00, status: 'Réussi', type: 'Bourse' },
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
        <DashboardLayout role="admin">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Finances</h1>
                        <p className="text-muted-foreground text-sm mt-1">Gestion budgétaire et financière de l'établissement</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Search className="w-4 h-4 mr-2" />
                            Rechercher
                        </Button>
                        <Button variant="outline" size="sm">
                            <Bell className="w-4 h-4 mr-2" />
                            Notifications
                        </Button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-border">
                    {sidebarItems.map((item) => (
                        <Button
                            key={item.name}
                            variant={activeTab === item.name ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setActiveTab(item.name)}
                            className="flex items-center gap-2"
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section: Balances and Charts */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Balance Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Total Balance */}
                            <Card className="md:col-span-2 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Wallet className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-medium text-muted-foreground">Solde Total</span>
                                        </div>
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            +2,456 ce mois
                                        </Badge>
                                    </div>
                                    <div className="text-3xl font-bold text-foreground mb-2">
                                        120,456.50 <span className="text-lg text-muted-foreground">$</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="default">
                                            Transfert
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            Recharger
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Revenue */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">Revenus</span>
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-green-600 mb-1">
                                        +2,456 $
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        +15.7% cette semaine
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Expenses */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">Dépenses</span>
                                        <TrendingDown className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-red-600 mb-1">
                                        -1,124 $
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        -10.7% cette semaine
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Revenue Flow Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Flux de revenus
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Mensuel</Button>
                                        <Button variant="ghost" size="sm">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-48 flex items-end justify-between gap-2">
                                    {[
                                        { month: 'Avr', height: '40%', value: '$4.1K', active: false },
                                        { month: 'Mai', height: '60%', value: '$2.2K', active: false },
                                        { month: 'Juin', height: '85%', value: '$3.5K', active: false },
                                        { month: 'Juil', height: '35%', value: '$1.2K', active: false },
                                        { month: 'Août', height: '100%', value: '$2.4K', active: true }
                                    ].map((bar, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
                                            <div className="relative w-full flex justify-center items-end h-32">
                                                <div
                                                    style={{ height: bar.height }}
                                                    className={`w-8 rounded-t-lg transition-all duration-300 ${
                                                        bar.active
                                                            ? 'bg-primary shadow-lg'
                                                            : 'bg-muted group-hover:bg-muted/80'
                                                    }`}
                                                >
                                                    {bar.active && (
                                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs p-2 rounded-lg shadow-lg border whitespace-nowrap">
                                                            <div className="font-bold">{bar.value}</div>
                                                            <div className="text-green-600">+16%</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-xs text-muted-foreground mt-2 font-medium">{bar.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Transactions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Transactions récentes
                                    <Badge variant="secondary">234</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {transactions.map(t => (
                                        <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                                    <Send className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">{t.name}</div>
                                                    <div className="text-xs text-muted-foreground">{t.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={t.status === 'Réussi' ? 'default' : 'secondary'} className="text-xs">
                                                    {t.status}
                                                </Badge>
                                                <div className={`font-bold text-sm ${
                                                    t.amount < 0 ? 'text-red-600' : 'text-green-600'
                                                }`}>
                                                    {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount)}
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Section: Cards and Subscriptions */}
                    <div className="space-y-6">
                        {/* Cards Stack */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Mes cartes
                                    <Badge variant="secondary">3</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative h-64">
                                    {/* Card Stack Effect */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-orange-200 rounded-2xl opacity-30 blur-sm"></div>
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-11/12 h-36 bg-cyan-200 rounded-2xl opacity-40 blur-sm"></div>
                                    <div className="absolute top-4 left-0 w-full h-40 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-2xl p-4 shadow-lg text-white">
                                        <div className="flex justify-between items-start mb-8">
                                            <span className="text-lg font-bold">VISA</span>
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="text-sm tracking-wider">4156 6727 1439 6902</div>
                                            <div className="flex justify-between text-xs">
                                                <div>
                                                    <div className="opacity-75 uppercase">Titulaire</div>
                                                    <div className="font-semibold">Micky Larson</div>
                                                </div>
                                                <div>
                                                    <div className="opacity-75 uppercase">Expire</div>
                                                    <div className="font-semibold">07/25</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <Button variant="outline" size="sm">
                                        Voir le code PIN
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* EduFirst Services */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Services EduFirst
                                    <Badge variant="secondary">5</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2 mb-4">
                                    {['📚', '🎓', '📝', '🌍', '💻'].map((emoji, i) => (
                                        <div key={i} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    {subscriptions.map((sub, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="text-lg">{sub.icon}</div>
                                                <div>
                                                    <div className="font-medium text-sm">{sub.name}</div>
                                                    <div className="text-xs text-muted-foreground">{sub.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm">${sub.price}</span>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Budget Breakdown */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Répartition budget</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { category: 'Éducation', amount: 45, color: 'bg-blue-500' },
                                        { category: 'Infrastructure', amount: 25, color: 'bg-green-500' },
                                        { category: 'Personnel', amount: 20, color: 'bg-purple-500' },
                                        { category: 'Matériel', amount: 10, color: 'bg-orange-500' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                                <span className="text-sm">{item.category}</span>
                                            </div>
                                            <span className="font-medium">{item.amount}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Finances;