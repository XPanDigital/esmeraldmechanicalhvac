/* =============================================
   EMERALD MECHANICAL — site.js
   Navigation, Scroll, Forms, Animations
   ============================================= */

(function () {
  'use strict';

  /* ── NAVBAR SCROLL ─────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── ACTIVE NAV LINK ───────────────────────── */
  const navLinks = document.querySelectorAll('.nav-link');
  const current  = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (
      (current === '' && href === 'index.html') ||
      (current === 'index.html' && href === 'index.html') ||
      (href && href !== 'index.html' && current.startsWith(href.replace('.html', '')))
    ) {
      link.classList.add('active');
    }
  });

  /* ── MOBILE MENU ───────────────────────────── */
  const burger = document.querySelector('.nav-burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── REVEAL ANIMATIONS ─────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── SMOOTH SCROLL for # links ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── FORMS ─────────────────────────────────── */
  document.querySelectorAll('form[data-ajax]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const successEl = form.parentElement.querySelector('.form-success');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      await new Promise(r => setTimeout(r, 1400));
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Submit Request'; }
      if (successEl) { successEl.classList.add('show'); setTimeout(() => successEl.classList.remove('show'), 6000); }
      form.reset();
    });
  });

  /* ── HERO PARALLAX (subtle) ─────────────────── */
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.2}px)`;
      }
    }, { passive: true });
  }

})();
