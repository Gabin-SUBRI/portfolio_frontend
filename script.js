document.addEventListener("DOMContentLoaded", function () {
  let age = 20;

  // Fonction pour augmenter votre âge chaque 15 juillet.
  function augmenterAgeChaque15Juillet() {
    const dateActuelle = new Date();
    const jour = dateActuelle.getDate();
    const mois = dateActuelle.getMonth() + 1; // Les mois commencent à 0, donc on ajoute 1.

    if (jour === 15 && mois === 7) {
      age++; // Augmentez l'âge de 1 si la date est le 15 juillet.
    }
    // Mettez à jour le texte dans le span avec l'ID "age".
    document.getElementById("age").textContent = age + " ans";
  }

  // Appelez la fonction pour mettre à jour l'âge au chargement de la page
  augmenterAgeChaque15Juillet();
});

// le boutton des textes
function showFullText() {
  var shortText = document.getElementById("shortText");
  var fullText = document.getElementById("fullText");

  shortText.style.display = "none";
  fullText.style.display = "block";
}

function showFullText2() {
  var shortText = document.getElementById("shortText2");
  var fullText = document.getElementById("fullText2");

  shortText.style.display = "none";
  fullText.style.display = "block";
}

function showFullText3() {
  var shortText = document.getElementById("shortText3");
  var fullText = document.getElementById("fullText3");

  shortText.style.display = "none";
  fullText.style.display = "block";
}

function showFullText4() {
  var shortText = document.getElementById("shortText4");
  var fullText = document.getElementById("fullText4");

  shortText.style.display = "none";
  fullText.style.display = "block";
}

function showFullText5() {
  var shortText = document.getElementById("shortText5");
  var fullText = document.getElementById("fullText5");

  shortText.style.display = "none";
  fullText.style.display = "block";
}

function showFullText6() {
  var shortText = document.getElementById("shortText6");
  var fullText = document.getElementById("fullText6");

  shortText.style.display = "none";
  fullText.style.display = "block";
}
