import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { School, User, Users, GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/client";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

type Role = "admin" | "teacher" | "student" | "parent";

const roles: { id: Role; label: string; icon: React.ElementType; description: string }[] = [
  { id: "admin", label: "Établissement", icon: School, description: "Administration" },
  { id: "teacher", label: "Professeur", icon: GraduationCap, description: "Enseignement" },
  { id: "student", label: "Étudiant", icon: User, description: "Apprentissage" },
  { id: "parent", label: "Parent", icon: Users, description: "Suivi" },
];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login/', {
        username: email,
        password: password,
      });
      const { access, refresh, user } = response.data;
      setAuth(user, access, refresh);
      toast.success("Connexion réussie");
      // Redirection selon le rôle réel
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "teacher":
          navigate("/teacher/dashboard");
          break;
        case "parent":
          navigate("/parent/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error: any) {
      const message = error.response?.data?.detail || "Email ou mot de passe incorrect";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding (inchangé) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-lg"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">EduFirst</span>
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight mb-4">
            Le système d'exploitation de l'éducation moderne.
          </h1>
          <p className="text-primary-foreground/70 text-lg">
            Une plateforme décentralisée pour les notes, les finances et la croissance de votre institution.
          </p>
        </motion.div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EduFirst</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Connexion</h2>
          <p className="text-muted mb-8">Accédez à votre espace de gestion scolaire.</p>

          {/* Role Selector (purement visuel, n'affecte pas l'authentification) */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {roles.map((role) => {
              const isActive = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 ${isActive
                    ? "bg-primary/10 ring-2 ring-primary"
                    : "bg-card shadow-surface hover:shadow-md"
                    }`}
                >
                  <role.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted"}`} />
                  <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
                    {role.label}
                  </span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Identifiant</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full h-11 px-4 rounded-lg bg-card shadow-surface text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-4 pr-11 rounded-lg bg-card shadow-surface text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Lancer le tableau de bord"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/register"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Créer un compte →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;