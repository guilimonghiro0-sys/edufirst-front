# Edufirst Frontend

Ce dépôt contient le frontend React/Vite de l’application Edufirst.

## Backend

Ce dépôt contient uniquement le frontend React/Vite de l’application Edufirst. Le backend n’est plus inclus ici.

Les appels d’API utilisent la variable d’environnement `VITE_API_BASE_URL` si elle est définie. Sans cette variable, les requêtes sont relatives au domaine courant.

## Frontend

```bash
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:5173`. Les appels d’API sont relatifs ou utilisent `VITE_API_BASE_URL` si elle est définie.
