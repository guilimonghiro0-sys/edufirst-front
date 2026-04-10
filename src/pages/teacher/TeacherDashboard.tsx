import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Calendar, BarChart3, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";

interface Class {
  id: string;
  name: string;
  subject: string;
  students: number;
  nextClass: string;
  room: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  submitted: number;
  total: number;
  status: 'pending' | 'graded' | 'overdue';
}

const mockClasses: Class[] = [
  { id: "1", name: "Terminale S", subject: "Mathématiques", students: 32, nextClass: "Lundi 14h-15h30", room: "Salle 201" },
  { id: "2", name: "1ère L", subject: "Français", students: 28, nextClass: "Mardi 10h-11h30", room: "Salle 105" },
  { id: "3", name: "Terminale ES", subject: "Histoire-Géo", students: 30, nextClass: "Mercredi 13h-14h30", room: "Salle 112" },
];

const mockAssignments: Assignment[] = [
  { id: "1", title: "Devoir sur les équations différentielles", subject: "Mathématiques", dueDate: "2024-01-15", submitted: 28, total: 32, status: 'pending' },
  { id: "2", title: "Dissertation sur Camus", subject: "Français", dueDate: "2024-01-12", submitted: 25, total: 28, status: 'graded' },
  { id: "3", title: "Carte mentale sur la Révolution française", subject: "Histoire-Géo", dueDate: "2024-01-10", submitted: 22, total: 30, status: 'overdue' },
];

const TeacherDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'classes' | 'assignments'>('overview');

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Bienvenue, Professeur Dupont</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle leçon
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes enseignées</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Cette année</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Élèves totaux</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90</div>
              <p className="text-xs text-muted-foreground">Sous ma responsabilité</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devoirs en attente</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">À corriger</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prochaine classe</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14h</div>
              <p className="text-xs text-muted-foreground">Terminale S - Maths</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setSelectedTab('classes')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'classes' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mes classes
          </button>
          <button
            onClick={() => setSelectedTab('assignments')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'assignments' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Devoirs
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Upcoming Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>Cours à venir</CardTitle>
                  <CardDescription>Prochaines sessions de cours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{cls.name} - {cls.subject}</p>
                        <p className="text-sm text-gray-600">{cls.nextClass}</p>
                        <p className="text-xs text-gray-500">{cls.room} • {cls.students} élèves</p>
                      </div>
                      <Button variant="outline" size="sm">Voir détails</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Dernières actions et notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Devoir de maths corrigé pour Terminale S</p>
                      <p className="text-xs text-gray-500">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Nouvelle inscription d'élève en 1ère L</p>
                      <p className="text-xs text-gray-500">Il y a 4 heures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Rappel : Réunion pédagogique demain</p>
                      <p className="text-xs text-gray-500">Il y a 6 heures</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === 'classes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {mockClasses.map((cls) => (
                <Card key={cls.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {cls.name}
                      <Badge variant="secondary">{cls.subject}</Badge>
                    </CardTitle>
                    <CardDescription>{cls.students} élèves inscrits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {cls.nextClass}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {cls.room}
                      </div>
                      <Button className="w-full" variant="outline">Gérer la classe</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {selectedTab === 'assignments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {mockAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription>{assignment.subject} • Échéance: {assignment.dueDate}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        <span className="ml-1 capitalize">{assignment.status === 'pending' ? 'En attente' : assignment.status === 'graded' ? 'Corrigé' : 'En retard'}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm text-gray-600">Soumissions</p>
                          <p className="text-lg font-semibold">{assignment.submitted}/{assignment.total}</p>
                        </div>
                        <Progress value={(assignment.submitted / assignment.total) * 100} className="w-24" />
                      </div>
                      <Button variant="outline">Voir détails</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;