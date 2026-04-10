import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, User, Mail, Lock, Calendar, MapPin, Phone, Home, Eye, EyeOff, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const adminStudentSchema = z.object({
  // Informations de l'élève
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  gender: z.enum(['M', 'F'], { required_error: 'Genre requis' }),
  birthDate: z.string().min(1, 'Date de naissance requise'),
  birthPlace: z.string().min(1, 'Lieu de naissance requis'),
  province: z.string().min(1, 'Province requise'),
  address: z.string().min(1, 'Adresse requise'),

  // Informations scolaires
  class: z.string().min(1, 'Classe requise'),
  option: z.string().min(1, 'Option requise'),

  // Informations de contact
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),

  // Informations des parents
  fatherName: z.string().optional(),
  fatherPhone: z.string().optional(),
  motherName: z.string().optional(),
  motherPhone: z.string().optional(),

  // Compte
  password: z.string().min(6, 'Mot de passe (min 6 caractères)'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type AdminStudentFormData = z.infer<typeof adminStudentSchema>;

const provinces = [
  "Kasai", "Kasai Central", "Kasai Oriental",
  "Kinshasa", "Kongo Central", "Kwango", "Kwilu",
  "Lomami", "Lualaba", "Maniema", "Mongala", "Montée du Nile",
  "Nord-Kivu", "Sankuru", "Sud-Kivu", "Tanganyika", "Tshopo", "Tshuapa"
];

const classes = [
  "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"
];

const options = [
  "Scientifique", "Littéraire", "Économique et Sociale",
  "Mathématiques", "Physique-Chimie", "SVT", "Philosophie",
  "Latin-Philo", "Grec", "Anglais", "Espagnol", "Allemand",
  "Électronique", "Électricité", "Mécanique", "Informatique",
  "Biochimie", "Nutrition", "Pédagogie", "Commerce"
];

const AdminAddStudentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<AdminStudentFormData>({
    firstName: '',
    lastName: '',
    gender: 'M',
    birthDate: '',
    birthPlace: '',
    province: '',
    address: '',
    class: '',
    option: '',
    email: '',
    phone: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AdminStudentFormData, string>>>({});

  const handleInputChange = (field: keyof AdminStudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = adminStudentSchema.parse(formData);

      // TODO: Call API to create student directly
      console.log('Creating student:', validatedData);

      toast({
        title: "Élève ajouté avec succès",
        description: `${validatedData.firstName} ${validatedData.lastName} a été inscrit en ${validatedData.class} ${validatedData.option}.`,
      });

      navigate('/admin/students');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof AdminStudentFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof AdminStudentFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-gray-900">EduFirst</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un Élève</h1>
          <p className="text-gray-600">Inscription directe d'un élève avec affectation de classe</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-8"
        >
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/students')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la liste
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

          {/* Informations scolaires */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Informations scolaires
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="class">Classe *</Label>
                <Select value={formData.class} onValueChange={(value) => handleInputChange('class', value)}>
                  <SelectTrigger className={errors.class ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.class && <p className="text-sm text-red-500">{errors.class}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="option">Option *</Label>
                <Select value={formData.option} onValueChange={(value) => handleInputChange('option', value)}>
                  <SelectTrigger className={errors.option ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionner une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.option && <p className="text-sm text-red-500">{errors.option}</p>}
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Informations de contact
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
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
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Informations des parents */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">Informations des parents</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="fatherName">Nom du père</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fatherPhone">Téléphone du père</Label>
                <Input
                  id="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={(e) => handleInputChange('fatherPhone', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motherName">Nom de la mère</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motherPhone">Téléphone de la mère</Label>
                <Input
                  id="motherPhone"
                  value={formData.motherPhone}
                  onChange={(e) => handleInputChange('motherPhone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Informations de compte */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Informations de compte
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Button type="submit" size="lg" className="px-8 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Créer l'élève
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AdminAddStudentPage;