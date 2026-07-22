/* ============================================================
   FLÁVIA RICAMENTE – Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL EFFECT ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const bars = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    bars[0].style.transform = isOpen ? 'translateY(6.5px) rotate(45deg)' : '';
    bars[1].style.opacity   = isOpen ? '0' : '';
    bars[2].style.transform = isOpen ? 'translateY(-6.5px) rotate(-45deg)' : '';
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

  /* ── SMOOTH ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--gold-light)'
        : '';
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── INTERSECTION OBSERVER (reveal animations) ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  /* ── STAGGER REVEAL FOR GRID CHILDREN ── */
  const staggerGroups = [
    { parent: '.pilares-grid', child: '.pilar' },
    { parent: '.depo-grid',    child: '.depo-card' },
    { parent: '.modulo-card',  child: null },
  ];

  staggerGroups.forEach(({ parent, child }) => {
    const els = child
      ? document.querySelectorAll(`${parent} ${child}`)
      : document.querySelectorAll(parent);
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.09}s`;
    });
  });

  /* ── CONTACT FORM ── */
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Simulate submission (no backend)
      setTimeout(() => {
        form.reset();
        success.classList.remove('hidden');
        btn.textContent = 'Enviar Mensagem';
        btn.disabled = false;

        setTimeout(() => success.classList.add('hidden'), 5000);
      }, 1000);
    });
  }

  /* ── COUNTER ANIMATION (badge +20) ── */
  const badges = document.querySelectorAll('.badge-num');
  const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent) || 20;
        let count = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = `+${count}`;
          if (count >= target) clearInterval(timer);
        }, 40);
        badgeObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  badges.forEach(b => badgeObserver.observe(b));

});
