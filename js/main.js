// Open Sub Menu
$('.drp_btn').click(function(){
  $(this).siblings('.sub_menu').slideToggle();
})

// Preloader JS

function preloader_fade() {
  $("#preloader").fadeOut('slow');
}

$(document).ready(function() {
  window.setTimeout("preloader_fade();", 500); //call fade in .5 seconds
}
)


// All Slider Js

$('#frmae_slider').owlCarousel({
    loop:true,
    margin:10,
    autoplay: true,
    smartSpeed: 1500,
    nav:false,
    dots: true, 
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

$('#company_slider').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay: true,
    smartSpeed: 1500,
    dots: true, 
    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})


$('#testimonial_slider').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay: true,
    smartSpeed: 2500,
    dots: true, 
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

$('#testimonial_slider1').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    autoHeight: true,
    autoplay: true,
    smartSpeed: 2500,
    dots: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})


$('#screen_slider').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots: true, 
    autoplay: true,
    smartSpeed: 2500,
    center: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})


// Number Count
window.addEventListener('scroll', function() {
	var element = document.querySelector('#counter');
  if (!element) return;
	var position = element.getBoundingClientRect();

	// checking whether fully visible
	if(position.top >= 0 && position.bottom <= window.innerHeight) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 1400,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
	}

	if(position.top < window.innerHeight && position.bottom >= 0) {
		//console.log('Element is partially visible in screen');
	}else{
    //console.log('Element is not visible');
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = 0;
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 100,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });   
  }
});



// text List Flow
if ($('#text_list_flow').length) {
  $('#text_list_flow').owlCarousel({
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
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  });
}


// --------Magnify-popup

$(function() {
    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});


// Pricing Section Year Month Jquery
$(document).ready(function () {

    $(".tog_block").click(function () {
      $(".tog_btn").toggleClass('month_active');
      $('.month').toggleClass('active');
      $('.years').toggleClass('active');

      $('.monthly_plan').toggleClass('active');
      $('.yearly_plan').toggleClass('active');

    })

  });

  $(document).ready(function () {
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function () {
      $(this)
        .prev(".card-header")
        .find(".icon_faq")
        .addClass("icofont-minus")
        .removeClass("icofont-plus");
    });


    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on("show.bs.collapse", function () {
        $(this).prev(".card-header").find(".icon_faq").removeClass("icofont-plus").addClass("icofont-minus");
      })
      .on("hide.bs.collapse", function () {
        $(this).prev(".card-header").find(".icon_faq").removeClass("icofont-minus").addClass("icofont-plus");
      });

      $(".collapse").on("show.bs.collapse", function () {
        $(this).prev(".card-header").children('h2').children('.btn').addClass("active");
      })
      .on("hide.bs.collapse", function () {
        $(this).prev(".card-header").children('h2').children('.btn').removeClass("active");
      });
  });


// Download Section Hover Jquery (désactivé sur la landing MCV — fond blanc)
if (!document.body.classList.contains('mcv-landing')) {
window.addEventListener('scroll', function() {
	var element = document.querySelector('.free_text');
	if (!element) return;
	var position = element.getBoundingClientRect();

	if(position.top < window.innerHeight && position.bottom >= 0) {
    $('.purple_backdrop').css("opacity", "1");
	}else{
    $('.purple_backdrop').css("opacity", "0");
  }
});
}

if (!document.body.classList.contains('mcv-landing')) {
$(window).on('resize', function() {
  if ($(window).width()<768) {
      
    window.addEventListener('scroll', function() {
      var element = document.querySelector('.mobile_mockup');
      if (!element) return;
      var position = element.getBoundingClientRect();
    
      if(position.top < window.innerHeight && position.bottom >= 0) {
        $('.purple_backdrop').css("opacity", "1");
      }else{
        $('.purple_backdrop').css("opacity", "0");
      }
    });

  }  
  else {

    window.addEventListener('scroll', function() {
      var element = document.querySelector('.free_text');
      if (!element) return;
      var position = element.getBoundingClientRect();
    
      if(position.top < window.innerHeight && position.bottom >= 0) {
        $('.purple_backdrop').css("opacity", "1");
      }else{
        $('.purple_backdrop').css("opacity", "0");
      }
    });

  }
});
}


// Année courante (footer copyright)
(function () {
  var yearEl = document.getElementById('mcv-current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();

// Scrool-top
$(document).ready(function() {
  var toTop = $('.go_top');
  toTop.on('click', function() {
    $('html, body').animate({scrollTop: $('html, body').offset().top,}, 400);
  });

  $(window).scroll(function() {
    // declare variable
    var topPos = $(this).scrollTop();

    // if user scrolls down - show scroll to top button
    if (topPos > 750) {
      $(toTop).css("opacity", "1");

    } else {
      $(toTop).css("opacity", "0");
    }

  });

});

// Fix Header Js (désactivé sur la landing MonChauffeurVIP)
$(window).scroll(function(){
  if ($('body').hasClass('mcv-landing')) {
      $('header').removeClass('fix_style fixed');
      return;
  }
  if ($(window).scrollTop() >= 250) {
      $('header').addClass('fix_style');
  }
  else {
      $('header').removeClass('fix_style');
  }
  if ($(window).scrollTop() >= 260) {
      $('header').addClass('fixed');
  }
  else {
      $('header').removeClass('fixed');
  }
});




//YOUTUBE VIDEO
$('.play-button').click(function(e){
  var iframeEl = $('<iframe>', { src: $(this).data('url') });
  $('#youtubevideo').attr('src', $(this).data('url'));
})

$('#close-video').click(function(e){
  $('#youtubevideo').attr('src', '');
}); 

$(document).on('hidden.bs.modal','#myModal', function () {
  $('#youtubevideo').attr('src', '');
}); 



// Close btn on click 

$(document).ready(function(){
  $('.navbar-toggler').click(function(){
    if($(this).children('span').children('.ico_menu').hasClass('icofont-navigation-menu')) {
      $(this).children('span').children('.ico_menu').removeClass('icofont-navigation-menu').addClass('icofont-close');
    } else {
      $(this).children('span').children('.ico_menu').removeClass('icofont-close').addClass('icofont-navigation-menu');
    }
  });
});

(function() {
  $('.toggle-wrap').on('click', function() {
    $(this).toggleClass('active');
    $('aside').animate({width: 'toggle'}, 200);
  });
})();


// INITIALIZE AOS

if (document.body.classList.contains('mcv-landing')) {
  // Accélère légèrement les animations AOS déjà définies dans le HTML.
  document.querySelectorAll('[data-aos-duration]').forEach(function (el) {
    var duration = parseInt(el.getAttribute('data-aos-duration'), 10);
    if (!Number.isNaN(duration) && duration > 0) {
      el.setAttribute('data-aos-duration', String(Math.max(450, Math.round(duration * 0.75))));
    }
  });

  document.querySelectorAll('[data-aos-delay]').forEach(function (el) {
    var delay = parseInt(el.getAttribute('data-aos-delay'), 10);
    if (!Number.isNaN(delay) && delay > 0) {
      el.setAttribute('data-aos-delay', String(Math.max(0, Math.round(delay * 0.7))));
    }
  });
}

AOS.init({
  duration: 700,
  easing: 'ease-out-cubic'
});

// Navigation interne — défilement fluide vers les sections
(function () {
  function scrollToHash(hash) {
    if (!hash || hash.charAt(0) !== '#') return false;
    var target = document.querySelector(hash);
    if (!target) return false;
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
      if (!scrollToHash(hash)) return;
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

// Sélecteur de thèmes (aperçu grand écran)
(function () {
  var panel = document.querySelector('[data-mcv-theme-panel]');
  if (!panel) return;

  var preview = panel.querySelector('.mcv-theme-preview');
  var previewLabel = panel.querySelector('.mcv-theme-preview__label');
  var previewScreen = panel.querySelector('.mcv-theme-preview__screen');
  var themeClasses = ['mcv-theme-preview--light', 'mcv-theme-preview--dark', 'mcv-theme-preview--bw'];
  var labels = { light: 'Clair', dark: 'Sombre', bw: 'Noir & blanc' };

  panel.querySelectorAll('[data-mcv-theme]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var theme = tab.getAttribute('data-mcv-theme');
      if (!theme) return;

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

// Sélecteur de langue — profil international
(function () {
  var panel = document.querySelector('[data-mcv-intl-panel]');
  if (!panel) return;

  var preview = panel.querySelector('.mcv-intl-preview');
  var screen = panel.querySelector('#mcv-intl-screen');

  panel.querySelectorAll('[data-mcv-lang]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var lang = tab.getAttribute('data-mcv-lang');
      if (!lang) return;

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

