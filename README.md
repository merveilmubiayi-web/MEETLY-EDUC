# Educ-Change

Application web multi-portails pour la gestion et le suivi scolaire.

## Demarrage

```bash
npm install
npm run dev
```

Vite demarre le serveur local et conserve chaque portail HTML comme une page accessible directement.

## Production

```bash
npm run build
npm run preview
```

## Organisation actuelle

- `index.html` : page d'accueil principale
- `horizon-academie-accueil.html` : accueil Academie
- `horizon-academie-admin.html` : portail administration
- `horizon-academie-eleve.html` : portail eleve
- `horizon-academie-parent.html` : portail parent
- `horizon-academie-professeur-primaire.html` : portail professeur primaire
- `horizon-academie-professeur-secondaire.html` : portail professeur secondaire
- `assets/` : medias utilises par les pages
- `public/` : ressources servies telles quelles par Vite
- `dist/` : sortie de production generee, ignoree par Git

Les pages restent volontairement independantes dans cette premiere etape afin de valider le build sans modifier leur comportement. La mutualisation des composants et des styles pourra ensuite se faire portail par portail.
