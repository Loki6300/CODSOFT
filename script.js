/* Portfolio Script — Basireddy Lokeswara Reddy */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar: scroll effect & active link ---
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  function updateNav() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    const pos = window.scrollY + 200;
    sections.forEach(sec => {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sec.id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', updateNav);
  updateNav();

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    navToggle.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
  });

  document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });

  // --- Scroll reveal animation ---
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // --- Back to top button ---
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => backToTopBtn.classList.toggle('visible', window.scrollY > 400));
  backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // --- Copy to clipboard ---
  function setupCopy(btnId, textId, label) {
    const btn = document.getElementById(btnId);
    const textEl = document.getElementById(textId);
    if (!btn || !textEl) return;

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(textEl.textContent.trim()).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--color-cyan)"></i>';
        btn.title = 'Copied!';
        setTimeout(() => { btn.innerHTML = orig; btn.title = `Copy ${label}`; }, 2000);
      });
    });
  }

  setupCopy('copy-email-btn', 'email-text', 'Email');
  setupCopy('copy-phone-btn', 'phone-text', 'Phone');

  // --- Contact form (simulated submission) ---
  const contactForm = document.getElementById('contact-form');
  const formStatus  = document.getElementById('form-status-message');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const submitBtn = document.getElementById('form-submit-btn');
      const origContent = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        formStatus.className = 'form-status success';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = origContent;
        setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
      }, 1500);
    });
  }

});
