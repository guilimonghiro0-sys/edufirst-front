import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, User, Mail, Lock, Calendar, MapPin, Phone, Home, Eye, EyeOff, ArrowLeft, BookOpen, TrendingUp, Star, CheckCircle2, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const studentSchema = z.object({
  // Élève
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  gender: z.enum(['M', 'F'], { required_error: 'Genre requis' }),
  birthDate: z.string().min(1, 'Date de naissance requise'),
  birthPlace: z.string().min(1, 'Lieu de naissance requis'),
  province: z.string().min(1, 'Province requise'),
  address: z.string().min(1, 'Adresse requise'),

  // Mère
  motherFirstName: z.string().optional(),
  motherLastName: z.string().optional(),
  motherMaidenName: z.string().optional(),
  motherHasAuthority: z.boolean().default(false),
  motherPhoneHome: z.string().optional(),
  motherPhoneMobile: z.string().optional(),
  motherPhoneWork: z.string().optional(),
  motherEmail: z.string().email('Email invalide').optional().or(z.literal('')),

  // Père
  fatherFirstName: z.string().optional(),
  fatherLastName: z.string().optional(),
  fatherHasAuthority: z.boolean().default(false),
  fatherAddress: z.string().optional(),
  fatherPostalCode: z.string().optional(),
  fatherCity: z.string().optional(),
  fatherPhoneHome: z.string().optional(),
  fatherPhoneMobile: z.string().optional(),
  fatherPhoneWork: z.string().optional(),
  fatherEmail: z.string().email('Email invalide').optional().or(z.literal('')),

  // Autre responsable
  otherGuardianName: z.string().optional(),
  otherGuardianFunction: z.string().optional(),
  otherGuardianRelation: z.string().optional(),
  otherGuardianAddress: z.string().optional(),
  otherGuardianPostalCode: z.string().optional(),
  otherGuardianCity: z.string().optional(),
  otherGuardianPhone: z.string().optional(),
  otherGuardianEmail: z.string().email('Email invalide').optional().or(z.literal('')),

  // Compte
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe (min 6 caractères)'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type StudentFormData = z.infer<typeof studentSchema>;

const provinces = [
  "Kasai", "Kasai Central", "Kasai Oriental",
  "Kinshasa", "Kongo Central", "Kwango", "Kwilu",
  "Lomami", "Lualaba", "Maniema", "Mongala", "Montée du Nile",
  "Nord-Kivu", "Sankuru", "Sud-Kivu", "Tanganyika", "Tshopo", "Tshuapa"
];

// Composant pour les éléments flottants (Badges scolaires)
const FloatingBadge = ({ children, delay, x, y, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -15, 0],
    }}
    transition={{ 
      delay, 
      duration: 4, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    style={{ left: x, top: y }}
    className="absolute z-20 hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl"
  >
    <div className="bg-primary-foreground/20 p-1.5 rounded-lg">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <span className="text-white text-sm font-medium">{children}</span>
  </motion.div>
);

const RegisterInscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    gender: 'M',
    birthDate: '',
    birthPlace: '',
    province: '',
    address: '',
    motherFirstName: '',
    motherLastName: '',
    motherMaidenName: '',
    motherHasAuthority: false,
    motherPhoneHome: '',
    motherPhoneMobile: '',
    motherPhoneWork: '',
    motherEmail: '',
    fatherFirstName: '',
    fatherLastName: '',
    fatherHasAuthority: false,
    fatherAddress: '',
    fatherPostalCode: '',
    fatherCity: '',
    fatherPhoneHome: '',
    fatherPhoneMobile: '',
    fatherPhoneWork: '',
    fatherEmail: '',
    otherGuardianName: '',
    otherGuardianFunction: '',
    otherGuardianRelation: '',
    otherGuardianAddress: '',
    otherGuardianPostalCode: '',
    otherGuardianCity: '',
    otherGuardianPhone: '',
    otherGuardianEmail: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

  const handleInputChange = (field: keyof StudentFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = studentSchema.parse(formData);

      // TODO: Call API to submit registration
      console.log('Submitting student registration:', validatedData);

      toast({
        title: "Demande d'inscription envoyée",
        description: "Votre demande sera examinée par l'établissement. Vous recevrez un email de confirmation.",
      });

      navigate('/login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof StudentFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof StudentFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
      {/* LEFT - BRANDING & SCHOLAR STUFF */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#3b82f6] relative overflow-hidden items-center justify-center p-12">
        
        {/* Cercles de fond stylisés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 blur-[120px]" />
          
          {/* Petites icônes de fond éparpillées */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 5 + i, repeat: Infinity }}
              className="absolute text-white/10"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%` 
              }}
            >
              <BookOpen size={40 + i * 10} />
            </motion.div>
          ))}
        </div>

        {/* Badges Scolaires Flottants */}
        <FloatingBadge x="15%" y="20%" delay={0.5} icon={Star}>Moyenne : 17.5</FloatingBadge>
        <FloatingBadge x="70%" y="15%" delay={1.2} icon={Calendar}>Planning à jour</FloatingBadge>
        <FloatingBadge x="65%" y="75%" delay={0.8} icon={CheckCircle2}>Examens validés</FloatingBadge>
        <FloatingBadge x="10%" y="80%" delay={2} icon={Users}>2.5k Étudiants</FloatingBadge>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-lg"
        >
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">EduFirst</span>
          </div>

          {/* Titre et Description */}
          <h1 className="text-5xl font-bold text-white leading-[1.1] mb-6">
            Le système d'exploitation de l'éducation <span className="text-blue-200 underline decoration-blue-300 underline-offset-8">moderne</span>.
          </h1>
          
          <p className="text-blue-100 text-xl leading-relaxed mb-10 opacity-90">
            Une plateforme décentralisée pour les notes, les finances et la croissance de votre institution. 
            Gérez tout, du cursus scolaire à la diplomation.
          </p>

          {/* Mini-statistiques scolaires */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-white/60 text-sm mb-1 uppercase tracking-wider font-semibold">Taux de succès</div>
              <div className="text-white text-2xl font-bold">98.2%</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-white/60 text-sm mb-1 uppercase tracking-wider font-semibold">Institutions</div>
              <div className="text-white text-2xl font-bold">+1,200</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT - FORM */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Inscription Élève</h2>
            <p className="text-slate-500">Remplissez le formulaire pour soumettre votre demande d'inscription</p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/register')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </div>

          {/* Informations de l'élève */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations de l'élève
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gender">Genre *</Label>
                <select
                  id="gender"
                  title="Genre"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Choisir</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="birthDate">Date de naissance *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className={errors.birthDate ? 'border-red-500' : ''}
                />
                {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="birthPlace">Lieu de naissance *</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                  className={errors.birthPlace ? 'border-red-500' : ''}
                />
                {errors.birthPlace && <p className="text-sm text-red-500">{errors.birthPlace}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="province">Province d'origine *</Label>
                <select
                  id="province"
                  title="Province d'origine"
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Choisir une province</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.province && <p className="text-sm text-red-500">{errors.province}</p>}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="address">Adresse *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Informations de la mère */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">Informations de la mère</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="motherFirstName">Prénom</Label>
                <Input
                  id="motherFirstName"
                  value={formData.motherFirstName}
                  onChange={(e) => handleInputChange('motherFirstName', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motherLastName">Nom</Label>
                <Input
                  id="motherLastName"
                  value={formData.motherLastName}
                  onChange={(e) => handleInputChange('motherLastName', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motherMaidenName">Nom de jeune fille</Label>
                <Input
                  id="motherMaidenName"
                  value={formData.motherMaidenName}
                  onChange={(e) => handleInputChange('motherMaidenName', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="motherHasAuthority"
                  checked={formData.motherHasAuthority}
                  onCheckedChange={(checked) => handleInputChange('motherHasAuthority', !!checked)}
                />
                <Label htmlFor="motherHasAuthority">Autorité parentale</Label>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motherPhoneHome">Téléphone domicile</Label>
                <Input
                  id="motherPhoneHome"
                  value={formData.motherPhoneHome}
                  onChange={(e) => handleInputChange('motherPhoneHome', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motherPhoneMobile">Téléphone mobile</Label>
                <Input
                  id="motherPhoneMobile"
                  value={formData.motherPhoneMobile}
                  onChange={(e) => handleInputChange('motherPhoneMobile', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motherPhoneWork">Téléphone travail</Label>
                <Input
                  id="motherPhoneWork"
                  value={formData.motherPhoneWork}
                  onChange={(e) => handleInputChange('motherPhoneWork', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motherEmail">Email</Label>
                <Input
                  id="motherEmail"
                  type="email"
                  value={formData.motherEmail}
                  onChange={(e) => handleInputChange('motherEmail', e.target.value)}
                  className={errors.motherEmail ? 'border-red-500' : ''}
                />
                {errors.motherEmail && <p className="text-sm text-red-500">{errors.motherEmail}</p>}
              </div>
            </div>
          </div>

          {/* Informations du père */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">Informations du père</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="fatherFirstName">Prénom</Label>
                <Input
                  id="fatherFirstName"
                  value={formData.fatherFirstName}
                  onChange={(e) => handleInputChange('fatherFirstName', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherLastName">Nom</Label>
                <Input
                  id="fatherLastName"
                  value={formData.fatherLastName}
                  onChange={(e) => handleInputChange('fatherLastName', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fatherHasAuthority"
                  checked={formData.fatherHasAuthority}
                  onCheckedChange={(checked) => handleInputChange('fatherHasAuthority', !!checked)}
                />
                <Label htmlFor="fatherHasAuthority">Autorité parentale</Label>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherAddress">Adresse</Label>
                <Input
                  id="fatherAddress"
                  value={formData.fatherAddress}
                  onChange={(e) => handleInputChange('fatherAddress', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherPostalCode">Code postal</Label>
                <Input
                  id="fatherPostalCode"
                  value={formData.fatherPostalCode}
                  onChange={(e) => handleInputChange('fatherPostalCode', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherCity">Ville</Label>
                <Input
                  id="fatherCity"
                  value={formData.fatherCity}
                  onChange={(e) => handleInputChange('fatherCity', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherPhoneHome">Téléphone domicile</Label>
                <Input
                  id="fatherPhoneHome"
                  value={formData.fatherPhoneHome}
                  onChange={(e) => handleInputChange('fatherPhoneHome', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherPhoneMobile">Téléphone mobile</Label>
                <Input
                  id="fatherPhoneMobile"
                  value={formData.fatherPhoneMobile}
                  onChange={(e) => handleInputChange('fatherPhoneMobile', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherPhoneWork">Téléphone travail</Label>
                <Input
                  id="fatherPhoneWork"
                  value={formData.fatherPhoneWork}
                  onChange={(e) => handleInputChange('fatherPhoneWork', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherEmail">Email</Label>
                <Input
                  id="fatherEmail"
                  type="email"
                  value={formData.fatherEmail}
                  onChange={(e) => handleInputChange('fatherEmail', e.target.value)}
                  className={errors.fatherEmail ? 'border-red-500' : ''}
                />
                {errors.fatherEmail && <p className="text-sm text-red-500">{errors.fatherEmail}</p>}
              </div>
            </div>
          </div>

          {/* Autre responsable */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">Autre responsable (optionnel)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="otherGuardianName">Nom complet</Label>
                <Input
                  id="otherGuardianName"
                  value={formData.otherGuardianName}
                  onChange={(e) => handleInputChange('otherGuardianName', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="otherGuardianFunction">Fonction</Label>
                <Input
                  id="otherGuardianFunction"
                  value={formData.otherGuardianFunction}
                  onChange={(e) => handleInputChange('otherGuardianFunction', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="otherGuardianRelation">Lien de parenté</Label>
                <Input
                  id="otherGuardianRelation"
                  value={formData.otherGuardianRelation}
                  onChange={(e) => handleInputChange('otherGuardianRelation', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="otherGuardianPhone">Téléphone</Label>
                <Input
                  id="otherGuardianPhone"
                  value={formData.otherGuardianPhone}
                  onChange={(e) => handleInputChange('otherGuardianPhone', e.target.value)}
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="otherGuardianAddress">Adresse</Label>
                <Input
                  id="otherGuardianAddress"
                  value={formData.otherGuardianAddress}
                  onChange={(e) => handleInputChange('otherGuardianAddress', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="otherGuardianPostalCode">Code postal</Label>
                <Input
                  id="otherGuardianPostalCode"
                  value={formData.otherGuardianPostalCode}
                  onChange={(e) => handleInputChange('otherGuardianPostalCode', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="otherGuardianCity">Ville</Label>
                <Input
                  id="otherGuardianCity"
                  value={formData.otherGuardianCity}
                  onChange={(e) => handleInputChange('otherGuardianCity', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="otherGuardianEmail">Email</Label>
                <Input
                  id="otherGuardianEmail"
                  type="email"
                  value={formData.otherGuardianEmail}
                  onChange={(e) => handleInputChange('otherGuardianEmail', e.target.value)}
                  className={errors.otherGuardianEmail ? 'border-red-500' : ''}
                />
                {errors.otherGuardianEmail && <p className="text-sm text-red-500">{errors.otherGuardianEmail}</p>}
              </div>
            </div>
          </div>

          {/* Informations de compte */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Informations de compte
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-6 border-t">
            <Button type="submit" size="lg" className="px-8">
              Soumettre la demande d'inscription
            </Button>
          </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default RegisterInscription;
