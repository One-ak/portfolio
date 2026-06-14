const navMenu = document.getElementById('myNavMenu');
const navToggle = document.getElementById('navMenuToggle');
const navHeader = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

function setMenuOpen(isOpen) {
  if (!navMenu || !navToggle) return;

  navMenu.classList.toggle('responsive', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

  const icon = navToggle.querySelector('i');
  if (icon) {
    icon.classList.toggle('uil-bars', !isOpen);
    icon.classList.toggle('uil-times', isOpen);
  }
}

function myMenuFunction() {
  setMenuOpen(!navMenu?.classList.contains('responsive'));
}

window.myMenuFunction = myMenuFunction;

navToggle?.addEventListener('click', myMenuFunction);

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
  }
});

function headerShadow() {
  navHeader?.classList.toggle('header-scrolled', window.scrollY > 50);
}

headerShadow();
window.addEventListener('scroll', headerShadow, { passive: true });

const typedTarget = document.querySelector('.typedText');
if (typedTarget) {
  const typedRoles = ['Web Developer', 'MCA Student', 'Frontend Developer', 'Java Developer', 'Open to Work'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typedTarget.textContent = 'Web Developer';
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {
      const currentRole = typedRoles[roleIndex];
      typedTarget.textContent = currentRole.slice(0, charIndex);

      if (!isDeleting && charIndex < currentRole.length) {
        charIndex += 1;
        window.setTimeout(typeRole, 80);
        return;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        window.setTimeout(typeRole, 1800);
        return;
      }

      if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        window.setTimeout(typeRole, 45);
        return;
      }

      isDeleting = false;
      roleIndex = (roleIndex + 1) % typedRoles.length;
      window.setTimeout(typeRole, 250);
    }

    typeRole();
  }
}

function setFormStatus(message, type) {
  if (!contactStatus) return;
  contactStatus.textContent = message;
  contactStatus.className = 'form-status';
  if (type) contactStatus.classList.add(type);
}

function markInvalid(element, isInvalid) {
  element?.classList.toggle('input-error', isInvalid);
}

function buildMailtoLink(name, email, message) {
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:anshpratapsingh333@gmail.com?subject=${subject}&body=${body}`;
}

function sendEmail(event) {
  event?.preventDefault();

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const name = nameInput?.value.trim() || '';
  const email = emailInput?.value.trim() || '';
  const message = messageInput?.value.trim() || '';

  markInvalid(nameInput, !name || name.length < 2);
  markInvalid(emailInput, !emailInput?.checkValidity());
  markInvalid(messageInput, !message || message.length < 10);

  if (!name || name.length < 2 || !emailInput?.checkValidity() || !message || message.length < 10) {
    setFormStatus('Please enter your name, a valid email, and a message of at least 10 characters.', 'error');
    return;
  }

  setFormStatus('Opening your email app with a prepared draft.', 'success');
  window.location.href = buildMailtoLink(name, email, message);
}

window.sendEmail = sendEmail;
window.buildMailtoLink = buildMailtoLink;

contactForm?.addEventListener('submit', sendEmail);

function prepareReveal(selector, direction) {
  document.querySelectorAll(selector).forEach((element) => {
    element.classList.add('reveal-ready', `reveal-${direction}`);
  });
}

prepareReveal('.featured-text-card, .featured-name, .featured-text-info, .featured-text-btn, .social_icons, .featured-image, .project-card, .experience-card, .top-header', 'up');
prepareReveal('.about-info, .contact-info', 'left');
prepareReveal('.skills-box, .form-control', 'right');

const revealTargets = document.querySelectorAll('.reveal-ready');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('reveal-visible'));
}

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

    if (!navLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add('active-link');
    } else {
      navLink.classList.remove('active-link');
    }
  });
}

scrollActive();
window.addEventListener('scroll', scrollActive, { passive: true });

const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
  copyrightYear.textContent = String(new Date().getFullYear());
}
