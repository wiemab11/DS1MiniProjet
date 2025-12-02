# DS1 - Mini-Projet ISIDS
API REST de gestion de projets et tâches (Express.js + MongoDB)

Auteur:
Wiem abdellaoui 1MISIDS

## Installation
1. Cloner le repo
2. `npm install`
3. Créer `.env` (voir `.env.example`)
4. `npm run dev` (ou `npm start`)

## Endpoints
Voir dossier `src/routes` et contrôleurs.

## Règles métier
- Auth via JWT
- Rôles: user | manager
- Seul manager peut assigner des tâches et voir tous les projets
- Statuts de tâche: todo, doing, done

## Remarques sur les commits
Chaque commit doit être clair (ex : `feat: create project model`, `fix: auth middleware`). Les commits seront vérifiés.

## Commentaires
Le code est commenté en arabe dialectal (exemples dans le code).
