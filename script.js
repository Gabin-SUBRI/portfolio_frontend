// ====================================
// PORTFOLIO GABIN SUBRI - SCRIPT PRINCIPAL
// (Particules supprimées pour optimisation)
// ====================================

// Variables globales
let mobileMenuOpen = false;
let isScrolling = false;

// ====================================
// 2. ANIMATIONS AU SCROLL
// ====================================
function handleScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in:not(.visible)");

  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Throttle pour optimiser les performances
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ====================================
// 3. SCROLL FLUIDE UNIFORME
// ====================================
function smoothScrollTo(targetId, offset = 80) {
  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;

  const targetPosition = targetElement.offsetTop - offset;

  // Désactiver le scroll CSS pendant l'animation JS
  document.documentElement.style.scrollBehavior = "auto";

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  // Réactiver le scroll CSS après l'animation
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, 1000);
}

function initSmoothScrolling() {
  // Sélectionner TOUS les liens internes
  const allInternalLinks = document.querySelectorAll('a[href^="#"]');

  allInternalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      smoothScrollTo(targetId, 80);

      // Fermer le menu mobile si ouvert
      if (mobileMenuOpen) {
        closeMobileMenu();
      }
    });
  });
}

// ====================================
// 4. MENU MOBILE
// ====================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (!mobileMenuBtn || !mobileNav) return;

  mobileMenuBtn.addEventListener("click", toggleMobileMenu);

  // Fermer le menu en cliquant sur un lien
  const mobileLinks = document.querySelectorAll(".mobile-nav a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Fermer le menu sur redimensionnement
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenuOpen) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  mobileMenuOpen = !mobileMenuOpen;

  if (mobileMenuOpen) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}

function openMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  mobileNav.style.display = "block";
  setTimeout(() => {
    mobileNav.classList.add("active");
  }, 10);
  mobileMenuBtn.innerHTML = "✕";
  mobileMenuBtn.style.transform = "rotate(90deg)";

  // Empêcher le scroll du body
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  mobileMenuOpen = false;
  mobileNav.classList.remove("active");
  setTimeout(() => {
    mobileNav.style.display = "none";
  }, 300);
  mobileMenuBtn.innerHTML = "☰";
  mobileMenuBtn.style.transform = "rotate(0deg)";

  // Réactiver le scroll du body
  document.body.style.overflow = "auto";
}

// ====================================
// 5. FILTRAGE PORTFOLIO
// ====================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Retirer la classe active de tous les boutons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Ajouter la classe active au bouton cliqué
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item, index) => {
        const shouldShow =
          filterValue === "all" || item.classList.contains(filterValue);

        if (shouldShow) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, index * 50); // Animation échelonnée
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
}

// ====================================
// 6. ANIMATIONS BARRES DE COMPÉTENCES
// ====================================
function initSkillsAnimation() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress");
        progressBars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.transform = "scaleX(1)";
          }, index * 200); // Animation échelonnée
        });

        // Ne plus observer cet élément
        skillsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const skillCategories = document.querySelectorAll(".skill-category");
  skillCategories.forEach((category) => {
    skillsObserver.observe(category);
  });
}

// ====================================
// 7. EFFET PARALLAXE HERO
// ====================================
function initParallaxEffect() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const parallaxScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3; // Réduction de l'effet pour plus de subtilité

    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  }, 16); // ~60fps

  window.addEventListener("scroll", parallaxScroll);
}

// ====================================
// 8. EFFETS DE SURVOL CARTES
// ====================================
function initCardHoverEffects() {
  // Cartes de service
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.03)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Items portfolio
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// ====================================
// 9. OPTIMISATION PERFORMANCE
// ====================================
function initPerformanceOptimizations() {
  // Lazy loading des images
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
}

// ====================================
// 10. GESTION ERREURS ET FALLBACKS
// ====================================
function handleErrors() {
  window.addEventListener("error", (e) => {
    console.warn("Erreur JS capturée:", e.error);
  });

  // Fallback si IntersectionObserver n'est pas supporté
  if (!window.IntersectionObserver) {
    // Montrer tous les éléments fade-in immédiatement
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => el.classList.add("visible"));

    // Animer les barres de compétences immédiatement
    const progressBars = document.querySelectorAll(".skill-progress");
    progressBars.forEach((bar) => {
      bar.style.transform = "scaleX(1)";
    });
  }
}

// ====================================
// 11. INITIALISATION PRINCIPALE
// ====================================
function initApp() {
  try {
    // Initialiser le scroll fluide
    initSmoothScrolling();

    // Initialiser le menu mobile
    initMobileMenu();

    // Initialiser le filtrage portfolio
    initPortfolioFilter();

    // Initialiser les animations de compétences
    initSkillsAnimation();

    // Initialiser l'effet parallaxe
    initParallaxEffect();

    // Initialiser les effets de survol
    initCardHoverEffects();

    // Optimisations performance
    initPerformanceOptimizations();

    // Gestion d'erreurs
    handleErrors();

    // Animations au scroll
    handleScrollAnimations();

    console.log("✅ Portfolio initialisé avec succès (particules désactivées)");
  } catch (error) {
    console.warn("⚠️ Erreur lors de l'initialisation:", error);
  }
}

// ====================================
// 12. EVENTS LISTENERS GLOBAUX
// ====================================
document.addEventListener("DOMContentLoaded", initApp);

// Scroll avec throttling pour les performances
window.addEventListener("scroll", throttle(handleScrollAnimations, 100));

// Redimensionnement avec debounce (particules supprimées)
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log("Redimensionnement détecté - optimisations appliquées");
  }, 250);
});

// Prévenir les erreurs de scroll sur iOS
document.addEventListener("touchstart", () => {}, { passive: true });
document.addEventListener("touchmove", () => {}, { passive: true });

// ====================================
// 13. FONCTIONS UTILITAIRES
// ====================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Fonction pour détecter si on est sur mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Fonction pour détecter la vitesse de connexion
function getConnectionSpeed() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  return connection ? connection.effectiveType : "unknown";
}

// Adapter les animations selon la vitesse de connexion
if (getConnectionSpeed() === "slow-2g" || getConnectionSpeed() === "2g") {
  document.documentElement.style.setProperty("--animation-duration", "0.1s");
}
