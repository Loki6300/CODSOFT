/*
  =========================================
  Premium Portfolio Script
  Owner: Basireddy Lokeswara Reddy
  Features: Scroll Reveal, Mobile Nav, Clipboard Copy, Form Submit
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navigation Bar & Active Links ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  const handleActiveLinkSync = () => {
    let scrollPos = window.scrollY + 200; // Offset for better detection
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleActiveLinkSync();
  });
  
  // Trigger on initial load
  handleNavbarScroll();
  handleActiveLinkSync();


  // --- 2. Mobile Responsive Toggle Menu ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navMenuLinks = document.querySelectorAll('.nav-menu .nav-link');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change icon based on active state
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars-staggered';
    }
  });

  // Close mobile menu when a nav link is clicked
  navMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });


  // --- 3. Intersection Observer Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after showing so it doesn't trigger repeatedly
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12, // Trigger when 12% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset bottom threshold
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // --- 4. Back To Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  // --- 5. Copy To Clipboard Utilities ---
  const copyTextUtility = (btnId, textId, typeLabel) => {
    const btn = document.getElementById(btnId);
    const textEl = document.getElementById(textId);

    if (!btn || !textEl) return;

    btn.addEventListener('click', () => {
      const textToCopy = textEl.textContent.trim();
      
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // Success Feedback
          const originalIcon = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--color-cyan);"></i>';
          btn.setAttribute('title', 'Copied!');
          
          setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.setAttribute('title', `Copy ${typeLabel}`);
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    });
  };

  copyTextUtility('copy-email-btn', 'email-text', 'Email');
  copyTextUtility('copy-phone-btn', 'phone-text', 'Phone');


  // --- 6. Sleek Simulated Contact Form Submission ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-message');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Disable button during submission simulation
      const submitBtn = document.getElementById('form-submit-btn');
      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      // Simulate network request (1.5 seconds delay)
      setTimeout(() => {
        // Success response
        formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();
        
        // Reset Button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        
        // Remove status after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);

      }, 1500);
    });
  }
});
