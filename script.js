document.addEventListener("DOMContentLoaded", function () {
  var controller = new ScrollMagic.Controller();

  var sections = document.querySelectorAll(".presta");
  sections.forEach(function (section) {
    var tween = gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );

    new ScrollMagic.Scene({
      triggerElement: section,
      triggerHook: 0.8,
    })
      .setTween(tween)
      .addTo(controller);
  });
});

document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  let sunIcon = document.getElementById("sun-icon");
  let moonIcon = document.getElementById("moon-icon");

  if (document.body.classList.contains("dark-mode")) {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
});
