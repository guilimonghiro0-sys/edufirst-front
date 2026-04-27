// src/pages/student/StudentDashboardV2.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users } from 'lucide-react';

const deadlines = [
  { title: "Calculus II: Final Assignment", due: "Integration Techniques • Due in 4 hours", action: "SUBMIT NOW", urgent: true },
  { title: "Modern History: Quiz 3", due: "Cold War Era • Tomorrow, 10:00 AM", action: "STUDY MATERIAL" },
  { title: "Bio-Chemistry Lab Report", due: "Enzyme Kinetics • Friday, 11:59 PM", action: null },
];

const studyGroup = [
  { name: "Sarah Miller", message: "Does anyone understand the second problem in the Physics assignment?", time: "09:15 AM" },
  { name: "David Chen", message: "I think it involves using the Schrödinger equation for a finite potential well." },
];

export default function StudentDashboardV2() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Good Morning, Alex! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
        </div>
        <Button variant="outline">View All Schedule →</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche : Cours en cours */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Current Subjects</h2>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">Physics: Quantum Mechanics</p>
                  <p className="text-sm text-muted-foreground">Module 4: Wave-Particle Duality</p>
                  <Progress value={65} className="w-32 h-2 mt-2" />
                </div>
                <Button size="sm">Resume Learning</Button>
              </CardContent>
            </Card>
            {/* Autres cours à ajouter de manière similaire */}
          </div>

          {/* Échéances */}
          <h2 className="text-xl font-semibold mt-6">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {deadlines.map((dl, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{dl.title}</p>
                    <p className="text-sm text-muted-foreground">{dl.due}</p>
                  </div>
                  {dl.action && <Button variant={dl.urgent ? "default" : "outline"} size="sm">{dl.action}</Button>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Colonne droite : Groupe d'étude */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users size={18} /> Peer Study Group</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyGroup.map((msg, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-sm">{msg.name}</p>
                  <p className="text-sm text-muted-foreground">{msg.message}</p>
                </div>
              ))}
              <Button variant="outline" size="sm">Join conversation</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar size={18} /> Today's schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">10:00 AM - Physics Lab</p>
              <p className="text-sm">12:00 PM - History Lecture</p>
              <p className="text-sm">2:00 PM - Study Group</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}