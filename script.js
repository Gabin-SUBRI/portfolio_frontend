const carouselImages = document.querySelector(".carousel-images");
const indicators = document.querySelectorAll(".carousel-indicators div");
const totalImages = indicators.length;
let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselImages.style.transform = `translateX(${offset}%)`;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

function goToNextImage() {
  currentIndex = (currentIndex + 1) % totalImages;
  updateCarousel();
}

function goToPrevImage() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateCarousel();
}

indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    currentIndex = parseInt(indicator.dataset.index, 10);
    updateCarousel();
  });
});

setInterval(goToNextImage, 3000);
