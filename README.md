# Edufirst Frontend

Ce dépôt contient le frontend React/Vite de l’application Edufirst.

## Backend

Le backend NestJS est disponible dans le dossier `backend/` et se connecte à PostgreSQL via la variable `DATABASE_URL`.

### Démarrage rapide

Sur Windows :
```bash
./start-backend.bat
```

Sur Linux/Mac :
```bash
chmod +x start-backend.sh
./start-backend.sh
```

Ou manuellement :
```bash
cd backend
npm install
cp .env.example .env
# modifier DATABASE_URL avec tes identifiants PostgreSQL
npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:seed
npm run start:dev
```

Le backend démarre sur `http://localhost:5000`

### Comptes de test

- **Admin**: admin@edufirst.com / admin123
- **Teacher**: teacher@edufirst.com / teacher123
- **Parent**: parent@edufirst.com / parent123

### API Endpoints

- `POST /auth/login` - Connexion
- `POST /auth/refresh` - Rafraîchir le token
- `GET /schools` - Liste des écoles
- `GET /students?schoolId=xxx` - Liste des étudiants par école
- `GET /users/:id` - Profil utilisateur
- `POST /registrations` - Créer une nouvelle inscription d'élève
- `GET /registrations?schoolId=xxx&status=xxx` - Liste des inscriptions pour un établissement
- `GET /registrations/:id` - Détail d'une inscription
- `PATCH /registrations/:id/status` - Approuver ou rejeter une inscription

### Pages frontend ajoutées

- `/register/inscription` : formulaire public d'envoi de demande d'inscription
- `/dashboard/admin/registrations` : tableau de bord admin pour valider/rejeter les inscriptions

## Flow des inscriptions

1. Un parent ou un établissement soumet un formulaire à `POST /registrations`.
2. Les inscriptions sont enregistrées avec le statut `PENDING`.
3. Un administrateur ou un school admin consulte les inscriptions via `GET /registrations`.
4. L'administrateur approuve une inscription avec `PATCH /registrations/:id/status`.
5. Si le statut passe à `APPROVED`, le backend crée automatiquement le compte élève.

## Frontend

```bash
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:5173` et se connecte automatiquement au backend.