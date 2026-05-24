/**
 * Animation Typed.js — une seule initialisation par page.
 * Chaînes : data-typed-strings='["ligne 1","ligne 2"]' sur #typed
 */
(function ($) {
  'use strict';

  $(function () {
    var el = document.getElementById('typed');
    if (!el || el.dataset.typedReady === '1' || typeof $.fn.typed !== 'function') {
      return;
    }

    var raw = el.getAttribute('data-typed-strings');
    if (!raw) {
      return;
    }

    var strings;
    try {
      strings = JSON.parse(raw);
    } catch (err) {
      console.warn('mcv-typed: data-typed-strings JSON invalide', err);
      return;
    }

    if (!Array.isArray(strings) || !strings.length) {
      return;
    }

    el.dataset.typedReady = '1';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    $('#typed').typed({
      strings: strings,
      typeSpeed: reduceMotion ? 0 : 100,
      startDelay: 0,
      backSpeed: reduceMotion ? 0 : 60,
      backDelay: reduceMotion ? 0 : 2000,
      loop: !reduceMotion,
      cursorChar: '|',
      contentType: 'html',
    });
  });
})(jQuery);
