/* ============================================================
 *  Aissata Ka · CV personnel · Interactions jQuery
 *  Module : Programmation Web 2
 *
 *  Ce fichier contient toutes les interactions DOM gérées par jQuery :
 *    1. Menu burger (mobile)
 *    2. Animation des barres de compétences au scroll
 *    3. Accordéon de la formation
 *    4. Filtres des projets (déclenche un événement custom écouté par React)
 *    5. Effets de survol sur les tags de compétences
 *    6. Smooth scroll sur les liens de navigation
 *  La validation du formulaire est faite dans le composant React.
 * ============================================================ */

$(document).ready(function () {

  /* ====================================================
   * 1. Menu burger (responsive mobile)
   * ==================================================== */
  $('#navBurger').on('click', function () {
    $('.navbar-links').toggleClass('is-open');
  });

  // Ferme le menu mobile quand on clique sur un lien
  $('.navbar-links a').on('click', function () {
    $('.navbar-links').removeClass('is-open');
  });


  /* ====================================================
   * 2. Animation des barres de compétences au scroll
   * --------------------------------------------------
   * Chaque .skill-bar a un data-level. Quand la barre
   * entre dans le viewport, on anime sa largeur jusqu'au %.
   * ==================================================== */
  function animateSkillBars() {
    $('.skill-bar').each(function () {
      var $bar = $(this);
      if ($bar.hasClass('is-animated')) return;

      var barTop = $bar.offset().top;
      var scrollBottom = $(window).scrollTop() + $(window).height();

      if (scrollBottom > barTop + 50) {
        var level = $bar.data('level');
        $bar.find('.skill-bar-fill').css('width', level + '%');
        $bar.addClass('is-animated');

        // Animation du pourcentage (compte de 0 à level)
        var $pct = $bar.find('.skill-bar-pct');
        $({ counter: 0 }).animate(
          { counter: level },
          {
            duration: 1200,
            step: function (now) {
              $pct.text(Math.round(now) + '%');
            },
            complete: function () {
              $pct.text(level + '%');
            }
          }
        );
      }
    });
  }

  // Déclenche au scroll et au chargement
  $(window).on('scroll', animateSkillBars);
  animateSkillBars();


  /* ====================================================
   * 3. Accordéon de la formation
   * --------------------------------------------------
   * Au clic sur un bouton .accordion-trigger, on ouvre
   * le panneau correspondant et on ferme les autres.
   * ==================================================== */
  $('.accordion-trigger').on('click', function () {
    var $item = $(this).parent('.accordion-item');
    var $panel = $item.find('.accordion-panel');
    var isOpen = $item.hasClass('is-open');

    // Ferme tous les autres
    $('.accordion-item.is-open').not($item).removeClass('is-open');
    $('.accordion-panel').not($panel).slideUp(300);

    // Toggle l'item cliqué
    if (isOpen) {
      $item.removeClass('is-open');
      $panel.slideUp(300);
      $(this).attr('aria-expanded', 'false');
    } else {
      $item.addClass('is-open');
      $panel.slideDown(300);
      $(this).attr('aria-expanded', 'true');
    }
  });

  // Ouvre le premier item par défaut
  $('.accordion-item').first().find('.accordion-trigger').trigger('click');


  /* ====================================================
   * 4. Filtres des projets
   * --------------------------------------------------
   * Au clic sur un bouton .filter-btn, on déclenche un
   * événement custom 'filterProjects' que le composant
   * React écoute via window.addEventListener.
   * ==================================================== */
  $('#projectsFilters').on('click', '.filter-btn', function () {
    var $btn = $(this);
    var filter = $btn.data('filter');

    // Mise à jour visuelle des boutons
    $('.filter-btn').removeClass('active');
    $btn.addClass('active');

    // Notifier React via un événement custom sur window
    var event = new CustomEvent('filterProjects', { detail: { filter: filter } });
    window.dispatchEvent(event);
  });


  /* ====================================================
   * 5. Hover effects sur les tags de compétences
   * --------------------------------------------------
   * Petit effet de rebond au survol.
   * ==================================================== */
  $('.skill-tag').hover(
    function () {
      $(this).stop(true).animate({ paddingLeft: '18px', paddingRight: '18px' }, 200);
    },
    function () {
      $(this).stop(true).animate({ paddingLeft: '14px', paddingRight: '14px' }, 200);
    }
  );


  /* ====================================================
   * 6. Smooth scroll sur les ancres de navigation
   * --------------------------------------------------
   * On utilise jQuery animate avec scrollTop pour
   * compenser la hauteur de la navbar fixe (80px).
   * ==================================================== */
  $('a[href^="#"]').on('click', function (e) {
    var href = $(this).attr('href');
    if (href.length > 1) {
      var $target = $(href);
      if ($target.length) {
        e.preventDefault();
        $('html, body').animate(
          { scrollTop: $target.offset().top - 70 },
          600
        );
      }
    }
  });


  /* ====================================================
   * 7. Effet de fade-in au scroll pour les sections
   * --------------------------------------------------
   * Bonus visuel : les blocs apparaissent en fondu
   * quand ils entrent dans la zone visible.
   * ==================================================== */
  function fadeInOnScroll() {
    $('.section-head, .about-grid, .skills-grid, .accordion, .projects-grid, .exp-list, .contact-grid').each(function () {
      var $el = $(this);
      if ($el.hasClass('is-visible')) return;

      var elTop = $el.offset().top;
      var scrollBottom = $(window).scrollTop() + $(window).height();

      if (scrollBottom > elTop + 80) {
        $el.css({ opacity: 0, transform: 'translateY(20px)' });
        $el.addClass('is-visible');
        $el.animate({ opacity: 1 }, 800);
        $el.css('transform', 'translateY(0)');
        $el.css('transition', 'transform 0.8s ease');
      }
    });
  }

  $(window).on('scroll', fadeInOnScroll);
  fadeInOnScroll();

});
