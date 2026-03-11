# Portfolio – Alexis Vignot

Portfolio personnel développé pour présenter mes projets, mes compétences et mon parcours dans le développement web, l’architecture technique et la création d’expériences interactives. Le site met en avant une interface moderne, animée et immersive grâce à l’utilisation de Three.js et de l’écosystème React Three Fiber.

## Objectif du projet

Ce portfolio a été conçu pour :

- présenter mes réalisations de manière claire et professionnelle ;

- offrir une expérience visuelle fluide et moderne ;

- démontrer mes compétences en React, 3D, animations et architecture front-end ;

- disposer d’un site performant, sécurisé et déployé dans un environnement cloud robuste.

## Stack technique

Le projet repose sur une stack moderne orientée performance et modularité :

- React 19 — interface utilisateur

- React Three Fiber / Drei / Postprocessing — rendu 3D et animations

- Three.js — moteur 3D

- Redux Toolkit — gestion d’état

- React Router DOM — navigation

- Vite — développement et build ultra rapide

- TypeScript — typage strict et fiabilité

- Sass — styles modulaires

- ESLint + TypeScript ESLint — qualité du code

## Infrastructure et déploiement

Le portfolio est hébergé sur Oracle Cloud Infrastructure (OCI), dans un environnement conteneurisé et optimisé pour la production.

### Docker
L’application est buildée puis intégrée dans un conteneur Docker, permettant :

- un environnement stable et reproductible ;

- des mises à jour rapides ;

- une isolation complète du service.

### Nginx

Un serveur Nginx est utilisé comme reverse proxy pour :

- servir les fichiers statiques du build Vite ;

- gérer le routage d’une Single Page Application (SPA) ;

- optimiser les performances via le caching ;

- sécuriser l’accès via HTTPS (si configuré).

### Oracle Cloud

L’instance OCI assure :

- l’hébergement du conteneur Docker ;

- la configuration réseau (firewall, ports, DNS) ;

- la disponibilité 24/7 du site.

Cette architecture garantit un déploiement fiable, performant et facilement maintenable.

## Scripts disponibles

```json
"dev": "vite",
"build": "tsc -b && vite build",
"lint": "eslint .",
"preview": "vite preview"
```

## Structure générale du projet

```
src/
  components/     # Composants UI
  pages/          # Pages du portfolio
  three/          # Scènes, modèles et animations 3D
  store/          # Redux Toolkit
  styles/         # SCSS
  App.tsx
  main.tsx
```

## Fonctionnalités principales

- Interface moderne et animée

- Scènes 3D interactives

- Navigation fluide en SPA

- Architecture front-end propre et modulaire

- Déploiement cloud sécurisé et conteneurisé

