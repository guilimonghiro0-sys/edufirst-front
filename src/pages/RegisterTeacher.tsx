import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import apiClient from '@/api/client';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Lock, Phone, GraduationCap } from 'lucide-react';

const teacherSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  gender: z.enum(['M', 'F'], { required_error: 'Genre requis' }),
  birthDate: z.string().min(1, 'Date de naissance requise'),
  birthPlace: z.string().min(1, 'Lieu de naissance requis'),
  province: z.string().min(1, 'Province requise'),
  address: z.string().min(1, 'Adresse requise'),
  phone: z.string().optional(),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe (min 6 caractères)'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

type TeacherForm = z.infer<typeof teacherSchema>;

const provinces = [
  "Kinshasa", "Kongo Central", "Kwango", "Kwilu", "Mai-Ndombe", "Équateur",
  "Mongala", "Nord-Ubangi", "Sud-Ubangi", "Tshuapa", "Bas-Uele", "Haut-Uele",
  "Ituri", "Tshopo", "Nord-Kivu", "Sud-Kivu", "Maniema", "Tanganyika",
  "Haut-Lomami", "Lualaba", "Haut-Katanga", "Lomami", "Sankuru", "Kasaï",
  "Kasaï-Central", "Kasaï-Oriental"
];

const RegisterTeacher = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TeacherForm>({
    resolver: zodResolver(teacherSchema),
  });

  const onSubmit = async (data: TeacherForm) => {
    try {
      const response = await apiClient.post('/register/teacher/', data);
      toast.success(response.data.message || "Inscription réussie ! Vérifiez vos emails.");
      navigate('/login?checkEmail=true');
    } catch (error: any) {
      const message = error.response?.data?.detail || "Erreur lors de l'inscription";
      toast.error(message);
    }
  };

  return (
    <DashboardLayout role="teacher">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Inscription Enseignant</h1>
          <p className="text-muted-foreground">Rejoignez notre équipe pédagogique</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Identité */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><User className="w-5 h-5" /> Identité</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Prénom *</Label>
                <Input {...register('firstName')} placeholder="Prénom" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label>Nom *</Label>
                <Input {...register('lastName')} placeholder="Nom" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
              <div>
                <Label>Genre *</Label>
                <Select onValueChange={(val) => setValue('gender', val as 'M' | 'F')}>
                  <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Masculin</SelectItem>
                    <SelectItem value="F">Féminin</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </div>
              <div>
                <Label>Date de naissance *</Label>
                <Input type="date" {...register('birthDate')} />
                {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
              </div>
              <div>
                <Label>Lieu de naissance *</Label>
                <Input {...register('birthPlace')} placeholder="Ville" />
                {errors.birthPlace && <p className="text-red-500 text-sm">{errors.birthPlace.message}</p>}
              </div>
              <div>
                <Label>Province *</Label>
                <Select onValueChange={(val) => setValue('province', val)}>
                  <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                  <SelectContent>
                    {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Label>Adresse *</Label>
                <Input {...register('address')} placeholder="Adresse complète" />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Mail className="w-5 h-5" /> Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Email *</Label>
                <Input type="email" {...register('email')} placeholder="prof@ecole.com" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input {...register('phone')} placeholder="+243 XX XXX XXXX" />
              </div>
            </div>
          </div>

          {/* Sécurité */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Lock className="w-5 h-5" /> Sécurité</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Mot de passe *</Label>
                <Input type="password" {...register('password')} placeholder="6 caractères minimum" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <div>
                <Label>Confirmer *</Label>
                <Input type="password" {...register('confirmPassword')} placeholder="Répéter" />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">Créer mon compte enseignant</Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default RegisterTeacher;