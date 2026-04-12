import { useState } from "react";
import { Search, Plus, Filter, ChevronDown, MoreHorizontal, Mail, Phone, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  level: string;
  average: number;
  status: "Actif" | "En attente" | "Suspendu";
  paid: boolean;
}

const studentsData: Student[] = [
  { id: "STU-001", name: "Rachel Mata", email: "rachel.mata@lycee-vh.edu", phone: "+243 99 12 34 56", class: "4eme Latin-philo", level: "4eme", average: 15.2, status: "Actif", paid: true },
  { id: "STU-002", name: "Elisah Kasembe", email: "e.kasembe@lycee-vh.edu", phone: "+243 82 98 76 54", class: "4eme Biochimie", level: "4eme", average: 13.8, status: "Actif", paid: true },
  { id: "STU-003", name: "Manacé Zola", email: "manacé.z@lycee-vh.edu", phone: "+243 84 23 45 67", class: "4eme Math-Phi", level: "4eme", average: 14.5, status: "Actif", paid: false },
  { id: "STU-004", name: "Roddy Zola", email: "roddy.z@lycee-vh.edu", phone: "+243 81 65 43 21", class: "4eme Electronique A", level: "4eme", average: 11.3, status: "En attente", paid: false },
  { id: "STU-005", name: "Erick Ngeleka", email: "erick.ngeleka@lycee-vh.edu", phone: "+243 85 11 22 33", class: "1ere Electricité", level: "1ere", average: 16.1, status: "Actif", paid: true },
  { id: "STU-006", name: "Parfait Mavungu", email: "parfait.mavungu@lycee-vh.edu", phone: "+243 85 44 55 66", class: "2eme Péda", level: "2eme", average: 12.7, status: "Suspendu", paid: false },
  { id: "STU-007", name: "Gad Mbuyi", email: "gad.mbuyi@lycee-vh.edu", phone: "+243 85 15 00 251", class: "3eme Nutrition", level: "3eme", average: 14.9, status: "Actif", paid: true },
  { id: "STU-008", name: "Josué Ngoy", email: "josue.ngoy@lycee-vh.edu", phone: "+243 80 00 11 222", class: "2eme Math-Phi", level: "2eme", average: 13.2, status: "Actif", paid: true },
  { id: "STU-009", name: "Mariame Songo", email: "mariame.songo@lycee-vh.edu", phone: "+243 99 33 44_55", class: "1ere Scientifique", level: "1ere", average: 15.7, status: "Actif", paid: true },
  { id: "STU-010", name: "Adris Mbala", email: "adris.mbala@lycee-vh.edu", phone: "+243 90 66 77 88", class: "4eme Electronique A", level: "4eme", average: 10.5, status: "En attente", paid: false },
];

const levels = ["Tous", "1ere", "2eme", "3eme", "4eme"];

const StudentsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("Tous");

  const filtered = studentsData.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "Tous" || s.class === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Étudiants</h1>
          <p className="text-muted text-sm mt-1">{studentsData.length} inscrits — Lycée International Victor Hugo</p>
        </div>
        <Button onClick={() => navigate('/admin/students/add')} variant="hero" className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Ajouter un élève
        </Button>
      </div>

      {/* Filters */}
      <div className="edu-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-background rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou ID..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${levelFilter === level
                  ? "bg-primary/10 text-primary"
                  : "bg-background text-muted hover:text-foreground"
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="edu-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Étudiant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden md:table-cell">Classe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden lg:table-cell">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Moyenne</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden sm:table-cell">Paiement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filtered.map((student, i) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-primary">
                          {student.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 hidden md:table-cell">
                    <p className="text-sm text-foreground">{student.class}</p>
                    <p className="text-xs text-muted">{student.level}</p>
                  </td>
                  <td className="px-6 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center gap-3">
                      <a href={`mailto:${student.email}`} className="text-muted hover:text-primary transition-colors" aria-label={`Envoyer un email à ${student.name}`}>
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      <a href={`tel:${student.phone}`} className="text-muted hover:text-primary transition-colors" aria-label={`Appeler ${student.name}`}>
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-sm font-semibold text-foreground tabular-nums">{student.average}/20</span>
                  </td>
                  <td className="px-6 py-3.5 hidden sm:table-cell">
                    <span className={student.paid ? "status-success" : "status-pending"}>
                      {student.paid ? "Payé" : "Impayé"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={
                      student.status === "Actif" ? "status-success" :
                        student.status === "En attente" ? "status-pending" : "status-error"
                    }>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" aria-label="Actions pour l'étudiant">
                      <MoreHorizontal className="w-4 h-4 text-muted" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-sm text-muted">Aucun étudiant trouvé pour cette recherche.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentsPage;
