document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById('burger');
  const mainNav = document.getElementById('mainNav');

  burger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    burger.classList.toggle('active');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });

  /* ---------- Header : ombre au scroll ---------- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---------- Bouton retour en haut ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Nav active au scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ---------- Compteurs animés (stats du hero) ---------- */
  const counters = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count, 10);
      const duration = 1500;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = value;
        if (progress < 1) requestAnimationFrame(step);
        else counter.textContent = target;
      };
      requestAnimationFrame(step);
    });
  };

  const statsSection = document.querySelector('.hero-stats');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.4 });

  if (statsSection) statsObserver.observe(statsSection);

  /* ---------- Révélation des cartes au scroll ---------- */
  const revealTargets = document.querySelectorAll('.service-card, .project-card');
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Formulaire de devis rapide ---------- */
  const quoteBar = document.getElementById('quoteBar');
  quoteBar.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });

});











const cardsContainer = document.querySelector('.cards-container');

if (cardsContainer) {
  const cards = cardsContainer.querySelectorAll('.card');
  let isHovering = false;

  cardsContainer.addEventListener('mouseenter', () => { isHovering = true; });

  cardsContainer.addEventListener('mouseleave', () => {
    isHovering = false;
    cards.forEach(card => { card.style.transform = ''; });
  });

  cardsContainer.addEventListener('mousemove', (e) => {
    const rect = cardsContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;

    cards.forEach(card => {
      if (card.matches(':hover')) {
        card.style.transform =
          `translateY(-20px) rotate(0deg) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      } else if (isHovering) {
        card.style.transform =
          `translateY(0) rotate(0deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
  });
}