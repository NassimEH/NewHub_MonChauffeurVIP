/**
 * Flèches hero : navigation circulaire dans l’ordre du menu header.
 */
(function () {
  'use strict';

  if (!document.body.classList.contains('mcv-landing')) {
    return;
  }

  var ORDER = [
    { key: 'hub', href: 'index.html', label: 'Hub MonChauffeurVIP' },
    { key: 'chauffeur', href: 'monchauffeurvip.html', label: 'MonChauffeurVIP' },
    { key: 'taxi', href: 'montaxivip.html', label: 'MonTaxiVIP' },
    { key: 'tld', href: 'tld.html', label: 'Trajets Longues Distance (TLD)' },
    { key: 'app', href: 'application-mobile.html', label: 'Application mobile' },
    { key: 'blog', href: 'blog.html', label: 'Le Blog' },
  ];

  function getCurrentKey() {
    var body = document.body;
    if (body.classList.contains('mcv-page-hub')) {
      return 'hub';
    }
    if (body.classList.contains('mcv-page-chauffeur')) {
      return 'chauffeur';
    }
    if (body.classList.contains('mcv-page-taxi')) {
      return 'taxi';
    }
    if (body.classList.contains('mcv-page-tld')) {
      return 'tld';
    }
    if (body.classList.contains('mcv-page-app')) {
      return 'app';
    }
    if (body.classList.contains('mcv-page-blog')) {
      return 'blog';
    }
    return null;
  }

  function init() {
    var currentKey = getCurrentKey();
    if (!currentKey) {
      return;
    }

    var index = -1;
    var i;
    for (i = 0; i < ORDER.length; i += 1) {
      if (ORDER[i].key === currentKey) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return;
    }

    var hero =
      document.getElementById('mcv-hero') ||
      document.getElementById('mcv-service-hero') ||
      document.getElementById('mcv-app-hero') ||
      document.querySelector(
        '.banner_section--fullscreen.mcv-hero--hub, .banner_section--fullscreen.mcv-service-hero, .banner_section--fullscreen.mcv-app-hero'
      );
    if (!hero || hero.querySelector('.mcv-hero-service-nav')) {
      return;
    }

    var prevItem = ORDER[(index - 1 + ORDER.length) % ORDER.length];
    var nextItem = ORDER[(index + 1) % ORDER.length];

    var nav = document.createElement('nav');
    nav.className = 'mcv-hero-service-nav';
    nav.setAttribute('aria-label', 'Navigation entre les services du hub');

    nav.appendChild(createLink(prevItem, 'prev'));
    nav.appendChild(createLink(nextItem, 'next'));

    hero.appendChild(nav);
  }

  function createLink(item, direction) {
    var link = document.createElement('a');
    link.className =
      'mcv-hero-service-nav__btn mcv-hero-service-nav__btn--' + direction;
    link.href = item.href;
    link.setAttribute(
      'aria-label',
      (direction === 'prev' ? 'Service précédent : ' : 'Service suivant : ') +
        item.label
    );

    var icon = document.createElement('span');
    icon.className = 'material-icons';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = direction === 'prev' ? 'chevron_left' : 'chevron_right';
    link.appendChild(icon);

    return link;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
