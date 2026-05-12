/* ============================================================
 *  Aissata Ka · CV personnel · Composants React
 *  Module : Programmation Web 2
 *
 *  Ce fichier contient les composants React utilisés sur le CV :
 *    1. <ProjectCard />  : affiche un projet (titre, description, technos, liens)
 *    2. <ContactForm />  : formulaire de contact avec validation
 *    3. <SkillBadge />   : badge réutilisable utilisé par ProjectCard pour les technos
 *
 *  Tous les composants reçoivent des props et sont fonctionnels (React Hooks).
 *
 *  Note : on utilise volontairement React.createElement plutôt que JSX, ce qui
 *  évite d'avoir à embarquer Babel dans le navigateur. Le code marche donc en
 *  double-clic sur index.html, sans aucune transpilation runtime.
 *  L'alias 'e' rend l'écriture proche du JSX en lisibilité.
 * ============================================================ */

const { useState, useEffect } = React;
const e = React.createElement;


/* ============================================================
 * Composant 1 : <SkillBadge />
 * ------------------------------------------------------------
 * Petit badge réutilisable pour afficher une techno.
 * Props :
 *   - label (string, requis) : le nom de la techno à afficher
 * ============================================================ */
function SkillBadge(props) {
  return e('span', null, props.label);
}


/* ============================================================
 * Composant 2 : <ProjectCard />
 * ------------------------------------------------------------
 * Carte d'affichage d'un projet.
 * Props :
 *   - title        (string, requis)     : titre du projet
 *   - category     (string, requis)     : catégorie pour le filtre ('web' | 'game')
 *   - description  (string, requis)     : description courte
 *   - technologies (string[], requis)   : liste des technos utilisées
 *   - icon         (string, optionnel)  : classe Font Awesome de l'icône
 *   - githubUrl    (string, optionnel)  : lien GitHub
 *   - demoUrl      (string, optionnel)  : lien vers la démo
 * ============================================================ */
function ProjectCard(props) {
  const { title, category, description, technologies, icon, githubUrl, demoUrl } = props;

  // En-tête (catégorie + icône)
  const head = e('div', { className: 'project-card-head' },
    e('span', { className: 'project-card-cat' }, category === 'web' ? 'Web' : 'Jeu'),
    icon
      ? e('div', { className: 'project-card-icon' },
          e('i', { className: icon })
        )
      : null
  );

  // Liste des technos (réutilise <SkillBadge />)
  const techs = e('div', { className: 'project-card-tech' },
    technologies.map((tech, idx) =>
      e(SkillBadge, { key: idx, label: tech })
    )
  );

  // Liens GitHub / Démo (affichés conditionnellement)
  const links = e('div', { className: 'project-card-links' },
    githubUrl
      ? e('a', { href: githubUrl, target: '_blank', rel: 'noopener noreferrer' },
          e('i', { className: 'fa-brands fa-github' }),
          ' Code source'
        )
      : null,
    demoUrl
      ? e('a', { href: demoUrl, target: '_blank', rel: 'noopener noreferrer' },
          e('i', { className: 'fa-solid fa-arrow-up-right-from-square' }),
          ' Démo'
        )
      : null
  );

  return e('article', { className: 'project-card', 'data-category': category },
    head,
    e('h3', null, title),
    e('p', { className: 'project-card-desc' }, description),
    techs,
    links
  );
}


/* ============================================================
 * Composant 3 : <ContactForm />
 * ------------------------------------------------------------
 * Formulaire de contact avec validation.
 * Pas de props ici, il gère son état interne via useState.
 * Validation : champs non vides, longueur minimale, regex pour l'email.
 * ============================================================ */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(function (prev) {
      const next = Object.assign({}, prev);
      next[name] = value;
      return next;
    });
    if (errors[name]) {
      setErrors(function (prev) {
        const next = Object.assign({}, prev);
        next[name] = '';
        return next;
      });
    }
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères.';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Le format de l'email est invalide.";
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères.';
    }

    return newErrors;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(function () { setIsSent(false); }, 5000);
  }

  // Helper pour créer un champ
  function renderField(opts) {
    const { id, label, type, placeholder, multiline } = opts;
    const inputClass = errors[id] ? 'is-error' : '';

    const inputElement = multiline
      ? e('textarea', {
          id: id,
          name: id,
          value: formData[id],
          onChange: handleChange,
          className: inputClass,
          placeholder: placeholder
        })
      : e('input', {
          type: type || 'text',
          id: id,
          name: id,
          value: formData[id],
          onChange: handleChange,
          className: inputClass,
          placeholder: placeholder
        });

    return e('div', { className: 'form-group' },
      e('label', { htmlFor: id }, label),
      inputElement,
      e('span', { className: 'error-msg' }, errors[id] || '')
    );
  }

  return e('form', { className: 'contact-form', onSubmit: handleSubmit, noValidate: true },
    renderField({ id: 'name', label: 'Nom', placeholder: 'Votre nom' }),
    renderField({ id: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' }),
    renderField({ id: 'message', label: 'Message', placeholder: 'Votre message...', multiline: true }),
    e('button', { type: 'submit', className: 'submit-btn' },
      e('i', { className: 'fa-solid fa-paper-plane' }),
      ' Envoyer le message'
    ),
    isSent
      ? e('div', { className: 'success-msg' },
          e('i', { className: 'fa-solid fa-circle-check' }),
          ' Message envoyé. Merci, je vous répondrai rapidement.'
        )
      : null
  );
}


/* ============================================================
 * Composant orchestrateur : <ProjectsSection />
 * ------------------------------------------------------------
 * Liste de projets filtrable.
 * Écoute l'événement personnalisé 'filterProjects' déclenché par jQuery
 * pour mettre à jour le filtre actif.
 * Props :
 *   - projects (array, requis) : tableau des projets à afficher
 * ============================================================ */
function ProjectsSection(props) {
  const projects = props.projects;
  const [filter, setFilter] = useState('all');

  useEffect(function () {
    function handleFilterEvent(evt) {
      setFilter(evt.detail.filter);
    }
    window.addEventListener('filterProjects', handleFilterEvent);
    return function () {
      window.removeEventListener('filterProjects', handleFilterEvent);
    };
  }, []);

  const visible = filter === 'all'
    ? projects
    : projects.filter(function (p) { return p.category === filter; });

  return e(React.Fragment, null,
    visible.map(function (p, idx) {
      return e(ProjectCard, {
        key: idx,
        title: p.title,
        category: p.category,
        description: p.description,
        technologies: p.technologies,
        icon: p.icon,
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl
      });
    })
  );
}


/* ============================================================
 *  Données des projets
 *  Liens GitHub à remplacer quand Aissata aura poussé ses repos.
 * ============================================================ */
const PROJECTS_DATA = [
  {
    title: "Site eCampus",
    category: "web",
    description:
      "Site web universitaire conçu dans le cadre du module Programmation Web 1. Pages d'accueil, présentation des filières, espace étudiant et formulaire d'inscription. Mise en page responsive et interactions JavaScript.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    icon: "fa-solid fa-graduation-cap",
    githubUrl: "#",
    demoUrl: null
  },
  {
    title: "Mini-jeu de course du soldat",
    category: "game",
    description:
      "Jeu 2D développé en C++ avec la bibliothèque SFML. Le joueur incarne un soldat qui doit atteindre le bunker en évitant des obstacles dans un temps limité. Gestion des collisions, sprites animés et chrono.",
    technologies: ["C++", "SFML", "POO"],
    icon: "fa-solid fa-gamepad",
    githubUrl: "#",
    demoUrl: null
  }
];


/* ============================================================
 *  Montage des composants React
 *  - Projets dans #root-projects
 *  - Formulaire de contact dans #root-contact
 * ============================================================ */
(function mountReactComponents() {
  const projectsEl = document.getElementById('root-projects');
  const contactEl = document.getElementById('root-contact');

  if (projectsEl) {
    const projectsRoot = ReactDOM.createRoot(projectsEl);
    projectsRoot.render(e(ProjectsSection, { projects: PROJECTS_DATA }));
  }

  if (contactEl) {
    const contactRoot = ReactDOM.createRoot(contactEl);
    contactRoot.render(e(ContactForm));
  }
})();
