// Création des particules
function createParticles() {
  const particles = document.getElementById("particles");
  const particleCount = 500;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = -Math.random() * 20 + "s"; // Délai négatif pour commencer l'animation en cours
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particles.appendChild(particle);
  }
}

// Animation au scroll
function handleScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");

  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Smooth scroll pour la navigation
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Effet de survol sur les cartes de service
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.03)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  handleScrollAnimations();

  window.addEventListener("scroll", handleScrollAnimations);
});

// Effet de parallaxe sur le hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  hero.style.transform = `translateY(${rate}px)`;
});

// Menu mobile
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");
let mobileMenuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuOpen = !mobileMenuOpen;

  if (mobileMenuOpen) {
    mobileNav.style.display = "block";
    setTimeout(() => {
      mobileNav.classList.add("active");
    }, 10);
    mobileMenuBtn.innerHTML = "✕";
    mobileMenuBtn.style.transform = "rotate(90deg)";
  } else {
    mobileNav.classList.remove("active");
    setTimeout(() => {
      mobileNav.style.display = "none";
    }, 300);
    mobileMenuBtn.innerHTML = "☰";
    mobileMenuBtn.style.transform = "rotate(0deg)";
  }
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuOpen = false;
    mobileNav.classList.remove("active");
    setTimeout(() => {
      mobileNav.style.display = "none";
    }, 300);
    mobileMenuBtn.innerHTML = "☰";
    mobileMenuBtn.style.transform = "rotate(0deg)";
  });
});

// Fermer le menu mobile si on redimensionne la fenêtre
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mobileMenuOpen) {
    mobileMenuOpen = false;
    mobileNav.classList.remove("active");
    mobileNav.style.display = "none";
    mobileMenuBtn.innerHTML = "☰";
    mobileMenuBtn.style.transform = "rotate(0deg)";
  }
});

// ==============================================
// CORRECTION SCROLL FLUIDE SPÉCIFIQUE
// Pour harmoniser le comportement entre le menu et le bouton CTA
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  // 1. D'abord, on applique le scroll fluide global
  document.documentElement.style.scrollBehavior = "smooth";

  // 2. Fonction de scroll fluide personnalisée
  function smoothScrollTo(targetId, offset = 0) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // 3. Gestion spécifique du bouton "Découvrir Mes Services"
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault(); // Empêche le comportement par défaut

      const targetId = this.getAttribute("href"); // Récupère "#services"
      smoothScrollTo(targetId, 80); // 80px d'offset pour ne pas coller au header

      console.log("CTA Button: Scroll fluide vers", targetId);
    });
  }

  // 4. Gestion du menu mobile (pour s'assurer qu'il fonctionne pareil)
  const mobileNavLinks = document.querySelectorAll('#mobileNav a[href^="#"]');
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      smoothScrollTo(targetId, 80); // Même offset que le bouton CTA

      // Fermer le menu mobile après clic
      const mobileNav = document.getElementById("mobileNav");
      if (mobileNav) {
        mobileNav.classList.remove("active"); // Ou la classe que vous utilisez
      }

      console.log("Menu Mobile: Scroll fluide vers", targetId);
    });
  });

  // 5. Gestion du menu desktop si vous en avez un
  const desktopNavLinks = document.querySelectorAll(
    'nav a[href^="#"]:not(#mobileNav a)'
  );
  desktopNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      smoothScrollTo(targetId, 80);

      console.log("Menu Desktop: Scroll fluide vers", targetId);
    });
  });

  // 6. Override de tout autre script qui pourrait interférer
  // Cette fonction force le scroll fluide pour TOUS les liens internes
  function forceUniformScrolling() {
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');

    allInternalLinks.forEach((link) => {
      // Supprimer les anciens event listeners
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      // Ajouter le nouveau comportement
      newLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation(); // Empêche les autres scripts

        const targetId = this.getAttribute("href");
        smoothScrollTo(targetId, 80);

        // Log pour debug
        console.log(
          "Lien interne:",
          this.className,
          "-> Scroll vers",
          targetId
        );
      });
    });
  }

  // 7. Application après un petit délai pour override les autres scripts
  setTimeout(forceUniformScrolling, 100);
});

// Script pour le filtrage du portfolio
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Retirer la classe active de tous les boutons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Ajouter la classe active au bouton cliqué
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(30px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Animation des barres de compétences
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  };

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress");
        progressBars.forEach((bar) => {
          bar.style.transform = "scaleX(1)";
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll(".skill-category").forEach((category) => {
    skillsObserver.observe(category);
  });
});
