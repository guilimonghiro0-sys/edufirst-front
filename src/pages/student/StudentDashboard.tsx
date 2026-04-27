// src/pages/student/StudentDashboard.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, MessageCircle, Send } from 'lucide-react';

const courses = [
  { name: "Physics 101: Mechanics", teacher: "Dr. Sarah Jenkins", progress: 45, icon: "⚛️" },
  { name: "World Literature", teacher: "Prof. Michael Chen", progress: 82, icon: "📚" },
  { name: "Modern History", teacher: "Dr. Elena Rodriguez", progress: 15, icon: "🏛️" },
  { name: "Calculus AB", teacher: "Prof. David Wilson", progress: 60, icon: "📐" },
];

const messages = [
  { from: "Dr. Sarah Jenkins", text: "Hi Alex! I saw your questions about the latest lab report... Would you like to review it during office hours?", time: "10:45 AM", isTeacher: true },
  { from: "Moi", text: "Yes, please! I'm specifically struggling with the calculation for frictionless environments.", time: "10:48 AM", isTeacher: false },
  { from: "Dr. Sarah Jenkins", text: "No problem. I've sent you a PDF with some extra practice problems. Let me know if that helps!", time: "10:52 AM", isTeacher: true, attachment: "Mechanics_Extra.pdf" }
];

export default function StudentDashboard() {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    console.log('Envoi message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne de gauche : Mes cours */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mes cours</h2>
            <Button variant="ghost" size="sm">Voir tout</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course.name}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{course.icon}</span>
                      <CardTitle className="text-base">{course.name}</CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground">{course.progress}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{course.teacher}</p>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="h-2" />
                  <Button variant="link" size="sm" className="mt-2 p-0">Continuer →</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bloc "Upgrade Plan" */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold">UPGRADE PLAN</p>
                <p className="text-sm text-muted-foreground">Get access to premium tutors and 1-on-1 sessions.</p>
              </div>
              <Button variant="outline">View Plans →</Button>
            </CardContent>
          </Card>

          {/* Section Message My Teacher */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle size={20} /> Message My Teacher
              </CardTitle>
              <p className="text-sm text-green-600">Dr. Sarah Jenkins • ACTIVE NOW</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.isTeacher ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${msg.isTeacher ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
                      {msg.isTeacher && <p className="text-xs font-semibold mb-1">{msg.from}</p>}
                      <p className="text-sm">{msg.text}</p>
                      {msg.attachment && (
                        <div className="mt-2 text-xs flex items-center gap-1">
                          <span>📎</span> {msg.attachment}
                        </div>
                      )}
                      <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button size="icon" onClick={handleSend}><Send size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne de droite : suggestions ou infos */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Prochaine échéance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Calculus II: Final Assignment</p>
              <p className="text-sm text-muted-foreground">Due in 4 hours</p>
              <Button variant="outline" size="sm" className="mt-2">SUBMIT NOW</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Peer Study Group</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Sarah Miller, David Chen and 3 others are active now.</p>
              <Button variant="link" size="sm">Join group →</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}