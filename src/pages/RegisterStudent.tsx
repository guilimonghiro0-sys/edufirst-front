import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PhotoUpload from '@/components/PhotoUpload';
import { User, Mail, Lock, Phone, MapPin, GraduationCap, Calendar, Users } from 'lucide-react';
import { z } from 'zod';

const studentSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  gender: z.enum(['M', 'F'], { required_error: 'Genre requis' }),
  birthDate: z.string().min(1, 'Date de naissance requise'),
  birthPlace: z.string().min(1, 'Lieu de naissance requis'),
  province: z.string().min(1, 'Province requise'),
  address: z.string().min(1, 'Adresse requise'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Mot de passe (min 6 caractères)'),
  confirmPassword: z.string(),
  // Parent information (simplified)
  parentFirstName: z.string().min(1, 'Prénom du parent requis'),
  parentLastName: z.string().min(1, 'Nom du parent requis'),
  parentPhone: z.string().min(1, 'Téléphone du parent requis'),
  parentEmail: z.string().email('Email du parent invalide'),
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

const RegisterStudent = () => {
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    gender: 'M',
    birthDate: '',
    birthPlace: '',
    province: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    parentFirstName: '',
    parentLastName: '',
    parentPhone: '',
    parentEmail: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

  const handleInputChange = (field: keyof StudentFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = studentSchema.parse(formData);
      console.log('Registering student:', { ...validatedData, photo: photoFile });
      // Handle registration logic
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
    <DashboardLayout role="student">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Inscription Étudiant</h1>
          <p className="text-muted-foreground">Rejoignez notre établissement scolaire</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Photo Upload Section */}
            <div className="lg:col-span-1">
              <PhotoUpload
                onPhotoChange={setPhotoFile}
                label="Photo d'identité"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Format recommandé: JPG, PNG (max 5MB)
              </p>
            </div>

            {/* Form Sections */}
            <div className="lg:col-span-3 space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informations personnelles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="gender">Genre *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculin</SelectItem>
                        <SelectItem value="F">Féminin</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Date de naissance *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className={errors.birthDate ? 'border-red-500' : ''}
                    />
                    {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>}
                  </div>
                  <div>
                    <Label htmlFor="birthPlace">Lieu de naissance *</Label>
                    <Input
                      id="birthPlace"
                      type="text"
                      value={formData.birthPlace}
                      onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                      className={errors.birthPlace ? 'border-red-500' : ''}
                      placeholder="Ville de naissance"
                    />
                    {errors.birthPlace && <p className="text-sm text-red-500 mt-1">{errors.birthPlace}</p>}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Adresse
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                      <SelectTrigger className={errors.province ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Choisissez votre province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map(province => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.province && <p className="text-sm text-red-500 mt-1">{errors.province}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+243 XX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Adresse complète *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={errors.address ? 'border-red-500' : ''}
                    placeholder="Votre adresse complète"
                  />
                  {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                </div>
              </div>

              {/* Parent Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Informations du parent/tuteur
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentFirstName">Prénom du parent *</Label>
                    <Input
                      id="parentFirstName"
                      type="text"
                      value={formData.parentFirstName}
                      onChange={(e) => handleInputChange('parentFirstName', e.target.value)}
                      className={errors.parentFirstName ? 'border-red-500' : ''}
                      placeholder="Prénom du parent"
                    />
                    {errors.parentFirstName && <p className="text-sm text-red-500 mt-1">{errors.parentFirstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="parentLastName">Nom du parent *</Label>
                    <Input
                      id="parentLastName"
                      type="text"
                      value={formData.parentLastName}
                      onChange={(e) => handleInputChange('parentLastName', e.target.value)}
                      className={errors.parentLastName ? 'border-red-500' : ''}
                      placeholder="Nom du parent"
                    />
                    {errors.parentLastName && <p className="text-sm text-red-500 mt-1">{errors.parentLastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentPhone">Téléphone du parent *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                      className={errors.parentPhone ? 'border-red-500' : ''}
                      placeholder="+243 XX XXX XXXX"
                    />
                    {errors.parentPhone && <p className="text-sm text-red-500 mt-1">{errors.parentPhone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="parentEmail">Email du parent *</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                      className={errors.parentEmail ? 'border-red-500' : ''}
                      placeholder="parent@email.com"
                    />
                    {errors.parentEmail && <p className="text-sm text-red-500 mt-1">{errors.parentEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Informations de compte
                </h3>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                    placeholder="votre.email@exemple.com"
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Mot de passe *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                      placeholder="Minimum 6 caractères"
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                      placeholder="Répétez votre mot de passe"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Créer mon compte étudiant
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default RegisterStudent;
