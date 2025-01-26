document.addEventListener("DOMContentLoaded", function () {
  var controller = new ScrollMagic.Controller();

  var sections = document.querySelectorAll(".content");
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
