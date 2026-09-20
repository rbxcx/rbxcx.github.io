const navBtn = document.querySelector('.nav-button');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

////////////////////////////////////////////////////////////////////////
// Navbar functionality
// Toggle header
navBtn.addEventListener('click', e => {
  header.classList.toggle('active');
});

// When clicked on navlink close header
nav.addEventListener('click', e => {
  if (e.target.classList.contains('navlink')) {
    header.classList.remove('active');
  }
});

const videoModal = document.querySelector('#videoModal');

////////////////////////////////////////////////////////////////////////
// VIDEO MODAL
// On opening the modal play video in full screen
videoModal.addEventListener('show.bs.modal', e => {
  const video = e.target.querySelector('video');
  video.play();
  video.requestFullscreen();
});

// On closing the modal stop playing video

videoModal.addEventListener('hide.bs.modal', e => {
  const video = e.target.querySelector('video');
  video.pause();
  video.currentTime = 0;
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// GSAP ANIMATIONS
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.saveStyles(
  '.sunrise-gallery-section-img, .sunrise-gallery-section-text, .hero-img-container, .hero-img-overlay, .hero-content'
);

// Inner hero pin omitted — Flow Infinite film owns the opening.

/////////////////////////////////////////////////////////////////////////
// Journey section animation
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const eternalSectionTextTl = gsap.timeline({
    defaults: { duration: 0.65, ease: 'sine.out' },
    scrollTrigger: {
      trigger: '.eternal-section-title',
      start: 'top 82%',
    },
  });

  eternalSectionTextTl
    .from('.eternal-section-title', { opacity: 0, y: 20 })
    .from('.eternal-list-item', { opacity: 0, y: 18, stagger: 0.08 }, 0.1);
}

/////////////////////////////////////////////////////////////////////////
// Collection section animation
const collectionTl = gsap.timeline({
  defaults: { duration: 2, ease: 'back.out(1.7)' },
  scrollTrigger: {
    trigger: '.collection-section-content',
    start: 'top 70%',
  },
});

collectionTl.from('.collection-section-content', { opacity: 0, y: 50 });

/////////////////////////////////////////////////////////////////////////
// Bridge Between Worlds — a scrubbed reveal follows the scroll in both
// directions, so the composition never snaps or gets stranded mid-arrival.
const bridgeWorlds = document.querySelector('#collectionSection.fi-bridge-worlds');
if (bridgeWorlds && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const heading = bridgeWorlds.querySelector('.fi-bridge-heading');
  const notes = bridgeWorlds.querySelectorAll('.fi-bridge-note');
  const bottleWrap = bridgeWorlds.querySelector('.fi-bridge-bottle-wrap');

  const bridgeTl = gsap.timeline({
    defaults: { ease: 'sine.inOut' },
    scrollTrigger: {
      trigger: bridgeWorlds,
      start: 'top 88%',
      end: 'top 24%',
      scrub: 0.8,
    },
  });

  if (heading) bridgeTl.from(heading, { autoAlpha: 0, y: 24, duration: 0.65 });
  if (bottleWrap) bridgeTl.from(bottleWrap, { autoAlpha: 0, y: 70, scale: 0.96, duration: 1 }, 0.12);
  if (notes.length) {
    bridgeTl.from(notes, { autoAlpha: 0, y: 26, stagger: 0.14, duration: 0.7 }, 0.45);
  }
}

/////////////////////////////////////////////////////////////////////////
// Gallery sections animation
const galleries = document.querySelectorAll('.gallery');
ScrollTrigger.saveStyles(
  '.gallery, .gallery-col, .display-6, .gallery-perfume, .hero-section, .hero-img-container, .hero-img, .hero-img-overlay, .hero-content'
);
ScrollTrigger.matchMedia({
  '(max-width: 991.98px)': function () {
    galleries.forEach(gallery => {
      if (gallery.closest('.fi-essence')) return;
      const perfume = gallery.querySelector('.gallery-perfume');

      const titles = [perfume, ...gallery.querySelectorAll('h5')];

      const perfumeTl = gsap.timeline({
        defaults: { duration: 2, ease: 'back.out(1.7)' },
        scrollTrigger: {
          trigger: gallery,
          start: 'top 50%',
        },
      });

      const colTl = gsap.timeline({
        defaults: { duration: 2, ease: 'back.out(1.7)' },
        scrollTrigger: {
          trigger: gallery,
          start: 'top 70%',
        },
      });

      colTl.from(titles, { y: 100, opacity: 0, stagger: 0.5 });
    });
  },

  '(min-width: 992px)': function () {
    galleries.forEach(gallery => {
      const perfume = gallery.querySelector('.gallery-perfume');
      const cols = [...gallery.querySelectorAll('.gallery-col')].reverse();
      const titles = [perfume, ...gallery.querySelectorAll('h4')];
      const isFlowEssence = Boolean(gallery.closest('.fi-essence'));

      const colTl = gsap.timeline({
        defaults: isFlowEssence
          ? { duration: 0.85, ease: 'sine.out' }
          : { duration: 2, ease: 'back.out(1.7)' },
        scrollTrigger: {
          trigger: gallery,
          start: isFlowEssence ? 'top 88%' : 'top 70%',
        },
      });

      if (isFlowEssence) {
        colTl
          .from(cols, { x: 65, opacity: 0, stagger: 0.1 })
          .from(titles, { y: 28, opacity: 0, stagger: 0.08, duration: 0.65 }, 0.18);
      } else {
        colTl
          .from(cols, { x: 100, opacity: 0, stagger: 0.5 })
          .from(titles, { y: 100, opacity: 0, stagger: 0.5 });
      }
    });
  },
});

/////////////////////////////////////////////////////////////////////////
// Perfume section animation
const perfumeSections = document.querySelectorAll('.perfume-section');

perfumeSections.forEach(section => {
  const title = section.querySelector('.perfume-section-title');
  const content = section.querySelector('.perfume-section-content');
  const image = section.querySelector('.perfume-section-img');
  const ingredient = section.querySelector('.perfume-section-ingredient');

  const perfumeTl = gsap.timeline({
    defaults: { duration: 2, ease: 'back.out(1.7)' },
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
    },
  });

  perfumeTl
    .from(title, { y: 100, opacity: 0 })
    .from(content, { x: -100, opacity: 0 }, 0)
    .from(image, { y: 100, opacity: 0 }, 0)
    .from(ingredient, { x: 100, opacity: 0 }, 0);
});

/////////////////////////////////////////////////////////////////////////
// The remaining Flow chapters enter with one quiet curtain-like pass.
// The olfactive timeline above deliberately remains untouched.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const catalog = document.querySelector('.fi-catalog');
  if (catalog) {
    const catalogHeader = catalog.querySelector('.fi-catalog-header');
    const catalogItems = gsap.utils.toArray('.fi-catalog-item', catalog);
    const catalogTl = gsap.timeline({
      scrollTrigger: {
        trigger: catalog,
        start: 'top 90%',
        end: 'top 48%',
        scrub: 0.55,
      },
    });

    catalogTl
      .from(catalogHeader, { opacity: 0.18, y: 12, duration: 0.38, ease: 'sine.out' })
      .from(catalogItems, {
        opacity: 0.12,
        y: 18,
        scale: 0.992,
        duration: 0.72,
        ease: 'sine.out',
        stagger: 0.025,
        transformOrigin: '50% 60%',
      }, 0.12);
  }

  [
    ['.fi-surprise-web', '.fi-surprise-art, .fi-surprise-web-copy'],
    ['.fi-heart', '.fi-heart-portrait, .fi-heart-copy'],
  ].forEach(([trigger, targets]) => {
    const section = document.querySelector(trigger);
    if (!section) return;
    gsap.timeline({
      defaults: { duration: 0.85, ease: 'power2.out' },
      scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'play none none reverse' },
    }).from(targets, { autoAlpha: 0, y: 30, clipPath: 'inset(0 0 12% 0)', stagger: 0.12 });
  });
}

// Desktop essence uses the gallery loop above. Mobile motion is owned by
// src/flow-essence.ts so the bottle and words have only one animation driver.
