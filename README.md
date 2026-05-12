# CV Personnel · Aissata Ka

> Projet réalisé dans le cadre du module **Programmation Web 2** · Licence 2 Sciences Informatiques · Faculté des Sciences Semlalia · Université Cadi Ayyad.

CV personnel interactif déployé sur GitHub Pages, construit avec trois technologies du développement web : HTML5/CSS3, jQuery et ReactJS.

## Démo en ligne

Le site est accessible à l'adresse : **https://Aicha05.github.io**

## Technologies utilisées

| Technologie | Rôle | Localisation dans le projet |
|---|---|---|
| HTML5 | Structure sémantique du document | `index.html` |
| CSS3 | Mise en forme, Flexbox, Grid, responsive | `css/style.css` |
| jQuery 3.7.1 | Animations DOM, accordéon, filtres, smooth scroll | `js/interactions.js` (lib dans `vendor/`) |
| ReactJS 18 | Composants UI dynamiques avec props | `react/components.js` (lib dans `vendor/`) |
| Font Awesome 6 | Icônes | `vendor/fontawesome/` |
| Google Fonts | Typographie (Fraunces + Inter) | inclus via CDN (fallback système si offline) |

**Note importante** : les bibliothèques React, ReactDOM, jQuery et Font Awesome sont **embarquées localement dans le dossier `vendor/`**. Cela permet au CV de fonctionner :
- en double-clic sur `index.html` (sans serveur),
- via un serveur HTTP local,
- en ligne sur GitHub Pages,
- sans dépendre d'une connexion Internet pour les libs essentielles.

React est utilisé avec `React.createElement` directement (sans JSX), ce qui évite d'embarquer Babel dans le navigateur. C'est plus léger et plus fiable.

## Structure du projet

```
.
├── index.html                  # Structure HTML5 sémantique
├── css/
│   └── style.css               # CSS3 pur (Flexbox, Grid, media queries)
├── js/
│   └── interactions.js         # Code jQuery (animations, accordéon, filtres, smooth scroll)
├── react/
│   └── components.js           # Composants React (ProjectCard, ContactForm, SkillBadge)
├── vendor/
│   ├── jquery.min.js
│   ├── react.production.min.js
│   ├── react-dom.production.min.js
│   └── fontawesome/            # Font Awesome (CSS + webfonts)
├── assets/
│   └── photo.jpg               # Photo de profil
└── README.md                   # Ce fichier
```

## Détail des interactions jQuery

Le fichier `js/interactions.js` contient les interactions DOM gérées par jQuery :

1. **Menu burger responsive** : ouverture / fermeture du menu mobile via `.toggleClass`.
2. **Animation des barres de compétences au scroll** : détection de l'entrée dans le viewport avec `$(window).scrollTop()`, animation de la largeur via `.css('width', ...)` et compte progressif du pourcentage avec `.animate()`.
3. **Accordéon de la formation** : `slideDown` / `slideUp` au clic sur les en-têtes.
4. **Filtres des projets** : déclenche un événement personnalisé `filterProjects` écouté par React, ce qui permet de **faire communiquer jQuery et React proprement**.
5. **Effets de survol** sur les tags de compétences avec `.hover()` et `.animate()`.
6. **Smooth scroll** sur les ancres de navigation avec `.animate({ scrollTop: ... })`.
7. **Fade-in au scroll** sur les blocs de contenu.

## Détail des composants React

Le fichier `react/components.js` contient **3 composants fonctionnels avec props** :

### `<SkillBadge label={...} />`
Petit composant réutilisable affichant une techno sous forme de pilule. Utilisé à l'intérieur de `<ProjectCard />`.

### `<ProjectCard title={...} category={...} description={...} technologies={[...]} icon={...} githubUrl={...} demoUrl={...} />`
Carte d'affichage d'un projet. Reçoit toutes ses données en props. Affiche le titre, la description, les technos (via `<SkillBadge />`) et les liens GitHub / démo.

### `<ContactForm />`
Formulaire de contact avec validation des champs (nom, email, message). Gère son propre état via `useState` (React Hooks). La validation contrôle :
- la présence des champs,
- une longueur minimale pour le nom et le message,
- le format de l'email via une expression régulière.

Un quatrième composant orchestrateur `<ProjectsSection />` gère la liste filtrable des projets et écoute l'événement personnalisé déclenché par jQuery.

## Sections du CV (conformément à l'énoncé)

1. **Header** : photo, nom, titre, coordonnées
2. **À propos** : biographie de 5 à 8 lignes
3. **Compétences** : techniques (avec barres animées en jQuery) et personnelles
4. **Formation** : parcours académique sous forme d'accordéon interactif (jQuery)
5. **Projets** : grille de `<ProjectCard />` (React) + section "Expériences complémentaires"
6. **Contact** : formulaire React avec validation

## Déploiement

### Déploiement initial

```bash
git init
git add .
git commit -m "init: cv project"
git branch -M main
git remote add origin https://github.com/Aicha05/Aicha05.github.io.git
git push -u origin main
```

### Activation de GitHub Pages

1. Aller dans `Settings > Pages`
2. Source : `Deploy from a branch`
3. Branch : `main` / `/ (root)`
4. Sauvegarder

Le site sera accessible à `https://Aicha05.github.io` après quelques minutes.

### Mises à jour

```bash
git add .
git commit -m "description du changement"
git push
```

## Lancement en local

### Option 1 : double-clic (le plus simple)

Ouvrir directement `index.html` en double-cliquant dessus. Le projet a été conçu pour fonctionner ainsi car toutes les bibliothèques sont embarquées localement (`vendor/`).

> Sur Chrome récent, certaines polices Google Fonts peuvent ne pas charger en `file://`. Les polices système prennent le relais et le rendu reste propre.

### Option 2 : serveur HTTP local (recommandé pour le développement)

```bash
# Avec Python 3
python3 -m http.server 8000

# Ou avec Node (si installé)
npx http-server
```

Puis ouvrir `http://localhost:8000` dans le navigateur.

## Auteure

**Aissata Ka**
Étudiante en Licence 2 Sciences Informatiques
Faculté des Sciences Semlalia · Université Cadi Ayyad
Email : aissatak540@gmail.com
GitHub : [Aicha05](https://github.com/Aicha05)
