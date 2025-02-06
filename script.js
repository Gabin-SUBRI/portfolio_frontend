window.addEventListener("load", function () {
  console.log("Page chargée, lancement de l'écran de chargement.");
  setTimeout(function () {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    console.log("Écran de chargement caché, affichage du contenu principal.");
  }, 1500); // délai de 1.5 seconde
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM entièrement chargé et analysé.");
  const textElement = document.getElementById("animated-text");
  const fullText = `Etudiant en développement web passionné par la création de solutions web performantes et innovantes. Spécialisé en HTML, CSS et Javascript, avec 1 ans d’expérience en Analyste et développement d'applications. Toujours prêt pour de nouveaux défis technologiques.`;
  let charIndex = 0;

  function getMaxLineLength() {
    return window.matchMedia("(max-width: 768px)").matches ? 30 : 50;
  }

  function typeWriter() {
    if (charIndex < fullText.length) {
      textElement.textContent += fullText.charAt(charIndex);
      charIndex++;

      const maxLineLength = getMaxLineLength();

      // Ajouter un saut de ligne si on atteint la longueur maximale de la ligne sans couper les mots
      if (charIndex % maxLineLength === 0) {
        const lastSpaceIndex = textElement.textContent.lastIndexOf(" ");
        if (lastSpaceIndex !== -1) {
          textElement.textContent =
            textElement.textContent.slice(0, lastSpaceIndex) +
            "\n" +
            textElement.textContent.slice(lastSpaceIndex + 1);
        } else {
          textElement.textContent += "\n";
        }
      }

      setTimeout(typeWriter, 30);
    } else {
      textElement.style.border = "none"; // Supprime le curseur clignotant après animation
    }
  }

  setTimeout(function () {
    console.log("Action après 3 secondes !");
    typeWriter(); // Démarre l'animation de texte
  }, 3000);
  /* Animations */
  gsap.from("#main-content", { duration: 3, opacity: 0, y: -50 });
  console.log("Animation du contenu principal lancée.");
});
