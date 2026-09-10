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
const eternalBallTl = gsap.timeline({
  defaults: { duration: 2, ease: 'back.out(1.7)' },
  scrollTrigger: {
    trigger: '.eternal-journey-section',
    start: '100px 70%',
  },
});

eternalBallTl.from('.fi-cap-ball', { opacity: 0, x: -100 });

const eternalSectionTextTl = gsap.timeline({
  defaults: { duration: 2, ease: 'back.out(1.7)' },
  scrollTrigger: {
    trigger: '.eternal-section-title',
    start: 'top 70%',
  },
});

eternalSectionTextTl
  .from('.eternal-section-title', { opacity: 0, y: 50 })
  .from('.eternal-list-item', { opacity: 0, y: 50, stagger: 0.5 }, 0.5);

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

      const colTl = gsap.timeline({
        defaults: { duration: 2, ease: 'back.out(1.7)' },
        scrollTrigger: {
          trigger: gallery,
          start: 'top 70%',
        },
      });

      colTl
        .from(cols, { x: 100, opacity: 0, stagger: 0.5 })
        .from(titles, { y: 100, opacity: 0, stagger: 0.5 });
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
// Discovery set section animation
const discoveryTl = gsap.timeline({
  defaults: { duration: 2, ease: 'back.out(1.7)' },
  scrollTrigger: {
    trigger: '.discovery-set-content',
    start: 'top 70%',
  },
});

discoveryTl.from('.discovery-set-product', {
  opacity: 0,
  y: 100,
});

/////////////////////////////////////////////////////////////////////////
// Heart behind section animation
if (document.querySelector('.heart-behind-content')) {
  const heartBehindTl = gsap.timeline({
    defaults: { duration: 2, ease: 'back.out(1.7)' },
    scrollTrigger: {
      trigger: '.heart-behind-content',
      start: 'top 70%',
    },
  });

  heartBehindTl.from('.heart-behind-content', {
    opacity: 0,
    y: 100,
  });
}

/////////////////////////////////////////////////////////////////////////
// Catalog section animation
const catalogTl = gsap.timeline({
  defaults: { duration: 2, ease: 'back.out(1.7)' },
  scrollTrigger: {
    trigger: '.catalog-content',
    start: 'top 70%',
  },
});

catalogTl.from('.catalog-product', {
  opacity: 0,
  y: 100,
  stagger: 0.5,
});

// Desktop essence uses the gallery loop above. Mobile motion is owned by
// src/flow-essence.ts so the bottle and words have only one animation driver.
