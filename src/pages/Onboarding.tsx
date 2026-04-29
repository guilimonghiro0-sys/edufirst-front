import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { schools } from "@/data/schools";
import apiClient from "@/api/client";
import { toast } from "sonner";

const step2Schema = z.object({
  hasPrimary: z.boolean().optional(),
  hasSecondary: z.boolean().optional(),
  primaryClasses: z.array(z.string()).optional(),
  secondaryClasses: z.array(z.string()).optional(),
  humanitiesOptions: z.array(z.string()).optional(),
});

const step4Schema = z
  .object({
    adminName: z.string().min(2, "Nom complet requis"),
    adminEmail: z.string().email("Email invalide"),
    adminPhone: z.string().optional(),
    password: z.string().min(6, "Mot de passe (min 6 caractères)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type Step2Form = z.infer<typeof step2Schema>;
type Step4Form = z.infer<typeof step4Schema>;

const primaryClasses = [
  "1ère année",
  "2ème année",
  "3ème année",
  "4ème année",
  "5ème année",
  "6ème année",
];
const secondaryClasses = ["7ème année", "8ème année"];
const humanitiesOptions = [
  { label: "Latin-philo", value: "latin_philo" },
  { label: "Français-Latin", value: "francais_latin" },
  { label: "Mathématique-Physique", value: "math_phys" },
  { label: "Biologie-Chimie", value: "bio_chimie" },
  { label: "Electricité industrielle", value: "elec_industrielle" },
  { label: "Electronique", value: "electronique" },
  { label: "Mécanique générale", value: "mecanique_generale" },
  { label: "Construction/BTP", value: "btp" },
  { label: "Informatique de gestion", value: "info_gestion" },
  { label: "Informatique maintenance", value: "info_maintenance" },
  { label: "Nutrition", value: "nutrition" },
  { label: "Agriculture générale", value: "agriculture" },
  { label: "Commerciale et Gestion", value: "commerciale" },
  { label: "Secrétaire-Administration", value: "secretaire" },
  { label: "Pédagogie Générale", value: "pedagogie" },
  { label: "Coupe-couture", value: "coupe_couture" },
  { label: "Menuiserie", value: "menuiserie" },
  { label: "Hôtellerie-Restauration", value: "hotellerie" },
];

const plans = [
  {
    name: "Starter",
    price: "Gratuit",
    period: "",
    features: [
      "Jusqu'à 50 étudiants",
      "Gestion des notes de base",
      "1 administrateur",
      "Support par email",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "10$",
    period: "/ étudiant / trimestre",
    features: [
      "Étudiants illimités",
      "EduStore intégré",
      "Cours premium",
      "Rapports avancés",
      "Support prioritaire",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    features: [
      "Multi-campus",
      "API personnalisée",
      "Formation sur site",
      "Account manager dédié",
      "SLA garanti",
    ],
    highlighted: false,
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [schoolName, setSchoolName] = useState("");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [subdivision, setSubdivision] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [showSchoolSuggestions, setShowSchoolSuggestions] = useState(false);
  const navigate = useNavigate();

  const {
    register: register2,
    watch: watch2,
    setValue: setValue2,
  } = useForm<Step2Form>({
    resolver: zodResolver(step2Schema),
  });

  const {
    register: register4,
    handleSubmit: handleSubmit4,
    formState: { errors: errors4 },
  } = useForm<Step4Form>({
    resolver: zodResolver(step4Schema),
  });

  const hasPrimary = watch2("hasPrimary");
  const hasSecondary = watch2("hasSecondary");

  const filteredSchoolSuggestions = useMemo(() => {
    const query = schoolQuery.trim().toLowerCase();
    if (!query) return [];
    return schools
      .filter((s) => s.name.toLowerCase().includes(query))
      .slice(0, 8);
  }, [schoolQuery]);

  const onSubmitStep2 = (data: Step2Form) => {
    console.log("Step 2 data:", data);
    setStep(3);
  };

  const onSubmitStep4 = async (data: Step4Form) => {
    if (!schoolName || !subdivision) {
      toast.error("Veuillez remplir le nom de l'école et la subdivision");
      return;
    }

    const step2 = {
      hasPrimary: watch2("hasPrimary") || false,
      hasSecondary: watch2("hasSecondary") || false,
      primaryClasses: watch2("primaryClasses") || [],
      secondaryClasses: watch2("secondaryClasses") || [],
      humanitiesOptions: watch2("humanitiesOptions") || [],
    };

    const formData = new FormData();
    formData.append("schoolName", schoolName);
    formData.append("subdivision", subdivision);
    if (logoFile) {
      formData.append("logo", logoFile);
    }
    formData.append("hasPrimary", step2.hasPrimary ? "true" : "false");
    formData.append("hasSecondary", step2.hasSecondary ? "true" : "false");
    formData.append("primaryClasses", JSON.stringify(step2.primaryClasses));
    formData.append("secondaryClasses", JSON.stringify(step2.secondaryClasses));
    formData.append(
      "humanitiesOptions",
      JSON.stringify(step2.humanitiesOptions),
    );
    formData.append("adminName", data.adminName);
    formData.append("adminEmail", data.adminEmail);
    if (data.adminPhone) formData.append("adminPhone", data.adminPhone);
    formData.append("password", data.password);

    try {
      const response = await apiClient.post("/register/school/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(
        response.data.message ||
          "École créée avec succès ! Un email de confirmation a été envoyé.",
      );
      navigate("/login?checkEmail=true");
    } catch (error: any) {
      console.error(error);
      const msg =
        error.response?.data?.detail || "Erreur lors de la création de l'école";
      toast.error(msg);
    }
  };

  const onSchoolSelect = (school: {
    id: string;
    name: string;
    subdivision: string;
  }) => {
    setSchoolName(school.name);
    setSchoolQuery(school.name);
    setSubdivision(school.subdivision);
    setShowSchoolSuggestions(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        layout
        className="w-full max-w-3xl"
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">EduFirst</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Enregistrez votre école
          </h1>
          <p className="text-muted mt-1">Étape {step} sur 4</p>
        </div>

        <div className="flex items-center gap-2 max-w-xs mx-auto mb-10">
          <div
            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-primary" : "bg-secondary"}`}
          />
          <div
            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-primary" : "bg-secondary"}`}
          />
          <div
            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 3 ? "bg-primary" : "bg-secondary"}`}
          />
          <div
            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 4 ? "bg-primary" : "bg-secondary"}`}
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="edu-card p-8"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Identité de votre établissement
              </h2>

              <div className="space-y-5">
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nom de l'école(*)
                  </label>
                  <Input
                    placeholder="Nom de l'école"
                    value={schoolQuery}
                    onChange={(e) => {
                      setSchoolQuery(e.target.value);
                      setShowSchoolSuggestions(true);
                      setSchoolName(e.target.value);
                    }}
                    onFocus={() => setShowSchoolSuggestions(true)}
                    autoComplete="off"
                    required
                  />
                  {showSchoolSuggestions &&
                    filteredSchoolSuggestions.length > 0 && (
                      <div className="absolute z-20 mt-1 w-full overflow-hidden rounded border bg-background shadow-lg">
                        {filteredSchoolSuggestions.map((school) => (
                          <button
                            key={school.id}
                            type="button"
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-primary/10"
                            onClick={() => onSchoolSelect(school)}
                          >
                            {school.name}
                          </button>
                        ))}
                      </div>
                    )}
                </div>

                <div>
                  <Label htmlFor="subdivision">Sous‑division *</Label>
                  <select
                    id="subdivision"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                    value={subdivision}
                    onChange={(e) => setSubdivision(e.target.value)}
                  >
                    <option value="">Choisir une subdivision</option>
                    <option value="Kinshasa-Lukunga">Kinshasa-Lukunga</option>
                    <option value="Kinshasa-Plateau">Kinshasa-Plateau</option>
                    <option value="Kinshasa-Tshangu">Kinshasa-Tshangu</option>
                    <option value="Kinshasa-Mont-Amba">
                      Kinshasa-Mont-Amba
                    </option>
                    <option value="Kinshasa-Funa">Kinshasa-Funa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Domaine
                  </label>
                  <div className="flex items-center gap-0">
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="lycee-victor-hugo"
                      className="flex-1 h-11 px-4 rounded-l-lg bg-background shadow-surface text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    />
                    <span className="h-11 px-4 flex items-center bg-secondary text-muted text-sm rounded-r-lg font-medium">
                      .edufirst.io
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Logo de l'école
                  </label>
                  <label className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer block">
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                    <p className="text-sm text-muted">
                      Glissez-déposez ou cliquez pour télécharger
                    </p>
                    <p className="text-xs text-muted/60 mt-1">
                      PNG, JPG jusqu'à 2 Mo
                    </p>
                    {logoFile && (
                      <p className="text-xs text-primary mt-2">
                        Fichier sélectionné : {logoFile.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="hero" onClick={() => setStep(2)}>
                  Continuer <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="edu-card p-8"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Configuration de l'école – Étape 2/4
              </h2>
              <p className="text-muted-foreground mb-4">Niveaux et classes</p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hasPrimary" {...register2("hasPrimary")} />
                    <Label htmlFor="hasPrimary">Primaire (1ère à 6ème)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasSecondary"
                      {...register2("hasSecondary")}
                    />
                    <Label htmlFor="hasSecondary">
                      Secondaire (7ème à 8ème + Humanités)
                    </Label>
                  </div>
                </div>

                {hasPrimary && (
                  <div>
                    <Label>Classes primaires</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {primaryClasses.map((cl) => (
                        <div key={cl} className="flex items-center space-x-2">
                          <Checkbox
                            id={`primary-${cl}`}
                            value={cl}
                            onCheckedChange={(checked) => {
                              const current = watch2("primaryClasses") || [];
                              if (checked)
                                setValue2("primaryClasses", [...current, cl]);
                              else
                                setValue2(
                                  "primaryClasses",
                                  current.filter((c) => c !== cl),
                                );
                            }}
                          />
                          <Label htmlFor={`primary-${cl}`}>{cl}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hasSecondary && (
                  <>
                    <div>
                      <Label>Classes secondaires (7ème et 8ème)</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {secondaryClasses.map((cl) => (
                          <div key={cl} className="flex items-center space-x-2">
                            <Checkbox
                              id={`secondary-${cl}`}
                              value={cl}
                              onCheckedChange={(checked) => {
                                const current =
                                  watch2("secondaryClasses") || [];
                                if (checked)
                                  setValue2("secondaryClasses", [
                                    ...current,
                                    cl,
                                  ]);
                                else
                                  setValue2(
                                    "secondaryClasses",
                                    current.filter((c) => c !== cl),
                                  );
                              }}
                            />
                            <Label htmlFor={`secondary-${cl}`}>{cl}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Options d'humanités</Label>
                      <select
                        id="humanitiesOptions"
                        aria-label="Options d'humanités"
                        multiple
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={watch2("humanitiesOptions") ?? []}
                        onChange={(event) => {
                          const selectedOptions = Array.from(
                            event.target.selectedOptions,
                            (opt) => opt.value,
                          );
                          setValue2("humanitiesOptions", selectedOptions);
                        }}
                      >
                        {humanitiesOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </Button>
                  <Button
                    variant="hero"
                    onClick={() => {
                      const data = {
                        hasPrimary: watch2("hasPrimary"),
                        hasSecondary: watch2("hasSecondary"),
                        primaryClasses: watch2("primaryClasses"),
                        secondaryClasses: watch2("secondaryClasses"),
                        humanitiesOptions: watch2("humanitiesOptions"),
                      };
                      onSubmitStep2(data);
                    }}
                  >
                    Continuer <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="edu-card p-8"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Choisissez votre plan – Étape 3/4
              </h2>
              <p className="text-muted-foreground mb-4">
                Sélectionnez le plan qui correspond à vos besoins
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedPlan === plan.name
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {plan.highlighted && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        Recommandé
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    <div className="mt-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm text-muted ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-muted"
                        >
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4" /> Retour
                </Button>
                <Button variant="hero" onClick={() => setStep(4)}>
                  Continuer <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="edu-card p-8"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Compte administrateur – Étape 4/4
              </h2>
              <p className="text-muted-foreground mb-4">
                Informations du directeur
              </p>

              <form
                onSubmit={handleSubmit4(onSubmitStep4)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="adminName">Nom complet *</Label>
                  <Input
                    id="adminName"
                    {...register4("adminName")}
                    placeholder="Jean Dupont"
                  />
                  {errors4.adminName && (
                    <p className="text-red-500 text-sm">
                      {errors4.adminName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="adminEmail">Email *</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    {...register4("adminEmail")}
                    placeholder="directeur@ecole.com"
                  />
                  {errors4.adminEmail && (
                    <p className="text-red-500 text-sm">
                      {errors4.adminEmail.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="adminPhone">Téléphone</Label>
                  <Input
                    id="adminPhone"
                    {...register4("adminPhone")}
                    placeholder="+243 XX XXX XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register4("password")}
                    placeholder="6 caractères minimum"
                  />
                  {errors4.password && (
                    <p className="text-red-500 text-sm">
                      {errors4.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">
                    Confirmer le mot de passe *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register4("confirmPassword")}
                    placeholder="Répéter"
                  />
                  {errors4.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors4.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setStep(3)}
                  >
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </Button>
                  <Button type="submit" variant="hero">
                    Créer mon établissement
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Onboarding;
