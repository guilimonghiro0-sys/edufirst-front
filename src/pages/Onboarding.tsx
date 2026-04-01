import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Upload, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { schools } from "@/data/schools";

const step2Schema = z.object({
  hasPrimary: z.boolean().optional(),
  hasSecondary: z.boolean().optional(),
  primaryClasses: z.array(z.string()).optional(),
  secondaryClasses: z.array(z.string()).optional(),
  humanitiesOptions: z.array(z.string()).optional(),
});

type Step2Form = z.infer<typeof step2Schema>;

const primaryClasses = ["1ère année", "2ème année", "3ème année", "4ème année", "5ème année", "6ème année"];
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
    features: ["Jusqu'à 50 étudiants", "Gestion des notes de base", "1 administrateur", "Support par email"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "10$",
    period: "/ étudiant / trimestre",
    features: ["Étudiants illimités", "EduStore intégré", "Cours premium", "Rapports avancés", "Support prioritaire"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    features: ["Multi-campus", "API personnalisée", "Formation sur site", "Account manager dédié", "SLA garanti"],
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
  const [showSchoolSuggestions, setShowSchoolSuggestions] = useState(false);
  const navigate = useNavigate();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm<Step2Form>({
    resolver: zodResolver(step2Schema),
  });

  const hasPrimary = watch2('hasPrimary');
  const hasSecondary = watch2('hasSecondary');
  const hasStep2Errors = Object.keys(errors2).length > 0;

  const filteredSchoolSuggestions = useMemo(() => {
    const query = schoolQuery.trim().toLowerCase();
    if (!query) return [];
    return schools
      .filter((s) => s.name.toLowerCase().includes(query))
      .slice(0, 8);
  }, [schoolQuery]);

  const onSubmitStep2 = (data: Step2Form) => {
    console.log('Step 2 data:', data);
    setStep(3);
  };

  const handleComplete = () => {
    navigate("/admin/dashboard");
  };

  const onSchoolSelect = (school: { id: string; name: string; subdivision: string }) => {
    setSchoolName(school.name);
    setSchoolQuery(school.name);
    setSubdivision(school.subdivision);
    setShowSchoolSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        layout
        className="w-full max-w-3xl"
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">EduFirst</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Enregistrez votre école</h1>
          <p className="text-muted mt-1">Étape {step} sur 4</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 max-w-xs mx-auto mb-10">
          <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-primary" : "bg-secondary"}`} />
          <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-primary" : "bg-secondary"}`} />
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
              <h2 className="text-lg font-semibold text-foreground mb-6">Identité de votre établissement</h2>

              <div className="space-y-5">
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Nom de l'école(*)</label>
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
                  {showSchoolSuggestions && filteredSchoolSuggestions.length > 0 && (
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
                    <option value="Kinshasa-Mont-Amba">Kinshasa-Mont-Amba</option>
                    <option value="Kinshasa-Funa">Kinshasa-Funa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Domaine</label>
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
                  <label className="block text-sm font-medium text-foreground mb-1.5">Logo de l'école</label>
                  <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                    <p className="text-sm text-muted">Glissez-déposez ou cliquez pour télécharger</p>
                    <p className="text-xs text-muted/60 mt-1">PNG, JPG jusqu'à 2 Mo</p>
                  </div>
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
              <h2 className="text-lg font-semibold text-foreground mb-6">Configuration de l'école – Étape 2/3</h2>
              <p className="text-muted-foreground mb-4">Niveaux et classes</p>

              <form onSubmit={handleSubmit2(onSubmitStep2)} className="space-y-6">
                {hasStep2Errors && <p className="sr-only">Erreurs présentes</p>}
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hasPrimary" {...register2('hasPrimary')} />
                    <Label htmlFor="hasPrimary">Primaire (1ère à 6ème)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hasSecondary" {...register2('hasSecondary')} />
                    <Label htmlFor="hasSecondary">Secondaire (7ème à 8ème + Humanités)</Label>
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
                              const current = watch2('primaryClasses') || [];
                              if (checked) setValue2('primaryClasses', [...current, cl]);
                              else setValue2('primaryClasses', current.filter(c => c !== cl));
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
                                const current = watch2('secondaryClasses') || [];
                                if (checked) setValue2('secondaryClasses', [...current, cl]);
                                else setValue2('secondaryClasses', current.filter(c => c !== cl));
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
                        value={watch2('humanitiesOptions') ?? []}
                        onChange={(event) => {
                          const selectedOptions = Array.from(event.target.selectedOptions, (opt) => opt.value);
                          setValue2('humanitiesOptions', selectedOptions);
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
                  <Button type="submit" variant="hero">
                    Continuer <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
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
              <h2 className="text-lg font-semibold text-foreground mb-6">Choisissez votre plan – Étape 3/3</h2>
              <p className="text-muted-foreground mb-4">Sélectionnez le plan qui correspond à vos besoins</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${selectedPlan === plan.name
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                      }`}
                  >
                    {plan.highlighted && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        Recommandé
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                    <div className="mt-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                      {plan.period && (
                        <span className="text-sm text-muted ml-1">{plan.period}</span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted">
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
                <Button variant="hero" onClick={handleComplete}>
                  Créer mon établissement
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Onboarding;
