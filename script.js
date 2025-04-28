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

  function typeWriter() {
    if (charIndex < fullText.length) {
      textElement.textContent += fullText.charAt(charIndex);
      charIndex++;

      // Vérifier la longueur de la ligne actuelle sans couper les mots
      const lines = textElement.textContent.split("\n");
      const currentLine = lines[lines.length - 1];

      if (currentLine.length >= 30) {
        const lastSpaceIndex = currentLine.lastIndexOf(" ");
        if (lastSpaceIndex !== -1) {
          textElement.textContent =
            textElement.textContent.slice(
              0,
              textElement.textContent.lastIndexOf(" ")
            ) +
            "\n" +
            textElement.textContent.slice(
              textElement.textContent.lastIndexOf(" ") + 1
            );
        }
      }

      setTimeout(typeWriter, 20);
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

window.addEventListener("load", function () {
  const logos = document.querySelectorAll(".logo");
  logos.forEach((logo) => {
    logo.addEventListener("error", function () {
      console.error("Erreur de chargement d'image pour ", this.href);
    });
  });
});
