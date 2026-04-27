import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { School, User, Users, GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/client";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import bgImage from "@/assets/render-1 (2).jpg";
import { useTranslation } from "react-i18next";

type Role = "admin" | "teacher" | "student" | "parent";

const roles: {
  id: Role;
  label: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    id: "admin",
    label: "Établissement",
    icon: School,
    description: "Administration",
  },
  {
    id: "teacher",
    label: "Professeur",
    icon: GraduationCap,
    description: "Enseignement",
  },
  {
    id: "student",
    label: "Étudiant",
    icon: User,
    description: "Apprentissage",
  },
  { id: "parent", label: "Parent", icon: Users, description: "Suivi" },
];

// Composant sélecteur de langue intégré
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md">
      <button
        onClick={() => i18n.changeLanguage("fr")}
        className="px-2 py-1 text-sm font-medium hover:opacity-80"
      >
        🇫🇷 FR
      </button>
      <button
        onClick={() => i18n.changeLanguage("en")}
        className="px-2 py-1 text-sm font-medium hover:opacity-80"
      >
        🇬🇧 EN
      </button>
      <button
        onClick={() => i18n.changeLanguage("es")}
        className="px-2 py-1 text-sm font-medium hover:opacity-80"
      >
        🇪🇸 ES
      </button>
    </div>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<Role>("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("checkEmail")) {
      toast.info(
        "Veuillez vérifier vos emails et confirmer votre compte avant de vous connecter.",
      );
    }
  }, [location.search]);

  const usernamePlaceholder =
    selectedRole === "admin"
      ? "admin"
      : selectedRole === "teacher"
        ? "email@ecole.com"
        : selectedRole === "student"
          ? "matricule"
          : "email@parent.com";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/login/", {
        username: username,
        password: password,
      });
      console.log("Response data:", response.data);
      const { access, refresh, user } = response.data;
      setAuth(user, access, refresh);
      console.log("Utilisateur connecté :", user);
      console.log("Rôle reçu :", user?.role);
      toast.success(t("connexion_reussie") || "Connexion réussie");

      switch (user.role) {
        case "superadmin":
          navigate("/dashboard/superadmin");
          break;
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "teacher":
          navigate("/dashboard/teacher");
          break;
        case "parent":
          navigate("/dashboard/parent");
          break;
        case "student":
          navigate("/dashboard/student");
          break;
        default:
          console.warn("Rôle inconnu, redirection vers /dashboard");
          navigate("/dashboard");
          break;
      }
    } catch (error: any) {
      console.error("Erreur détaillée :", error);
      const message =
        error.response?.data?.detail ||
        t("email_ou_mdp_incorrect") ||
        "Email ou mot de passe incorrect";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Image de fond */}

      {/* Sélecteur de langue */}
      <LanguageSwitcher />

      {/* Contenu principal */}
      <div className="relative z-10 flex w-full">
        {/* Left - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/80 backdrop-blur-sm relative overflow-hidden items-center justify-center p-12">
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
              <span className="text-2xl font-bold text-primary-foreground">
                EduFirst
              </span>
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground leading-tight mb-4">
              {t("slogan") ||
                "Le système d'exploitation de l'éducation moderne."}
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              {t("description") ||
                "Une plateforme décentralisée pour les notes, les finances et la croissance de votre institution."}
            </p>
             <img src="{bgImage}" alt="" />
          </motion.div>
        </div>

        {/* Right - Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background/80 backdrop-blur-sm">
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
              <span className="text-xl font-bold text-foreground">
                EduFirst
              </span>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-1">
              {t("connexion")}
            </h2>
            <p className="text-muted mb-8">
              {t("accedez_espace") ||
                "Accédez à votre espace de gestion scolaire."}
            </p>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {roles.map((role) => {
                const isActive = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 ring-2 ring-primary"
                        : "bg-card shadow-surface hover:shadow-md"
                    }`}
                  >
                    <role.icon
                      className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted"}`}
                    />
                    <span
                      className={`text-xs font-medium ${isActive ? "text-primary" : "text-foreground"}`}
                    >
                      {t(`role_${role.id}`) || role.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("identifiant")}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={usernamePlaceholder}
                  className="w-full h-11 px-4 rounded-lg bg-card shadow-surface text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("mot_de_passe")}
                </label>
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
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? t("connexion_en_cours") : t("lancer_tableau")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {t("creer_compte")}
              </Link>
            </div>
            <div className="mt-1 text-center">
              <Link
                to="/reset-password"
                className="text-sm text-primary hover:underline"
              >
                {t("mot_passe_oublie")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
