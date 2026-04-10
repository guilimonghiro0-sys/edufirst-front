import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PhotoUpload from '@/components/PhotoUpload';
import { User, Mail, Lock, Phone, MapPin, GraduationCap, BookOpen } from 'lucide-react';

const RegisterTeacher = () => {
    const navigate = useNavigate();
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        specialty: '',
        experience: '',
        diploma: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        // Handle registration logic with photo
        console.log('Registering teacher:', { ...formData, photo: photoFile });
        navigate('/login');
    };

    return (
        <DashboardLayout role="teacher">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Inscription Enseignant</h1>
                    <p className="text-muted-foreground">Rejoignez notre équipe pédagogique</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Photo Upload Section */}
                    <div className="lg:col-span-1">
                        <PhotoUpload
                            onPhotoChange={setPhotoFile}
                            label="Photo de profil"
                        />
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            Format recommandé: JPG, PNG (max 5MB)
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                            placeholder="Votre prénom"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Nom *</Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    Informations professionnelles
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="specialty">Spécialité *</Label>
                                        <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisissez votre spécialité" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mathematiques">Mathématiques</SelectItem>
                                                <SelectItem value="francais">Français</SelectItem>
                                                <SelectItem value="anglais">Anglais</SelectItem>
                                                <SelectItem value="histoire">Histoire-Géographie</SelectItem>
                                                <SelectItem value="sciences">Sciences</SelectItem>
                                                <SelectItem value="philosophie">Philosophie</SelectItem>
                                                <SelectItem value="education_civique">Éducation Civique</SelectItem>
                                                <SelectItem value="informatique">Informatique</SelectItem>
                                                <SelectItem value="arts_plastiques">Arts Plastiques</SelectItem>
                                                <SelectItem value="musique">Musique</SelectItem>
                                                <SelectItem value="education_physique">Éducation Physique</SelectItem>
                                                <SelectItem value="autre">Autre</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="experience">Années d'expérience</Label>
                                        <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Votre expérience" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0-2">0-2 ans</SelectItem>
                                                <SelectItem value="3-5">3-5 ans</SelectItem>
                                                <SelectItem value="6-10">6-10 ans</SelectItem>
                                                <SelectItem value="11-20">11-20 ans</SelectItem>
                                                <SelectItem value="20+">Plus de 20 ans</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="diploma">Diplôme le plus élevé</Label>
                                    <Input
                                        id="diploma"
                                        type="text"
                                        value={formData.diploma}
                                        onChange={(e) => setFormData({ ...formData, diploma: e.target.value })}
                                        placeholder="Ex: Licence en Mathématiques, Master en Lettres..."
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    Informations de contact
                                </h3>

                                <div>
                                    <Label htmlFor="email">Email professionnel *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="votre.email@ecole.edu"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+243 XX XXX XXXX"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="address">Adresse</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Votre adresse complète"
                                    />
                                </div>
                            </div>

                            {/* Security */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    <Lock className="w-5 h-5" />
                                    Sécurité
                                </h3>

                                <div>
                                    <Label htmlFor="password">Mot de passe *</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        placeholder="Minimum 6 caractères"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                        placeholder="Répétez votre mot de passe"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" size="lg">
                                Créer mon compte enseignant
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default RegisterTeacher;