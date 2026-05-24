/**
 * Texte hero — une seule initialisation par page.
 * Pages MCV : texte statique (pas de Typed.js en boucle → évite gel CPU).
 * data-typed-strings='["ligne 1","ligne 2"]' sur #typed
 */
(function ($) {
  'use strict';

  function getStrings(el) {
    var raw = el.getAttribute('data-typed-strings');
    if (!raw) {
      return null;
    }
    try {
      var strings = JSON.parse(raw);
      return Array.isArray(strings) && strings.length ? strings : null;
    } catch (err) {
      console.warn('mcv-typed: data-typed-strings JSON invalide', err);
      return null;
    }
  }

  $(function () {
    var el = document.getElementById('typed');
    if (!el || el.dataset.typedReady === '1') {
      return;
    }

    var strings = getStrings(el);
    if (!strings) {
      return;
    }

    el.dataset.typedReady = '1';

    var isMcvLanding = document.body.classList.contains('mcv-landing');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMcvLanding || reduceMotion || typeof $.fn.typed !== 'function') {
      el.textContent = strings[0];
      return;
    }

    $('#typed').typed({
      strings: strings,
      typeSpeed: 100,
      startDelay: 0,
      backSpeed: 60,
      backDelay: 2000,
      loop: false,
      cursorChar: '|',
      contentType: 'html',
    });
  });
})(jQuery);
