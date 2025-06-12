// Création des particules
function createParticles() {
  const particles = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
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
