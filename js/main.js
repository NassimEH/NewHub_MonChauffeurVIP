/* global AOS */
'use strict';

/**
 * Extensions Chrome (traduction, adblock, gestionnaires de mots de passe, etc.)
 * injectent parfois ce rejet de promesse — ce n’est pas une erreur du site MCV.
 */
(function mcvIgnoreExtensionMessagingNoise() {
  function isExtensionChannelError(reason) {
    var message = '';
    if (reason && typeof reason.message === 'string') {
      message = reason.message;
    } else if (typeof reason === 'string') {
      message = reason;
    }
    return (
      message.indexOf('message channel closed') !== -1 &&
      message.indexOf('asynchronous response') !== -1
    );
  }

  window.addEventListener('unhandledrejection', function (event) {
    if (isExtensionChannelError(event.reason)) {
      event.preventDefault();
    }
  });
})();

var IS_MCV_LANDING = document.body.classList.contains('mcv-landing');

/** Masque le preloader tout de suite (sans jQuery) pour ne pas bloquer clics / menu contextuel */
function mcvHidePreloader() {
  var preloader = document.getElementById('preloader');
  if (!preloader || preloader.dataset.mcvHidden === '1') {
    return;
  }
  preloader.dataset.mcvHidden = '1';
  preloader.style.pointerEvents = 'none';
  preloader.style.opacity = '0';
  preloader.style.visibility = 'hidden';
  preloader.setAttribute('aria-hidden', 'true');
  preloader.classList.add('is-hidden');
  if (preloader.parentNode) {
    preloader.parentNode.removeChild(preloader);
  }
}

/** Débloque l’UI si un overlay template ou Bootstrap reste actif */
function mcvEnsurePageInteractive() {
  mcvHidePreloader();

  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';

  document.querySelectorAll('.modal-backdrop').forEach(function (node) {
    node.parentNode.removeChild(node);
  });

  var purple = document.querySelector('.purple_backdrop');
  if (purple) {
    purple.style.pointerEvents = 'none';
    purple.style.opacity = '0';
    purple.style.visibility = 'hidden';
  }

  var header = document.querySelector('header');
  if (header && IS_MCV_LANDING) {
    header.classList.remove('fix_style', 'fixed');
  }
}

(function mcvPreloaderInit() {
  mcvHidePreloader();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mcvEnsurePageInteractive);
  } else {
    mcvEnsurePageInteractive();
  }
  window.addEventListener('load', mcvEnsurePageInteractive);
  window.setTimeout(mcvEnsurePageInteractive, 400);
  window.setTimeout(mcvEnsurePageInteractive, 2000);
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      mcvEnsurePageInteractive();
    }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      mcvEnsurePageInteractive();
    }
  });
})();

function mcvThrottleRaf(fn) {
  var scheduled = false;
  return function () {
    if (scheduled) {
      return;
    }
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      fn();
    });
  };
}

function mcvInitOwlCarousel(selector, options) {
  if (typeof $ === 'undefined' || !$.fn.owlCarousel) {
    return;
  }
  var $el = $(selector);
  if ($el.length) {
    $el.owlCarousel(options);
  }
}

// Sous-menu (template)
if (typeof jQuery !== 'undefined' && jQuery('.drp_btn').length) {
  jQuery('.drp_btn').click(function () {
    jQuery(this).siblings('.sub_menu').slideToggle();
  });
}

// Carrousels template (pages hub MCV : aucun de ces sélecteurs)
if (!IS_MCV_LANDING) {
  mcvInitOwlCarousel('#frmae_slider', {
    loop: true,
    margin: 10,
    autoplay: true,
    smartSpeed: 1500,
    nav: false,
    dots: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  mcvInitOwlCarousel('#company_slider', {
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    smartSpeed: 1500,
    dots: true,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1000: { items: 5 } },
  });

  mcvInitOwlCarousel('#testimonial_slider', {
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    smartSpeed: 2500,
    dots: true,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  mcvInitOwlCarousel('#testimonial_slider1', {
    loop: true,
    margin: 30,
    nav: true,
    autoHeight: true,
    autoplay: true,
    smartSpeed: 2500,
    dots: false,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
  });

  mcvInitOwlCarousel('#screen_slider', {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    smartSpeed: 2500,
    center: true,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 5 } },
  });

  mcvInitOwlCarousel('#text_list_flow', {
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    center: true,
    autoplay: true,
    slideTransition: 'linear',
    autoplayTimeout: 4000,
    autoplaySpeed: 4000,
    autoWidth: true,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1000: { items: 4 } },
  });
}

// Compteur — une seule animation par visibilité (évite le gel au scroll)
if (!IS_MCV_LANDING) {
  (function () {
    var counterAnimated = false;

    function runCounterAnimation(targetValue) {
      $('.counter-value').each(function () {
        var $this = $(this);
        var countTo = targetValue ? $this.attr('data-count') : 0;
        $this.stop(true, true);
        $({ countNum: parseInt($this.text(), 10) || 0 }).animate(
          { countNum: countTo },
          {
            duration: targetValue ? 1400 : 100,
            easing: 'swing',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    }

    window.addEventListener(
      'scroll',
      mcvThrottleRaf(function () {
        var element = document.querySelector('#counter');
        if (!element) {
          return;
        }
        var position = element.getBoundingClientRect();
        var fullyVisible =
          position.top >= 0 && position.bottom <= window.innerHeight;

        if (fullyVisible && !counterAnimated) {
          counterAnimated = true;
          runCounterAnimation(true);
        }
      }),
      { passive: true }
    );
  })();
}

// Magnific Popup (si présent)
if (typeof jQuery !== 'undefined') {
jQuery(function () {
  if (jQuery.fn.magnificPopup && jQuery('.popup-youtube').length) {
    $('.popup-youtube').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  }
});
}

if (typeof jQuery !== 'undefined' && jQuery('.tog_block').length) {
jQuery(document).ready(function () {
  jQuery('.tog_block').click(function () {
    $('.tog_btn').toggleClass('month_active');
    $('.month').toggleClass('active');
    $('.years').toggleClass('active');
    $('.monthly_plan').toggleClass('active');
    $('.yearly_plan').toggleClass('active');
  });
});
}

if (typeof jQuery !== 'undefined' && jQuery('.collapse').length) {
jQuery(document).ready(function () {
  jQuery('.collapse.show').each(function () {
    $(this)
      .prev('.card-header')
      .find('.icon_faq')
      .addClass('icofont-minus')
      .removeClass('icofont-plus');
  });

  $('.collapse')
    .on('show.bs.collapse', function () {
      $(this).prev('.card-header').find('.icon_faq').removeClass('icofont-plus').addClass('icofont-minus');
    })
    .on('hide.bs.collapse', function () {
      $(this).prev('.card-header').find('.icon_faq').removeClass('icofont-minus').addClass('icofont-plus');
    })
    .on('show.bs.collapse', function () {
      $(this).prev('.card-header').children('h2').children('.btn').addClass('active');
    })
    .on('hide.bs.collapse', function () {
      $(this).prev('.card-header').children('h2').children('.btn').removeClass('active');
    });
});
}

// Fond violet au scroll (template uniquement, un seul listener)
if (!IS_MCV_LANDING) {
  (function () {
    function updatePurpleBackdrop() {
      var selector = window.innerWidth < 768 ? '.mobile_mockup' : '.free_text';
      var element = document.querySelector(selector);
      var opacity = '0';
      if (element) {
        var position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          opacity = '1';
        }
      }
      $('.purple_backdrop').css('opacity', opacity);
    }

    window.addEventListener('scroll', mcvThrottleRaf(updatePurpleBackdrop), { passive: true });
    window.addEventListener('resize', mcvThrottleRaf(updatePurpleBackdrop), { passive: true });
    updatePurpleBackdrop();
  })();
}

// Année footer
(function () {
  var yearEl = document.getElementById('mcv-current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();

// Retour en haut
(function () {
  var goTop = document.querySelector('.go_top');
  if (!goTop) {
    return;
  }

  var showAfter = 400;

  function updateVisibility() {
    var scrolled = window.scrollY || document.documentElement.scrollTop;
    goTop.classList.toggle('is-visible', scrolled > showAfter);
  }

  function scrollToTop(event) {
    if (event) {
      event.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!goTop.getAttribute('role')) {
    goTop.setAttribute('role', 'button');
    goTop.setAttribute('tabindex', '0');
    goTop.setAttribute('aria-label', 'Retour en haut de la page');
  }

  goTop.addEventListener('click', scrollToTop);
  goTop.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      scrollToTop(event);
    }
  });

  window.addEventListener('scroll', mcvThrottleRaf(updateVisibility), { passive: true });
  updateVisibility();
})();

// Header fixe (template uniquement — pas d'écouteur scroll sur pages MCV)
if (!IS_MCV_LANDING) {
  $(window).on(
    'scroll.mcvHeader',
    mcvThrottleRaf(function () {
      var scrollTop = $(window).scrollTop();
      $('header').toggleClass('fix_style', scrollTop >= 250);
      $('header').toggleClass('fixed', scrollTop >= 260);
    })
  );
} else if (typeof jQuery !== 'undefined') {
  jQuery('header').removeClass('fix_style fixed');
}

// Vidéo YouTube modale (template)
if (typeof jQuery !== 'undefined' && jQuery('.play-button').length) {
  jQuery('.play-button').click(function () {
    jQuery('#youtubevideo').attr('src', jQuery(this).data('url'));
  });
}

if (typeof jQuery !== 'undefined' && jQuery('#close-video').length) {
  jQuery('#close-video').click(function () {
    jQuery('#youtubevideo').attr('src', '');
  });
}

if (typeof jQuery !== 'undefined' && jQuery('#myModal').length) {
  jQuery(document).on('hidden.bs.modal', '#myModal', function () {
    jQuery('#youtubevideo').attr('src', '');
    mcvEnsurePageInteractive();
  });
}

if (typeof jQuery !== 'undefined') {
  jQuery(document).ready(function () {
    jQuery('.navbar-toggler').click(function () {
      var $icon = jQuery(this).children('span').children('.ico_menu');
      if ($icon.length) {
        $icon.toggleClass('icofont-navigation-menu icofont-close');
      }
      jQuery(this).children('.toggle-wrap').toggleClass('active');
    });

    var navCollapse = document.getElementById('navbarSupportedContent');
    if (navCollapse) {
      jQuery(navCollapse).on('hidden.bs.collapse shown.bs.collapse', function () {
        window.setTimeout(mcvEnsurePageInteractive, 50);
      });
    }
  });
}

// AOS — désactivé sur pages MCV (scroll listener + MutationObserver = gel au fil du temps)
if (!IS_MCV_LANDING && typeof AOS !== 'undefined' && document.querySelector('[data-aos]')) {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    disable: reduceMotion,
    throttleDelay: 99,
    debounceDelay: 50,
  });
}

if (IS_MCV_LANDING) {
  document.querySelectorAll('[data-aos]').forEach(function (el) {
    el.removeAttribute('data-aos');
    el.removeAttribute('data-aos-duration');
    el.removeAttribute('data-aos-delay');
    el.classList.add('aos-init');
  });
}

// Ancres internes
(function () {
  function scrollToHash(hash) {
    if (!hash || hash.charAt(0) !== '#') {
      return false;
    }
    var target = document.querySelector(hash);
    if (!target) {
      return false;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (history.replaceState) {
      history.replaceState(null, '', hash);
    } else {
      location.hash = hash;
    }
    return true;
  }

  function closeMobileNav() {
    var collapse = document.getElementById('navbarSupportedContent');
    if (collapse && collapse.classList.contains('show') && typeof $ !== 'undefined') {
      $(collapse).collapse('hide');
    }
  }

  document.querySelectorAll('.mcv-hero-scroll, .mcv-scroll-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = link.getAttribute('href');
      if (!scrollToHash(hash)) {
        return;
      }
      e.preventDefault();
      closeMobileNav();
    });
  });

  if (location.hash) {
    window.addEventListener('load', function () {
      scrollToHash(location.hash);
    });
  }
})();

// Panneaux thèmes / langues (landing mobile template embarqué)
(function () {
  var panel = document.querySelector('[data-mcv-theme-panel]');
  if (!panel) {
    return;
  }

  var preview = panel.querySelector('.mcv-theme-preview');
  var previewLabel = panel.querySelector('.mcv-theme-preview__label');
  var previewScreen = panel.querySelector('.mcv-theme-preview__screen');
  var themeClasses = ['mcv-theme-preview--light', 'mcv-theme-preview--dark', 'mcv-theme-preview--bw'];
  var labels = { light: 'Clair', dark: 'Sombre', bw: 'Noir & blanc' };

  panel.querySelectorAll('[data-mcv-theme]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var theme = tab.getAttribute('data-mcv-theme');
      if (!theme) {
        return;
      }

      panel.querySelectorAll('[data-mcv-theme]').forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      themeClasses.forEach(function (cls) {
        preview.classList.remove(cls);
      });
      preview.classList.add('mcv-theme-preview--' + theme);
      previewLabel.textContent = labels[theme] || tab.querySelector('.mcv-theme-card__label').textContent;

      var screenSrc = tab.getAttribute('data-screen-src');
      if (screenSrc && previewScreen) {
        previewScreen.src = screenSrc;
      }

      preview.classList.add('mcv-theme-preview--updating');
      window.setTimeout(function () {
        preview.classList.remove('mcv-theme-preview--updating');
      }, 280);
    });
  });
})();

(function () {
  var panel = document.querySelector('[data-mcv-intl-panel]');
  if (!panel) {
    return;
  }

  var preview = panel.querySelector('.mcv-intl-preview');
  var screen = panel.querySelector('#mcv-intl-screen');

  panel.querySelectorAll('[data-mcv-lang]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var lang = tab.getAttribute('data-mcv-lang');
      if (!lang) {
        return;
      }

      panel.querySelectorAll('[data-mcv-lang]').forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      var screenSrc = tab.getAttribute('data-screen-src');
      var screenAlt = tab.getAttribute('data-screen-alt');
      if (screenSrc && screen) {
        screen.src = screenSrc;
      }
      if (screenAlt && screen) {
        screen.alt = screenAlt;
      }

      if (preview) {
        preview.classList.add('mcv-intl-preview--updating');
        window.setTimeout(function () {
          preview.classList.remove('mcv-intl-preview--updating');
        }, 280);
      }
    });
  });
})();
